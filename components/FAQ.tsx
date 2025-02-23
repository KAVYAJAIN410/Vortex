"use client";

import { useState } from "react";

const FaqContent = () => {
  const faqs = [
    { id: 1, q: " What is Vortex360?", ans: `Vortex360 is a three-day Mechanical Design Hackathon hosted by
              RoboVITics, powered by AutoDesk's Fusion 360. It's an immersive
              experience for participants to explore 3D modeling, rendering, and
              manufacturing.` },
    { id: 2, q: "When and where is Vortex360 taking place?", ans: `Vortex360 is scheduled for February 27 to March 1st at Anna Auditorium,
              offering a dynamic environment for hands-on exploration of
              innovative design concepts.` },
    { id: 3, q: " Who can participate in Vortex360?", ans: `Vortex360 is open to enthusiasts, students, and professionals
              passionate about mechanical design. Whether you're a beginner or
              an experienced designer, everyone is welcome!` },
    { id: 4, q: " What tools will participants use during the event?", ans: `Participants will utilize Fusion 360 tools for 3D modeling,
              rendering, and manufacturing. It's a chance to harness the power
              of cutting-edge technology in the design process.` },
    { id: 5, q: " Is there a registration fee for Vortex360?", ans: `No, participation in Vortex360 is free of charge. We want to
              encourage as many individuals as possible to join this exciting
              journey of creativity and innovation.` },
    { id: 6, q: "Can I participate remotely in Vortex360??", ans: ` Vortex360 is an offline event at Anna Auditorium. Unfortunately,
              remote participation is not available. We encourage you to join us
              in person for an immersive experience.` },
   
  ];
 

  const [visibleFaq, setVisibleFaq] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setVisibleFaq(visibleFaq === id ? null : id);
  };

  return (
    <section
      id="FAQ" 
      className="py-10 px-6 md:px-20  z-10"
    >
      <h2 className="text-4xl md:text-5xl d text-center text-transparent bg-gradient-to-b from-[#FF6B00] via-[#ec6217] to-[#f74a0b] bg-clip-text font-[GreaterTheory]">
        FAQ
      </h2>

      <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-2">
        {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map((faqGroup, index) => (
          <div key={index} className="flex flex-col gap-3 w-full lg:w-[48%] ">
            {faqGroup.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-[#FF6B00] font-bold h-15 w-30 rounded-lg shadow-md border border-transparent hover:border-white transition-all duration-3300"
              >
                <button
                  className="w-full flex justify-between items-center py-2 px-6 text-left  text-sm font-[PoppinsRegular] text-white"
                  onClick={() => toggleDropdown(faq.id)}
                >
                  {faq.q}
                  <span className="text-2xl ">{visibleFaq === faq.id ? "x" : "+"}</span>
                </button>
                <hr></hr>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    visibleFaq === faq.id ? "opacity-100 p-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-white text-base font-[PoppinsRegular]">{faq.ans}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqContent;
