"use client"
import React, { useEffect } from 'react';

interface AnimationProps {
  rowNumber: number
}

const luminanceRating = '``..--\'\'::__,^=;;>><<+!rc*/z?sLv)J7(|FiCfI31tluneoxjyawk694pGUKH8D$gMW%@';

function generateString(desiredLuminance: number, numChars: number): string {
  const len = luminanceRating.length;
  const step = Math.floor(len / 12);
  const baseStart = step * (desiredLuminance - 1);
  const baseEnd = baseStart + step;

  let result = '';
  for (let i = 0; i < numChars; i++) {
    const start = baseStart + Math.floor(Math.random() * step / 2);
    const end = baseEnd + Math.floor(Math.random() * step / 2);
    const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;
    result += luminanceRating[randomIndex];
  }

  return result;
}

const AnimationHero = (props: AnimationProps) => {
  const [line, setLine] = React.useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const newString = generateString(props.rowNumber, 600);
      setLine(newString);
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='w-full flex justify-between text-[#0281F0] opacity-50 whitespace-nowrap font-mono '>
      {line}
    </div>
  )
};

export default AnimationHero;