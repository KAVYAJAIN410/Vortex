"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LoadingIcons from "react-loading-icons";
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
      signIn("google");
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
    <div>
      {status !== "authenticated" ? (
        <button
          className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-white bg-transparent hover:scale-105 transition-all"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <LoadingIcons.Oval /> : "Login"}
        </button>
      ) : filled ? (
        <button
          className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-white bg-transparent hover:scale-105 transition-all"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <LoadingIcons.Oval /> : "Dashboard"}
        </button>
      ) : (
        <button
          className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-white bg-transparent hover:scale-105 transition-all"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <LoadingIcons.Oval /> : "Register"}
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
