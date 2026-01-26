import Image from "next/image";
import Link from "next/link";

export default function FeaturesSection() {
    return (
        <section className="py-24 px-6 bg-white/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent-dark text-sm font-medium rounded-full mb-4">
                        Tính năng nổi bật
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                        Chúng tôi hỗ trợ bạn như thế nào?
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Các công cụ được thiết kế đặc biệt để giúp bạn vượt qua khó khăn một cách hiệu quả
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <Link href="/self-check" className="group">
                        <div className="relative h-full p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-highlight/10 to-transparent rounded-bl-[100px]"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-highlight/20 to-highlight/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="h-8 w-8 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-primary mb-3">Kiểm tra bản thân</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Bài đánh giá nhanh giúp bạn nhận biết tình trạng học tập hiện tại và mức độ cần hỗ trợ.
                                </p>
                                <div className="flex items-center gap-2 text-highlight font-medium group-hover:gap-3 transition-all">
                                    <span>Bắt đầu ngay</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Feature 2 */}
                    <Link href="/support" className="group">
                        <div className="relative h-full p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-[100px]"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Image src="/assets/support.png" alt="Hỗ trợ" width={40} height={40} className="rounded-lg" />
                                </div>
                                <h3 className="text-xl font-semibold text-primary mb-3">Liên hệ hỗ trợ</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Kết nối với chuyên gia tư vấn, cố vấn học tập và các nguồn hỗ trợ chính thức.
                                </p>
                                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                                    <span>Xem thêm</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Feature 3 - Highlighted */}
                    <Link href="/ai-support" className="group">
                        <div className="relative h-full p-8 bg-gradient-to-br from-accent to-accent-dark rounded-3xl shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-2 transition-all duration-300 text-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight/20 rounded-full blur-xl"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Image src="/assets/ai-chat.png" alt="AI Chat" width={40} height={40} className="rounded-lg" />
                                    </div>
                                    <span className="px-3 py-1 bg-white/20 text-xs font-semibold rounded-full backdrop-blur-sm">
                                        Phổ biến nhất
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Chat với AI</h3>
                                <p className="text-white/90 mb-6 leading-relaxed">
                                    Trò chuyện với AI để nhận lời khuyên tức thì, 24/7, hoàn toàn bảo mật và miễn phí.
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full font-medium group-hover:bg-white/30 group-hover:gap-3 transition-all backdrop-blur-sm">
                                    <span>Thử ngay</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
