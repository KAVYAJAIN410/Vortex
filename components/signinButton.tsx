"use client"; // Make this a Client Component
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";



export default function SignInBtn(): JSX.Element {
  const { status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false); 
  const [sign,setSign]=useState(false);
  
  useEffect(()=>{
    if(status==="authenticated"){
      setSign(true);
    }
  })
  const handleSignIn = async () => {
    setIsProcessing(true);
    await signIn("google",{ callbackUrl: "/events/event1/UserDetails" });
    setIsProcessing(false);
  };

  const handleSignOut = async () => {
    setIsProcessing(true);
    await signOut({ callbackUrl: "/" });
    setIsProcessing(false);
    
  };
  return (
    
      <SessionProvider>
       
        <div className="flex items-center text-white pl-4 pr-4 h-10  border-white border " style={{ borderRadius: "50px" }}>
          {sign==true ? (
            <button
            style={{userSelect:"none"}}
              onClick={handleSignOut}
              disabled={isProcessing}
              className={`flex items-center gap-2 text-center ${
                isProcessing ? " cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              Sign Out
            </button>
          ) : (
            <button
            style={{userSelect:"none"}}
              onClick={handleSignIn}
              disabled={isProcessing}
              className={`flex items-center gap-2 text-center  ${
                isProcessing ? "cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              Sign In
            </button>
          )}
        </div>
       
      </SessionProvider>
    
    
  );
}
