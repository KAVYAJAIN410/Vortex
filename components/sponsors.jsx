import { motion } from "framer-motion";
import Image from "next/image";
import autodesk from "@/assets/sponsor.png"
export default function Sponsors() {
  return (
    <section className="px-10 md:px-20  mb-24"  style={{ fontFamily: "MyCustomFont, sans-serif" }}>
      <div className="flex items-center pt-10 pb-5 text-center mt-10 mb-10">
        <h1 className="uppercase w-full md:w-fit text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br text-white bg-clip-text text-transparent font-[BrigendsExpanded]">
          sponsors
        </h1>
        <div className="hidden md:block w-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, delay: 0.5 }}
            className="hidden md:block h-0.5 w-full ml-8 bg-gradient-to-br bg-white"
          ></motion.div>
        </div>
      </div>
      <div className="h-fit flex justify-center ">
        <div>
          <Image className="h-24 w-auto" alt="altium" src={autodesk}/>
        </div>
      </div>
    </section>
  );
}