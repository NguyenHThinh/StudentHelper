import Link from "next/link";

export interface ResultData {
    level: "good" | "moderate" | "concerning" | "urgent";
    title: string;
    description: string;
    suggestion: string;
    color: string;
    bgGradient: string;
}

interface ResultCardProps {
    result: ResultData;
    answers: number[];
    totalQuestions: number;
    onRestart: () => void;
}

export default function ResultCard({ result, answers, totalQuestions, onRestart }: ResultCardProps) {
    return (
        <div className={`rounded-3xl bg-gradient-to-br ${result.bgGradient} p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-md sm:p-10`}>
            <div className="text-center">
                <div className="mb-6">
                    <h2 className={`font-poppins text-3xl font-bold ${result.color} sm:text-4xl`}>
                        {result.title}
                    </h2>
                </div>

                <div className="mb-8 rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
                    <p className="mb-4 text-lg font-medium text-slate-700">
                        {result.description}
                    </p>
                    <p className="text-slate-600">
                        {result.suggestion}
                    </p>
                </div>

                {/* Score visualization */}
                <div className="mb-8 flex items-center justify-center gap-1">
                    {Array.from({ length: totalQuestions }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-3 w-12 rounded-full transition-all ${answers[i] === 0
                                    ? "bg-highlight"
                                    : answers[i] === 1
                                        ? "bg-accent"
                                        : answers[i] === 2
                                            ? "bg-amber-400"
                                            : "bg-rose-400"
                                }`}
                        ></div>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={onRestart}
                        className="rounded-full border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                    >
                        Làm lại bài kiểm tra
                    </button>
                    {result.level === "concerning" || result.level === "urgent" ? (
                        <Link
                            href="/ai-support"
                            className="rounded-full bg-gradient-to-r from-accent to-accent-dark px-6 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Chat với AI ngay
                        </Link>
                    ) : (
                        <Link
                            href="/support"
                            className="rounded-full bg-gradient-to-r from-accent to-accent-dark px-6 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Xem thêm hỗ trợ
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
