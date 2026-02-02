"use client";

import { useState } from "react";
import Link from "next/link";
import AuthTabs from "./AuthTabs";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine(val => val === true, "Bạn phải đồng ý với điều khoản"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            agreeToTerms: false,
        }
    });

    const onSubmit = async (data: RegisterSchema) => {
        setServerError(null);
        const response = await authService.register(data.name, data.email, data.password);

        if (response.message === 'User created successfully') {
            router.push('/login');
        } else {
            setServerError(response.message || 'Đăng ký thất bại');
        }
    };

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
                onSubmit={handleSubmit(onSubmit)}
            >
                {serverError && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                        {serverError}
                    </div>
                )}

                <div className="space-y-1.5 relative">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Họ và tên
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <input
                            {...register("name")}
                            id="name"
                            type="text"
                            className={`w-full rounded-full border ${errors.name ? 'border-red-500' : 'border-slate-900/6'} bg-white/95 pl-10 pr-[1.1rem] py-[0.7rem] text-base text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]`}
                            placeholder="VD: Nguyễn Minh Anh"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1 pl-3">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-1.5 relative">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        </div>
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            className={`w-full rounded-full border ${errors.email ? 'border-red-500' : 'border-slate-900/6'} bg-white/95 pl-10 pr-[1.1rem] py-[0.7rem] text-base text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]`}
                            placeholder="ban@example.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1 pl-3">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1.5 relative">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Mật khẩu
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            className={`w-full rounded-full border ${errors.password ? 'border-red-500' : 'border-slate-900/6'} bg-white/95 pl-10 pr-[1.1rem] py-[0.7rem] text-base text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]`}
                            placeholder="Tạo mật khẩu mạnh"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1 pl-3">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-1.5 relative">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <input
                            {...register("confirmPassword")}
                            id="confirmPassword"
                            type="password"
                            className={`w-full rounded-full border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-900/6'} bg-white/95 pl-10 pr-[1.1rem] py-[0.7rem] text-base text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]`}
                            placeholder="Nhập lại mật khẩu"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1 pl-3">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-600">
                        <input
                            {...register("agreeToTerms")}
                            type="checkbox"
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
                {errors.agreeToTerms && (
                    <p className="text-xs text-red-500 mt-1">{errors.agreeToTerms.message}</p>
                )}


                <div className="pt-1 space-y-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full border-none px-[1.1rem] py-[0.8rem] text-sm font-semibold text-slate-50 inline-flex items-center justify-center gap-1.5 cursor-pointer bg-linear-to-br from-accent to-accent-dark shadow-[0_16px_35px_rgba(82,110,160,0.38)] transition-all duration-300 ease-out enabled:hover:-translate-y-[1.5px] enabled:hover:shadow-[0_22px_55px_rgba(82,110,160,0.4)] enabled:hover:brightness-[1.02] enabled:active:translate-y-0 enabled:active:scale-[0.99] enabled:active:shadow-[0_10px_30px_rgba(82,110,160,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? 'Đang đăng ký...' : 'Tạo tài khoản'}
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
