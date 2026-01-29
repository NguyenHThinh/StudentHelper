import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-linear-to-br from-accent/20 to-highlight/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-highlight/15 to-accent/15 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-highlight"></span>
                            </span>
                            <span className="text-sm font-medium text-accent-dark">Hỗ trợ sinh viên 24/7</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-primary">Bạn không </span>
                            <span className="relative">
                                <span className="bg-linear-to-r from-accent via-accent-dark to-highlight bg-clip-text text-transparent">
                                    đơn độc
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                    <path d="M2 10C50 2 150 2 198 10" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                                            <stop stopColor="#6C8EBF" />
                                            <stop offset="1" stopColor="#7FB685" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            <br />
                            <span className="text-primary">trong hành trình học tập</span>
                        </h1>

                        <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                            <span className="font-semibold text-accent-dark">&quot;Học thụ động thầm lặng&quot;</span> là khi bạn gặp khó khăn nhưng không biết chia sẻ với ai.
                            Chúng tôi ở đây để lắng nghe và đồng hành cùng bạn.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/ai-support"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-accent to-accent-dark text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Chat với AI ngay
                                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
                                    <span className="relative inline-flex h-4 w-4 rounded-full bg-highlight text-[8px] text-white font-bold items-center justify-center">AI</span>
                                </span>
                            </Link>
                            <Link
                                href="/self-check"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-dark font-semibold rounded-2xl border-2 border-accent/20 hover:border-accent/40 hover:bg-accent/5 transition-all"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                Kiểm tra bản thân
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <div className="text-3xl font-bold bg-linear-to-r from-accent to-accent-dark bg-clip-text text-transparent">68%</div>
                                <p className="text-sm text-slate-500">Sinh viên năm nhất gặp khó khăn</p>
                            </div>
                            <div className="w-px h-12 bg-slate-200"></div>
                            <div>
                                <div className="text-3xl font-bold bg-linear-to-r from-highlight to-accent bg-clip-text text-transparent">24/7</div>
                                <p className="text-sm text-slate-500">Hỗ trợ không giới hạn</p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Hero Image */}
                    <div className="relative lg:pl-8">
                        <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-highlight/10 rounded-[3rem] -rotate-6 scale-95"></div>
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white">
                            <Image
                                src="/assets/hero.png"
                                alt="Sinh viên học tập cùng nhau"
                                width={600}
                                height={500}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                        {/* Floating cards */}
                        <div className="absolute -left-4 top-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-slate-900/10 animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-highlight/20 rounded-xl flex items-center justify-center">
                                    <svg className="h-5 w-5 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-primary">Miễn phí 100%</p>
                                    <p className="text-xs text-slate-500">Không giới hạn</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-slate-900/10 animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                                    <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-primary">Bảo mật tuyệt đối</p>
                                    <p className="text-xs text-slate-500">An tâm chia sẻ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
