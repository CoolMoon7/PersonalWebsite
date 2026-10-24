import Image from "next/image";
import Logo from "@/components/Logo";
import { site } from "@/data/site";
import { skills } from "@/data/fde";

const FACTS = [
  ["Education", "Duke CS · 3.95 GPA"],
  ["Honors", "Dean's List with Distinction"],
  ["HackDuke", "1st of 100+ teams"],
  ["Founded", "RiZE Maps · $135K"],
];

/** Photo on the left, short bio, facts and skills on the right. Same layout as the /fde About section. */
export default function AboutCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6">
      <div className="panel overflow-hidden relative aspect-[4/5] md:aspect-auto md:min-h-[480px]">
        <Image
          src="/images/coletalking.png"
          alt="Cole Bonawitz speaking at an event"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover object-top"
        />
        <span className="absolute left-3 bottom-3 chip !bg-white/90 backdrop-blur">Chattanooga, TN → Durham, NC</span>
      </div>
      <div className="panel p-6 sm:p-8 flex flex-col">
        <div className="space-y-4 text-[16px] text-ink-2 leading-relaxed">
          <p>
            I&apos;m a Computer Science student at Duke (minors in Statistical Science and Philosophy), studying abroad
            at UNSW Sydney this fall. Coursework in machine learning, data structures and algorithms, computer networks
            and probability.
          </p>
          <p>
            The common thread in everything above: I go to where the work happens. Hospital wards in Kampala, a
            startup&apos;s sales floor, an insurance agency&apos;s service desk. I learn the workflow from the people in
            it, then build the system that takes the repetitive part off their hands, and I stay until it works.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden mt-8">
          {FACTS.map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{k}</dt>
              <dd className="text-[14.5px] font-medium mt-1">{v}</dd>
            </div>
          ))}
        </dl>
        <dl className="mt-6 space-y-3">
          {skills.map((s) => (
            <div key={s.k} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted pt-0.5">{s.k}</dt>
              <dd className="text-[14px] text-ink-2 leading-relaxed">{s.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-8 flex flex-wrap gap-3">
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé (PDF)</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Logo name="github" size={15} /> GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Logo name="linkedin" size={15} /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
