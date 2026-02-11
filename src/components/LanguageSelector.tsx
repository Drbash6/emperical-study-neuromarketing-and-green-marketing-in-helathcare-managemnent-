"use client";

import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";

export default function LanguageSelector() {
  const { lang, setLang } = useI18n();

  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-blue-950 to-blue-900 border-2 border-amber-400 p-4 shadow-md">
      <p className="text-center text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
        🌐 Choose your language · اختر لغتك · Sprache wählen
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code as Lang)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-bold border-2 transition-all duration-200
              ${
                lang === l.code
                  ? "border-amber-400 bg-amber-500 text-blue-950 shadow-lg scale-105 ring-2 ring-amber-300"
                  : "border-blue-700 bg-blue-950 text-white hover:bg-blue-900 hover:border-amber-400 hover:shadow-md"
              }`}
          >
            <span className="text-xl">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
