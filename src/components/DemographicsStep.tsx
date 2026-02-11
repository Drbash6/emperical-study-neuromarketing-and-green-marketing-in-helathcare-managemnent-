"use client";

import { DEMOGRAPHICS } from "@/lib/survey-data";
import { type SurveyData } from "./SurveyForm";
import { useI18n } from "@/lib/i18n";

interface Props {
  data: SurveyData;
  update: (d: SurveyData) => void;
  onNext: () => void;
  onPrev: () => void;
}

function RadioOption({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all
        ${checked ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"}`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-amber-600 shrink-0"
      />
      <span className={`text-sm font-medium ${checked ? "text-blue-900" : "text-gray-700"}`}>
        {label}
      </span>
    </label>
  );
}

function CheckOption({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all
        ${checked ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-amber-600 rounded shrink-0"
      />
      <span className={`text-sm font-medium ${checked ? "text-blue-900" : "text-gray-700"}`}>
        {label}
      </span>
    </label>
  );
}

export default function DemographicsStep({ data, update, onNext, onPrev }: Props) {
  const { t } = useI18n();
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
      <h2 className="text-xl font-bold text-gray-800 mb-1">{t("dem.title")}</h2>
      <p className="text-xs text-red-500 font-semibold mb-4">{t("mandatory.note")}</p>

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
        <fieldset key={key} className="mb-6">
          <legend className="font-semibold text-gray-800 mb-2 text-base">
            {t(key + ".label")}<span className="text-red-500 ml-1">*</span>
          </legend>
          {key === "dem5_income" && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-3 text-sm text-gray-700">
              {t("income.instruction")}
            </div>
          )}
          <div className="space-y-2">
            {def.options.map((opt) => (
              <RadioOption
                key={opt}
                name={key}
                checked={data[key] === opt}
                onChange={() => {
                  const upd: SurveyData = { [key]: opt };
                  if (key === "dem4_region" && opt !== "Other") {
                    upd.dem4_region_other = "";
                  }
                  update(upd);
                }}
                label={t("opt." + opt)}
              />
            ))}
          </div>
          {key === "dem4_region" && data.dem4_region === "Other" && (
            <input
              type="text"
              placeholder={t("dem4.placeholder")}
              value={(data.dem4_region_other as string) || ""}
              onChange={(e) => update({ dem4_region_other: e.target.value })}
              className="mt-3 w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          )}
        </fieldset>
      ))}

      {/* Multi-select: products */}
      <fieldset className="mb-6">
        <legend className="font-semibold text-gray-800 mb-3 text-base">
          {t("dem7_products.label")}<span className="text-red-500 ml-1">*</span>
        </legend>
        <div className="space-y-2">
          {DEMOGRAPHICS.products.options.map((opt) => (
            <CheckOption
              key={opt}
              checked={products.includes(opt)}
              onChange={() => toggleProduct(opt)}
              label={t("opt." + opt)}
            />
          ))}
        </div>
        {products.includes("Other") && (
          <input
            type="text"
            placeholder={t("dem7.placeholder")}
            value={(data.dem7_other as string) || ""}
            onChange={(e) => update({ dem7_other: e.target.value })}
            className="mt-3 w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        )}
      </fieldset>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          {t("back")}
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 bg-blue-900 text-amber-400 rounded-lg font-bold text-base
                     hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
