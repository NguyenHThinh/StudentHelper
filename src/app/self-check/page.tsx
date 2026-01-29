"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/layout/Header";
import QuizCard, { Question } from "@/components/self-check/QuizCard";
import ResultCard, { ResultData } from "@/components/self-check/ResultCard";

const questions: Question[] = [
  {
    id: 1,
    question: "Bạn có thường xuyên cảm thấy khó theo kịp bài giảng trên lớp không?",
    options: ["Không bao giờ", "Thỉnh thoảng", "Khá thường xuyên", "Luôn luôn"],
  },
  {
    id: 2,
    question: "Bạn có cảm thấy áp lực về điểm số và thành tích học tập không?",
    options: ["Không hề", "Một chút", "Khá nhiều", "Rất nhiều"],
  },
  {
    id: 3,
    question: "Bạn có chia sẻ khó khăn học tập với ai không?",
    options: ["Thường xuyên chia sẻ", "Đôi khi", "Hiếm khi", "Không bao giờ"],
  },
  {
    id: 4,
    question: "Bạn có biết cách tìm kiếm sự giúp đỡ khi gặp khó khăn không?",
    options: ["Rất rõ ràng", "Có biết một chút", "Không chắc chắn", "Hoàn toàn không biết"],
  },
  {
    id: 5,
    question: "Bạn có cảm thấy cô đơn trong việc học không?",
    options: ["Không bao giờ", "Thỉnh thoảng", "Khá thường xuyên", "Luôn luôn"],
  },
  {
    id: 6,
    question: "Bạn có thấy phương pháp học ở đại học khác biệt so với cấp 3 không?",
    options: ["Không khác biệt", "Hơi khác", "Khá khác", "Rất khác và khó thích nghi"],
  },
];

function getResult(score: number): ResultData {
  const maxScore = questions.length * 3;
  const percentage = (score / maxScore) * 100;

  if (percentage <= 25) {
    return {
      level: "good",
      title: "Tuyệt vời! 🌟",
      description: "Bạn đang có trạng thái học tập rất tốt.",
      suggestion: "Hãy tiếp tục duy trì và đừng ngại chia sẻ kinh nghiệm với bạn bè.",
      color: "text-highlight",
      bgGradient: "from-highlight/20 to-highlight/5",
    };
  } else if (percentage <= 50) {
    return {
      level: "moderate",
      title: "Khá ổn 👍",
      description: "Bạn có một số khó khăn nhỏ nhưng nhìn chung vẫn ổn.",
      suggestion: "Hãy chủ động tìm kiếm thêm sự hỗ trợ khi cần thiết.",
      color: "text-accent",
      bgGradient: "from-accent/20 to-accent/5",
    };
  } else if (percentage <= 75) {
    return {
      level: "concerning",
      title: "Cần quan tâm 💙",
      description: "Bạn đang gặp một số khó khăn đáng kể trong học tập.",
      suggestion: "Hãy tìm đến sự hỗ trợ từ thầy cô, bạn bè hoặc trung tâm tư vấn.",
      color: "text-amber-600",
      bgGradient: "from-amber-500/20 to-amber-500/5",
    };
  } else {
    return {
      level: "urgent",
      title: "Cần hỗ trợ ngay 💪",
      description: "Bạn đang trải qua nhiều khó khăn. Đừng lo, bạn không đơn độc!",
      suggestion: "Hãy liên hệ ngay với bộ phận hỗ trợ sinh viên hoặc chat với AI của chúng tôi.",
      color: "text-rose-600",
      bgGradient: "from-rose-500/20 to-rose-500/5",
    };
  }
}

export default function SelfCheckPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  const result = getResult(totalScore);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-secondary font-sans">
      {/* Header */}
      <Header />
      

      {/* Main Content */}
      <main className="relative overflow-hidden px-6 py-12 pt-24 lg:py-26 sm:px-16 sm:py-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-highlight/15 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-highlight/10 px-4 py-2 text-sm font-medium text-highlight">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Bài kiểm tra tự đánh giá
            </div>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">
              Kiểm tra bản thân
            </h1>
            <p className="mt-3 text-slate-600">
              Trả lời {questions.length} câu hỏi để đánh giá tình trạng học tập hiện tại
            </p>
          </div>

          {!showResult ? (
            <QuizCard
              questions={questions}
              currentQuestion={currentQuestion}
              progress={progress}
              onAnswer={handleAnswer}
            />
          ) : (
            <ResultCard
              result={result}
              answers={answers}
              totalQuestions={questions.length}
              onRestart={restartQuiz}
            />
          )}

          {/* Additional Info */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Kết quả chỉ mang tính tham khảo. Nếu bạn cần hỗ trợ chuyên sâu, hãy{" "}
              <Link href="/support" className="font-medium text-accent hover:underline">
                liên hệ với chúng tôi
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
