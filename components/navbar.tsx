"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/vit.png"
import SessionWrapper from "./SessionWrapper";
import forty from  "../assets/40.png"
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
//import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import hamburgerIcon from "/assets/hamburger.jpg"; // Path to hamburger image
import closeIcon from "/assets/close.jpg"; // Path to close image

const Navbar: React.FC = () => {
  //const { scrollYProgress } = useScroll(); 
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const storyBehindRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex justify-between w-[100vw] p-5">
      <div className="flex  items-center max-w-[50%]" >
    <Image src={forty} alt="roboVitics"
     className="w-[40%] md:w-[30%] lg:w-[20%] mr-4"
     priority
     ></Image>
     <Image src={logo} alt="roboVitics"
     className="w-[50%] md:w-[30%] lg:w-[32%]"
     priority
     ></Image>
     </div>
     <div className="items-center flex flex-col justify-center">
     <SessionWrapper></SessionWrapper>
     </div>
    </div>
    
  )
}
export default Navbar;