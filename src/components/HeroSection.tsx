import { useState } from "react";
import { ArrowRight, BrainCircuit } from "lucide-react";
import type { LocalizedContent } from "../data/content";
import {
  DAILY_FOCUS_CURVE,
  findPeakWindow,
  generateFocusCurvePoints,
  type Language,
} from "../utils/neuroMath";

interface HeroSectionProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  copy: LocalizedContent["hero"];
}

export function HeroSection({ lang, onLanguageChange, copy }: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const svgWidth = 720;
  const svgHeight = 148;
  const curveCoords = generateFocusCurvePoints(DAILY_FOCUS_CURVE, svgWidth, svgHeight, 24, 18);
  const peakSummary = findPeakWindow(DAILY_FOCUS_CURVE);

  const linePath = curveCoords
    .map((pt, idx) => `${idx === 0 ? "M" : "L"}${pt.x},${pt.y}`)
    .join(" ");
  const areaPath =
    curveCoords.length > 1
      ? `${linePath} L${curveCoords[curveCoords.length - 1].x},${svgHeight - 18} L${curveCoords[0].x},${svgHeight - 18} Z`
      : "";

  return (
    <section id="top" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-6 pb-12 lg:pt-9 lg:pb-14">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3.5">
          <p className="text-xs font-medium tracking-wide text-slate-500">
            {copy.kicker}
          </p>

          <div
            role="group"
            aria-label={lang === "ka" ? "ენის არჩევა" : "Language selector"}
            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1"
          >
            <button
              type="button"
              onClick={() => onLanguageChange("ka")}
              aria-pressed={lang === "ka"}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === "ka"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ქარ
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              aria-pressed={lang === "en"}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === "en"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ENG
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-center lg:col-span-6">
            <div>
              <h1 className="text-[clamp(1.85rem,3.1vw,2.65rem)] font-bold leading-[1.18] tracking-tight text-slate-900">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                {copy.subtitle}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                <span>{copy.primaryCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {!imageFailed ? (
                <img
                  src="/src/assets/images/aham_hero_headband_1794934820469.jpg"
                  alt={copy.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover aspect-video lg:aspect-auto"
                />
              ) : (
                <div className="flex aspect-video h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-center">
                  <BrainCircuit className="h-10 w-10 text-blue-800" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800">Aham All EEG Headband</span>
                </div>
              )}
            </div>
            <p className="mt-2.5 text-xs text-slate-500">{copy.imageCaption}</p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">{copy.curveTitle}</h2>
              <p className="mt-0.5 text-xs text-slate-500">{copy.curveSubtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono tabular-nums">
              <span className="text-blue-800 font-medium">{copy.peakLabel}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-cyan-700 font-medium">{copy.recoveryLabel}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">{copy.dipLabel}</span>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="h-36 w-full min-w-[540px]"
              role="img"
              aria-label={copy.curveTitle}
            >
              <defs>
                <linearGradient id="focusAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {[35, 74, 113].map((yPos) => (
                <line
                  key={yPos}
                  x1="24"
                  y1={yPos}
                  x2={svgWidth - 24}
                  y2={yPos}
                  stroke="#E2E8F0"
                  strokeDasharray="3 4"
                />
              ))}

              {areaPath && <path d={areaPath} fill="url(#focusAreaGrad)" />}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}

              {curveCoords.map(({ x, y, point }) => {
                const isPeak = point.hour === peakSummary.peakHour.hour;
                const isAfternoonPeak = point.hour === 17;
                return (
                  <g key={point.label}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isPeak || isAfternoonPeak ? 4.5 : 2.5}
                      fill={
                        point.status === "peak"
                          ? "#1E40AF"
                          : point.status === "dip"
                          ? "#94A3B8"
                          : "#0891B2"
                      }
                    />
                    <text
                      x={x}
                      y={svgHeight - 3}
                      textAnchor="middle"
                      className="fill-slate-500 text-[10px] font-mono"
                    >
                      {point.label}
                    </text>
                    {(isPeak || isAfternoonPeak) && (
                      <text
                        x={x}
                        y={Math.max(y - 10, 12)}
                        textAnchor="middle"
                        className="fill-blue-900 text-[10px] font-mono font-semibold"
                      >
                        {point.focusScore}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 border-t border-slate-200 pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-800">{stat.label}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-slate-500">{stat.context}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
