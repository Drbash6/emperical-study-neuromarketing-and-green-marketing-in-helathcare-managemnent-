"use client";

import { type SurveyData } from "./SurveyForm";

interface Props {
  data: SurveyData;
  update: (d: SurveyData) => void;
  onNext: () => void;
}

export default function ConsentStep({ data, update, onNext }: Props) {
  const consented = data.consented === "yes";
  const sq1 = data.sq1_purchased as string | undefined;
  const sq2 = data.sq2_noticed as string | undefined;

  const canProceed = consented && sq1 === "yes" && !!sq2;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Informed Consent & Screening
      </h2>

      {/* Consent */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-gray-700 leading-relaxed">
        <p>
          You are invited to participate in an academic research study examining
          how consumers perceive and respond to environmental sustainability
          claims on <strong>pharmaceutical and nutraceutical products</strong>{" "}
          (e.g., vitamins, supplements, over-the-counter medicines, herbal
          health products).
        </p>
        <p className="mt-2">
          This study is part of a <strong>PhD research project</strong>. Your
          participation is entirely <strong>voluntary, anonymous, and confidential</strong>.
          No personally identifiable information is collected. You may withdraw
          at any time without consequence. The survey takes approximately{" "}
          <strong>12–15 minutes</strong>.
        </p>
        <p className="mt-2">
          By proceeding, you confirm you are <strong>18 years or older</strong>{" "}
          and consent to participate.
        </p>
      </div>

      <fieldset className="mb-6">
        <legend className="font-medium text-gray-700 mb-2">Consent</legend>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="consent"
            checked={consented}
            onChange={() => update({ consented: "yes" })}
            className="accent-green-600 w-4 h-4"
          />
          <span>I consent to participate</span>
        </label>
        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <input
            type="radio"
            name="consent"
            checked={data.consented === "no"}
            onChange={() => update({ consented: "no" })}
            className="accent-green-600 w-4 h-4"
          />
          <span>I do not consent</span>
        </label>
        {data.consented === "no" && (
          <p className="text-red-500 text-sm mt-2">
            You must consent to participate in this study.
          </p>
        )}
      </fieldset>

      {/* SQ1 */}
      <fieldset className="mb-6">
        <legend className="font-medium text-gray-700 mb-2">
          SQ1. Have you purchased any pharmaceutical or nutraceutical product
          (e.g., over-the-counter medicine, vitamins, dietary supplements,
          herbal health products, probiotics) in the past 12 months?
        </legend>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sq1"
            checked={sq1 === "yes"}
            onChange={() => update({ sq1_purchased: "yes" })}
            className="accent-green-600 w-4 h-4"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <input
            type="radio"
            name="sq1"
            checked={sq1 === "no"}
            onChange={() => update({ sq1_purchased: "no" })}
            className="accent-green-600 w-4 h-4"
          />
          <span>No</span>
        </label>
        {sq1 === "no" && (
          <p className="text-red-500 text-sm mt-2">
            This survey requires participants who have purchased these products
            in the past 12 months.
          </p>
        )}
      </fieldset>

      {/* SQ2 */}
      <fieldset className="mb-6">
        <legend className="font-medium text-gray-700 mb-2">
          SQ2. Have you ever noticed environmental or sustainability claims
          (e.g., eco-labels, &quot;eco-friendly,&quot; &quot;sustainably
          sourced,&quot; green packaging) on any pharmaceutical or nutraceutical
          product?
        </legend>
        {[
          { value: "yes", label: "Yes" },
          { value: "not_sure", label: "Not sure, but I may have" },
          {
            value: "no",
            label:
              'No, never (please answer based on your general expectations)',
          },
        ].map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 mt-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sq2"
              checked={sq2 === opt.value}
              onChange={() => update({ sq2_noticed: opt.value })}
              className="accent-green-600 w-4 h-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium
                     hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
