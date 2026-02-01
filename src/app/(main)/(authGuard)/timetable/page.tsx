"use client";

import { useEffect, useState } from "react";
import TimetableForm from "@/components/timetable/TimetableForm";
import TimetableCalendar from "@/components/timetable/TimetableCalendar";
import Modal from "@/components/ui/Modal";
import timetableService, { TimetableEntry } from "@/services/timetable";
import { useRouter } from "next/navigation";

export default function TimetablePage() {
    const router = useRouter();
    const [entries, setEntries] = useState<TimetableEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | undefined>(undefined);

    const fetchEntries = async () => {
        setLoading(true);
        const response = await timetableService.getEntries();
        if (response.data) {
            setEntries(response.data);
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
                setIsDetailModalOpen(false);
                fetchEntries();
            } else {
                alert(response.message || "Lỗi khi xóa");
            }
        }
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setSelectedEntry(undefined);
        setIsFormModalOpen(true);
    };

    const handleEventClick = (entry: TimetableEntry) => {
        setSelectedEntry(entry);
        setIsDetailModalOpen(true);
    };

    const handleEditClick = () => {
        setIsDetailModalOpen(false);
        setIsFormModalOpen(true);
    };

    const handleFormModalClose = () => {
        setIsFormModalOpen(false);
        setSelectedDate(undefined);
        setSelectedEntry(undefined);
    };

    return (
        <div className="min-h-screen bg-secondary font-sans flex flex-col pt-24">
            <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="font-poppins text-4xl font-bold text-primary mb-2">Thời khóa biểu</h1>
                            <p className="text-slate-600 text-lg">Quản lý lịch học của bạn một cách trực quan và dễ dàng</p>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedEntry(undefined);
                                setSelectedDate(undefined);
                                setIsFormModalOpen(true);
                            }}
                            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-dark px-6 py-3 text-white font-semibold shadow-lg shadow-accent/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-90">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="16" />
                                <line x1="8" x2="16" y1="12" y2="12" />
                            </svg>
                            Thêm lịch học
                        </button>
                    </div>
                </div>

                {/* Calendar Container */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100/50 overflow-hidden backdrop-blur-sm">
                    {loading ? (
                        <div className="h-[700px] flex flex-col items-center justify-center text-slate-500">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                            <p className="text-lg font-medium">Đang tải dữ liệu lịch học...</p>
                        </div>
                    ) : (
                        <TimetableCalendar
                            entries={entries}
                            onDateClick={handleDateClick}
                            onEventClick={handleEventClick}
                        />
                    )}
                </div>

                {/* Form Modal (Add/Edit) */}
                <Modal
                    isOpen={isFormModalOpen}
                    onClose={handleFormModalClose}
                    title={selectedEntry ? "Cập nhật lịch học" : "Thêm lịch học mới"}
                >
                    <TimetableForm
                        onSuccess={() => {
                            fetchEntries();
                            handleFormModalClose();
                        }}
                        initialDate={selectedDate}
                        initialData={selectedEntry}
                    />
                </Modal>

                {/* Details Modal */}
                <Modal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    title="Thông tin buổi học"
                >
                    {selectedEntry && (
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-accent rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Môn học</h4>
                                    <p className="text-xl font-bold text-slate-800">{selectedEntry.subject}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Thời gian</h4>
                                    <p className="text-lg font-semibold text-slate-800">
                                        {new Date(selectedEntry.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        {' - '}
                                        {new Date(selectedEntry.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <p className="text-slate-600">
                                        {new Date(selectedEntry.startTime).toLocaleDateString(['vi-VN'], { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Địa điểm</h4>
                                    <p className="text-lg font-semibold text-slate-800">{selectedEntry.location}</p>
                                </div>
                            </div>

                            {selectedEntry.note && (
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Ghi chú</h4>
                                        <p className="text-slate-700 whitespace-pre-wrap">{selectedEntry.note}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button
                                    onClick={handleEditClick}
                                    className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedEntry._id!)}
                                    className="flex-1 bg-red-50 text-red-600 border border-red-100 py-2.5 rounded-xl font-semibold hover:bg-red-100 hover:border-red-200 transition-all shadow-sm"
                                >
                                    Xóa lịch học
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </main>
        </div>
    );
}
