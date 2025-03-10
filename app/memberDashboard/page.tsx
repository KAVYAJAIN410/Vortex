'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import LoadingScreen from '@/components/LoadingScreen';
import { MyModal } from '@/components/Modal';
import toast, { Toaster } from 'react-hot-toast';

interface TeamMember {
  id: number;
  name: string;
  regNo: string;
  mobNo: string;
  buttonLabel: string;
}

export default function Page() {
    const { data: session, status } = useSession();
    const [teamName, setTeamName] = useState<string | undefined>(undefined);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
      {
        id: 1,
        name: "Full Name 1",
        regNo: "2XXXXXXXX",
        mobNo: "XXXXXXXXXX",
        buttonLabel: "Leave",
      },
      {
        id: 2,
        name: "Full Name 2",
        regNo: "2XXXXXXXX",
        mobNo: "XXXXXXXXXX",
        buttonLabel: "Remove",
      },
      {
        id: 3,
        name: "Full Name 3",
        regNo: "2XXXXXXXX",
        mobNo: "XXXXXXXXXX",
        buttonLabel: "Remove",
      },
      {
        id: 4,
        name: "Full Name 4",
        regNo: "2XXXXXXXX",
        mobNo: "XXXXXXXXXX",
        buttonLabel: "Remove",
      },
    ]);
    const [showModal, setShowModal] = useState<boolean>(false);
  
    const handleShowModal = () => {
      setShowModal(!showModal);
    };
  
    useEffect(() => {
      setLoading(true);
      if (status === "unauthenticated") {
        setLoading(false);
        toast.error("Please Log in or Sign up");
        router.push("/");
      } else if (status === "authenticated") {
        setLoading(false);
        getUserData();
      }
    }, [status, router]);
  
    const getUserData = () => {
      setLoading(true);
      fetch(`/api/userInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const user = data.user;
          if (user?.hasFilledDetails === true) {
            if (user?.event1TeamId) {
              console.log(user)
              if (user?.event1TeamRole === 0) {
                setLoading(false);
                router.push("/events/event1/leaderDashboard");
              } else {
                setLoading(false);
              }
            } else {
              setLoading(false);
              router.push("/");
            }
          } else {
            setLoading(false);
            router.push("/");
          }
          fetch(`/api/userDataGet`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessTokenBackend}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setTeamName(data?.team?.teamName);
              setTeamMembers(data?.members || []);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching user data:", err);
              setLoading(false);
            });
        });
    };
  
    const handleLeave = async () => {
      setLoading(true);
      const res = await fetch("/api/event1/leaveTeam", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: session?.user?.email}),
      });
  
      if (res.status === 200) {
        setLoading(false);
        toast.success('Left the team successfully');
        router.push('/');
      } else {
        setLoading(false);
        toast.error("Error while leaving the team, please try again");
      }
    };
  
    return (
      <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-5 text-black pt-[12vh] bg-neutral-900">
        {loading && <LoadingScreen />}

        {/* Home Button */}
      
        
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center drop-shadow-lg text-white font-[GreaterTheory]">Team: {teamName}</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-lg px-4">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-white text-black opacity-85 rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
            >
              <h2 className="text-2xl font-bold mb-2">{member?.name}</h2>
              <p className="text-xlfont-bold mb-2">{index === 0 ? "Leader" : "Member"}</p>
              <p className="text-sm mb-1">Registration Number: {member?.regNo}</p>
              <p className="text-sm">Mobile Number: {member?.mobNo}</p>
            </div>
          ))}
        </div>
  
        {/* Leave Team button */}
        {/* <div className="mt-8">
          <button
            onClick={handleShowModal}
            className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"
            style={{letterSpacing:"4px"}}
          >
            Leave Team
          </button>
        </div> */}
  
        {showModal && (
          <MyModal
            isVisible={showModal}
            onClose={handleShowModal}
            onConfirm={handleLeave}
            text="Do you want to leave this team?"
          />
        )}
        <Toaster />
      </div>
    );
  }
