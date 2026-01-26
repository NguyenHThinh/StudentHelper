import Link from "next/link";

interface AuthTabsProps {
    activeTab: "login" | "register";
}

export default function AuthTabs({ activeTab }: AuthTabsProps) {
    return (
        <div className="w-full flex rounded-full border border-slate-400/50 bg-slate-900/3 p-0.5">
            <Link
                href="/login"
                aria-current={activeTab === "login" ? "page" : undefined}
                className={`flex-1 flex items-center justify-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ease-out 
          ${activeTab === "login"
                        ? "text-slate-900 bg-white/96 shadow-[0_12px_30px_rgba(15,23,42,0.16)] -translate-y-px"
                        : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
                    }`}
            >
                {activeTab === "login" ? (
                    <span className="w-2 h-2 rounded-full bg-highlight shadow-[0_0_0_4px_rgba(127,182,133,0.28)]" />
                ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent ring-1 ring-slate-400/40" />
                )}
                <span>Đăng nhập</span>
            </Link>
            <Link
                href="/register"
                aria-current={activeTab === "register" ? "page" : undefined}
                className={`flex-1 flex items-center justify-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ease-out
          ${activeTab === "register"
                        ? "text-slate-900 bg-white/96 shadow-[0_12px_30px_rgba(15,23,42,0.16)] -translate-y-px"
                        : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
                    }`}
            >
                {activeTab === "register" ? (
                    <span className="w-2 h-2 rounded-full bg-highlight shadow-[0_0_0_4px_rgba(127,182,133,0.28)]" />
                ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent ring-1 ring-slate-400/40" />
                )}
                <span>Đăng ký</span>
            </Link>
        </div>
    );
}
