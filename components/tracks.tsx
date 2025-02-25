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
  {
    title: "Nature-Inspired Locomotion and Extreme Environments",
    name: "Nature-Inspired Locomotion and Extreme Environments ",
    content:
    "Explore the future of movement by designing bio-inspired locomotion systems that mimic nature’s most innovative mechanisms—walking, crawling, swimming, hopping, flying, and beyond. Push the boundaries of mechanical design with creative alternatives to conventional rolling and aerial systems, embracing the ingenuity of natural motion. Consider how these innovations can adapt to extreme environments, including underwater robotics, by incorporating features like pressure-resistant structures, hydrodynamic propulsion, and modular buoyancy control to enhance versatility and resilience."
  },
  {
    title: "Rehabilitation Robotics ",
    name: "Rehabilitation Robotics ",
    content:
    "Design robotic solutions to assist the physically challenged, that support physiotherapy and rehabilitation. Develop innovative yet practical systems—such as exoskeletons, assistive devices, and robotic therapy tools—that enhance strength and independence. Prioritize real-world feasibility, manufacturability, and intuitive human-robot interaction to create accessible, comfortable, and effective rehabilitation technologies. "
  },
  {
    title: "Humanoid Robotics",
    name: "Humanoid Robotics",
    content:
    "Develop specialized humanoid robotic functionalities that enhance movement, dexterity, and interaction. Explore animatronics for lifelike expressions and gestures, dexterous robotic hands with soft robotics, and innovative joint mechanisms for natural motion. Focus on modularity and adaptability while ensuring feasibility and manufacturability, creating practical and scalable solutions that bring humanoid robotics closer to real-world applications."
  },
  {
    title: "Household Robotics",
    name: "Household Robotics",
    content:
    "Transform everyday tasks with innovative mechanical solutions that enhance efficiency and convenience in household environments. Improve robotic systems for chores like cleaning, dish handling, laundry automation, and smart storage while developing creative mechanisms for kitchen assistance and home appliances. Focus on well-engineered designs that bring fresh ideas to home robotics while refining existing concepts where needed."
  },
  {
    title: "Robotics in Agriculture",
    name: "Robotics in Agriculture ",
    content:
      "Develop revolutionary mechanical solutions that enhance efficiency, sustainability, and automation for farmers in India. From advanced seeding and harvesting mechanisms to innovative irrigation, soil management, and crop-handling systems, design unique approaches that go beyond conventional rovers and drones. Focus on user-centric, well-engineered designs that improve usability, adaptability, and real-world applicability in agricultural operations.",
  },
  {
    title: "Open Ended",
    name: "Open Ended",
    content:
      "Explore groundbreaking mechanical solutions that extend beyond the specified track categories. Whether it's a novel actuation method, an advanced re-configurable structural or innovative mechanism subject to robotics. Present original, well-engineered designs that push the boundaries of mechanical innovation."
  },

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
        <h1 className="font-vcr text-5xl md:text-8xl text-black mb-10 z-10 font-[BrigendsExpanded]">
          TRACKS
        </h1>

        <div className="relative z-10 hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {trackDetails.map((track, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              <div className="bg-black rounded-xl p-6 h-full flex flex-col justify-between items-center">
                {/* Header */}
                <div className="font-[GreaterTheory] text-left">
                  <span className="font-bold text-xl text-white">
                    {track.name}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-4 flex-1 ">
                  <p className="text-sm leading-6 text-gray-300 font-[PoppinsRegular]">
                    {track.content}
                  </p>
                </div>

                {/* Footer (if needed) */}
                <div className="mt-4">
                  {/* Add any footer content here */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* List for Mobile */}
        <div className="relative z-10 w-full md:hidden">
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
      </div>

      {/* Modal for Track Description */}
      {isModalOpen && selectedTrack && (
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
      )}
    </div>
  );
};

export default Tracks;
