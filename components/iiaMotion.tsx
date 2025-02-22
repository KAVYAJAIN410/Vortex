"use client";
import React, {useEffect, useState } from "react";
import Image from "next/image";
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
    }, 1200); // Change text every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [cycleCount]);
3
  if (cycleCount >= maxCycles) return null;
  return (
    <div
      className="flex justify-center items-center min-h-screen w-full  bg-black relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1B1A19 100%, rgba(27, 26, 25, 0.00) 50%, #1B1A19 100%)",
      }}
    >
      <h1
        key={currentTextIndex}
        className="absolute z-10 text-[rgb(255,107,0)] text-[69.661px] font-bold font-[BrigendsExpanded]"
        style={{ animation: "fadeInOut 3s ease-in-out " }}
      >
        {texts[currentTextIndex]}
      </h1>
     
    </div>
  );
}