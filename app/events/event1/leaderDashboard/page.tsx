"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MyModal } from "@/components/Modal";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

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
  const [pollActive, setPollActive] = useState<boolean>(false);
  const [assigned, setAssigned] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(false);
    }
  };

  const startPoll =  () => {
    router.push("/polling")
  };

  return (
    <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] min-h-screen text-white p-6 flex flex-col gap-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <>
           <button
              className="text-white bg-transparent border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-all w-fit"
              onClick={() => router.push("/")}
            >
              Home
            </button>
          <header className="text-center">
            <h1 className="text-4xl font-bold mb-2">Team: {teamName}</h1>
            <h2>Assigned bot: {assigned}</h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray-400">Team Code</p>
              <div className="flex justify-center items-center gap-4">
                <span className="bg-[#334155] px-4 py-2 rounded font-mono text-sm">{teamCode}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    navigator.clipboard.writeText(teamCode);
                    toast.success("Team code copied to clipboard!");
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </header>

          {/* Poll Section */}
          <section className="text-center">
            <button
              className={`${
                pollActive
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white px-6 py-3 rounded-lg shadow-lg`}
              onClick={startPoll}
              disabled={!pollActive}
            >
              {pollActive ? "Start Poll" : "Poll not active"}
            </button>
          </section>

          {/* Team Members Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Team Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-gradient-to-r from-[#141B2B] to-[#1E293B] rounded-lg p-6 shadow-xl flex flex-col items-center"
                >
                  <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <svg
                      width="48"
                      height="48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="8" r="3" />
                      <path d="M5 19c0-3 3-5 7-5s7 2 7 5H5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-400">Reg. No.: {member.regNo}</p>
                  <p className="text-sm text-gray-400">Mobile: {member.mobNo}</p>
                  <span
                    className={`px-3 py-1 text-sm font-medium mt-2 rounded-full ${
                      member.event1TeamRole === 0 ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    {member.event1TeamRole === 0 ? "Leader" : "Member"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <Toaster />
        </>
      )}
    </div>
  );
}
