import type { LocalizedContent } from "../data/content";

interface ProblemSectionProps {
  copy: LocalizedContent["problem"];
}

export function ProblemSection({ copy }: ProblemSectionProps) {
  return (
    <section id="problem" className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wide text-blue-800">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-800">
              {copy.lead}
            </p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {copy.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            {copy.metrics.map((metric) => (
              <article
                key={metric.value + metric.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-3xl font-bold tracking-tight text-blue-800 tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-xs font-medium text-slate-500 font-mono">
                    {metric.source}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {metric.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {metric.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
