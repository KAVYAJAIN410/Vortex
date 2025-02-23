"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import grid from "@/assets/grid.png";
import { motion, useInView } from "framer-motion";


const trackDetails = [
  // {
  //   title: "Interactive Engagement (Gamified Solutions)",
  //   name: "Interactive Engagement",
  //   content:
  //     "This track is all about engaging applications with gamified mechanisms. Create solutions which promote enhanced interaction and user-retention with the help of immersive technologies and reward systems.",
  // },
  // {
  //   title: "Eco-Innovations (Sustainable Technology)",
  //   name: "Eco-Innovations",
  //   content:
  //     "Technology is all about problem solving and enriching the life of users. Provide technical solutions which promote sustainability and a better environment. Improve the current technologies to make them more sustainable or develop brand new solutions.",
  // },
  // {
  //   title: "Community Building",
  //   name: "Community Building",
  //   content:
  //     "This track focuses on fostering stronger, more connected communities. Participants are tasked with creating platforms or tools that promote unity and communal engagement.",
  // },
  // {
  //   title: "Future of Work",
  //   name: "Future of Work",
  //   content:
  //     "This track explores the evolving nature of work in the digital era. Participants are encouraged to develop solutions that enhance productivity and redefine traditional work models. Participants can also build solutions that fine-tune LLMs or use vector databases to change the work landscape.",
  // },
  // {
  //   title: "Ethical Technology",
  //   name: "Ethical Technology",
  //   content:
  //     "This track focuses on developing solutions promoting responsible innovation, privacy, fairness, and transparency in the tech industry. Participants are tasked with addressing societal concerns such as data privacy and security. Participants can also focus on combating unethical use of tech and emphasise integrity and accountability in technology design and deployment.",
  // },
  // {
  //   title: "Open Innovation",
  //   name: "Open Innovation",
  //   content:
  //     "This track focuses on embracing creativity to solve diverse challenges. Participants are encouraged to explore groundbreaking ideas across sectors and implement interdisciplinary approaches and collaborative problem-solving. If you have any idea that doesn’t fit in any of the other tracks, this track is for you.",
  // },
];

const Tracks = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrack(null);
  };

  return (
    <div className="relative flex flex-col justify-center" id="tracks">
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
        <h1 className="absolute top-9 font-vcr text-5xl md:text-8xl text-black mb-10  z-10 font-[BrigendsExpanded]">
          TRACKS
        </h1>
      
       
       
        <motion.h1
      className="uppercase text-5xl md:text-6xl lg:text-9xl font-bold text-center font-[GreaterTheory] text-white opacity-100 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{
        opacity: 1,
        scale: [1, 1.1, 1], // Pulsating scale effect
        y: 0, // Moves up into position
        textShadow: [
          "0 0 5px rgba(255, 255, 255, 0.5)",
          "0 0 20px rgba(255, 255, 255, 0.8)",
          "0 0 5px rgba(255, 255, 255, 0.5)",
        ], // Glowing text shadow
      }}
      transition={{
        duration: 1.5, // Total animation duration
        repeat: Infinity, // Loop the animation
        repeatType: "mirror", // Smoothly reverse the animation
        ease: "easeInOut", // Smooth easing
        scale: {
          type: "spring", // Bouncy scale effect
          stiffness: 300,
          damping: 10,
        },
        y: {
          type: "spring", // Bouncy vertical movement
          stiffness: 120,
          damping: 15,
        },
      }}
    >
      COMING SOON!
    </motion.h1>

        {/* Grid for Desktop
        <div className="relative z-10 hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {trackDetails.map((track, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="bg-black rounded-xl p-6 h-full flex flex-col justify-between"> */}
                {/* Header */}
                {/* <div className="font-[GreaterTheory] text-left">
                  <span className="font-bold text-xl text-white">
                    {track.name}
                  </span>
                </div> */}

                {/* Content */}
                {/* <div className="mt-4 flex-1">
                  <p className="text-sm leading-6 text-gray-300 font-[PoppinsRegular]">
                    {track.content}
                  </p>
                </div>

                {/* Footer (if needed) */}
                {/* <div className="mt-4"> */}
                  {/* Add any footer content here */}
                {/* </div>
              </div> */}
            {/* </motion.div>
          ))}
        </div> */} 
        {/* List for Mobile */}
        {/* <div className="relative z-10 w-full md:hidden">
          <div className="flex flex-col space-y-4">
            {trackDetails.map((track, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className="bg-black rounded-xl p-4 cursor-pointer"
                  onClick={() => handleTrackClick(track)}
                >
                  <div className="font-[GreaterTheory] text-left">
                    <span className="font-bold text-md text-white">
                      {track.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

    {/* Modal for Track Description */}
     {/* {isModalOpen && selectedTrack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl p-6 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={closeModal}
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="font-[GreaterTheory] text-xl font-bold mb-4 text-white">
              {selectedTrack.name}
            </h2>
            <p className="text-sm leading-6 text-gray-300 font-[PoppinsRegular]">
              {selectedTrack.content}
            </p>
          </div>
        </div>
      )*/}
    </div>
    </div>
  );
}; 

export default Tracks;