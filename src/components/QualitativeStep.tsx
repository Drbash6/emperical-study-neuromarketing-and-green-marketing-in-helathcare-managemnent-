"use client";

import { OPEN_ENDED_QUESTIONS } from "@/lib/survey-data";
import { type SurveyData } from "./SurveyForm";
import { useI18n } from "@/lib/i18n";

interface Props {
  data: SurveyData;
  update: (d: SurveyData) => void;
  onPrev: () => void;
  onSubmit: () => void;
  submitting: boolean;
}

export default function QualitativeStep({
  data,
  update,
  onPrev,
  onSubmit,
  submitting,
}: Props) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {t("oe.title")}
      </h2>
      <p className="text-sm text-green-700 font-medium mb-3">
        {t("oe.subtitle")}
      </p>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-5 text-sm text-gray-700">
        {t("oe.instruction")}
      </div>

      <div className="space-y-6">
        {OPEN_ENDED_QUESTIONS.map((q) => (
          <div
            key={q.code}
            className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <label className="block mb-2">
              <span className="font-bold text-green-700 text-sm">
                {q.code.toUpperCase()} — {t("oe." + q.code + ".label")}
              </span>
              <p className="text-sm text-gray-700 mt-1">{t("oe." + q.code + ".q")}</p>
            </label>
            <textarea
              value={(data[q.code] as string) || ""}
              onChange={(e) => update({ [q.code]: e.target.value })}
              rows={3}
              maxLength={2000}
              placeholder={t("oe.placeholder")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          {t("back")}
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="px-8 py-3 bg-green-700 text-white rounded-lg font-bold text-lg
                     hover:bg-green-800 disabled:opacity-50 transition-colors shadow-md"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </div>
  );
}
