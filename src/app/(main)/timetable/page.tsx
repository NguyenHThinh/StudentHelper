"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TimetableForm from "@/components/timetable/TimetableForm";
import timetableService, { TimetableEntry } from "@/services/timetable";
import { useRouter } from "next/navigation";

export default function TimetablePage() {
    const router = useRouter();
    const [entries, setEntries] = useState<TimetableEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = async () => {
        setLoading(true);
        const response = await timetableService.getEntries();
        if (response.data) {
            setEntries(response.data);
        } else if (response.message === 'Unauthorized' || response.message === 'No token provided' || response.status === 401) {
            router.push('/login');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa lịch này?")) {
            const response = await timetableService.deleteEntry(id);
            if (response.message === 'Entry deleted successfully') {
                fetchEntries();
            } else {
                alert(response.message || "Lỗi khi xóa");
            }
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('vi-VN', {
            weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-green-50/20 font-sans flex flex-col pt-24">
            <Header />

            <main className="grow container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Thời khóa biểu</h1>
                    <p className="text-slate-600">Quản lý lịch học của bạn (trong vòng 7 ngày).</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-slate-700">Thêm lịch mới</h2>
                        <TimetableForm onSuccess={fetchEntries} />
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-slate-700">Lịch sắp tới</h2>

                        {loading ? (
                            <p className="text-slate-500">Đang tải...</p>
                        ) : entries.length === 0 ? (
                            <div className="bg-white/50 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
                                Chưa có lịch học nào. Hãy thêm mới bên trái.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {entries.map((entry) => (
                                    <div key={entry._id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow flex justify-between items-start group">
                                        <div>
                                            <h3 className="font-semibold text-lg text-slate-800">{entry.subject}</h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                <span>{formatDate(entry.startTime)} - {new Date(entry.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                                <span>{entry.location}</span>
                                            </div>
                                            {entry.note && (
                                                <p className="text-sm text-slate-500 mt-2 italic border-l-2 border-slate-200 pl-2">{entry.note}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(entry._id!)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100"
                                            title="Xóa lịch"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
