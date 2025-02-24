"use client";
import React, { useEffect, useState } from "react";

export default function IdeateComponent({ onComplete }: { onComplete: () => void }) {
  const texts = ["Unleash", "The", "Mettle"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const maxCycles = 1;

  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 3600);

    if (cycleCount >= maxCycles) return;
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => {
        if (prevIndex + 1 === texts.length) {
          setCycleCount((prev) => prev + 1);
        }
        return (prevIndex + 1) % texts.length;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [cycleCount]);

  if (cycleCount >= maxCycles) return null;

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full bg-black relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1B1A19 100%, rgba(27, 26, 25, 0.00) 50%, #1B1A19 100%)",
      }}
    >
      <h1
        key={currentTextIndex}
        className="absolute z-10 text-[rgb(255,107,0)] text-5xl font-bold font-[BrigendsExpanded]"
        style={{
          transform: "scale(0.5) translateY(50px)",
          opacity: 0,
          animation: "zoomSlide 1.2s ease-in-out forwards",
        }}
      >
        {texts[currentTextIndex]}
      </h1>
      <style>
        {`
          @keyframes zoomSlide {
            0% {
              transform: scale(0.5) translateY(50px);
              opacity: 0;
            }
            50% {
              transform: scale(1.1) translateY(0);
              opacity: 1;
            }
            100% {
              transform: scale(1) translateY(-10px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
