"use client";

import { useState } from "react";
import ConsentStep from "@/components/ConsentStep";
import DemographicsStep from "@/components/DemographicsStep";
import LikertStep from "@/components/LikertStep";
import QualitativeStep from "@/components/QualitativeStep";
import ProgressBar from "@/components/ProgressBar";
import LanguageSelector from "@/components/LanguageSelector";
import { SURVEY_SECTIONS, OPEN_ENDED_QUESTIONS } from "@/lib/survey-data";
import { getSupabase } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n";

// Steps: consent, demographics, 9 likert sections, qualitative
const TOTAL_STEPS = 1 + 1 + SURVEY_SECTIONS.length + 1; // 12

export type SurveyData = Record<string, string | number | string[]>;

export default function SurveyForm() {
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (partial: SurveyData) =>
    setData((prev) => ({ ...prev, ...partial }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      // Build the row matching DB columns
      const row: Record<string, unknown> = {
        sq1_purchased: true,
        sq2_noticed: data.sq2_noticed,
        dem1_age: data.dem1_age,
        dem2_gender: data.dem2_gender,
        dem3_education: data.dem3_education,
        dem4_region: data.dem4_region,
        dem4_region_other: data.dem4_region_other || null,
        dem5_income: data.dem5_income,
        dem6_frequency: data.dem6_frequency,
        dem7_products: data.dem7_products || [],
        dem7_other: data.dem7_other || null,
      };

      // Likert items
      for (const section of SURVEY_SECTIONS) {
        for (const item of section.items) {
          row[item.code] = Number(data[item.code]);
        }
      }

      // Open-ended
      for (const q of OPEN_ENDED_QUESTIONS) {
        row[q.code] = data[q.code] || null;
      }

      const { error: dbError } = await getSupabase()
        .from("survey_responses")
        .insert([row]);

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Submission failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Arabic-aware font class
  const fontClass = lang === "ar" ? "font-[var(--font-noto-arabic)]" : "";

  if (submitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4 ${fontClass}`}>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-700 mb-3">
            {t("thank.title")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("thank.text")}
          </p>
          <p className="text-sm text-gray-400">
            {t("thank.sub")}
          </p>
        </div>
      </div>
    );
  }

  // Determine which likert section index (0-based) relative to step
  const likertSectionIndex = step - 2; // steps 2..10 are likert sections

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 ${fontClass}`}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Language Selector */}
        <div className="flex justify-center mb-4">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-lg md:text-xl font-bold text-green-800 leading-tight">
            {t("header.title")}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {t("header.subtitle")}
          </p>
        </div>

        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-4">
          {/* Step 0: Consent & Screening */}
          {step === 0 && (
            <ConsentStep data={data} update={update} onNext={next} />
          )}

          {/* Step 1: Demographics */}
          {step === 1 && (
            <DemographicsStep
              data={data}
              update={update}
              onNext={next}
              onPrev={prev}
            />
          )}

          {/* Steps 2-10: Likert Sections */}
          {step >= 2 && step <= 10 && (
            <LikertStep
              section={SURVEY_SECTIONS[likertSectionIndex]}
              data={data}
              update={update}
              onNext={next}
              onPrev={prev}
            />
          )}

          {/* Step 11: Qualitative */}
          {step === 11 && (
            <QualitativeStep
              data={data}
              update={update}
              onPrev={prev}
              onSubmit={submit}
              submitting={submitting}
            />
          )}

          {error && (
            <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          {t("footer")}
        </p>
      </div>
    </div>
  );
}
