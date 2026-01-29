import Link from "next/link";
import { RefObject } from "react";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isTyping: boolean;
    inputRef: RefObject<HTMLInputElement | null>;
}

export default function ChatInput({ value, onChange, onSubmit, isTyping, inputRef }: ChatInputProps) {
    return (
        <div className="border-t border-slate-200/50 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6">
            <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
                <div className="flex gap-3">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Nhập tin nhắn của bạn..."
                        className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={!value.trim() || isTyping}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-dark text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
                <p className="mt-2 text-center text-xs text-slate-500">
                    AI hỗ trợ mang tính tham khảo. Nếu cần hỗ trợ chuyên sâu, hãy{" "}
                    <Link href="/support" className="text-accent hover:underline">
                        liên hệ chuyên gia
                    </Link>
                    .
                </p>
            </form>
        </div>
    );
}
