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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMemberId, setModalMemberId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<string>("");
  const [assigned, setAssigned] = useState<string>("");
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
        toast.error("Failed to delete the team.");
      }
    } catch {
      toast.error("An error occurred while deleting the team.");
    }
    handleCloseModal();
  };

  return (
    <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] min-h-screen text-white p-6 flex flex-col gap-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Header Section */}
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
                  {member.event1TeamRole !== 0 && (
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4"
                      onClick={() => handleShowModal(member._id, "remove")}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Actions Section */}
          <section className="text-center">
            <button
              className="bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-800"
              onClick={() => handleShowModal(null, "deleteTeam")}
            >
              Delete Team
            </button>
          </section>

          {/* Modal */}
          {showModal && (
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

          <Toaster />
        </>
      )}
    </div>
  );
}
