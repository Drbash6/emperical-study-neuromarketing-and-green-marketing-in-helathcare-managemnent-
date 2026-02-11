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
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-5 text-sm text-gray-700">
          {section.instruction}
        </div>
      )}

      <div className="space-y-5">
        {section.items.map((item) => (
          <div
            key={item.code}
            className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <p className="text-sm text-gray-800 mb-3">
              <span className="font-bold text-green-700">
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
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all
                      ${
                        selected
                          ? "bg-green-600 text-white border-green-600 shadow-md scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:bg-green-50"
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
          className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!allAnswered}
          className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold text-base
                     hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
