"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function RulesClient() {
  const { t } = useLanguage();
  const rules = t("rules_list") as { title: string, description: string }[];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-20 pt-32 md:pt-40">
      <div className="relative z-20 max-w-4xl px-6 md:px-24 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase">
            4Fun Clan / {t("rules_title")}
          </p>
        </div>
        <h1 className="text-white font-black text-[13vw] sm:text-5xl md:text-7xl tracking-tighter mb-4 md:mb-6 leading-none uppercase whitespace-nowrap">
          {t("rules_title")}<span className="text-primary">.</span>
        </h1>
        <p className="text-zinc-400 font-medium text-sm md:text-xl leading-relaxed max-w-3xl border-l-2 border-primary pl-4">
          {t("rules_desc")}
        </p>
      </div>

      <div className="w-full px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 w-full pt-10 border-t border-white/10">
          {Array.isArray(rules) && rules.map((rule, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
              <div className="w-full md:w-28 shrink-0">
                <span className="text-7xl md:text-[6rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-col gap-3 md:mt-3">
                <h3 className="font-black text-2xl md:text-3xl text-white uppercase tracking-tighter leading-none">
                  {rule.title}
                </h3>
                <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
