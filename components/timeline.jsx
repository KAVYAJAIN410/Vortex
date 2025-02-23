import VerticalTimeline from "./VerticalTimeline";
import VerticalTimelineElement from "./verticalTimelineElement";
import "./style.css";
import scheduleDetails from "./ScheduleDetails.js";
import { useState } from "react";

import { useSession } from "next-auth/react";


const Timeline = () => {
  const [loader, setLoader] = useState(false);
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const [event2Reg, setEvent2Reg] = useState(false);
  const [event1Reg, setEvent1Reg] = useState(false);

  return (
    <section
      id="schedule"
      className="min-h-screen flex flex-col justify-center items-center font-poppins p-6 sm:p-0"
      style={{ fontFamily: "GreaterTheory, sans-serif" }}
    >
      {loader && <Loader />}
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="uppercase mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-br text-white bg-clip-text text-transparent font-[BrigendsExpanded]">
          Timeline
        </h1>
        <p className="w-2/3 text-sm md:text-lg text-center font-poppins text-black"></p>
      </div>
      <div className="pt-10 w-full">
        <VerticalTimeline animate={true}>
          {scheduleDetails.map((day, dayIndex) => (
            <div key={dayIndex}>
              {/* Display the date once at the top of the group */}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  color: "#fff",
                  gap: "2px",
                  margin: "0",
                }}
                contentArrowStyle={{ opacity: 0 }}
                iconStyle={{
                  background: "#FF6B00",
                  scale: 0.6, // Bigger circle for dates
                  color: "#FF6B00",
               
                }}
              >
                <div className="ml-16 sm:m-0 font-poppins text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-poppins">
                    {day.date}
                  </h1>
                </div>
              </VerticalTimelineElement>

              {/* Display all events for the day */}
              {day.events.map((event, eventIndex) => (
                <VerticalTimelineElement
                  key={event.id}
                  className="vertical-timeline-element--work event-element"
                  contentStyle={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    color: "#fff",
                    marginBottom: "10px", // Reduce spacing between events
                  }}
                  contentArrowStyle={{ opacity: 0 }}
                  date={
                    <div className="flex flex-col">
                      <p
                        className="text-justify text-lg bg-[#ff6a00] rounded-xl p-2 "
                        style={{ border: "1px solid white" }}
                      >
                        {event.description}
                      </p>
                      <div className="flex gap-3 py-2">
                        {(event.id === 1 || event.id === 2) &&
                          (userDetails?.user?.events?.includes(event.id) ||
                            (event.id === 1 && event1Reg) ||
                            (event.id === 2 && event2Reg)) && (
                            <button
                              className="text-black font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
                              onClick={() => {
                                window.location.href = `/events/event${event.id}/memberDash`;
                              }}
                            >
                              Go to Dashboard
                            </button>
                          )}
                      </div>
                    </div>
                  }
                  iconStyle={{
                    background: "#FF6B00",
                    scale: 0.3, // Smaller circle for events
                    color: "#FF6B00",
                  }}
                >
                  <div className="my-4 font-poppins text-white">
                    <h1
                      className={`uppercase text-LG sm:text-xl md:text-2xl font-bold bg-gradient-to-br text-[#ff6a00] bg-clip-text text-transparent font-poppins`}
                      style={{ color: "#ff6a00" }}
                    >
                      {event.eventName}
                    </h1>
                    <h1 className="uppercase text-md sm:text-LG md:text-xl font-poppins">
                      {event.time}
                    </h1>
                  </div>
                </VerticalTimelineElement>
              ))}

              {/* Add a separator line after each date section */}
              {dayIndex < scheduleDetails.length - 1 && (
                <div
                  className="w-full  bg-white my-10 h-1"
                  style={{ opacity: 0.7 }}
                />
              )}
            </div>
          ))}
        </VerticalTimeline>
      </div>
     
    </section>
  );
};

export default Timeline;