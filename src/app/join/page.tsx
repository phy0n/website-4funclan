import { Metadata } from 'next';
import Countdown from '@/components/Countdown';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join 4Fun Clan | Open Recruitment',
  description: 'Join the 4Fun Clan - A private gaming community. Check the countdown for our next open recruitment phase.',
};

export default function JoinPage() {
  // Set target date for recruitment
  const targetDate = "2026-10-01T00:00:00";

  return (
    <div className="w-full text-white pt-32 pb-20 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white">
            Join 4FUN CLAN
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
            We only open our doors once a month. Wait for the countdown and submit your application on Discord.
          </p>
        </div>

        {/* Countdown Section */}
        <div className="w-full max-w-4xl flex flex-col items-center">
          <h2 className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-10 text-center">
            Time Until Next Intake
          </h2>

          <Countdown targetDate={targetDate} />

          <div className="mt-16 w-full max-w-sm">
            <a
              href="https://discord.gg/SrcssWm3xA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 bg-primary text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-xs transition-all"
            >
              <span className="flex items-center gap-2">
                Apply on Discord <ExternalLink size={16} />
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
