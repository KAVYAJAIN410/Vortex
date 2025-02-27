"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function ViewIdea() {

    const tracks = [
        "Nature-Inspired Locomotion and Extreme Environments",
        "Rehabilitation Robotics",
        "Humanoid Robotics",
        "Household Robotics",
        "Robotics in Agriculture",
        "Open Ended",
      ];
  const { data: session, status } = useSession();
  const router = useRouter();
  const [idea, setIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in or sign up");
      router.push("/");
    } else if (status === "authenticated") {
      fetchIdea();
    }
  }, [status, router]);

  const fetchIdea = async () => {
    try{
    const res = await axios.get(
        "/api/getSubmission",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.email}`,
          },
        }
      )

      const data = await res.data;

      if (res.status === 409) {
        toast.error(data.message);
        router.push("/");
      } else if (res.status === 404) {
        setIdea(null);
      } else if (res.status === 200) {
        setIdea(data.Round1Idea);
      } else {
        toast.error("Failed to fetch idea.");
      }
    }catch (error) {
      toast.error("An error occurred while fetching idea.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-800 min-h-screen  p-4 ">
      <Toaster />
      <div className=" p-4 rounded-t-lg  mt-16">
    <h1 className="text-3xl font-bold  text-center font-[GreaterTheory] text-[#FF6B00]">Submitted Idea</h1>
    
  </div>
  <div className="flex justify-center">
      <div className="w-full h-[620px] max-w-3xl p-6 bg-white rounded-lg shadow-lg border border-gray-300 mt-2 overflow-scroll">
 

  {isLoading ? (
    <p className="text-center text-gray-600 mt-4">Loading...</p>
  ) : idea ? (
    <div className="mt-4 p-6 bg-white rounded-lg">
      {/* Title & Track Header */}
      <div className="mb-4 border-b pb-2">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center uppercase tracking-wide">
          {idea.IdeaTitle}
        </h2>
        <p className="text-gray-600 text-lg mt-1">Track: {tracks[idea.trackId-1]}</p>
      </div>

      {/* Idea Description as a Document Body */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-300 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {idea.IdeaDescription}
        </p>
      </div>
    </div>
  ) : (
    <p className="text-center text-red-500 mt-4">Idea not submitted</p>
  )}
</div>
</div>

    </div>
  );
}
