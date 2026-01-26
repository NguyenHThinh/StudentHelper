export interface Question {
    id: number;
    question: string;
    options: string[];
}

interface QuizCardProps {
    questions: Question[];
    currentQuestion: number;
    progress: number;
    onAnswer: (index: number) => void;
}

export default function QuizCard({ questions, currentQuestion, progress, onAnswer }: QuizCardProps) {
    return (
        <div className="rounded-3xl bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-md sm:p-10">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Câu hỏi {currentQuestion + 1}/{questions.length}</span>
                    <span className="font-semibold text-accent">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-highlight transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Question */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-primary sm:text-2xl">
                    {questions[currentQuestion].question}
                </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        className="group w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-slate-50 text-sm font-semibold text-slate-500 transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span className="font-medium text-slate-700 group-hover:text-primary">
                                {option}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
