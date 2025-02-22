import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
import Marq from "./Marq";
import bg from "@/assets/footer.png"

export const Footer = () => {
  return (
    <>
      <footer className="relative flex flex-col-reverse md:flex-row bg-[url('/assets/bg.png')] bg-cover items-center gap-10 md:gap-0 px-5 sm:px-10 ms:px-20 justify-between py-5 text-white z-50" id="footer">
      <Image
        src={bg}
        alt="background"
        className={`w-full h-full object-cover absolute top-0 left-0 z-0`}
        style={{ objectPosition: "center" }} // Ensures background centers properly
      />
        <div className="flex gap-10 z-50">
          
          <div className="uppercase flex flex-col gap-2">
            <p className="text-lg font-semibold m-0">community</p>
            <div className="flex flex-col gap-2">
              <Link
                href={""}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <RiInstagramFill />
                <p className="text-sm">Instagram</p>
              </Link>
              <Link
                href={""}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaSquareXTwitter />
                <p className="text-sm">Twitter</p>
              </Link>
              <Link
                href={""}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaLinkedin />
                <p className="text-sm">Linkedin</p>
              </Link>
              <Link
                href={""}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaSquareFacebook />
                <p className="text-sm">Facebook</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center z-50">
          <div>
            <h1 className="text-5xl sm:text-7xl font-bold">RoboVitics</h1>
            <p className="font-semibold"></p>
          </div>
          <div>
            <div className="flex flex-col text-sm gap-1">
              <Link
                className="flex items-center gap-2 justify-center"
                href={"tel:+916306311799"}
              >
                <span>
                  <BiSolidPhoneCall />
                </span>
                +91 1234567890
              </Link>
              <Link
                className="flex items-center gap-2 justify-center"
                href={"mailto:RoboVitics@vit.ac.in"}
              >
                <span>
                  <IoMdMail />
                </span>
                RoboViticsl@vit.ac.in
              </Link>
            </div>
          </div>
        
        </div>
        
      </footer>
      <Marq />
    </>
  );
};