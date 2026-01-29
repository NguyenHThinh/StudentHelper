"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submit
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
    };

    return (
        <div className="rounded-3xl bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-md h-fit">
            <h2 className="mb-6 text-xl font-semibold text-primary">
                Gửi tin nhắn cho chúng tôi
            </h2>

            {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-highlight/20">
                        <svg className="h-8 w-8 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary">Đã gửi thành công!</h3>
                    <p className="mt-2 text-slate-600">Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder="Nhập họ và tên"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700">
                            Chủ đề
                        </label>
                        <select
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            required
                        >
                            <option value="">Chọn chủ đề</option>
                            <option value="academic">Khó khăn học tập</option>
                            <option value="mental">Tâm lý / Stress</option>
                            <option value="social">Quan hệ xã hội</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                            Nội dung
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="w-full rounded-xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                            placeholder="Chia sẻ những gì bạn đang gặp phải..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-linear-to-r from-accent to-accent-dark px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        Gửi tin nhắn
                    </button>
                </form>
            )}

            {/* Quick AI support link */}
            <div className="mt-6 rounded-xl bg-linear-to-r from-accent/10 to-highlight/10 p-4">
                <p className="text-sm text-slate-700">
                    Cần phản hồi ngay?{" "}
                    <Link href="/ai-support" className="font-semibold text-accent hover:underline">
                        Chat với AI →
                    </Link>
                </p>
            </div>
        </div>
    );
}
