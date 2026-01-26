import Image from "next/image";

const struggles = [
    "Khó theo kịp bài giảng và cảm thấy bị bỏ lại phía sau",
    "Áp lực từ điểm số và kỳ vọng của gia đình",
    "Môi trường đại học khác xa so với cấp 3",
    "Không biết tìm ai để chia sẻ và được lắng nghe",
    "Cảm giác cô đơn dù xung quanh có nhiều người",
];

export default function UnderstandingSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <span className="inline-block px-4 py-1.5 bg-highlight/10 text-highlight text-sm font-medium rounded-full mb-6">
                            Chúng tôi hiểu bạn
                        </span>
                        <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-primary mb-6">
                            Bạn có đang cảm thấy những điều này?
                        </h2>

                        <div className="space-y-4">
                            {struggles.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-highlight/20 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-accent/5 to-highlight/5 rounded-2xl border border-accent/10">
                            <p className="text-lg font-medium text-accent-dark">
                                💪 Hãy nhớ: Tìm kiếm sự giúp đỡ là dấu hiệu của sự mạnh mẽ, không phải yếu đuối.
                            </p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 to-accent/10 rounded-[3rem] rotate-3 scale-95"></div>
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white">
                            <Image
                                src="/assets/support.png"
                                alt="Tư vấn hỗ trợ"
                                width={600}
                                height={500}
                                className="w-full h-auto object-cover bg-amber-50/50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
