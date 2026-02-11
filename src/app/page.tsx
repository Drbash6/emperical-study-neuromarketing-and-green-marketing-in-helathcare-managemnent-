"use client";

import { I18nProvider } from "@/lib/i18n";
import SurveyForm from "@/components/SurveyForm";

export default function Home() {
  return (
    <I18nProvider>
      <SurveyForm />
    </I18nProvider>
  );
}
