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

      {/* Core Values Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-white/5 p-10 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Crown className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Exclusive</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed">
              Quality over quantity. We carefully select our members to ensure that everyone perfectly fits into our established culture.
            </p>
          </div>

          <div className="bg-[#111] border border-white/5 p-10 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Solidarity</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed">
              We stand together through every victory and defeat. No one gets left behind in the lobby, both in-game and out.
            </p>
          </div>

          <div className="bg-[#111] border border-white/5 p-10 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Pure Chaos</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed">
              Whether we're sweating in ranked matches or trolling in private servers, our main goal is always the same: having fun.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-7xl mx-auto px-6 py-12 text-left">
        <div className="flex flex-col md:flex-row gap-16 justify-between items-start">
          <div className="w-full md:w-1/4">
            <h2 className="font-black text-5xl md:text-6xl text-white tracking-tighter uppercase mb-6 leading-none">
              GAMES WE PLAY.
            </h2>
            <p className="text-zinc-400 text-lg font-medium border-l-2 border-primary pl-4">
              These are the main arenas where our clan gathers to chill, practice, and dominate.
            </p>
          </div>

          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-[#111] p-8 rounded-none border border-white/5 hover:border-white/20 transition-colors flex flex-col">
              <Footprints className="w-10 h-10 text-primary mb-6" />
              <h4 className="font-black text-2xl text-white uppercase tracking-tight mb-3">
                Evade
              </h4>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                Run, slide, and revive! We spend countless hours in this Roblox horror-survival map dodging nextbots and saving teammates.
              </p>
            </div>

            <div className="bg-[#111] p-8 rounded-none border border-white/5 hover:border-white/20 transition-colors flex flex-col">
              <Swords className="w-10 h-10 text-primary mb-6" />
              <h4 className="font-black text-2xl text-white uppercase tracking-tight mb-3">
                Blade Ball
              </h4>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                Reflexes and timing. This is our go-to competitive Roblox arena to show off our parry skills and climb the leaderboards.
              </p>
            </div>

            <div className="bg-[#111] p-8 rounded-none border border-white/5 hover:border-white/20 transition-colors flex flex-col">
              <Cuboid className="w-10 h-10 text-primary mb-6" />
              <h4 className="font-black text-2xl text-white uppercase tracking-tight mb-3">
                Minecraft
              </h4>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                When we want to take a break from Roblox, we jump into our own survival servers to build massive bases and chill.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
