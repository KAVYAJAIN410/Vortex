"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MyModal } from "@/components/Modal";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import picture from "../../../../assets/image2.svg"
import bg from "@/assets/Noise & Texture.png"

import Image from "next/image";

type TeamMember = {
  _id: number;
  name: string;
  regNo: string;
  mobNo: string;
  buttonLabel: string;
  event1TeamRole?: number;
  avatarUrl?: string;
};

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamName, setTeamName] = useState<string | null>("Your Team");
  const [teamCode, setTeamCode] = useState<string>("12345ABC");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMemberId, setModalMemberId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<string>("");
  const [assigned, setAssigned] = useState<string>("");
  const [pollActive, setPollActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loader state

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in or sign up");
      router.push("/");
    } else if (status === "authenticated") {
      getUserData();
      getData();
    }
  }, [status, router]);

  const getUserData = async () => {
    try {
      const res = await fetch("/api/userInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
        },
      });
      const data = await res.json();

      if (data?.user?.hasFilledDetails) {
        if (data?.user?.event1TeamId) {
          if (data?.user?.event1TeamRole === 0) {
            // Stay on the page
          } else {
            router.push("/memberDashboard");
          }
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    } catch {
      toast.error("An error occurred while fetching user data.");
    }
  };
  

  const getData = async () => {
    try {
      const userDataRes = await fetch("/api/userDataGet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
        },
      });
      const userData = await userDataRes.json();

      setTeamName(userData?.team?.teamName);
      setTeamCode(userData?.team?.teamCode);
      setTeamMembers(userData?.members);
      setAssigned(userData?.team?.choice);
      setPollActive(userData?.team?.poll_Active); // Set pollActive state
    } catch {
      toast.error("An error occurred while fetching data.");
    } finally {
      setIsLoading(false); // Stop the loader once data is fetched
    }
  };

  const handleShowModal = (id: number | null = null, type: string = "") => {
    setModalMemberId(id);
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalMemberId(null);
    setModalType("");
    setShowModal(false);
  };
  const handleCopyTeamCode = async () => {
    try {
      await navigator.clipboard.writeText(teamCode);
      toast.success("Team code copied to clipboard!");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to copy team code.");
    }
  };

  const handleRemove = async (memberId: number) => {
    try {
      const response = await fetch("/api/event1/removeMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
        },
        body: JSON.stringify({ email: session?.user?.email, memberIdToRemove: memberId }),
      });

      if (response.ok) {
        toast.success("Team member removed successfully");
        setTeamMembers((prev) => prev.filter((member) => member._id !== memberId));
      } else {
        toast.error("Failed to remove team member.");
      }
    } catch {
      toast.error("An error occurred while removing the team member.");
    }
    handleCloseModal();
  };


  const deleteTeam = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/event1/deleteTeam", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      if (response.ok) {
        toast.success("Team deleted successfully");
        router.push("/");
      } else {
         setIsLoading(false);
         const errorData = await response.json(); // Parse JSON response
         const errorMessage = errorData?.message || "Failed to delete the team.";
         toast.error(errorMessage);
       
      }
    } catch {
      toast.error("An error occurred while deleting the team.");
    }
    handleCloseModal();
  };

  return (
    <div className="bg-gradient-to-b bg-neutral-900 min-h-screen text-white p-6 flex flex-col gap-8 relative">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Header Section */}
          <button
              className="text-white bg-transparent border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-all w-20"
              onClick={() => router.push("/")}
            >
              Home
            </button>
          <header className="text-center">
          
            <h1 className="text-4xl font-bold mb-2 font-[GreaterTheory]">Team: {teamName||"team name not found"}</h1>
       
          </header>
          <section className="text-center">
            {/* <button
              className={`${
                pollActive
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white px-6 py-3 rounded-lg shadow-lg`}
              onClick={startPoll}
              disabled={!pollActive}
            >
              {pollActive ? "Start Poll" : "Poll not active"}
            </button> */}
          </section>

          {/* Team Members Section */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              
              {teamMembers.map((member) => (
                 <div
                 key={member._id}
                 className="  rounded-lg p-3 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-row items-center justify-between space-x-4 opacity-100 bg-white text-black"
                //  style={{ backgroundImage: `url(${background.src})` }}
               >
                  
                  <div className="relative z-10 flex-1 p-4 text-left">
                      <h2 className="text-xl font-bold font-[PoppinsRegular] mb-1 ">
                        {member.name}
                      </h2>
                      <p className="text-xs mb-1 = ">
                        Reg. No: {member.regNo}
                      </p>
                      <p className="text-xs mb-2 ">
                        Mobile No: {member.mobNo}
                      </p>
                      <h1 className="text-lg font-bold mb-1 font-[PoppinsRegular] ">
                        {member.event1TeamRole === 0 ? "LEADER" : "MEMBER"}
                      </h1>
                      {member.event1TeamRole !== 0 && (
                        <button
                          className="mt-3 btn-secondary bg-red-700  px-4 py-2 rounded-md  hover:scale-105 transition-transform"
                          onClick={() => handleShowModal(member._id, "remove")}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="absolute right-0 top-0 w-1/2 h-full">
                      <Image
                        src={picture}
                        alt={`${member.name}'s profile`}
                        layout="fill"
                       
                        className="opacity-100"
                      />
                    </div>
                </div>
              ))}
            </div>
          </section>
          <div className="flex justify-center">
         <div className="flex justify-center gap-2"> 
          {teamMembers.length<5 && <button
        className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"
                onClick={()=>{
                  setModalType("teamCode");
      setShowModal(true);
                }}
                style={{letterSpacing:"4px"}}
              >
                {isLoading ? (
                  <span className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"></span>
                ) : (
                  "Add Member"
                )}
              </button>}

          {/* Actions Section */}
          <section className="text-center">
            <button
             className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"
              onClick={() => handleShowModal(null, "deleteTeam")}
              style={{letterSpacing:"4px"}}
            >
              Delete Team
            </button>
          </section>
          <button
             className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"
              onClick={() => {
                router.push("/submission")
              }}
              style={{letterSpacing:"4px"}}
            >
              Submit Idea
            </button>
          </div>
          </div>


          {/* Modal */}
          {showModal && modalType !== "teamCode" &&  (
            <MyModal
              isVisible={true}
              onClose={handleCloseModal}
              onConfirm={
                modalType === "remove"
                  ? () => handleRemove(modalMemberId!)
                  : modalType === "leave"
                  ? () => console.log("Leave team")
                  : () => deleteTeam()
              }
              text={
                modalType === "remove"
                  ? "Are you sure you want to remove this member?"
                  : modalType === "leave"
                  ? "Are you sure you want to leave the team?"
                  : "Are you sure you want to delete the team?"
              }
            />
          )}
          

          {showModal && modalType === "teamCode" && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-black p-8 rounded-lg shadow-lg w-96 max-w-[90vw]">
                  <h2 className="text-2xl  mb-6 font-[GreaterTheory] text-center">
                    Team Code
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <p className="text-xl font-bold">{teamCode}</p>
                    <button
                      onClick={handleCopyTeamCode}
                      className="bg-blue-700 text-white px-4 py-2 rounded-md font-[PoppinsRegular] uppercase hover:bg-blue-600 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-red-700 text-white  font-[PoppinsRegular] uppercase px-4 py-2 rounded-md"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

          <Toaster />
        </>
      )}
       <Image
        src={bg}
        alt="background"
        className={`w-full h-full object-cover absolute top-0 left-0 -z-10`}
        style={{ objectPosition: "center" }} // Ensures background centers properly
      />
    </div>
  );
}
