"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { href: "/timetable", label: "Thời khóa biểu" },
    { href: "/self-check", label: "Kiểm tra bản thân" },
    { href: "/support", label: "Liên hệ hỗ trợ" },
    { href: "/ai-support", label: "Chat AI" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20">
            <nav className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent to-highlight rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-lg">
                                <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-dark bg-clip-text text-transparent">
                                Student Helper
                            </span>
                            <p className="text-[10px] text-slate-500 font-medium tracking-wide">Đồng hành cùng bạn</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-accent group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-highlight transition-all group-hover:w-3/4 group-hover:left-[12%]"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href="/login"
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-accent transition-colors"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            href="/register"
                            className="group relative px-6 py-2.5 text-sm font-semibold text-white overflow-hidden rounded-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-dark to-accent bg-[length:200%_100%] animate-gradient"></div>
                            <span className="relative">Đăng ký miễn phí</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 md:hidden transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mt-4 pb-4 space-y-2 md:hidden animate-fadeIn">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent/10 hover:text-accent transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex gap-3 pt-3 border-t border-slate-200/50">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-2.5 text-center text-sm font-medium text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-50">
                                Đăng nhập
                            </Link>
                            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent-dark rounded-xl">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
