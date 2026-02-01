import axiosInstance from "@/lib/axios";

const authService = {
    login: async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post('/auth/login', { username, password });
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Lỗi khi đăng nhập' };
        }
    },

    register: async (name: string, email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/auth/register', { name, email, password });
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Lỗi khi đăng ký' };
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post('/auth/logout');
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Lỗi khi đăng xuất' };
        }
    },

    getProfile: async () => {
        try {
            const response = await axiosInstance.get('/auth/user');
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Lỗi khi lấy thông tin người dùng' };
        }
    },
};

export default authService;