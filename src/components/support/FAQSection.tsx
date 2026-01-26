"use client";

import { useState } from "react";

const faqs = [
    {
        question: "Làm sao để biết mình có cần hỗ trợ không?",
        answer: "Nếu bạn cảm thấy khó khăn trong học tập, áp lực về điểm số, hoặc cảm thấy cô đơn, hãy thử làm bài kiểm tra bản thân của chúng tôi để đánh giá tình trạng hiện tại.",
    },
    {
        question: "Thông tin của tôi có được bảo mật không?",
        answer: "Hoàn toàn bảo mật. Tất cả thông tin bạn chia sẻ sẽ được giữ kín và chỉ được sử dụng để hỗ trợ bạn tốt hơn.",
    },
    {
        question: "Tôi có thể liên hệ ngoài giờ hành chính không?",
        answer: "Có! Tổng đài tâm lý hoạt động 24/7 và bạn cũng có thể chat với AI bất cứ lúc nào.",
    },
];

export default function FAQSection() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    return (
        <div className="mt-8">
            <h2 className="mb-4 font-poppins text-xl font-semibold text-primary">
                Câu hỏi thường gặp
            </h2>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="rounded-xl bg-white/80 backdrop-blur-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-slate-50 transition-colors"
                        >
                            <span className="font-medium text-primary">{faq.question}</span>
                            <svg
                                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${expandedFaq === index ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? "max-h-40" : "max-h-0"
                                }`}
                        >
                            <p className="px-4 pb-4 text-sm text-slate-600">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
