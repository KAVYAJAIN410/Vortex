"use client";

import { useState } from "react";

const FaqContent = () => {
  const faqs = [
    { id: 1, q: " What is Vortex360?", ans: `Vortex360 is a three-day Mechanical Design Hackathon hosted by
              RoboVITics, powered by AutoDesk's Fusion 360. It's an immersive
              experience for participants to explore 3D modeling, rendering, and
              manufacturing.` },
    { id: 2, q: "When and where is Vortex360 taking place?", ans: `Vortex360 is scheduled for February 2nd to 4th at Anna Auditorium,
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
    <section className="py-16 px-6 md:px-20 bg-gradient-to-b mt-4 z-10  items-center m-14"
    id="FAQ"
   >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white font-[BrigendsExpanded]">
        FREQUENTLY ASKED QUESTIONS
      </h2>

      <div className="mt-10 flex flex-col lg:flex-row lg:justify-between gap-6 items-center">
        {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map((faqGroup, index) => (
          <div key={index} className="flex flex-col gap-4 w-full lg:w-[48%]">
            {faqGroup.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white font-bold rounded-lg shadow-md border border-transparent hover:border-black transition-all duration-300"
              >
                <button
                  className="w-full flex justify-between items-center py-4 px-6 text-left text-lg font-semibold text-[#14110E]"
                  onClick={() => toggleDropdown(faq.id)}
                >
                  {faq.q}
                  <span className="text-2xl">{visibleFaq === faq.id ? "x" : "+"}</span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-scroll ${
                    visibleFaq === faq.id ? "max-h-40 opacity-100 p-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#6F6C66] text-base">{faq.ans}</p>
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
