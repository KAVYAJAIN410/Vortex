"use client";
import { useState, useEffect } from "react";

const InnovationText = () => {
  const languages = [
    "INNOVATION",
    "नवाचार",
    "উদ्भाबন",
    "ఆవిష్కరణ",
    "आविष्कार",
    "INNOVATION",
    "انویشن",
    "નવીનતા",
    "ନୂତନତା",
    "INNOVATION",
    "പ്രവണത",
    "ਨਵਾਚਾਰ",
    "نوین",
    "नवाचार",
    "नवीनता",
  ];
  const [languageIndex, setLanguageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
        setFade(false);
      }, 300);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`transition duration-300 ease-in-out ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {languages[languageIndex]}
    </div>
  );
};

export default InnovationText;