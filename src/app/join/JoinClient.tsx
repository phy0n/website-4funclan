"use client";

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface JoinClientProps {
  targetDate: string;
}

export default function JoinClient({ targetDate }: JoinClientProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setIsExpired(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full text-white pt-32 pb-20 flex flex-col items-center justify-center min-h-screen">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="text-center mb-8 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
            4FUN OPEN MEMBER
          </h1>
        </div>

        <div className="w-full max-w-4xl flex flex-col items-center">
          <h2 className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-10 text-center">
            {isExpired ? "Recruitment Status" : "Time Until Next Intake"}
          </h2>

          {!isClient ? (
            <div className="h-32" />
          ) : isExpired ? (
            <div className="flex flex-col items-center justify-center py-2">
              <span className="font-black text-6xl sm:text-7xl md:text-9xl text-white tracking-tighter uppercase drop-shadow-2xl">
                OPEN
              </span>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-4 md:gap-6 justify-center items-start pt-4 w-full px-2">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="text-3xl sm:text-4xl md:text-6xl font-black text-white/20 mt-1 md:mt-2">:</span>
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <span className="text-3xl sm:text-4xl md:text-6xl font-black text-white/20 mt-1 md:mt-2">:</span>
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <span className="text-3xl sm:text-4xl md:text-6xl font-black text-white/20 mt-1 md:mt-2">:</span>
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
          )}

          <div className="mt-16 w-full max-w-sm">
            <a
              href="https://discord.gg/dhDyagJhsw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 bg-primary text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20 hover:shadow-white/20">
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

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-black text-4xl sm:text-6xl md:text-8xl text-white tracking-tighter drop-shadow-lg z-10">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1 sm:mt-2">
        {label}
      </span>
    </div>
  );
}

