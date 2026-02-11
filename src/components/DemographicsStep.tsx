"use client";

import { DEMOGRAPHICS } from "@/lib/survey-data";
import { type SurveyData } from "./SurveyForm";

interface Props {
  data: SurveyData;
  update: (d: SurveyData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DemographicsStep({ data, update, onNext, onPrev }: Props) {
  const products = (data.dem7_products as string[] | undefined) || [];

  const canProceed =
    data.dem1_age &&
    data.dem2_gender &&
    data.dem3_education &&
    data.dem4_region &&
    data.dem5_income &&
    data.dem6_frequency &&
    products.length > 0;

  const toggleProduct = (p: string) => {
    const next = products.includes(p)
      ? products.filter((x) => x !== p)
      : [...products, p];
    update({ dem7_products: next });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Demographics</h2>

      {/* Single-select questions */}
      {(
        [
          ["dem1_age", DEMOGRAPHICS.age],
          ["dem2_gender", DEMOGRAPHICS.gender],
          ["dem3_education", DEMOGRAPHICS.education],
          ["dem4_region", DEMOGRAPHICS.region],
          ["dem5_income", DEMOGRAPHICS.income],
          ["dem6_frequency", DEMOGRAPHICS.frequency],
        ] as const
      ).map(([key, def]) => (
        <fieldset key={key} className="mb-5">
          <legend className="font-medium text-gray-700 mb-2">{def.label}</legend>
          {def.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 mt-1.5 cursor-pointer">
              <input
                type="radio"
                name={key}
                checked={data[key] === opt}
                onChange={() => {
                  const upd: SurveyData = { [key]: opt };
                  if (key === "dem4_region" && opt !== "Other") {
                    upd.dem4_region_other = "";
                  }
                  update(upd);
                }}
                className="accent-green-600 w-4 h-4"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
          {key === "dem4_region" && data.dem4_region === "Other" && (
            <input
              type="text"
              placeholder="Please specify your region"
              value={(data.dem4_region_other as string) || ""}
              onChange={(e) => update({ dem4_region_other: e.target.value })}
              className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </fieldset>
      ))}

      {/* Multi-select: products */}
      <fieldset className="mb-5">
        <legend className="font-medium text-gray-700 mb-2">
          {DEMOGRAPHICS.products.label}
        </legend>
        {DEMOGRAPHICS.products.options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 mt-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={products.includes(opt)}
              onChange={() => toggleProduct(opt)}
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
        {products.includes("Other") && (
          <input
            type="text"
            placeholder="Please specify"
            value={(data.dem7_other as string) || ""}
            onChange={(e) => update({ dem7_other: e.target.value })}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}
      </fieldset>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium
                     hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
