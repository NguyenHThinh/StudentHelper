"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import timetableService, { TimetableEntry } from "@/services/timetable";
import { useState } from "react";

const timetableSchema = z.object({
    subject: z.string().min(1, "Vui lòng nhập môn học"),
    location: z.string().min(1, "Vui lòng nhập địa điểm"),
    startTime: z.string().min(1, "Vui lòng chọn thời gian bắt đầu"),
    endTime: z.string().min(1, "Vui lòng chọn thời gian kết thúc"),
    note: z.string().optional(),
}).refine((data) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
}, {
    message: "Thời gian kết thúc phải sau thời gian bắt đầu",
    path: ["endTime"],
}).refine((data) => {
    // Validate +/- 7 days
    const start = new Date(data.startTime);
    const now = new Date();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const minDate = new Date(now.getTime() - sevenDays);
    const maxDate = new Date(now.getTime() + sevenDays);
    // Allow some buffer for client/server time diff, but roughly strict
    return start >= minDate && start <= maxDate;
}, {
    message: "Chỉ được thêm lịch trong khoảng 7 ngày trước và sau hôm nay",
    path: ["startTime"],
});

type TimetableSchema = z.infer<typeof timetableSchema>;

interface Props {
    onSuccess: () => void;
}

export default function TimetableForm({ onSuccess }: Props) {
    const [serverError, setServerError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TimetableSchema>({
        resolver: zodResolver(timetableSchema),
    });

    const onSubmit = async (data: TimetableSchema) => {
        setServerError(null);
        // Convert to ISO string if needed by BE, but BE accepts Date traceable content
        // "datetime-local" value is "2023-05-15T14:30"
        // new Date(...) handles it correctly.
        // BE expects ISODate string usually or parsable string.

        const entry = {
            subject: data.subject,
            location: data.location,
            startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(data.endTime).toISOString(),
            note: data.note,
        };

        const response = await timetableService.createEntry(entry);

        if (response.data) {
            reset();
            onSuccess();
        } else {
            console.error(response);
            setServerError(response.message || 'Lỗi khi thêm lịch');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            {serverError && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                    {serverError}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Môn học</label>
                    <input
                        {...register("subject")}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                        placeholder="VD: Toán rời rạc"
                    />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Địa điểm</label>
                    <input
                        {...register("location")}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                        placeholder="VD: Phòng A202"
                    />
                    {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Bắt đầu</label>
                    <input
                        type="datetime-local"
                        {...register("startTime")}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    />
                    {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">Kết thúc</label>
                    <input
                        type="datetime-local"
                        {...register("endTime")}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    />
                    {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Ghi chú (Tùy chọn)</label>
                <textarea
                    {...register("note")}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-accent focus:border-accent"
                    rows={2}
                    placeholder="Ghi chú thêm..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-accent text-white py-2.5 text-sm font-semibold hover:bg-accent-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    'Đang thêm...'
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="16" /><line x1="8" x2="16" y1="12" y2="12" /></svg>
                        Thêm lịch học
                    </>
                )}
            </button>
        </form>
    );
}
