export interface TimetableEntry {
    _id?: string;
    subject: string;
    location: string;
    startTime: string; // ISO string
    endTime: string; // ISO string
    note?: string;
    userId?: string;
}

const timetableService = {
    getEntries: async (start?: string, end?: string) => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/timetable`;
            if (start && end) {
                url += `?start=${start}&end=${end}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });
            return response.json();
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error?.message || 'Error fetching timetable' };
        }
    },

    createEntry: async (entry: Omit<TimetableEntry, '_id' | 'userId'>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
                credentials: 'include',
            });
            return response.json();
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error?.message || 'Error creating entry' };
        }
    },

    deleteEntry: async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            return response.json();
        } catch (error: any) {
            console.error(error);
            return { success: false, message: error?.message || 'Error deleting entry' };
        }
    }
};

export default timetableService;
