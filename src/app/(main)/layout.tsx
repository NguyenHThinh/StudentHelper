import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import dynamic from "next/dynamic";



export const metadata: Metadata = {
  title: "Student Helper - Học thụ động thầm lặng | Silent Academic Struggle",
  description: "Hỗ trợ sinh viên năm nhất vượt qua khó khăn học tập thầm lặng. Kiểm tra bản thân, tìm kiếm hỗ trợ và trò chuyện với AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
