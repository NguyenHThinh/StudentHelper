const authService = {
    login: async (email: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
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
    }
};

export default authService;