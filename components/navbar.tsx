"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/robo.png"
import SessionWrapper from "./SessionWrapper";
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
    <div className="absolute top-0 z-50">
    <div className="flex justify-between w-[100vw] p-5">
     <Image src={logo} alt="roboVitics"></Image>
     <SessionWrapper></SessionWrapper>
    </div>
    </div>
  )
}
export default Navbar;