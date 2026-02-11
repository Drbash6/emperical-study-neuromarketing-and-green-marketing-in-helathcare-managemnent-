"use client";

import { LIKERT_OPTIONS, type SurveySection } from "@/lib/survey-data";
import { type SurveyData } from "./SurveyForm";

interface Props {
  section: SurveySection;
  data: SurveyData;
  update: (d: SurveyData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LikertStep({
  section,
  data,
  update,
  onNext,
  onPrev,
}: Props) {
  const allAnswered = section.items.every(
    (item) => data[item.code] !== undefined && data[item.code] !== ""
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">{section.title}</h2>
      {section.subtitle && (
        <p className="text-sm text-green-700 font-medium mb-3">
          {section.subtitle}
        </p>
      )}
      {section.instruction && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-sm text-gray-700">
          {section.instruction}
        </div>
      )}

      <div className="space-y-5">
        {section.items.map((item) => (
          <div
            key={item.code}
            className="border border-gray-100 rounded-lg p-4 bg-gray-50"
          >
            <p className="text-sm text-gray-800 mb-3">
              <span className="font-semibold text-green-700">
                {item.code.toUpperCase()}
                {item.reverse && " (R)"}
              </span>{" "}
              {item.text}
            </p>
            <div className="flex flex-wrap gap-2">
              {LIKERT_OPTIONS.map((opt) => {
                const selected = Number(data[item.code]) === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => update({ [item.code]: opt.value })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                      ${
                        selected
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
                      }`}
                  >
                    {opt.value} - {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!allAnswered}
          className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium
                     hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
