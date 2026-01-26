import Header from "@/components/layout/Header";
import ChatContainer from "@/components/ai-support/ChatContainer";

export default function AISupportPage() {
    return (
        <div className="flex h-screen flex-col bg-secondary font-sans">
            {/* Header */}
            <Header />

            {/* Chat Container */}
            <ChatContainer />
        </div>
    );
}
