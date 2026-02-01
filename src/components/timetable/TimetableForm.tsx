"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import timetableService, { TimetableEntry } from "@/services/timetable";
import { useEffect, useState } from "react";

// Helper to format Date to YYYY-MM-DD for input[type="date"]
const formatDateInput = (date: Date) => {
    return date.toISOString().split('T')[0];
};

// Helper to format Date to HH:mm for input[type="time"]
const formatTimeInput = (date: Date) => {
    return date.toTimeString().slice(0, 5);
};

const timetableSchema = z.object({
    subject: z.string().min(1, "Vui lòng nhập môn học"),
    location: z.string().min(1, "Vui lòng nhập địa điểm"),
    date: z.string().min(1, "Vui lòng chọn ngày"),
    startTime: z.string().min(1, "Vui lòng chọn giờ bắt đầu"),
    endTime: z.string().min(1, "Vui lòng chọn giờ kết thúc"),
    note: z.string().optional(),
}).refine((data) => {
    // Combine date + time to compare
    if (!data.date || !data.startTime || !data.endTime) return true;

    // Simple string comparison for times works if 24h format (HH:mm)
    return data.endTime > data.startTime;
}, {
    message: "Thời gian kết thúc phải sau thời gian bắt đầu",
    path: ["endTime"],
});

type TimetableSchema = z.infer<typeof timetableSchema>;

interface Props {
    onSuccess: () => void;
    initialDate?: Date; // Pre-fill date if clicked from calendar
    initialData?: TimetableEntry; // For editing
}

export default function TimetableForm({ onSuccess, initialDate, initialData }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<TimetableSchema>({
        resolver: zodResolver(timetableSchema),
        defaultValues: {
            date: initialDate ? formatDateInput(initialDate) : formatDateInput(new Date()),
            startTime: initialDate ? formatTimeInput(initialDate) : undefined
        }
    });

    useEffect(() => {
        if (initialData) {
            setValue("subject", initialData.subject);
            setValue("location", initialData.location);
            setValue("note", initialData.note);

            const start = new Date(initialData.startTime);
            const end = new Date(initialData.endTime);

            setValue("date", formatDateInput(start));
            setValue("startTime", formatTimeInput(start));
            setValue("endTime", formatTimeInput(end));
        } else if (initialDate) {
            setValue("date", formatDateInput(initialDate));
            if (initialDate.getHours() !== 0 || initialDate.getMinutes() !== 0) {
                setValue("startTime", formatTimeInput(initialDate));
            }
        }
    }, [initialDate, initialData, setValue]);

    const onSubmit = async (data: TimetableSchema) => {
        setServerError(null);

        // Construct ISO strings
        const startDateTime = new Date(`${data.date}T${data.startTime}`);
        const endDateTime = new Date(`${data.date}T${data.endTime}`);

        const entry = {
            subject: data.subject,
            location: data.location,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            note: data.note,
        };

        let response;
        if (initialData && initialData._id) {
            response = await timetableService.updateEntry(initialData._id, entry);
        } else {
            response = await timetableService.createEntry(entry);
        }

        if (response.data || response.message === 'Timetable entry updated') {
            reset();
            onSuccess();
        } else {
            console.error(response);
            setServerError(response.message || 'Lỗi khi lưu lịch');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                    <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {serverError}
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-primary">Môn học</label>
                <input
                    {...register("subject")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white hover:border-slate-400"
                    placeholder="VD: Toán rời rạc"
                    autoFocus={!initialData}
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-primary">Địa điểm</label>
                <input
                    {...register("location")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white hover:border-slate-400"
                    placeholder="VD: Phòng A202"
                />
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-primary">Ngày học</label>
                <input
                    type="date"
                    {...register("date")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white hover:border-slate-400"
                />
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Bắt đầu</label>
                    <input
                        type="time"
                        {...register("startTime")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white hover:border-slate-400"
                    />
                    {errors.startTime && <p className="text-xs text-red-500 mt-1">{errors.startTime.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-primary">Kết thúc</label>
                    <input
                        type="time"
                        {...register("endTime")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white hover:border-slate-400"
                    />
                    {errors.endTime && <p className="text-xs text-red-500 mt-1">{errors.endTime.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-primary">Ghi chú <span className="text-slate-400 font-normal">(Tùy chọn)</span></label>
                <textarea
                    {...register("note")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white hover:border-slate-400 resize-none"
                    rows={3}
                    placeholder="Ghi chú thêm về buổi học..."
                />
            </div>

            <div className="pt-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-linear-to-r from-accent to-accent-dark text-white py-3.5 text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-accent/30"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {initialData ? 'Đang cập nhật...' : 'Đang thêm...'}
                        </>
                    ) : (
                        <>
                            {initialData ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            )}
                            {initialData ? 'Cập nhật lịch học' : 'Thêm lịch học'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
