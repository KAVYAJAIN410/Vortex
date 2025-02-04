"use client";
import { useSession } from "next-auth/react";
import RegisterButton from "./dashboard";
import SessionWrapper from "./SessionWrapper";
import logo from "../assets/logo.png";
import robo from "../assets/robo.png"
import Image from "next/image";
import Navbar from "./navbar";

const HeroSection: React.FC = () => {
  const { status } = useSession();

  return (
    <>
   
    <section className="relative flex flex-col items-center max-h-screen bg-cover bg-center bg-opacity-0">
    <Navbar></Navbar>
<div className="relative flex flex-col items-center justify-center min-h-[80vh]">
      <Image src={robo} alt="roboVitics"></Image>
      <p className="font-bold">presents</p>
      {/* Logo */}
      <div className="flex flex-col items-center justify-center w-full text-center mt-8">
        <Image
          src={logo}
          alt="logo"
          className="w-[60%] md:w-[30%] lg:w-[40%] object-contain"
          priority
        />
      </div>

      {/* Description */}
      <p className="mt-6 text-sm md:text-base lg:text-lg text-center leading-relaxed max-w-2xl">
        Master the art of combat robotics in this workshop and designathon! Learn to design and build bots while exploring various advanced concepts. Test your skills in a thrilling design challenge and bring your ideas to life!
      </p>

      {/* Buttons */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
       
          <RegisterButton />
        
      </div>
      </div>
      {/* Decorative Element */}
     
    </section>
    </>
  );
};

export default HeroSection;
