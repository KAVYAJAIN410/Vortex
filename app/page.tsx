// pages/index.tsx or any page
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/footer";
import Marq from "@/components/marquee";
import NavBar from "@/components/navbar"
import HeroSection from "@/components/hero";
import RegisterButton from "@/components/dashboard";

export default function HomePage() {
  return (
    <>
      <NavBar/>
       <HeroSection></HeroSection>
       {/* <RegisterButton></RegisterButton>
      <Footer/> */}
    </>
  
  );
}