"use client";

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className="flex gap-4 md:gap-6 justify-center items-start pt-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-4xl md:text-6xl font-black text-white/20 mt-1 md:mt-2">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-4xl md:text-6xl font-black text-white/20 mt-1 md:mt-2">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-4xl md:text-6xl font-black text-white/20 mt-1 md:mt-2">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-black text-6xl md:text-8xl text-white tracking-tighter drop-shadow-lg z-10">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mt-2">
        {label}
      </span>
    </div>
  );
}
