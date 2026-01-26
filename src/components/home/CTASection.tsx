import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-primary-dark to-accent p-12 sm:p-16 text-center text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-highlight/20 rounded-full blur-2xl"></div>

                    <div className="relative">
                        <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
                            Sẵn sàng bắt đầu?
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                            Chỉ cần một click, bạn đã có thể bắt đầu hành trình vượt qua khó khăn với sự hỗ trợ của chúng tôi.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-2xl hover:bg-slate-100 transition-colors shadow-lg"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Đăng ký ngay
                            </Link>
                            <Link
                                href="/ai-support"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Hoặc chat thử với AI
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
