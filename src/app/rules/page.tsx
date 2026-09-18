
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules | 4Fun Clan",
  description: "Absolute rules of the 4Fun Clan.",
};

export default function RulesPage() {
  const rules = [
    {
      title: "No Racism",
      description: "Everyone here is equal, regardless of where they are from. Anyone being racist will get an automatic warning."
    },
    {
      title: "No NSFW / 18+ Topics",
      description: "Do not discuss adult topics, send inappropriate pictures, or weird links. This server is for chilling, not for 'those' things."
    },
    {
      title: "No Spam",
      description: "Do not spam the chat, emojis, Voice Channels, or mention people without reason. Be considerate of others whose messages might get drowned out."
    },
    {
      title: "Respect Privacy",
      description: "Do not pry into or share other people's personal information without permission. Privacy is important, Not everything is meant for public consumption."
    },
    {
      title: "Keep It Friendly & Safe",
      description: "Avoid topics that are too personal, sensitive, or could make others uncomfortable. Focus on server-related topics so everyone feels at home."
    },
    {
      title: "Communication",
      description: "If there are any problems or important information regarding the clan whether it's an issue with another member, changing your Roblox display name, or wanting to leave, you are required to inform the admins to avoid misunderstandings."
    },
    {
      title: "No Hode / Gay",
      description: "You already know what this means..."
    },
    {
      title: "No False Accusations",
      description: "Do not assume you are being ignored or left out of circles without any solid proof."
    },
    {
      title: "No Double Clan",
      description: "You cannot be in 2 clans simultaneously. (e.g., 4Akeno67clan)."
    }
  ];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-20 pt-32 md:pt-40">
      <div className="relative z-20 max-w-4xl px-6 md:px-24 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase">
            4Fun Clan / Rules
          </p>
        </div>
        <h1 className="text-white font-black text-[13vw] sm:text-5xl md:text-7xl tracking-tighter mb-4 md:mb-6 leading-none uppercase whitespace-nowrap">
          RULES<span className="text-primary">.</span>
        </h1>
        <p className="text-zinc-400 font-medium text-sm md:text-xl leading-relaxed max-w-3xl border-l-2 border-primary pl-4">
          Strict rules that must be obeyed by all members of the 4Fun Clan. Violating these rules can result in fatal consequences.
        </p>
      </div>

      <div className="w-full px-6 md:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 w-full pt-10 border-t border-white/10">
          {rules.map((rule, index) => (
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
