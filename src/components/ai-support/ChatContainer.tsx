"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble, { Message } from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";
import ChatInput from "./ChatInput";

const welcomeMessage: Message = {
    id: 0,
    role: "assistant",
    content: "Xin chào! Mình là AI Assistant của Student Helper. Mình ở đây để lắng nghe và hỗ trợ bạn vượt qua những khó khăn trong học tập. Bạn có thể chia sẻ bất cứ điều gì bạn đang lo lắng. 💙",
    timestamp: new Date(),
};

const suggestedPrompts = [
    "Mình cảm thấy áp lực với bài tập",
    "Mình không biết cách quản lý thời gian",
    "Mình cảm thấy cô đơn ở trường",
    "Mình lo lắng về điểm số",
];

// Mock AI responses
const aiResponses: Record<string, string> = {
    default: "Mình hiểu những gì bạn đang trải qua. Điều quan trọng là bạn đã chia sẻ với mình. Bạn có thể kể thêm về tình huống cụ thể không? Mình muốn hiểu rõ hơn để có thể hỗ trợ bạn tốt nhất.",
    "áp lực": "Áp lực học tập là điều rất phổ biến với sinh viên. Đừng lo, có một số cách mình muốn gợi ý cho bạn:\n\n1. **Chia nhỏ công việc**: Thay vì nhìn tổng thể, hãy chia thành các phần nhỏ dễ quản lý hơn.\n\n2. **Nghỉ ngơi hợp lý**: Não cần thời gian để xử lý thông tin. Hãy áp dụng quy tắc Pomodoro: học 25 phút, nghỉ 5 phút.\n\n3. **Đừng ngại nhờ giúp đỡ**: Bạn bè, thầy cô, hoặc trung tâm hỗ trợ sinh viên đều sẵn sàng giúp bạn.\n\nBạn muốn mình đi sâu hơn vào phần nào không?",
    "thời gian": "Quản lý thời gian là một kỹ năng quan trọng! Đây là một số tips:\n\n📅 **Lập kế hoạch hàng tuần**: Dành 15 phút mỗi Chủ nhật để lên kế hoạch cho tuần.\n\n⏰ **Xác định giờ vàng**: Tìm khoảng thời gian bạn tập trung tốt nhất và dành cho các môn khó.\n\n📝 **To-do list**: Viết ra 3 việc quan trọng nhất cần làm mỗi ngày.\n\n🚫 **Giảm xao nhãng**: Tắt thông báo điện thoại khi học.\n\nBạn đang gặp khó khăn cụ thể ở điểm nào nhất?",
    "cô đơn": "Cảm giác cô đơn khi mới vào đại học là điều hoàn toàn bình thường, đặc biệt khi môi trường hoàn toàn mới. Bạn không phải là người duy nhất cảm thấy như vậy.\n\n💡 Một số gợi ý:\n\n• Tham gia các câu lạc bộ theo sở thích\n• Chủ động bắt chuyện với bạn ngồi cạnh\n• Tham gia các nhóm học tập\n• Đừng ngại là người mở lời đầu tiên\n\nBạn đã thử tham gia hoạt động nào chưa? Mình có thể gợi ý thêm nếu bạn muốn.",
    "điểm": "Lo lắng về điểm số là điều dễ hiểu. Tuy nhiên, mình muốn nhắc bạn rằng:\n\n🌟 Điểm số không định nghĩa giá trị của bạn\n📈 Thất bại là bài học, không phải kết thúc\n💪 Nỗ lực quan trọng hơn kết quả\n\nĐể cải thiện điểm, bạn có thể:\n1. Xem lại phương pháp học hiện tại\n2. Tìm hiểu phong cách học phù hợp với mình\n3. Nhờ sự hỗ trợ từ thầy cô hoặc trợ giảng\n\nBạn có muốn chia sẻ cụ thể về môn nào đang gặp khó khăn không?",
};

function getAIResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("áp lực") || lowerMessage.includes("stress") || lowerMessage.includes("bài tập")) {
        return aiResponses["áp lực"];
    }
    if (lowerMessage.includes("thời gian") || lowerMessage.includes("quản lý")) {
        return aiResponses["thời gian"];
    }
    if (lowerMessage.includes("cô đơn") || lowerMessage.includes("một mình") || lowerMessage.includes("bạn bè")) {
        return aiResponses["cô đơn"];
    }
    if (lowerMessage.includes("điểm") || lowerMessage.includes("thi") || lowerMessage.includes("thành tích")) {
        return aiResponses["điểm"];
    }

    return aiResponses["default"];
}

export default function ChatContainer() {
    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: messages.length,
            role: "user",
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI thinking
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const aiResponse: Message = {
            id: messages.length + 1,
            role: "assistant",
            content: getAIResponse(content),
            timestamp: new Date(),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, aiResponse]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleSuggestedPrompt = (prompt: string) => {
        sendMessage(prompt);
    };

    return (
        <div className="flex flex-1 flex-col lg:py-26 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark">
                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                                    <div className="flex gap-1">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }}></span>
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }}></span>
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Suggested Prompts */}
            {messages.length <= 1 && (
                <SuggestedPrompts prompts={suggestedPrompts} onSelect={handleSuggestedPrompt} />
            )}

            {/* Input Area */}
            <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSubmit}
                isTyping={isTyping}
                inputRef={inputRef}
            />
        </div>
    );
}
