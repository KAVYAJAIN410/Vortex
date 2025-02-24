"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import RegisterButton from "@/components/dashboard";
import bg from "@/assets/Noise & Texture.png";
import Tracks from "@/components/tracks";
import CustomTimeline from "@/components/timeline.jsx";
import Sponsors from "@/components/sponsors";
import CountdownTimer from "@/components/couter";
import FAQs from "@/components/FAQ";
import IdeateComponent from "@/components/iiaMotion";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MotionConfig, motion, useAnimation } from "framer-motion";
import { animate, useInView } from "framer-motion";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Footer } from "@/components/footer.jsx";

const gridSquares = Array(15).fill(0);

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
    "https://res.cloudinary.com/dfrb2fapb/image/upload/v1740376484/IMG-20250224-WA0004_yibuwz.jpg",
    "https://res.cloudinary.com/dfrb2fapb/image/upload/v1740376474/IMG-20250224-WA0005_ytioe0.jpg",
    "https://res.cloudinary.com/dfrb2fapb/image/upload/v1740376469/IMG-20250224-WA0007_h8i9qh.jpg",
    "https://res.cloudinary.com/dfrb2fapb/image/upload/v1740376463/IMG-20250224-WA0009_krffk3.jpg",
    "https://robovitics.in/images/carousel-6.jpg"
 
  // 
  ]
  
const imagePositions = [1, 3, 5, 0, 4, 2];

