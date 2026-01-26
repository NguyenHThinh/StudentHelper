"use client";

import { useState } from "react";
import Link from "next/link";
import AuthTabs from "./AuthTabs";

export default function RegisterForm() {
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    return (
        <div className="min-h-[560px] flex flex-col gap-5 max-[900px]:min-h-0 max-[900px]:gap-4">
            <div className="space-y-4">
                <AuthTabs activeTab="register" />

                <div className="space-y-1.5">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-primary">
                        Tạo tài khoản mới
                    </h2>
                    <p className="text-sm text-slate-500 max-w-md">
                        Tạo tài khoản để bắt đầu sử dụng Student Helper.
                    </p>
                </div>
            </div>

            <form
                className="space-y-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    // Ở đây bạn sẽ nối API thật sau
                }}
            >
                <div className="space-y-1.5">
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Họ và tên
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="w-full rounded-full border border-slate-900/6 bg-white/95 px-[1.1rem] py-[0.7rem] text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]"
                        placeholder="VD: Nguyễn Minh Anh"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full rounded-full border border-slate-900/6 bg-white/95 px-[1.1rem] py-[0.7rem] text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]"
                        placeholder="ban@example.com"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full rounded-full border border-slate-900/6 bg-white/95 px-[1.1rem] py-[0.7rem] text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]"
                        placeholder="Tạo mật khẩu mạnh"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Xác nhận mật khẩu
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="w-full rounded-full border border-slate-900/6 bg-white/95 px-[1.1rem] py-[0.7rem] text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]"
                        placeholder="Nhập lại mật khẩu"
                        required
                    />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-600">
                        <input
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="h-3.5 w-3.5 rounded border border-slate-300 text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-accent/40"
                        />
                        <span>
                            Tôi đồng ý với{" "}
                            <button
                                type="button"
                                className="text-accent font-medium no-underline relative transition-colors duration-300 ease-out hover:text-accent-dark [&:hover::after]:w-full [&::after]:absolute [&::after]:bottom-[-0.12rem] [&::after]:left-0 [&::after]:h-px [&::after]:w-0 [&::after]:bg-accent [&::after]:transition-all [&::after]:duration-300 [&::after]:ease-out text-xs align-baseline"
                            >
                                Điều khoản sử dụng
                            </button>
                        </span>
                    </label>
                </div>

                <div className="pt-1 space-y-3">
                    <button
                        type="submit"
                        className="w-full rounded-full border-none px-[1.1rem] py-[0.8rem] text-sm font-semibold text-slate-50 inline-flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-br from-accent to-accent-dark shadow-[0_16px_35px_rgba(82,110,160,0.38)] transition-all duration-300 ease-out enabled:hover:-translate-y-[1.5px] enabled:hover:shadow-[0_22px_55px_rgba(82,110,160,0.4)] enabled:hover:brightness-[1.02] enabled:active:translate-y-0 enabled:active:scale-[0.99] enabled:active:shadow-[0_10px_30px_rgba(82,110,160,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={!agreeToTerms}
                    >
                        Tạo tài khoản
                    </button>
                </div>
            </form>

            <p className="mt-auto text-xs text-slate-500">
                Đã có tài khoản?{" "}
                <Link
                    href="/login"
                    className="text-accent font-medium no-underline relative transition-colors duration-300 ease-out hover:text-accent-dark [&:hover::after]:w-full [&::after]:absolute [&::after]:bottom-[-0.12rem] [&::after]:left-0 [&::after]:h-px [&::after]:w-0 [&::after]:bg-accent [&::after]:transition-all [&::after]:duration-300 [&::after]:ease-out"
                >
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}
