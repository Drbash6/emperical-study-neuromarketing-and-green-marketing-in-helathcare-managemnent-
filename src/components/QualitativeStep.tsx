"use client";

import { OPEN_ENDED_QUESTIONS } from "@/lib/survey-data";
import { type SurveyData } from "./SurveyForm";

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
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        Part B: Your Thoughts & Experiences
      </h2>
      <p className="text-sm text-green-700 font-medium mb-3">
        Open-Ended Questions (Optional but highly valued)
      </p>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-5 text-sm text-gray-700">
        Please share your personal thoughts and experiences in your own words.
        There are no right or wrong answers. Write as much or as little as you
        wish. Your responses are anonymous and used for academic research only.
      </div>

      <div className="space-y-6">
        {OPEN_ENDED_QUESTIONS.map((q) => (
          <div
            key={q.code}
            className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <label className="block mb-2">
              <span className="font-bold text-green-700 text-sm">
                {q.code.toUpperCase()} — {q.label}
              </span>
              <p className="text-sm text-gray-700 mt-1">{q.question}</p>
            </label>
            <textarea
              value={(data[q.code] as string) || ""}
              onChange={(e) => update({ [q.code]: e.target.value })}
              rows={3}
              maxLength={2000}
              placeholder="Your answer (optional)..."
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
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="px-8 py-3 bg-green-700 text-white rounded-lg font-bold text-lg
                     hover:bg-green-800 disabled:opacity-50 transition-colors shadow-md"
        >
          {submitting ? "Submitting..." : "Submit Survey"}
        </button>
      </div>
    </div>
  );
}
