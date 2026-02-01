import axiosInstance from "@/lib/axios";

export interface ChatHistoryEntry {
    _id: string;
    userId: string;
    prompt: string;
    response: string;
    model: string;
    createdAt: string;
}

const aiService = {
    chat: async (prompt: string) => {
        try {
            const response = await axiosInstance.post('/openai/chat', { prompt });
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Error communicating with AI' };
        }
    },

    getHistory: async (page = 1, limit = 20) => {
        try {
            const response = await axiosInstance.get(`/openai/history?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Error fetching history' };
        }
    }
};

export default aiService;