export default function Hero() {
  const threeContainerRef = useRef(null);
  const inView = useInView(threeContainerRef, { once: true });
  const controls = useAnimation();
  if (inView) {
    controls.start("visible");
  }
  const textAnimationControls = useAnimation();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth / 2;
      const newHeight = window.innerHeight / 2;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      3,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff, 0);
    if(window.innerWidth < 900){
        renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.6);
    }
    else{
    renderer.setSize(window.innerWidth * 0.4, window.innerHeight * 0.4);
    }
    document.getElementById("three-container").appendChild(renderer.domElement);
    const loader = new GLTFLoader();
    loader.load("plain white 3d logo.gltf", (gltf) => {
      const model = gltf.scene;
      model.rotation.x = -0.3;
      model.rotation.y = 0;
      model.rotation.z = 0;
      if (window.innerWidth < 900) {
        model.scale.set(10, 10, 10);
      } else {
        model.scale.set(33, 33, 33);
      }
      scene.add(model);

      camera.position.set(0, 4, 10);
      if (window.innerWidth > 300) {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI * 4;
        controls.enableZoom = false;
      }
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);

      const animate = function () {
        requestAnimationFrame(animate);

        model.rotation.y += 0.005;

        renderer.render(scene, camera);
      };
      renderer.setSize(
        threeContainerRef.current.clientWidth - 20,
        threeContainerRef.current.clientHeight
      );
      const handleResize = () => {
        const newWidth = window.innerWidth / 2;
        const newHeight = window.innerHeight / 2;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth - 20, newHeight);
      };
      window.addEventListener("resize", handleResize);

      animate();

      textAnimationControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut", delay: 2 },
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      const threeContainer = document.getElementById("three-container");
      if (threeContainer && threeContainer.contains(renderer.domElement)) {
        threeContainer.removeChild(renderer.domElement);
      }
    };
  }, [textAnimationControls]);

  const [depth, setDepth] = useState(0);
  const [isTunnelComplete, setIsTunnelComplete] = useState(false);
  const tunnelRef = useRef(null);
  const [ideateCompleted, setIdeateCompleted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Adjust the breakpoint as needed
      if(window.innerWidth < 640){
        setIsTunnelComplete(true);
      }
     
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let touchStartY = 0;
  
    const handleScroll = (e) => {
      if (isTunnelComplete) return; // Allow normal scrolling if tunnel is complete
  
      // Prevent default scrolling behavior
      e.preventDefault();
  
      // Calculate scroll delta (how much the user scrolled)
      const delta = e.deltaY || e.detail || -e.wheelDelta;
  
      // Only allow scrolling deeper into the tunnel (positive delta)
      if (delta > 0) {
        setDepth((prevDepth) => {
          const newDepth = prevDepth + delta * 0.5; // Adjust sensitivity here
          return Math.min(newDepth, 5000); // Limit depth to 5000px (adjust as needed)
        });
      }
  
      // Check if tunnel is complete
      if (depth >= 3000) {
        setIsTunnelComplete(true);
      }
    };
  
    const handleTouchStart = (e) => {
      // Store the initial touch position
      touchStartY = e.touches[0].clientY;
    };
  
    const handleTouchMove = (e) => {
      if (isTunnelComplete) return; // Allow normal scrolling if tunnel is complete
  
      // Prevent default scrolling behavior
      e.preventDefault();
  
      // Calculate touch delta (how much the user scrolled)
      const touchEndY = e.touches[0].clientY;
      const delta = touchStartY - touchEndY;
  
      // Only allow scrolling deeper into the tunnel (positive delta)
      if (delta > 0) {
        setDepth((prevDepth) => {
          const newDepth = prevDepth + delta * 6; // Adjust sensitivity here
          return Math.min(newDepth, 5000); // Limit depth to 5000px (adjust as needed)
        });
      }
  
      // Update touchStartY for the next move event
      touchStartY = touchEndY;
  
      // Check if tunnel is complete
      if (depth >= 3000) {
        setIsTunnelComplete(true);
      }
    };
  
    // Add scroll and touch event listeners
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
  
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isTunnelComplete, depth]);
  return (
    <div
      className={
        ideateCompleted
          ? "page-container bg-neutral-950 min-h-screen z-0"
          : "overflow-hidden h-screen z-0"
          
      }
      id="home"
    >
      {!ideateCompleted && (
        <IdeateComponent onComplete={() => setIdeateCompleted(true)} />
      )}

      {/* Tunnel Section */}
      <div
        className={`relative flex ${
          isTunnelComplete ? "justify-normal" : "justify-center"
        } items-center max-h-[80%] `}
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div
          className={`w-full h-screen opacity-75 ${isSmallScreen||isTunnelComplete?"hidden":"visible"} `}
          style={{
            perspective: "1500px",
            overflow: "hidden",
          }}
          ref={tunnelRef}
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
            {[...Array(5)].map((_, layerIndex) =>
              walls.map((wall, i) => (
                <div
                  key={`${layerIndex}-${i}`}
                  className={`absolute grid 
                   ${
                     wall.origin === "top" || wall.origin === "bottom"
                       ? "grid-cols-3 grid-rows-5"
                       : "grid-cols-5 grid-rows-3"
                   }
                  border-purple-500`}
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
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {gridSquares.map((_, j) => {
                    const column = j % 3;
                    const row = Math.floor(j / 3);
                    return (
                      <div
                        key={`cell-${j}`}
                        className="bg-neutral-800 border-purple-300 opacity-75"
                        style={{
                          border: "2px solid #FF6B00",
                          backfaceVisibility: "hidden",
                          transform: "translate3d(0, 0, 0)", // Enable hardware acceleration
                        }}
                      >
                        {row === imagePositions[column] && (
                          <img
                            src={imageSources[column % imageSources.length]}
                            alt={`Image ${column}`}
                            className="w-full h-full object-cover z-[1000]"
                            onError={(e) => {
                              console.error(
                                "Image failed to load:",
                                
                              );
                            }}
                          />
                        )}
                        <Image src={bg} alt="" className="cover w-full h-full opacity-100 "></Image>
                        

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
          className="absolute flex z-50 opacity-100"
          style={{
            transform: `translateZ(${(3 * depth) / 4}px)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <motion.div
            className={`${
              isTunnelComplete ? "w-[100vw] h-[100vh] min-h-fit" : "w-[50vw] h-[50vh]"
            } flex flex-col  items-center  -z-10
               ${isTunnelComplete ? "bg-transparent" : "bg-neutral-900"}
                 ${isTunnelComplete ? "md:flex-row" : "md:flex-col"}
             border-none rounded-md justify-between p-4`}
            style={{ justifyContent: "center" }}
            layout // Enables layout animations
            transition={{ duration: 0.5 }} // Animation duration
          >
            <motion.div
              id="three-container"
              ref={threeContainerRef}
              variants={{
                hidden: { scale: 1 },
                visible: { scale: 1 },
              }}
              layout
              initial="hidden"
              transition={{ duration: 2 }}
            ></motion.div>
            <motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isTunnelComplete ? 1 : 0 }}
                transition={{ duration: 2 }}
                className={`text-white mb-4 text-5xl lg:text-7xl myCustomFont2 ${
                  isTunnelComplete ? "visible" : "hidden"
                }`}
              >
                <span className="text-[#FF6B00] font-[BrigendsExpanded]">
                  UNLEASH
                </span>
                <br></br>
                <span className="font-[BrigendsExpanded]">THE METTLE</span>
              </motion.p>
              <RegisterButton />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rest of the content */}
      <div style={{ display: isTunnelComplete ? "block" : "none" }}>
        <div className="flex w-full justify-center items-center sm:bottom-[3vh] md:bottom-[5vh]">
          <div className="relative w-full p-4">
            <Image
              src={bg}
              alt="background"
              className={`w-full h-full object-cover absolute top-0 left-0 z-0 ${
                isTunnelComplete ? "visible" : "hidden"
              }`}
              style={{ objectPosition: "center" }} // Ensures background centers properly
            />
            <CountdownTimer targetDate="2025-02-27T09:00:00" />
            <div className="absolute inset-0 flex items-center overflow-hidden whitespace-nowrap">
              <div className="flex w-max animate-marquee">
                {[...Array(2)].map((_, i) => (
                  <h1
                    key={i}
                    className="uppercase text-[10rem] md:text-[12rem] lg:text-[7rem] font-[BrigendsExpanded]  tracking-widest leading-none text-center mx-10"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "2px rgba(255, 255, 255, 0.28)",
                    }}
                  >
                    D-Day &nbsp; D-Day &nbsp; D-Day
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Tracks />
        <CustomTimeline />
        <Sponsors />
        <FAQs />
        <Footer></Footer>
      </div>
      <Image
        src={bg}
        alt="background"
        className={`w-full h-full object-cover absolute top-0 left-0 ${isTunnelComplete?"visible":"hidden"} `}
        style={{ objectPosition: "center" }} // Ensures background centers properly
      />
    </div>
  );
}