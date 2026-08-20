import { Users, Mic, Footprints, Swords, Cuboid, Gamepad2, Shield, Crown, Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-36 md:pt-40 pb-16">
      <section className="w-full max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col items-start md:items-center text-left md:text-center relative">
        <div className="absolute top-0 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <h1 className="font-black text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-white mb-2 leading-[0.9] uppercase">
          Welcome to
        </h1>
        <div className="border-l-8 border-primary pl-4 md:pl-6 md:border-l-0 md:border-b-8 md:pb-2 md:inline-block mb-8">
          <h1 className="font-black text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-white leading-[0.9] uppercase">
            4Fun Clan<span className="text-primary">.</span>
          </h1>
        </div>
        <p className="text-zinc-400 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0 text-center">
          More than just a regular clan, we are a tightly knit community. Not everyone can get in, but once you're here, you're family. We stand <strong className="text-white">solid</strong>, embrace our own, and play as one.
        </p>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
          <div className="py-12 md:px-12 flex flex-col items-center text-center group">
            <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
              <Crown className="w-10 h-10" />
            </div>
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Exclusive</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">
              Quality over quantity. We carefully select our members to ensure that everyone perfectly fits into our established culture.
            </p>
          </div>

          <div className="py-12 md:px-12 flex flex-col items-center text-center group">
            <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-10 h-10" />
            </div>
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Solidarity</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">
              We stand together through every victory and defeat. No one gets left behind in the lobby, both in-game and out.
            </p>
          </div>

          <div className="py-12 md:px-12 flex flex-col items-center text-center group">
            <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-10 h-10" />
            </div>
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Pure Chaos</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-xs">
              Whether we're sweating in ranked matches or trolling in private servers, our main goal is always the same: having fun.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-20 text-left">
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="font-black text-5xl md:text-6xl text-white tracking-tighter uppercase mb-6 leading-none">
              GAMES WE <span className="text-primary">PLAY.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-medium border-l-2 border-primary pl-4">
              These are the main arenas where our clan gathers to chill, practice, and dominate.
            </p>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col">
            {/* Game 1 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-10 border-b border-white/5 hover:bg-white/[0.02] transition-colors -mx-6 px-6 sm:mx-0 sm:px-6 rounded-2xl group">
              <div className="flex items-center justify-center text-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shrink-0 md:mr-2">
                <Footprints className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-3xl text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">Evade</h4>
                <p className="text-zinc-400 font-medium text-base leading-relaxed">
                  Run, slide, and revive! We spend countless hours in this Roblox horror-survival map dodging nextbots and saving teammates.
                </p>
              </div>
            </div>

            {/* Game 2 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-10 border-b border-white/5 hover:bg-white/[0.02] transition-colors -mx-6 px-6 sm:mx-0 sm:px-6 rounded-2xl group">
              <div className="flex items-center justify-center text-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shrink-0 md:mr-2">
                <Swords className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-3xl text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">Blade Ball</h4>
                <p className="text-zinc-400 font-medium text-base leading-relaxed">
                  Reflexes and timing. This is our go-to competitive Roblox arena to show off our parry skills and climb the leaderboards.
                </p>
              </div>
            </div>

            {/* Game 3 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-10 hover:bg-white/[0.02] transition-colors -mx-6 px-6 sm:mx-0 sm:px-6 rounded-2xl group">
              <div className="flex items-center justify-center text-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shrink-0 md:mr-2">
                <Cuboid className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-3xl text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">Minecraft</h4>
                <p className="text-zinc-400 font-medium text-base leading-relaxed">
                  When we want to take a break from Roblox, we jump into our own survival servers to build massive bases and chill.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="w-full py-32 mt-12 relative overflow-hidden flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] -z-20"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="font-black text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase mb-6 leading-none">
            JOIN THE <span className="text-primary">FAMILY.</span>
          </h2>
          <p className="text-zinc-400 font-medium text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Looking for a solid community to play and chill with? Whether you want to rank up together or just hang out in voice chat, there's always an empty seat for you here.
          </p>
          <a href="https://discord.gg/SrcssWm3xA" target="_blank" rel="noopener noreferrer" className="relative z-10 bg-primary text-white font-black px-12 py-5 text-xl md:text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            JOIN DISCORD NOW
          </a>
        </div>
      </section>
    </div>
  );
}
