"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LoadingIcons from "react-loading-icons";
import { signIn, signOut } from "next-auth/react";
import { stat } from "fs";

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
      if(data.user.hasFilledDetails==true){
        setFilled(true);
      }
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
    if(status!="authenticated"){
      signIn("google")
    }
    else{
    if (details?.user.hasFilledDetails) {
      if (details?.user?.event1TeamId) {
        router.push(
          details.user.event1TeamRole === 0 ? "events/event1/leaderDashboard" : "/memberDashboard"
        );
      } else {
        setLoading(false);
        router.push("/Team");
      }
    } else {
      setLoading(false);
      router.push("/events/event1/UserDetails");
    }
    }
    setLoading(false);
  }, [details, router]);

  // Handle unauthenticated button click


  return (
    <div>
      {filled!=true  ?(
        <button
        className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-white bg-transparent hover:scale-105 transition-all "
           onClick={handleClick}
         >
           {loading ? <LoadingIcons.Oval /> : "Register"}
         </button>
      )
      :
      (
        <button
         className="py-2 px-4 font-semibold rounded-xl font-poppins uppercase border-4 text-white border-white bg-transparent hover:scale-105 transition-all "
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
