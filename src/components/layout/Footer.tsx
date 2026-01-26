import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-slate-200/50 bg-white/30">
            <div className="max-w-7xl mx-auto text-center">
                <Link href="/" className="inline-flex items-center gap-2 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="font-poppins text-lg font-bold text-primary">Student Helper</span>
                </Link>
                <p className="text-sm text-slate-500 mb-6">
                    Đồng hành cùng bạn vượt qua khó khăn trong học tập
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
                    <Link href="/self-check" className="hover:text-accent transition-colors">Kiểm tra bản thân</Link>
                    <Link href="/support" className="hover:text-accent transition-colors">Liên hệ hỗ trợ</Link>
                    <Link href="/ai-support" className="hover:text-accent transition-colors">Chat AI</Link>
                </div>
                <p className="mt-8 text-xs text-slate-400">
                    © 2026 Student Helper. Tất cả quyền được bảo lưu.
                </p>
            </div>
        </footer>
    );
}
