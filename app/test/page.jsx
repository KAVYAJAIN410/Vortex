"use client";

import Footer from "@/components/footer";
import RegistrationButtons from "../../components/dashboard";
import SignInBtn from "@/components/signinButton";
import Sponsors from "@/components/sponsors";
import FaqContent from "@/components/faq";
import React, { useState, useEffect, useRef } from "react";

const gridSquares = Array(25).fill(0);

const walls = [
  {
    origin: "left",
    transform: "rotateY(90deg)",
    width: "3000px",
    left: "0px",
    bottom: "0px",
  },
  {
    origin: "top",
    transform: "rotateX(-90deg)",
    height: "3000px",
    top: "0px",
    left: "0px",
  },
  {
    origin: "right",
    transform: "rotateY(-90deg)",
    width: "3000px",
    top: "0px",
    right: "0px",
  },
  {
    origin: "bottom",
    transform: "rotateX(90deg)",
    height: "3000px",
    left: "0px",
    bottom: "0px",
  },
];

const imageSources = [
  "data:image/jpeg;base64,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",
  
];

const imagePositions = [1, 3, 0, 2, 4];

export default function Page() {
  const [depth, setDepth] = useState(0);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const animate = () => {
      setDepth((prev) => (prev + 5) % 5000); // Adjust the speed and depth range as needed
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  return (
    <div>
      <div className="relative flex justify-center items-center max-h-[80%]">
        <div
          className="w-full h-screen "
          style={{
            perspective: "1500px",
            overflow: "hidden",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `translateZ(${depth}px)`,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* Render multiple layers of walls for infinite effect */}
            {[...Array(10)].map((_, layerIndex) =>
              walls.map((wall, i) => (
                <div
                  key={`${layerIndex}-${i}`}
                  className="absolute grid grid-cols-5 grid-rows-5  border-purple-500"
                  style={{
                    transform: `${wall.transform} translateZ(${
                      layerIndex * 5000
                    }px)`, // Adjust the spacing between layers
                    transformOrigin: wall.origin,
                    width: wall.width ?? "100%",
                    height: wall.height ?? "100%",
                    left: wall.left ?? "auto",
                    top: wall.top ?? "auto",
                    right: wall.right ?? "auto",
                    bottom: wall.bottom ?? "auto",
                  }}
                >
                  {gridSquares.map((_, j) => {
                    const column = j % 5;
                    const row = Math.floor(j / 5);
                    return (
                      <div
                        key={`cell-${j}`}
                        className="bg-orange-50 border-pink-700"
                        style={{ border: "2px solid orange", backfaceVisibility: "hidden", }}
                      >
                        {row === imagePositions[column] && (
                          <img
                            src={imageSources[column % imageSources.length]}
                            alt={`Image ${column}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error("Image failed to load:", e.target.src);
                              e.target.alt = "Failed to load";
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Overlay content with blur effect */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateZ(${depth / 2}px)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <div
            className="w-[50%] h-[50%] flex flex-col items-center justify-center bg-white border-none backdrop-blur-lg rounded-3xl p-8"
            
          >
            <h1 className="text-8xl font-bold">E-Summit'25</h1>
           
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-md text-lg">
             Register Now
            </button>
          </div>
        </div>
      </div>
      <section className="w-screen h-screen">

      <SignInBtn/>
      <RegistrationButtons
       eventUrls={{
        1: "/events/event1/createTeam", 
        2: "/events/event2", 
        3: "/events/event3", 
        4: "/events/event4", 
        5: "/events/event5", 
      }}
      />
      {/* <Marq speed1={100} speed2={50} speed3={75} speed4={120} /> */}
    
      
 
      <Sponsors />
      <FaqContent/>

      </section>
    </div>
  );
}