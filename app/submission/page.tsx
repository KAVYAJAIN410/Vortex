"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const tracks = [
  "Nature-Inspired Locomotion and Extreme Environments",
  "Rehabilitation Robotics",
  "Humanoid Robotics",
  "Household Robotics",
  "Robotics in Agriculture",
  "Open Ended",
];

export default function AddIde() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const [track, setTrack] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const randomText = "CONFIRM_SUBMISSION";
  const wordLimit = 200;

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in or sign up");
      router.push("/");
    } else if (status === "authenticated") {
      getUserData();
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
      if (data?.user?.hasFilledDetails && data?.user?.event1TeamId && data?.user?.event1TeamRole === 0) {
        getData();
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
      if (userData?.team?.Round1) {
        router.push("/Round1Idea");
      } else {
        setLoading(false);
      }
    } catch {
      toast.error("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (confirmationText !== randomText) {
      toast.error("Confirmation text does not match");
      return;
    }
    if (idea.split(" ").length > wordLimit) {
        toast.error(`Idea must be within ${wordLimit} words.`);
        return;
      }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/IdeaSubmission",
        { idea, title, track },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.email}`,
          },
        }
      );
      if (!response.data.success) {
        toast.error(`Error: ${response.data.message}`);
        return;
      }
      setIdea("");
      setTitle("");
      setTrack(1);
      setConfirmationText("");
      toast.success("Idea submitted successfully!");
      router.push("/Round1Idea");
      setOpenModal(false);
    } catch (error) {
      toast.error("An error occurred while submitting the idea.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-800 min-h-screen p-4 text-white">
         {Loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) :(
        <>
      <Toaster />
      <div className="flex justify-center w-full mt-14">
        <div className="mt-6 w-full max-w-2xl p-4 bg-[#FF6B00] rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-2xl font-bold text-white">Submit Your Idea</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-4 p-3 border border-gray-400 rounded-md bg-neutral-800"
            placeholder="Title of your idea"
          />
          <select
            value={track}
            onChange={(e) => setTrack(Number(e.target.value))}
            className="w-full mt-4 p-3 border border-gray-400 rounded-md  bg-neutral-800"
          >
            {tracks.map((t, index) => (
              <option key={index} value={index + 1}>{t}</option>
            ))}
          </select>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full mt-4 h-40 p-3 border border-gray-400 rounded-md  bg-neutral-800"
            placeholder="Describe your idea here..."
          ></textarea>
          <button
            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            onClick={() => setOpenModal(true)}
          >
            Submit
          </button>
        </div>
      </div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Track:</strong> {tracks[track - 1]}</p>
          <p>Once submitted, your idea cannot be changed.</p>
          <p>Type "{randomText}" to confirm submission:</p>
          <input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-400 rounded-md"
          />
        </DialogContent>
        <DialogActions>
          <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="px-4 py-2 bg-black text-white rounded-md">
            {isLoading ? "Submitting..." : "Confirm"}
          </button>
        </DialogActions>
      </Dialog>
      </>
      )}
    </div>
  );
}
