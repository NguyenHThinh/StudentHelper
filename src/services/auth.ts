const authService = {
    login: async (username: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return response.json();
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error?.message || 'Lỗi khi đăng nhập' };
        }
    },

    register: async (name: string, email: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            return response.json();
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error?.message || 'Lỗi khi đăng ký' };
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            return response.json();
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error?.message || 'Lỗi khi đăng xuất' };
        }
    },
};

export default authService;