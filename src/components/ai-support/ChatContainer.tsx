"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble, { Message } from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";
import ChatInput from "./ChatInput";
import aiService, { ChatHistoryEntry } from "@/services/ai";

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

export default function ChatContainer() {
    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoadingHistory(true);
            const response = await aiService.getHistory();
            if (response.success && response.data?.history) {
                const historyMessages: Message[] = [];
                const reversedHistory = [...response.data.history].reverse();

                reversedHistory.forEach((entry: ChatHistoryEntry, index) => {
                    historyMessages.push({
                        id: index * 2 + 1,
                        role: "user",
                        content: entry.prompt,
                        timestamp: new Date(entry.createdAt)
                    });
                    historyMessages.push({
                        id: index * 2 + 2,
                        role: "assistant",
                        content: entry.response,
                        timestamp: new Date(entry.createdAt)
                    });
                });

                if (historyMessages.length > 0) {
                    setMessages([welcomeMessage, ...historyMessages]);
                }
            }
            setLoadingHistory(false);
        };

        fetchHistory();
    }, []);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            role: "user",
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        const response = await aiService.chat(content);

        setIsTyping(false);

        let aiContent = "Xin lỗi, mình đang gặp sự cố kết nối. Vui lòng thử lại sau.";

        if (response.success) {
            aiContent = response.data.response;
        } else {
            console.error("Chat error:", response.message);
        }

        const aiResponse: Message = {
            id: messages.length + 2,
            role: "assistant",
            content: aiContent,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleSuggestedPrompt = (prompt: string) => {
        sendMessage(prompt);
    };

    const handleResetThread = async () => {
        if (!confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử và bắt đầu cuộc trò chuyện mới?")) {
            return;
        }

        const response = await aiService.deleteHistory();
        if (response.success) {
            setMessages([welcomeMessage]);
        } else {
            alert("Không thể xóa lịch sử chat. Vui lòng thử lại sau.");
        }
    };

    const isLimitReached = messages.length - 1 >= 15;

    return (
        <div className="flex flex-1 flex-col pt-20 lg:pt-26 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    {loadingHistory && (
                        <div className="text-center text-slate-500 text-sm py-4">Đang tải lịch sử trò chuyện...</div>
                    )}

                    {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-dark">
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
            {messages.length <= 1 && !loadingHistory && (
                <SuggestedPrompts prompts={suggestedPrompts} onSelect={handleSuggestedPrompt} />
            )}

            {/* Input Area */}
            <div className="relative">
                {isLimitReached && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm p-4 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900">Giới hạn thread đã đạt 15 tin nhắn</h4>
                        <p className="mt-1 text-xs text-slate-500">Để đảm bảo trải nghiệm tốt nhất, vui lòng làm mới cuộc trò chuyện.</p>
                        <button
                            onClick={handleResetThread}
                            className="mt-4 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-dark hover:shadow-lg"
                        >
                            Làm mới cuộc trò chuyện
                        </button>
                    </div>
                )}
                <ChatInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleSubmit}
                    isTyping={isTyping}
                    inputRef={inputRef}
                />
            </div>
        </div>
    );
}
