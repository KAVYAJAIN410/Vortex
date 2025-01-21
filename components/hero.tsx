"use client"
import { useSession } from "next-auth/react";
import RegisterButton from "./dashboard";
import SessionWrapper from "./SessionWrapper";

const HeroSection: React.FC = () => {
  const { status } = useSession();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100svh] bg-cover bg-center">
      <h6 className="uppercase font-poppins text-sm lg:text-xl font-light text-white">
        RoboVitics presents
      </h6>
      <div className="flex flex-col justify-center items-center w-full text-center mt-4">
        <h1 className="esummit uppercase text-4xl md:text-6xl lg:text-9xl font-bold">
          Design To Duel
        </h1>
      </div>
      <div className="w-full flex font-poppins flex-col items-center justify-between gap-6 mt-6">
        {status === "authenticated" ? (
          <RegisterButton />
        ) : (
          <SessionWrapper />
        )}
      </div>
      <div className="absolute bottom-0"></div>
    </section>
  );
};

export default HeroSection;
