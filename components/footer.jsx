import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
import Marq from "./Marq";
import robo from "@/assets/robo.png";
import bg from "@/assets/footer.png";

export const Footer = () => {
  return (
    <>
      <footer
        className="relative flex flex-col-reverse md:flex-row bg-[url('/assets/bg.png')] bg-cover items-center gap-10 md:gap-0 px-5 sm:px-10 ms:px-20 justify-between py-5 text-white z-50"
        id="footer"
      >
        <Image
          src={bg}
          alt="background"
          className={`w-full h-full object-cover absolute top-0 left-0 z-0`}
          style={{ objectPosition: "center" }} // Ensures background centers properly
        />

        {/* Community Section - Spread Horizontally on Laptop View */}
        <div className="flex flex-col md:flex-row gap-10 z-50 w-full md:justify-center">
          <div className="uppercase flex flex-col md:flex-row md:items-center md:gap-10">
            <p className="text-xl font-semibold m-0">Community</p>
            <div className="flex flex-col md:flex-row md:items-center md:gap-10">
              <Link
                href={"https://www.instagram.com/robovitics/?hl=en"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <RiInstagramFill />
                <p className="text-md">Instagram</p>
              </Link>
              <Link
                href={"https://twitter.com/robovitics"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaSquareXTwitter />
                <p className="text-md">Twitter</p>
              </Link>
              <Link
                href={"https://www.linkedin.com/company/robovitics?originalSubdomain=in"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaLinkedin />
                <p className="text-md">Linkedin</p>
              </Link>
              <Link
                href={"https://www.facebook.com/robovitics/"}
                target="blank"
                className="flex gap-2 items-center text-2xl"
              >
                <FaSquareFacebook />
                <p className="text-md">Facebook</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Logo and Contact Section */}
        <div className="flex flex-col gap-4 text-center z-50">
          <div>
            <Image src={robo} alt="RoboVITics Logo" />
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
                RoboVITics@vit.ac.in
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Marq />
    </>
  );
};