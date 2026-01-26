import Header from "@/components/layout/Header";
import SupportChannels from "@/components/support/SupportChannels";
import FAQSection from "@/components/support/FAQSection";
import ContactForm from "@/components/support/ContactForm";

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-secondary font-sans">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="relative overflow-hidden px-6 py-12 pt-24 sm:px-16 sm:py-16 lg:pt-26 lg:pb-32">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-highlight/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Luôn sẵn sàng hỗ trợ
                        </div>
                        <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                            Liên hệ hỗ trợ
                        </h1>
                        <p className="mt-3 max-w-xl mx-auto text-slate-600">
                            Đừng ngại tìm kiếm sự giúp đỡ. Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
                        </p>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-2">
                        {/* Left Column - Support Channels */}
                        <div>
                            <SupportChannels />
                            <FAQSection />
                        </div>

                        {/* Right Column - Contact Form */}
                        <ContactForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
