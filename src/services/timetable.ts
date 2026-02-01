import axiosInstance from "@/lib/axios";

export interface TimetableEntry {
    _id?: string;
    subject: string;
    location: string;
    startTime: string;
    endTime: string;
    note?: string;
    userId?: string;
}

const timetableService = {
    getEntries: async (start?: string, end?: string) => {
        try {
            let url = '/timetable';
            if (start && end) {
                url += `?start=${start}&end=${end}`;
            }
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Error fetching timetable' };
        }
    },

    createEntry: async (entry: Omit<TimetableEntry, '_id' | 'userId'>) => {
        try {
            const response = await axiosInstance.post('/timetable', entry);
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Error creating entry' };
        }
    },

    deleteEntry: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`/timetable/${id}`);
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Error deleting entry' };
        }
    },

    updateEntry: async (id: string, entry: Omit<TimetableEntry, '_id' | 'userId'>) => {
        try {
            const response = await axiosInstance.put(`/timetable/${id}`, entry);
            return response.data;
        } catch (error: any) {
            return error.response?.data || { success: false, message: 'Error updating entry' };
        }
    }
};

export default timetableService;
