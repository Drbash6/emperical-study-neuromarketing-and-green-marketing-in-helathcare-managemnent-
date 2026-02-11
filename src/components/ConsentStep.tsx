"use client";

import { type SurveyData } from "./SurveyForm";
import { useI18n } from "@/lib/i18n";

interface Props {
  data: SurveyData;
  update: (d: SurveyData) => void;
  onNext: () => void;
}

function RadioCard({
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
      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
        ${checked ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"}`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-amber-600"
      />
      <span className={`text-sm font-medium ${checked ? "text-blue-900" : "text-gray-700"}`}>
        {label}
      </span>
    </label>
  );
}

export default function ConsentStep({ data, update, onNext }: Props) {
  const { t } = useI18n();
  const consented = data.consented === "yes";
  const sq1 = data.sq1_purchased as string | undefined;
  const sq2 = data.sq2_noticed as string | undefined;

  const canProceed = consented && sq1 === "yes" && !!sq2;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {t("consent.title")}
      </h2>

      {/* Consent */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6 text-sm text-gray-700 leading-relaxed">
        <p dangerouslySetInnerHTML={{ __html: t("consent.p1") }} />
        <p className="mt-2" dangerouslySetInnerHTML={{ __html: t("consent.p2") }} />
        <p className="mt-2" dangerouslySetInnerHTML={{ __html: t("consent.p3") }} />
      </div>

      <fieldset className="mb-6">
        <legend className="font-semibold text-gray-800 mb-3 text-base">{t("consent.legend")}<span className="text-red-500 ml-1">*</span></legend>
        <div className="space-y-2">
          <RadioCard name="consent" checked={consented} onChange={() => update({ consented: "yes" })} label={t("consent.yes")} />
          <RadioCard name="consent" checked={data.consented === "no"} onChange={() => update({ consented: "no" })} label={t("consent.no")} />
        </div>
        {data.consented === "no" && (
          <p className="text-red-600 text-sm mt-2 font-medium bg-red-50 border border-red-200 rounded-lg p-2">
            {t("consent.error")}
          </p>
        )}
      </fieldset>

      {/* SQ1 */}
      <fieldset className="mb-6">
        <legend className="font-semibold text-gray-800 mb-3 text-base">
          {t("sq1.q")}<span className="text-red-500 ml-1">*</span>
        </legend>
        <div className="space-y-2">
          <RadioCard name="sq1" checked={sq1 === "yes"} onChange={() => update({ sq1_purchased: "yes" })} label={t("sq1.yes")} />
          <RadioCard name="sq1" checked={sq1 === "no"} onChange={() => update({ sq1_purchased: "no" })} label={t("sq1.no")} />
        </div>
        {sq1 === "no" && (
          <p className="text-red-600 text-sm mt-2 font-medium bg-red-50 border border-red-200 rounded-lg p-2">
            {t("sq1.error")}
          </p>
        )}
      </fieldset>

      {/* SQ2 */}
      <fieldset className="mb-6">
        <legend className="font-semibold text-gray-800 mb-3 text-base">
          {t("sq2.q")}<span className="text-red-500 ml-1">*</span>
        </legend>
        <div className="space-y-2">
          {([
            { value: "yes", key: "sq2.yes" },
            { value: "not_sure", key: "sq2.not_sure" },
            { value: "no", key: "sq2.no_never" },
          ] as const).map((opt) => (
            <RadioCard
              key={opt.value}
              name="sq2"
              checked={sq2 === opt.value}
              onChange={() => update({ sq2_noticed: opt.value })}
              label={t(opt.key)}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 bg-blue-900 text-amber-400 rounded-lg font-bold text-base
                     hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all shadow-md"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
