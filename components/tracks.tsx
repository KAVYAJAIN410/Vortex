"use client";

import React from "react";

import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import grid from "@/assets/grid.png";
import { motion, useInView } from "framer-motion";

const trackDetails = [
  {
    title: "Interactive Engagement (Gamified Solutions)",
    name: "Interactive Engagement",
    content:
      "This track is all about engaging applications with gamified mechanisms. Create solutions which promote enhanced interaction and user-retention with the help of immersive technologies and reward systems.",
  },
  {
    title: "Eco-Innovations (Sustainable Technology)",
    name: "Eco-Innovations",
    content:
      "Technology is all about problem solving and enriching the life of users. Provide technical solutions which promote sustainability and a better environment. Improve the current technologies to make them more sustainable or develop brand new solutions.",
  },
  {
    title: "Community Building",
    name: "Community Building",
    content:
      "This track focuses on fostering stronger, more connected communities. Participants are tasked with creating platforms or tools that promote unity and communal engagement.",
  },
  {
    title: "Future of Work",
    name: "Future of Work",
    content:
      "This track explores the evolving nature of work in the digital era. Participants are encouraged to develop solutions that enhance productivity and redefine traditional work models. Participants can also build solutions that fine-tune LLMs or use vector databases to change the work landscape.",
  },
  {
    title: "Ethical Technology",
    name: "Ethical Technology",
    content:
      "This track focuses on developing solutions promoting responsible innovation, privacy, fairness, and transparency in the tech industry. Participants are tasked with addressing societal concerns such as data privacy and security. Participants can also focus on combating unethical use of tech and emphasise integrity and accountability in technology design and deployment.",
  },
  {
    title: "Open Innovation",
    name: "Open Innovation",
    content:
      "This track focuses on embracing creativity to solve diverse challenges. Participants are encouraged to explore groundbreaking ideas across sectors and implement interdisciplinary approaches and collaborative problem-solving. If you have any idea that doesn’t fit in any of the other tracks, this track is for you.",
  },
];

const Tracks = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col justify-center" id="tracks" >
      
      <div
        className="min-h-screen bg-[#FF6B00] flex flex-col justify-center items-center p-10 relative"
        ref={containerRef}
      >
        {/* Grid Image Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            alt="grid"
            src={grid}
            layout="fill"
            objectFit="cover"
            className="opacity-40"
          />
        </div>

        {/* Title */}
        <h1
          className="font-vcr text-5xl md:text-8xl text-black mb-10 relative z-10 font-[BrigendsExpanded]"
         
        >
          TRACKS
        </h1>

        {/* Grid for Desktop, Carousel for Mobile */}
        <div className="relative z-10 hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {trackDetails.map((track, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="bg-black rounded-xl w-72 h-72">
                {/* Header Bar */}
                <div className="flex justify-center">
                <div className="font-[GreaterTheory] text-left p-2 flex justify-center items-center h-fit w-fit">
                  <span className="font-bold text-md">{track.name}</span>
                  
                </div>
                </div>
                <div className="p-4">
                  {/* Content */}
                  <div className="p-2 text-xs leading-5 text-gray-300 font-[PoppinsRegular]">
                    {track.content}
                  </div>
                  {/* Footer */}
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Swiper Carousel for Mobile */}
        <div className="relative z-10 w-full md:hidden">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={15}
            slidesPerView={1}
            className="w-full max-w-sm"
          >
            {trackDetails.map((track, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="bg-black rounded-xl w-72 h-72 mx-auto">
                    {/* Header Bar */}
                    <div className="flex justify-center">
                <div className="font-[GreaterTheory] text-left p-2 flex justify-center items-center h-fit w-fit">
                  <span className="font-bold text-md">{track.name}</span>
                  
                </div>
                     
                    </div>
                    <div className="p-4">
                      {/* Content */}
                      <div className="p-2 text-xs leading-5 text-gray-300 font-[PoppinsRegular]">
                        {track.content}
                      </div>
                      {/* Footer */}
                      
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Tracks;