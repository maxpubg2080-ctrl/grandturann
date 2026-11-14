"use client";

import type { CSSProperties } from "react";
import type { Language } from "@/lib/i18n";

export type ThemeMode = "light" | "dark";
export type AccentColor = "emerald" | "ocean" | "violet" | "rose" | "amber";

const accents: Array<{ id: AccentColor; label: string; color: string }> = [
  { id: "emerald", label: "Yashil", color: "#16a078" },
  { id: "ocean", label: "Moviy", color: "#3188d8" },
  { id: "violet", label: "Binafsha", color: "#8b65d6" },
  { id: "rose", label: "Atirgul", color: "#d65c83" },
  { id: "amber", label: "Oltin", color: "#bd8733" },
];

export default function Preferences({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  accent,
  onAccentChange,
}: {
  language: Language;
  onLanguageChange: (value: Language) => void;
  theme: ThemeMode;
  onThemeChange: (value: ThemeMode) => void;
  accent: AccentColor;
  onAccentChange: (value: AccentColor) => void;
}) {
  return (
    <div className="gt-preferences" aria-label="GrandTuran ko‘rinish sozlamalari">
      <label className="gt-preference-control">
        <span className="sr-only">Language</span>
        <span aria-hidden="true" className="gt-preference-icon">文</span>
        <select value={language} onChange={(event) => onLanguageChange(event.target.value as Language)} aria-label="Language">
          <option value="uz">O‘zbekcha</option>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="ar">العربية</option>
        </select>
      </label>
      <button
        type="button"
        className="gt-preference-control gt-theme-toggle"
        onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"}
        title={theme === "dark" ? "Yorug‘ rejimga o‘tish" : "Qorong‘i rejimga o‘tish"}
      >
        <span aria-hidden="true" className="gt-preference-icon">{theme === "dark" ? "☾" : "☀"}</span>
      </button>
      <div className="gt-accent-options" role="group" aria-label="Accent color">
        {accents.map((item) => (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            aria-pressed={accent === item.id}
            onClick={() => onAccentChange(item.id)}
            className={`gt-accent-dot ${accent === item.id ? "is-selected" : ""}`}
            style={{ "--swatch": item.color } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
