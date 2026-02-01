import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Helper to add subscribers to retry queue
const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

// Helper to notify subscribers on new token
const onRefreshed = (token: string) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && error.response?.data?.message === 'No token provided' && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        // We don't actually need to attach the token if using cookies,
                        // but we wait for the cookie to be set.
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint
                // We use a clean axios instance to avoid circular loops if refresh itself fails 
                // (though regular instance should work if logic is sound, safety first)
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {}, { withCredentials: true });

                isRefreshing = false;
                onRefreshed('refreshed'); // Token is in HTTP-only cookie, so just signal completion

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];
                // If refresh fails, we should logout.
                // Since this is a library file, we can't easily access React Context or Router here.
                // We'll trust the auth service or component calling this to handle the final failure,
                // OR we can force a redirect if we really want to be aggressive.

                // For now, let's call the logout API to be clean and then reject
                try {
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { withCredentials: true });
                } catch (e) { /* ignore */ }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
