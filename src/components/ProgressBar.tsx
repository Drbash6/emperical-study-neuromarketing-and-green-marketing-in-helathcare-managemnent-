"use client";

import { useI18n } from "@/lib/i18n";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const { t } = useI18n();
  const pct = Math.round(((current + 1) / total) * 100);
  const stepLabel = t("step_x_of_y")
    .replace("{0}", String(current + 1))
    .replace("{1}", String(total));

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{stepLabel}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-blue-900 to-amber-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
