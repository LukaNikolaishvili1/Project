import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import type { LocalizedContent } from "../data/content";
import {
  COGNITIVE_PROFILES,
  generateWaveformPath,
  validateExplainInput,
  type CognitiveStateId,
  type Language,
} from "../utils/neuroMath";

interface MechanismSectionProps {
  lang: Language;
  copy: LocalizedContent["mechanism"];
}

interface ExplainResponse {
  simpleExplanation: string;
  realWorldExample: string;
  keyTakeaway: string;
}

export function MechanismSection({ lang, copy }: MechanismSectionProps) {
  const [activeState, setActiveState] = useState<CognitiveStateId>("drift");
  const [activePresetId, setActivePresetId] = useState<string | null>(copy.presets[0].id);
  const [passage, setPassage] = useState<string>(copy.presets[0].text);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [explainError, setExplainError] = useState<string | null>(null);
  const [explainResult, setExplainResult] = useState<ExplainResponse | null>(null);

  useEffect(() => {
    if (activePresetId) {
      const matched = copy.presets.find((p) => p.id === activePresetId);
      if (matched) {
        setPassage(matched.text);
      }
    }
  }, [lang, activePresetId, copy.presets]);

  const profile = COGNITIVE_PROFILES[activeState];
  const stateCopy = copy.states[activeState];
  const stateIds: CognitiveStateId[] = ["focus", "drift", "fatigue"];

  async function handleExplainSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validateExplainInput(passage, lang);
    if (validationError) {
      setExplainError(validationError);
      return;
    }

    setExplainError(null);
    setLoadingExplain(true);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passage, lang }),
      });

      const data = (await response.json()) as Partial<ExplainResponse> & { error?: string };
      if (!response.ok) {
        setExplainError(
          data.error ??
            (lang === "ka"
              ? "ვერ მოხერხდა ტექსტის დამუშავება."
              : "Could not simplify the study passage.")
        );
        return;
      }

      setExplainResult({
        simpleExplanation: data.simpleExplanation ?? "",
        realWorldExample: data.realWorldExample ?? "",
        keyTakeaway: data.keyTakeaway ?? "",
      });
    } catch {
      setExplainError(
        lang === "ka"
          ? "სერვერთან კავშირი ვერ დამყარდა. სცადეთ ხელახლა."
          : "Network error while contacting the server. Please try again."
      );
    } finally {
      setLoadingExplain(false);
    }
  }

  return (
    <section id="how-it-works" className="border-b border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-blue-800">{copy.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{copy.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="font-mono text-sm font-semibold text-blue-800">{step.num}</div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                {copy.explorerTitle}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {copy.explorerDesc}
              </p>
            </div>

            <div
              role="tablist"
              aria-label={copy.explorerTitle}
              className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shrink-0"
            >
              {stateIds.map((stateId) => {
                const isSelected = activeState === stateId;
                return (
                  <button
                    key={stateId}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveState(stateId)}
                    className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-blue-800 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {copy.states[stateId].tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span
                    className={`text-xs font-semibold ${
                      activeState === "focus"
                        ? "text-emerald-700"
                        : activeState === "drift"
                        ? "text-amber-700"
                        : "text-rose-700"
                    }`}
                  >
                    {stateCopy.statusBadge}
                  </span>
                  <div className="flex items-center gap-4 font-mono text-xs tabular-nums text-slate-600">
                    <span>
                      {stateCopy.attentionLabel}:{" "}
                      <strong className="text-slate-900">{profile.attentionScore}%</strong>
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>
                      {stateCopy.comprehensionLabel}:{" "}
                      <strong className="text-slate-900">{profile.comprehensionRate}%</strong>
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {profile.bands.map((band, idx) => {
                    const wavePath = generateWaveformPath(
                      460,
                      48,
                      band.amplitude,
                      band.frequency,
                      idx * 0.9
                    );
                    return (
                      <div key={band.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700">
                            {copy.bandsLabels[band.id]}
                          </span>
                          <span className="font-mono text-slate-500 tabular-nums">{band.hz}</span>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50 px-2 py-1">
                          <svg
                            viewBox="0 0 460 48"
                            className="h-10 w-full"
                            aria-hidden="true"
                          >
                            <line
                              x1="0"
                              y1="24"
                              x2="460"
                              y2="24"
                              stroke="#E2E8F0"
                              strokeWidth="1"
                            />
                            <path
                              d={wavePath}
                              fill="none"
                              stroke={band.color}
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h4 className="text-sm font-semibold text-slate-900">{stateCopy.adviceTitle}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {stateCopy.adviceBody}
                </p>
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs font-medium text-blue-800">
                  {stateCopy.ahaNote}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-xs font-medium text-slate-500">{copy.sampleBookTitle}</div>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-base">
                  {copy.sampleSentences.map((sentence, idx) => {
                    const isHighlighted = profile.highlightedSentenceIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-lg p-3 transition-colors ${
                          isHighlighted
                            ? "border border-amber-300 bg-amber-50 text-slate-900"
                            : "bg-slate-50 text-slate-700"
                        }`}
                      >
                        <p>{sentence}</p>
                        {isHighlighted && (
                          <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{copy.reReadBanner}</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <form
                onSubmit={handleExplainSubmit}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {copy.simplifierTitle}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {copy.simplifierDesc}
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 shrink-0 text-blue-800" aria-hidden="true" />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">{copy.presetsLabel}</span>
                  {copy.presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setActivePresetId(preset.id);
                        setPassage(preset.text);
                        setExplainError(null);
                      }}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                        activePresetId === preset.id
                          ? "border-blue-800 bg-blue-50 text-blue-900"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {preset.subject}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="passage-input"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    {copy.textareaLabel}
                  </label>
                  <textarea
                    id="passage-input"
                    rows={3}
                    value={passage}
                    onChange={(e) => {
                      setActivePresetId(null);
                      setPassage(e.target.value);
                    }}
                    placeholder={copy.textareaPlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-blue-800 focus:bg-white focus:outline-none"
                  />
                </div>

                {explainError && (
                  <div
                    role="alert"
                    className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{explainError}</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={loadingExplain}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-900 disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {loadingExplain && (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    )}
                    <span>{loadingExplain ? copy.explainingBtn : copy.explainBtn}</span>
                  </button>
                </div>

                {explainResult && (
                  <div className="mt-4 space-y-3 rounded-lg border border-blue-200 bg-blue-50/50 p-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{copy.resultLabels.simple}</span>
                      </div>
                      <p className="mt-1 text-slate-800">{explainResult.simpleExplanation}</p>
                    </div>
                    <div className="border-t border-blue-100 pt-2.5">
                      <div className="text-xs font-semibold text-blue-900">
                        {copy.resultLabels.example}
                      </div>
                      <p className="mt-1 text-slate-700">{explainResult.realWorldExample}</p>
                    </div>
                    <div className="border-t border-blue-100 pt-2.5">
                      <div className="text-xs font-semibold text-blue-900">
                        {copy.resultLabels.takeaway}
                      </div>
                      <p className="mt-1 font-medium text-slate-900">{explainResult.keyTakeaway}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
