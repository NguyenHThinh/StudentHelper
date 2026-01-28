"use client";

import { useState } from "react";
import Link from "next/link";
import AuthTabs from "./AuthTabs";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(true);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setServerError(null);
        const response = await authService.login(data.email, data.password);
        if (response.message === 'Logged in successfully' || response.access_token || response.accessToken) {
            // The API response changed in BE? No, it returns { message: 'Logged in successfully' } on success.
            // But verifyToken sets cookie.
            // The existing authService returns response.json().
            // Ideally we check success flag if present, or status.
            // But existing code checked response.success. authService catches error and returns { success: false }. 
            // The new BE controller returns { message: ... } on success (200). It doesn't return unnecessary fields.
            // But authService login returns response.json().
            // Wait, fetch resolves to Response object. response.json() resolves to body.
            // Ideally authService should return the parsed body.
            // If response is not ok, message should be in body.
            // Let's check authService again. It returns response.json().
            // A 200 OK response has body { message: 'Logged in successfully' }.
            // A 401 response has body { message: 'Invalid credentials' }.
            // So we need to check if response contains success/failure indicator.
            // The authService wrapper catches network errors but API errors pass through as JSON.
            // So we check for 'message' content or if checks pass.
            // Better yet, update authService to return standardized response?
            // The existing code checked `response.success`. New BE code doesn't return `success: true`.
            // I should update BE to return `success: true`? Or update FE to check `message`.
            // User asked to "Add try catch", not rewrite API response format.
            // Existing BE code: `res.status(200).json({ message: 'Logged in successfully' });`
            // So `response.success` was prob undefined before?
            // Wait, `auth.service.ts` catches ONLY network errors.
            // The return creates `{ success: false, ...}`.
            // If API returns `{ message: ... }`, then `response.success` is undefined.
            // So `if (response.success)` fails.
            // This suggests the Original FE code was broken or expecting something else.
            // I should fix the FE to check correctly.
            // Or fix BE to return standard format.
            // Let's fix FE to check for success message or absence of error.
            if (response.message === 'Logged in successfully') {
                router.push('/');
            } else {
                setServerError(response.message || 'Đăng nhập thất bại');
            }
        } else {
            // Handle case where authService catches network error
            if (response.success === false) {
                setServerError(response.message);
            } else {
                // Fallback
                if (response.message === 'Logged in successfully') {
                    router.push('/');
                } else {
                    setServerError(response.message || 'Đăng nhập thất bại');
                }
            }
        }
    };

    return (
        <div className="min-h-[560px] flex flex-col gap-5 max-[900px]:min-h-0 max-[900px]:gap-4">
            <div className="space-y-4">
                <AuthTabs activeTab="login" />

                <div className="space-y-1.5">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-primary">
                        Chào mừng bạn trở lại
                    </h2>
                    <p className="text-sm text-slate-500 max-w-md">
                        Đăng nhập để tiếp tục sử dụng Student Helper.
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
                            className={`w-full rounded-full border ${errors.email ? 'border-red-500' : 'border-slate-900/6'} bg-white/95 pl-10 pr-[1.1rem] py-[0.7rem] text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]`}
                            placeholder="Nhập email"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1 pl-3">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1.5 relative">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Mật khẩu
                        </label>
                        <button
                            type="button"
                            className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            Quên mật khẩu?
                        </button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            className={`w-full rounded-full border ${errors.password ? 'border-red-500' : 'border-slate-900/6'} bg-white/95 pl-10 pr-[1.1rem] py-[0.7rem] text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 ease-out focus:-translate-y-px focus:border-accent/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/25 focus:shadow-[0_0_0_1px_rgba(108,142,191,0.5),0_18px_40px_rgba(15,23,42,0.14)]`}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1 pl-3">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-600">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-3.5 w-3.5 rounded border border-slate-300 text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-accent/40"
                        />
                        <span>Ghi nhớ lần đăng nhập này</span>
                    </label>
                </div>

                <div className="pt-1 space-y-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full border-none px-[1.1rem] py-[0.8rem] text-sm font-semibold text-slate-50 inline-flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-br from-accent to-accent-dark shadow-[0_16px_35px_rgba(82,110,160,0.38)] transition-all duration-300 ease-out hover:-translate-y-[1.5px] hover:shadow-[0_22px_55px_rgba(82,110,160,0.4)] hover:brightness-[1.02] active:translate-y-0 active:scale-[0.99] active:shadow-[0_10px_30px_rgba(82,110,160,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </div>
            </form>

            <p className="mt-auto text-xs text-slate-500">
                Chưa có tài khoản?{" "}
                <Link
                    href="/register"
                    className="text-accent font-medium no-underline relative transition-colors duration-300 ease-out hover:text-accent-dark [&:hover::after]:w-full [&::after]:absolute [&::after]:bottom-[-0.12rem] [&::after]:left-0 [&::after]:h-px [&::after]:w-0 [&::after]:bg-accent [&::after]:transition-all [&::after]:duration-300 [&::after]:ease-out"
                >
                    Đăng ký ngay
                </Link>
            </p>
        </div>
    );
}
