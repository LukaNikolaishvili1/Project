import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import type { LocalizedContent } from "../data/content";
import {
  validatePilotForm,
  type Language,
  type PilotFormErrors,
  type PilotFormValues,
} from "../utils/neuroMath";

interface TeamAndContactSectionProps {
  lang: Language;
  teamCopy: LocalizedContent["team"];
  contactCopy: LocalizedContent["contact"];
  footerCopy: LocalizedContent["footer"];
}

const INITIAL_FORM: PilotFormValues = {
  name: "",
  role: "teacher",
  school: "",
  email: "",
  notes: "",
};

export function TeamAndContactSection({
  lang,
  teamCopy,
  contactCopy,
  footerCopy,
}: TeamAndContactSectionProps) {
  const [formValues, setFormValues] = useState<PilotFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<PilotFormErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<PilotFormValues | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validatePilotForm(formValues, lang);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedRecord(formValues);
  }

  function handleReset() {
    setFormValues(INITIAL_FORM);
    setErrors({});
    setSubmittedRecord(null);
  }

  return (
    <>
      <section id="team" className="border-b border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-blue-800">{teamCopy.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {teamCopy.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{teamCopy.subtitle}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {teamCopy.members.map((member) => (
              <article
                key={member.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono text-sm font-semibold text-blue-800">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold text-blue-800">{member.role}</p>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{member.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-b border-slate-200 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wide text-blue-800">
                {contactCopy.eyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {contactCopy.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {contactCopy.subtitle}
              </p>
            </div>

            <div className="lg:col-span-7">
              {submittedRecord ? (
                <div className="rounded-xl border border-emerald-200 bg-white p-8">
                  <div className="flex items-center gap-2.5 text-emerald-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-slate-900">
                      {contactCopy.successTitle}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {contactCopy.successBody}
                  </p>
                  <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-1">
                    <div>
                      <strong className="text-slate-900">{submittedRecord.name}</strong>
                      <span aria-hidden="true" className="mx-1.5 text-slate-300">·</span>
                      <span>{submittedRecord.school}</span>
                    </div>
                    <div className="font-mono">{submittedRecord.email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {contactCopy.resetBtn}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="pilot-name"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        {contactCopy.fields.name}
                      </label>
                      <input
                        id="pilot-name"
                        type="text"
                        value={formValues.name}
                        onChange={(e) =>
                          setFormValues((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder={contactCopy.fields.namePlaceholder}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:bg-white focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-700" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="pilot-role"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        {contactCopy.fields.role}
                      </label>
                      <select
                        id="pilot-role"
                        value={formValues.role}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            role: e.target.value as PilotFormValues["role"],
                          }))
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:bg-white focus:outline-none"
                      >
                        <option value="teacher">{contactCopy.fields.roles.teacher}</option>
                        <option value="parent">{contactCopy.fields.roles.parent}</option>
                        <option value="student">{contactCopy.fields.roles.student}</option>
                        <option value="partner">{contactCopy.fields.roles.partner}</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="pilot-school"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        {contactCopy.fields.school}
                      </label>
                      <input
                        id="pilot-school"
                        type="text"
                        value={formValues.school}
                        onChange={(e) =>
                          setFormValues((prev) => ({ ...prev, school: e.target.value }))
                        }
                        placeholder={contactCopy.fields.schoolPlaceholder}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:bg-white focus:outline-none"
                      />
                      {errors.school && (
                        <p className="mt-1 text-xs text-rose-700" role="alert">
                          {errors.school}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="pilot-email"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        {contactCopy.fields.email}
                      </label>
                      <input
                        id="pilot-email"
                        type="email"
                        value={formValues.email}
                        onChange={(e) =>
                          setFormValues((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder={contactCopy.fields.emailPlaceholder}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:bg-white focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-700" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="pilot-notes"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      {contactCopy.fields.notes}
                    </label>
                    <textarea
                      id="pilot-notes"
                      rows={3}
                      value={formValues.notes}
                      onChange={(e) =>
                        setFormValues((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder={contactCopy.fields.notesPlaceholder}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-800 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 transition-colors cursor-pointer"
                    >
                      {contactCopy.submitBtn}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>{footerCopy.tagline}</p>
          <p className="font-mono">{footerCopy.competition}</p>
        </div>
      </footer>
    </>
  );
}
