import { useState } from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";
import type { LocalizedContent } from "../data/content";

interface ImpactSectionProps {
  copy: LocalizedContent["impact"];
}

export function ImpactSection({ copy }: ImpactSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="impact" className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-blue-800">{copy.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{copy.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
              {!imageFailed ? (
                <img
                  src="/src/assets/images/aham_student_focus_1794934820060.jpg"
                  alt={copy.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover aspect-[4/3] lg:aspect-auto"
                />
              ) : (
                <div className="flex aspect-[4/3] h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-center">
                  <GraduationCap className="h-10 w-10 text-blue-800" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800">
                    Aham All Study Session
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {copy.audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">{audience.title}</h3>
                  <span className="text-xs font-medium text-slate-500">{audience.tag}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{audience.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-blue-800 shrink-0" aria-hidden="true" />
              <h3>{copy.privacyTitle}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.privacyBody}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-slate-900">{copy.measurementTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.measurementBody}</p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            {copy.feasibilityTitle}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {copy.feasibilityPillars.map((pillar) => (
              <div key={pillar.num} className="border-t border-slate-200 pt-4">
                <span className="font-mono text-xs font-semibold text-blue-800">
                  {pillar.num}
                </span>
                <h4 className="mt-2 text-base font-semibold text-slate-900">{pillar.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
