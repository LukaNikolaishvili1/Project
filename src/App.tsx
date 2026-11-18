import { useEffect, useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { ImpactSection } from "./components/ImpactSection";
import { MechanismSection } from "./components/MechanismSection";
import { Navbar } from "./components/Navbar";
import { ProblemSection } from "./components/ProblemSection";
import { TeamAndContactSection } from "./components/TeamAndContactSection";
import { CONTENT } from "./data/content";
import type { Language } from "./utils/neuroMath";

export default function App() {
  const [lang, setLang] = useState<Language>("ka");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const copy = CONTENT[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar copy={copy.nav} />
      <main>
        <HeroSection lang={lang} onLanguageChange={setLang} copy={copy.hero} />
        <ProblemSection copy={copy.problem} />
        <MechanismSection lang={lang} copy={copy.mechanism} />
        <ImpactSection copy={copy.impact} />
        <TeamAndContactSection
          lang={lang}
          teamCopy={copy.team}
          contactCopy={copy.contact}
          footerCopy={copy.footer}
        />
      </main>
    </div>
  );
}
