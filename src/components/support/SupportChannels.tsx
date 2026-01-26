import { ReactNode } from "react";

interface SupportChannel {
    id: number;
    title: string;
    description: string;
    contact: string;
    type: string;
    icon: ReactNode;
    color: string;
    bgColor: string;
}

const supportChannels: SupportChannel[] = [
    {
        id: 1,
        title: "Tổng đài tâm lý sinh viên",
        description: "Hỗ trợ tâm lý 24/7 cho sinh viên gặp khó khăn",
        contact: "1800 1567",
        type: "phone",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        color: "bg-highlight",
        bgColor: "bg-highlight/10",
    },
    {
        id: 2,
        title: "Email hỗ trợ học vụ",
        description: "Giải đáp thắc mắc về học tập, điểm số, đăng ký môn",
        contact: "support@studenthelper.edu.vn",
        type: "email",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: "bg-accent",
        bgColor: "bg-accent/10",
    },
    {
        id: 3,
        title: "Phòng tư vấn tâm lý",
        description: "Đặt lịch hẹn tư vấn trực tiếp với chuyên gia",
        contact: "Tòa nhà A, Phòng 205",
        type: "location",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        color: "bg-primary",
        bgColor: "bg-primary/10",
    },
];

export default function SupportChannels() {
    return (
        <div className="space-y-6">
            <h2 className="font-poppins text-xl font-semibold text-primary">
                Các kênh hỗ trợ
            </h2>

            <div className="space-y-4">
                {supportChannels.map((channel) => (
                    <div
                        key={channel.id}
                        className="group rounded-2xl bg-white/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                    >
                        <div className="flex gap-4">
                            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${channel.bgColor} ${channel.color.replace('bg-', 'text-')} transition-transform group-hover:scale-110`}>
                                {channel.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-primary">{channel.title}</h3>
                                <p className="mt-1 text-sm text-slate-600">{channel.description}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1 rounded-full ${channel.bgColor} px-3 py-1 text-sm font-medium ${channel.color.replace('bg-', 'text-')}`}>
                                        {channel.contact}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
