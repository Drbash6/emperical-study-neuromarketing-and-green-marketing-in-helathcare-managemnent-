"use client";

import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";

export default function LanguageSelector() {
  const { lang, setLang } = useI18n();

  return (
    <div className="w-full rounded-xl bg-gradient-to-r from-green-50 via-teal-50 to-blue-50 border-2 border-teal-300 p-4 shadow-md">
      <p className="text-center text-xs font-semibold text-teal-700 uppercase tracking-widest mb-3">
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
                  ? "border-teal-600 bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105 ring-2 ring-teal-300"
                  : "border-teal-300 bg-white text-teal-800 hover:bg-teal-50 hover:border-teal-500 hover:shadow-md"
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
