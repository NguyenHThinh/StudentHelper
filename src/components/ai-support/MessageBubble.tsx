export interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    return (
        <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[85%] gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${message.role === "user"
                        ? "bg-linear-to-br from-primary to-primary-dark"
                        : "bg-linear-to-br from-accent to-accent-dark"
                        }`}
                >
                    {message.role === "user" ? (
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    ) : (
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    )}
                </div>

                {/* Message Bubble */}
                <div
                    className={`rounded-2xl px-5 py-3.5 ${message.role === "user"
                        ? "bg-linear-to-br from-primary to-primary-dark text-white"
                        : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                        }`}
                >
                    <p className={`text-sm leading-relaxed whitespace-pre-line ${message.role === "user" ? "text-white" : "text-slate-700"}`}>
                        {message.content}
                    </p>
                    <span className={`mt-2 block text-xs ${message.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                        {message.timestamp.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}
