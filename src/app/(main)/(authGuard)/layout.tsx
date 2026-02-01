"use client";

import Header from "@/components/layout/Header";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

const AuthGuardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthLoading } = useUser();
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    const showLoginPrompt = !isAuthLoading && !user;

    return (
        <>
            {showLoginPrompt && (
                <Modal
                    isOpen={true}
                    onClose={handleLoginRedirect}
                    title="Yêu cầu đăng nhập"
                >
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="p-3 bg-red-100 rounded-full text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1="15" x2="3" y1="12" y2="12" />
                            </svg>
                        </div>
                        <p className="text-center text-slate-600 mb-2">
                            Bạn cần đăng nhập để truy cập vào trang này.
                        </p>
                        <button
                            onClick={handleLoginRedirect}
                            className="w-full rounded-xl bg-linear-to-r from-accent to-accent-dark text-white py-3 font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Đăng nhập ngay
                        </button>
                    </div>
                </Modal>
            )}
            {children}
        </>
    );
};

export default AuthGuardLayout;