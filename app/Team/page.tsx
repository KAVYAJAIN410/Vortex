"use client";
import React, { useState, useEffect, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [teamCode, setTeamCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);


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
            router.push("/events/event1/leaderDashboard");
          } else {
            router.push("/memberDashboard");
          }
        } 
      } else {
        router.push("/events/event1/userDetails");
      }
    } catch {
      toast.error("An error occurred while fetching user data.");
    }
  };
  



  useEffect(() => {
    setLoading(true);
    if (status === "unauthenticated") {
      router.push("/");
    }
    getUserData();
    setLoading(false);
  }, [status, router]);

  const handleTeamCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamCode) return toast.error("Please enter a team code");

    setLoading(true);
    try {
      const response = await fetch("/api/event1/joinTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email}`, // Verify backend expectations
        },
        body: JSON.stringify({ teamCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Unknown error"}`);
      } else {
        const result = await response.json();
        toast.success(result.message || "Team joined successfully!");
        setTeamCode("");
        router.push("/");
      }
    } catch {
      toast.error("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleTeamCreateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamName) return toast.error("Please enter a team name");

    setLoading(true);
    try {
      const response = await fetch("/api/event1/createTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify({ teamName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Unknown error"}`);
      } else {
        const result = await response.json();
        toast.success(result.message || "Team created successfully!");
        setTeamName("");
        router.push("/events/event1/leaderDashboard");
      }
    } catch {
      toast.error("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-neutral-900 ">
      <div className="bg-neutral-800 text-white p-8 rounded-md shadow-lg w-full max-w-lg">
        <Toaster />
        <h1 className="text-center text-2xl font-bold mb-8 font-[BrigendsExpanded]">Join or Create a Team</h1>

        {/* Join Team Form */}
        <form onSubmit={handleTeamCodeSubmit} className="mb-6">
          <label htmlFor="teamCode" className="block mb-2 text-sm font-medium">
            Team Code
          </label>
          <input
            id="teamCode"
            type="text"
            placeholder="Enter team code"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            className="w-full p-2 rounded border border-gray-600 text-black focus:outline-none mb-4"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded bg-gradient-to-r font-[BrigendsExpanded] bg-[#FF6B00]  text-white font-bold transition-transform ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            style={{letterSpacing:"4px"}}
          >
            {loading ? "Joining..." : "Join Team"}
          </button>
        </form>

        <hr className="my-6 border-gray-700" />

        {/* Create Team Form */}
        <form onSubmit={handleTeamCreateSubmit}>
          <label htmlFor="teamName" className="block mb-2 text-sm font-medium">
            Team Name
          </label>
          <input
            id="teamName"
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 rounded border border-gray-600 text-black focus:outline-none mb-4"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 font-[BrigendsExpanded] rounded bg-gradient-to-r bg-[#FF6B00] text-white font-bold transition-transform ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            style={{letterSpacing:"4px"}}
          >
            {loading ? "Creating..." : "Create Team"}
          </button>
        </form>
      </div>
    </main>
  );
}
