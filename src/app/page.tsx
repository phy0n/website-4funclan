"use client";

import { Users, Mic, Footprints, Swords, Cuboid, Gamepad2, Shield, Crown, Flame } from "lucide-react";
import Image from "next/image";
import RandomGalleryPreview from "@/components/RandomGalleryPreview";
import membersData from "@/data/members.json";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const leaders = membersData.filter(m => m.roles.includes("OWNER"));
  const { t } = useLanguage();

  const renderTitle = (title: string) => {
    const words = title.split(" ");
    const lastWord = words.pop();
    const rest = words.join(" ");
    return <>{rest} <span className="text-primary">{lastWord}.</span></>;
  };

  return (
    <div className="w-full bg-[#0a0a0a]">
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/video/bg.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>

        <div className="relative z-20 flex flex-col items-start md:items-center text-left md:text-center max-w-6xl mx-auto w-full mt-10 md:mt-16">

          <h1 className="font-black text-3xl sm:text-5xl md:text-7xl lg:text-[3rem] tracking-tighter text-zinc-300 mb-2 leading-[0.9] uppercase drop-shadow-2xl">
            {t("home_hero_title1")}
          </h1>
          <div className="border-l-8 border-primary pl-4 md:pl-6 md:border-l-0 md:border-b-8 md:pb-2 md:inline-block mb-8 relative">
            <h1 className="font-black text-[13vw] sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter text-white leading-[0.9] uppercase drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] whitespace-nowrap">
              {t("home_hero_title2")}<span className="text-primary">.</span>
            </h1>
          </div>

          <p className="text-zinc-400 font-medium text-base md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed drop-shadow-lg">
            {t("home_hero_desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a href="https://discord.gg/SrcssWm3xA" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">
              {t("home_hero_btn_discord")}
            </a>
            <a href="/members" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-white/10 transition-all text-center backdrop-blur-sm">
              {t("home_hero_btn_members")}
            </a>
          </div>
        </div>


        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-50 hidden md:flex">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white rotate-90 mb-6">{t("home_hero_scroll")}</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      <div className="flex flex-col items-center w-full pt-20">

        <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
            <div className="py-12 md:px-12 flex flex-col items-center text-center group cursor-default">
              <h3 className="font-black text-2xl md:text-4xl text-white uppercase tracking-tighter mb-4 transition-colors">{t("home_feat1_title")}</h3>
              <p className="text-zinc-400 font-medium text-xs md:text-sm leading-relaxed max-w-xs">
                {t("home_feat1_desc")}
              </p>
            </div>

            <div className="py-12 md:px-12 flex flex-col items-center text-center group cursor-default">
              <h3 className="font-black text-2xl md:text-4xl text-white uppercase tracking-tighter mb-4 transition-colors">{t("home_feat2_title")}</h3>
              <p className="text-zinc-400 font-medium text-xs md:text-sm leading-relaxed max-w-xs">
                {t("home_feat2_desc")}
              </p>
            </div>

            <div className="py-12 md:px-12 flex flex-col items-center text-center group cursor-default">
              <h3 className="font-black text-2xl md:text-4xl text-white uppercase tracking-tighter mb-4 transition-colors">{t("home_feat3_title")}</h3>
              <p className="text-zinc-400 font-medium text-xs md:text-sm leading-relaxed max-w-xs">
                {t("home_feat3_desc")}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full px-6 md:px-24 py-20 mb-10 text-left">
          <div className="mb-12">
            <h2 className="font-black text-4xl md:text-6xl text-white tracking-tighter uppercase mb-4 leading-none">
              {renderTitle(t("home_games_title"))}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg font-medium max-w-4xl border-l-2 border-primary pl-4">
              {t("home_games_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mt-8">
            {/* Game 1: Large Box */}
            <div className="md:col-span-2 relative flex flex-col h-full p-8 md:p-12 bg-[#111] border border-white/5 transition-all group overflow-hidden">
              <div className="flex justify-between items-center mb-12 md:mb-16 relative z-10">
                <h4 className="font-black text-3xl md:text-6xl text-white uppercase tracking-tighter transition-colors duration-300">{t("home_game1_title")}</h4>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded-full">{t("home_game4_tag")}</span>
              </div>
              <div className="mt-auto relative z-10 max-w-xl">
                <p className="text-zinc-400 font-medium text-sm md:text-lg leading-relaxed">
                  {t("home_game1_desc")}
                </p>
              </div>
            </div>

            {/* Game 2: Vertical Box (Minecraft) */}
            <div className="md:col-span-1 md:row-span-2 relative flex flex-col h-full p-8 md:p-12 bg-[#111] border border-white/5 transition-all group overflow-hidden order-last md:order-none">
              <div className="flex flex-col items-start justify-center h-full relative z-10 text-left gap-6">
                <h4 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter transition-colors duration-300 w-full">{t("home_game3_title")}</h4>
                <p className="text-zinc-400 font-medium text-sm md:text-base leading-relaxed">
                  {t("home_game3_desc")}
                </p>
              </div>
            </div>

            {/* Game 3: Small Horizontal Box */}
            <div className="md:col-span-1 relative flex flex-col h-full p-8 bg-[#111] border border-white/5 transition-all group overflow-hidden">
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h4 className="font-black text-3xl text-white uppercase tracking-tighter transition-colors duration-300">{t("home_game2_title")}</h4>
                {t("home_game2_tag") && <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded-full">{t("home_game2_tag")}</span>}
              </div>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed relative z-10">
                {t("home_game2_desc")}
              </p>
            </div>

            {/* Game 4: Medium Box */}
            <div className="md:col-span-1 relative flex flex-col h-full p-8 bg-[#111] border border-white/5 transition-all group overflow-hidden">
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h4 className="font-black text-3xl text-white uppercase tracking-tighter transition-colors duration-300">{t("home_game4_title")}</h4>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded-full">{t("home_game4_tag")}</span>
              </div>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed relative z-10">
                {t("home_game4_desc")}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full px-6 md:px-24 py-20 mb-10 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <h2 className="font-black text-4xl md:text-6xl text-white tracking-tighter uppercase mb-4 leading-none">
                {renderTitle(t("home_moments_title"))}
              </h2>
              <p className="text-zinc-400 text-base md:text-lg font-medium max-w-4xl border-l-2 border-primary pl-4">
                {t("home_moments_desc")}
              </p>
            </div>
            <a href="/gallery" className="inline-flex px-8 py-4 bg-transparent border border-white/20 text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">
              {t("home_moments_btn")}
            </a>
          </div>

          <RandomGalleryPreview />
        </section>

        <section className="w-full pt-20 md:pt-32 pb-16 md:pb-24 mt-12 relative flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] -z-20"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <div className="absolute -right-4 sm:right-0 md:right-5 lg:right-10 -bottom-8 sm:-bottom-12 md:-bottom-16 lg:-bottom-24 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[26rem] lg:h-[26rem] z-20 pointer-events-none">
            <Image
              src="/img/mascot1.webp"
              alt="4Fun Mascot"
              fill
              unoptimized
              className="object-contain object-bottom drop-shadow-2xl"
            />
          </div>

          <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase mb-4 md:mb-6 leading-none">
              {renderTitle(t("home_join_title"))}
            </h2>
            <p className="text-zinc-400 font-medium text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
              {t("home_join_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <a href="https://discord.gg/SrcssWm3xA" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto relative z-10 bg-primary text-white font-black px-8 md:px-12 py-4 md:py-5 text-lg md:text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {t("home_join_btn_discord")}
              </a>
              <a href="https://www.roblox.com/communities/144778500/4F-COMMUNITY" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto relative z-10 bg-transparent border-2 border-white/20 text-white font-black px-8 md:px-12 py-3.5 md:py-[18px] text-lg md:text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {t("home_join_btn_roblox")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
