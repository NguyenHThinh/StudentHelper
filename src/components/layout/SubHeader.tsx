import Link from "next/link";

interface SubHeaderProps {
    showOnlineStatus?: boolean;
}

export default function SubHeader({ showOnlineStatus = false }: SubHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-sm">
            <nav className="mx-auto max-w-7xl px-6 py-4 sm:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-lg transition-transform group-hover:scale-110">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="font-poppins text-xl font-bold text-primary">Student Helper</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        {showOnlineStatus && (
                            <div className="hidden sm:flex items-center gap-2 rounded-full bg-highlight/10 px-3 py-1.5 text-sm font-medium text-highlight">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-highlight"></span>
                                </span>
                                Online 24/7
                            </div>
                        )}
                        <Link
                            href="/"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100"
                        >
                            ← Trang chủ
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
