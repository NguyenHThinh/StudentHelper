import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
