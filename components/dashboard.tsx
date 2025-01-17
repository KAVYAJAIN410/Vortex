"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LoadingIcons from "react-loading-icons";

interface UserDetails {
  user: {
    hasFilledDetails: boolean;
    event1TeamId?: string | null;
    event1TeamRole?: number;
  };
}

const RegisterButton: React.FC = () => {
    const[filled,setFilled]=useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  // Memoized getData function to avoid re-creating it on every render
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/userInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`, // Fix the Authorization format
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user info: ${res.status}`);
      }

      const data: UserDetails = await res.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Fetch data when the session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      getData();
    } else {
      setLoading(false);
    }
  }, [status, getData]);

  // Memoized handleClick function to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    setLoading(true);

    if (details?.user?.hasFilledDetails) {
        setFilled(true)
      if (details?.user?.event1TeamId) {
        router.push(
          details.user.event1TeamRole === 0 ? "events/event1/leaderDashboard" : "/memberDashboard"
        );
      } else {
        setLoading(false);
        router.push("/events/event1/Join_and_Create_Team");
      }
    } else {
      setLoading(false);
      router.push("/events/event1/UserDetails");
    }

    setLoading(false);
  }, [details, router]);

  // Handle unauthenticated button click
  const handleUnauthenticatedClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000); // Hide the message after 3 seconds
  };

  return (
    <div>
      {filled==true ?(
        <button
        className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-[#FEFAB7] bg-transparent hover:scale-105 transition-all mt-8"
           onClick={handleClick}
         >
           {loading ? <LoadingIcons.Oval /> : "Register"}
         </button>
      )
      :
      (
        <button
         className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-[#FEFAB7] bg-transparent hover:scale-105 transition-all mt-8"
          onClick={handleClick}
          disabled={loading} // Disable button when loading to avoid duplicate clicks
        >
          {loading ? <LoadingIcons.Oval /> : "Dashboard"}
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
