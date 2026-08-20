import { Users, Mic, Footprints, Swords, Cuboid, Gamepad2, Shield, Crown, Flame } from "lucide-react";
import Image from "next/image";
import RandomGalleryPreview from "@/components/RandomGalleryPreview";
export default function Home() {
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

          <h1 className="font-black text-4xl sm:text-5xl md:text-7xl lg:text-[3rem] tracking-tighter text-zinc-300 mb-2 leading-[0.9] uppercase drop-shadow-2xl">
            Welcome to
          </h1>
          <div className="border-l-8 border-primary pl-4 md:pl-6 md:border-l-0 md:border-b-8 md:pb-2 md:inline-block mb-8 relative">
            <h1 className="font-black text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter text-white leading-[0.9] uppercase drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              4Fun Clan<span className="text-primary">.</span>
            </h1>
          </div>

          <p className="text-zinc-400 font-medium text-base md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed drop-shadow-lg">
            Just a solid community playing and chilling together. We're more than just a clan, we're family.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a href="https://discord.gg/SrcssWm3xA" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">
              JOIN DISCORD
            </a>
            <a href="/members" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-white/10 transition-all text-center backdrop-blur-sm">
              MEET MEMBERS
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-50 hidden md:flex">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white rotate-90 mb-6">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      <div className="flex flex-col items-center w-full pt-20 pb-16">

        <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
            <div className="py-12 md:px-12 flex flex-col items-center text-center group cursor-default">
              <h3 className="font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">Exclusive</h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">
                Quality over quantity. We carefully select our members to ensure that everyone perfectly fits into our established culture.
              </p>
            </div>

            <div className="py-12 md:px-12 flex flex-col items-center text-center group cursor-default">
              <h3 className="font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">Solidarity</h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">
                We stand together through every victory and defeat. No one gets left behind in the lobby, both in-game and out.
              </p>
            </div>

            <div className="py-12 md:px-12 flex flex-col items-center text-center group cursor-default">
              <h3 className="font-black text-3xl md:text-4xl text-white uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">Pure Fun</h3>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">
                Whether we're playing competitively or just hanging out in private servers, our main goal is always the same: having fun.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-20 text-left">
          <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
            <div className="w-full lg:w-1/3 lg:sticky lg:top-32 lg:pt-10">
              <h2 className="font-black text-5xl md:text-6xl text-white tracking-tighter uppercase mb-6 leading-none">
                GAMES WE <span className="text-primary">PLAY.</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium border-l-2 border-primary pl-4">
                These are the main arenas where our clan gathers to chill, practice, and dominate.
              </p>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col">
              <div className="flex flex-col py-10 border-b border-white/5 hover:border-primary transition-colors group relative overflow-hidden -mx-6 px-6 sm:mx-0 sm:px-6">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors -z-10"></div>
                <div className="flex items-baseline justify-between mb-4">
                  <h4 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tighter group-hover:text-primary transition-colors">Evade <span className="text-xl md:text-2xl text-zinc-600 font-bold ml-2 hidden sm:inline-block">/ Roblox</span></h4>
                  <span className="font-bold text-xl text-zinc-600 group-hover:text-primary/50 transition-colors">01</span>
                </div>
                <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-2xl">
                  Run, slide, and revive! We spend countless hours dodging nextbots and saving teammates. It's all about speed and teamwork.
                </p>
              </div>

              <div className="flex flex-col py-10 border-b border-white/5 hover:border-primary transition-colors group relative overflow-hidden -mx-6 px-6 sm:mx-0 sm:px-6">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors -z-10"></div>
                <div className="flex items-baseline justify-between mb-4">
                  <h4 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tighter group-hover:text-primary transition-colors">Blade Ball <span className="text-xl md:text-2xl text-zinc-600 font-bold ml-2 hidden sm:inline-block">/ Roblox</span></h4>
                  <span className="font-bold text-xl text-zinc-600 group-hover:text-primary/50 transition-colors">02</span>
                </div>
                <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-2xl">
                  Reflexes and timing. This is our go-to competitive arena to show off our parry skills and climb the leaderboards.
                </p>
              </div>

              <div className="flex flex-col py-10 hover:border-primary transition-colors group relative overflow-hidden -mx-6 px-6 sm:mx-0 sm:px-6">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors -z-10"></div>
                <div className="flex items-baseline justify-between mb-4">
                  <h4 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tighter group-hover:text-primary transition-colors">Minecraft</h4>
                  <span className="font-bold text-xl text-zinc-600 group-hover:text-primary/50 transition-colors">03</span>
                </div>
                <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-2xl">
                  When we want to take a break from Roblox, we jump into our own survival servers to build massive bases and chill.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-6 py-20 mb-10 text-center">
          <h2 className="font-black text-5xl md:text-6xl text-white tracking-tighter uppercase mb-4 leading-none">
            OUR <span className="text-primary">MOMENTS.</span>
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto mb-12">
            A sneak peek into our best times together. Just vibes, laughs, and pure fun.
          </p>

          <RandomGalleryPreview />

          <a href="/gallery" className="inline-flex px-8 py-4 bg-transparent border border-white/20 text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">
            VIEW FULL GALLERY
          </a>
        </section>

        <section className="w-full pt-32 pb-0 mt-12 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] -z-20"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase mb-6 leading-none">
              JOIN THE <span className="text-primary">FAMILY.</span>
            </h2>
            <p className="text-zinc-400 font-medium text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Looking for a solid community to chill and play with? There's always an empty seat for you here.
            </p>
            <a href="https://discord.gg/SrcssWm3xA" target="_blank" rel="noopener noreferrer" className="relative z-10 bg-primary text-white font-black px-12 py-5 text-xl md:text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              JOIN DISCORD NOW
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
