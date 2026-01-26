export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 max-[900px]:p-5">
      <main className="w-full max-w-[980px] rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.14)] border border-slate-900/5 grid grid-cols-[1.05fr_1fr] overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out hover:shadow-[0_32px_80px_rgba(15,23,42,0.16)] hover:border-slate-900/6 max-[900px]:grid-cols-1 max-[900px]:max-w-[520px] bg-linear-to-br from-white/98 to-secondary/96">
        <section className="p-10 text-slate-100 relative overflow-hidden bg-linear-to-br from-primary-dark to-primary max-[900px]:hidden">
          <div className="absolute w-[180px] h-[180px] rounded-full bg-accent blur-2xl opacity-23 -top-10 -right-10" />
          <div className="absolute w-[210px] h-[210px] rounded-full bg-highlight blur-2xl opacity-23 -bottom-10 -left-10" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-slate-200/10 border border-slate-200/20 text-xs uppercase tracking-wider text-slate-100/90">
              <span className="w-2 h-2 rounded-full bg-highlight shadow-[0_0_0_5px_rgba(127,182,133,0.26)]" />
              <span>Đáng tin · Bảo mật · Tối giản</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-semibold leading-tight text-slate-50">
                Student Helper
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-slate-200/85">
                Không gian đăng nhập nhẹ nhàng, tập trung và tạo cảm giác an tâm.
              </p>
            </div>
          </div>
        </section>

        <section className="p-10 bg-linear-to-br from-white/96 to-secondary/98 max-[900px]:p-7 max-[900px]:px-6">
          {children}
        </section>
      </main>
    </div>
  );
}

