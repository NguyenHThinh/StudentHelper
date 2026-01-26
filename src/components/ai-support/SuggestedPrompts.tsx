interface SuggestedPromptsProps {
    prompts: string[];
    onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
    return (
        <div className="border-t border-slate-200/50 bg-white/50 px-4 py-4 backdrop-blur-sm sm:px-6">
            <div className="mx-auto max-w-3xl">
                <p className="mb-3 text-sm font-medium text-slate-600">Gợi ý cho bạn:</p>
                <div className="flex flex-wrap gap-2">
                    {prompts.map((prompt, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(prompt)}
                            className="rounded-full border border-accent/30 bg-white px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent hover:bg-accent/5 hover:shadow-md"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
