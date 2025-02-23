"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LoadingIcons from "react-loading-icons";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { signIn } from "next-auth/react";

interface UserDetails {
  user: {
    hasFilledDetails: boolean;
    event1TeamId?: string | null;
    event1TeamRole?: number;
  };
}

const RegisterButton: React.FC = () => {
  const [filled, setFilled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/userInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user info: ${res.status}`);
      }

      const data: UserDetails = await res.json();
      setDetails(data);
      if (data.user.hasFilledDetails) {
        setFilled(true);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    } else {
      setLoading(false);
    }
  }, [status, getData]);

  const handleClick = useCallback(() => {
    setLoading(true);
    if (status !== "authenticated") {
      signIn("google",{ callbackUrl: "/events/event1/UserDetails" });
    } else {
      if (details?.user.hasFilledDetails) {
        if (details?.user?.event1TeamId) {
          router.push(
            details.user.event1TeamRole === 0
              ? "/events/event1/leaderDashboard"
              : "/memberDashboard"
          );
        } else {
          router.push("/Team");
        }
      } else {
        router.push("/events/event1/UserDetails");
      }
    }
    setLoading(false);
  }, [details, router, status]);

  return (
    <div className="text-2xl z-[1000]" >
      {status !== "authenticated" ? (
        <button
        className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded] tracking-widest"
        onClick={handleClick}
          disabled={loading}
          style={{letterSpacing:"4px"}}
        >
          
          {loading ? <LoadingIcons.Oval /> : "Sign In"}
        </button>
      ) : filled ? (
        <button
        className="hover:text- hover:bg-transparent hover:shadow-sm  text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"
        onClick={handleClick}
          disabled={loading}
          style={{letterSpacing:"4px"}}
        >
          {loading ? <LoadingIcons.Oval /> : "Dashboard"}
        </button>
      ) : (
        <button
         className="hover:text- hover:bg-transparent hover:shadow-sm text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]  tracking-wider"
          onClick={handleClick}
          disabled={loading}
          style={{letterSpacing:"4px"}}
         
        >
          {loading ? <LoadingIcons.Oval /> : "Register Now"}
        </button>
      )}

      {showMessage && (
        <div className="mt-2 text-sm text-red-600 font-medium">
          Please sign in first to access the Dashboard.
        </div>
      )}
    </div>
  );
};

export default RegisterButton;
