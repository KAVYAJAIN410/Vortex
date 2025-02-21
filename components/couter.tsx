"use client";
import React, { useState, useEffect } from "react";
import "../app/globals.css";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null;

type CountdownTimerProps = {
  targetDate: string;
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // 🔥 Initially set to null to avoid SSR mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);

  useEffect(() => {
    // ✅ Only run after mount (prevents SSR mismatch)
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (number: number) => String(number).padStart(2, "0");

  // ❌ Prevent rendering before hydration
  if (!timeLeft) return null;

  return (
    <div className="flex items-center justify-center text-black ">
      <div className="flex space-x-1 p-2">
        {[
          { label: "D", value: timeLeft.days },
          { label: "H", value: timeLeft.hours },
          { label: "M", value: timeLeft.minutes },
          { label: "S", value: timeLeft.seconds },
        ].map((time, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="relative w-16 h-20 sm:w-24 sm:h-28 text-4xl font-[PoppinsRegular] font-bold rounded-md flex items-center justify-center shadow-sm border border-red-500 border-opacity-55 before:absolute before:w-full before:h-0.5 before:bg-red-900 before:opacity-60 before:top-1/2 before:left-0 before:-translate-y-1/2 bg-white z-50"
              style={{ backgroundColor: "#FF6B00" }}
            >
              {formatNumber(time.value)}
            </div>
            <span className="text-xs mt-1 uppercase">{time.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
