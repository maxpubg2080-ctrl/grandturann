"use client";

import { useState, type FormEvent } from "react";
import Preferences, { type AccentColor, type ThemeMode } from "./preferences";
import type { Language } from "@/lib/i18n";

export default function LoginScreen({
  onLogin,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  accent,
  onAccentChange,
}: {
  onLogin: (password: string) => Promise<void>;
  language: Language;
  onLanguageChange: (value: Language) => void;
  theme: ThemeMode;
  onThemeChange: (value: ThemeMode) => void;
  accent: AccentColor;
  onAccentChange: (value: AccentColor) => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onLogin(password);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Parolni tekshirib bo‘lmadi.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="gt-login-page grid min-h-screen place-items-center bg-[#f5f6f8] px-4 py-12">
      <div className="fixed right-4 top-4 z-10"><Preferences language={language} onLanguageChange={onLanguageChange} theme={theme} onThemeChange={onThemeChange} accent={accent} onAccentChange={onAccentChange} /></div>
      <section className="w-full max-w-[410px] rounded-[28px] border border-[#e6ebe8] bg-white p-7 shadow-[0_20px_70px_rgba(19,58,42,0.09)] sm:p-9">
        <div className="flex items-center gap-3">
          <div className="gt-brand-mark relative grid h-11 w-11 place-items-center rounded-[15px] text-white shadow-sm"><span className="text-[14px] font-black tracking-[-0.08em]">GT</span><span className="gt-brand-star absolute -right-1 -top-1 h-3 w-3 rounded-full" /></div>
          <div><div className="text-lg font-extrabold tracking-[-0.055em] text-[#173b33]">Grand<span className="text-[#c78d43]">Turan</span></div><div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9aa6a0]">SMART TELEGRAM STUDIO</div></div>
        </div>
        <div className="mt-9 grid h-11 w-11 place-items-center rounded-2xl bg-[#eff6f1] text-[#39745d]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2" /></svg></div>
        <h1 className="mt-4 text-[23px] font-bold tracking-[-0.04em] text-[#26342f]">Boshqaruv paneli</h1>
        <p className="mt-1.5 text-xs leading-5 text-[#839089]">Davom etish uchun admin parolingizni kiriting.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block"><span className="mb-1.5 block text-[11px] font-semibold text-[#56635d]">Admin parol</span><input autoFocus type="password" required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="form-control" placeholder="Parolingiz" /></label>
          {error ? <div role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-xs leading-5 text-rose-700">{error}</div> : null}
          <button disabled={busy || !password} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#155b50] px-4 text-sm font-semibold text-white transition hover:bg-[#104a41] disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Tekshirilmoqda…" : "Xavfsiz kirish →"}</button>
        </form>
        <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#f7f9f8] p-3 text-[10px] leading-5 text-[#89948e]"><svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /></svg>Parol faqat serverda tekshiriladi. Kirish sessiyasi xavfsiz, HttpOnly cookie orqali saqlanadi.</div>
      </section>
    </main>
  );
}
