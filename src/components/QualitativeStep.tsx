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

  const allAnswered = OPEN_ENDED_QUESTIONS.every((q) => {
    const val = data[q.code] as string;
    if (!val) return false;
    if (val === "other") {
      return ((data[q.code + "_other"] as string) || "").trim().length > 0;
    }
    return true;
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {t("oe.title")}
      </h2>
      <p className="text-sm text-teal-700 font-medium mb-1">
        {t("oe.subtitle")}
      </p>
      <p className="text-xs text-red-500 font-semibold mb-3">
        {t("mandatory.note")}
      </p>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-5 text-sm text-gray-700">
        {t("oe.instruction")}
      </div>

      <div className="space-y-6">
        {OPEN_ENDED_QUESTIONS.map((q) => (
          <fieldset
            key={q.code}
            className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <legend className="font-bold text-teal-700 text-sm px-1">
              {q.code.toUpperCase()} — {t("oe." + q.code + ".label")}
              <span className="text-red-500 ml-1">*</span>
            </legend>
            <p className="text-sm text-gray-700 mb-3">{t("oe." + q.code + ".q")}</p>

            <div className="space-y-2">
              {q.options.map((opt) => {
                const selected = data[q.code] === opt;
                return (
                  <label
                    key={opt}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                      ${
                        selected
                          ? "border-teal-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-teal-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name={q.code}
                      value={opt}
                      checked={selected}
                      onChange={() => update({ [q.code]: opt, [q.code + "_other"]: "" })}
                      className="mt-0.5 accent-teal-600"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      {t("mc." + q.code + "." + opt)}
                    </span>
                  </label>
                );
              })}

              {/* Other option */}
              <label
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    data[q.code] === "other"
                      ? "border-teal-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-teal-300"
                  }`}
              >
                <input
                  type="radio"
                  name={q.code}
                  value="other"
                  checked={data[q.code] === "other"}
                  onChange={() => update({ [q.code]: "other" })}
                  className="mt-0.5 accent-teal-600"
                />
                <span className="text-sm text-gray-800 font-medium">
                  {t("mc.other")}
                </span>
              </label>

              {data[q.code] === "other" && (
                <input
                  type="text"
                  value={(data[q.code + "_other"] as string) || ""}
                  onChange={(e) => update({ [q.code + "_other"]: e.target.value })}
                  placeholder={t("mc.other.placeholder")}
                  maxLength={500}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm ms-8
                             focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              )}
            </div>
          </fieldset>
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
          disabled={submitting || !allAnswered}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-bold text-lg
                     hover:from-green-700 hover:to-blue-700 disabled:opacity-50 transition-all shadow-md"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </div>
  );
}
