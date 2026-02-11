"use client";

import { useI18n, LANGUAGES, type Lang } from "@/lib/i18n";

export default function LanguageSelector() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1.5">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as Lang)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all
            ${
              lang === l.code
                ? "border-green-600 bg-green-50 text-green-800 shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:border-green-400"
            }`}
        >
          <span className="mr-1">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}
