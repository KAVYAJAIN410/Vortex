"use client"; // Make this a Client Component
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInBtn(): JSX.Element {
  const { status } = useSession();
  const isLoading = status === "loading"; // Use `status` to determine loading state

  return (
    <div>
      <SessionProvider>
        <div>
          <div className="flex text-black font-bold text-xl md:text-sm bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-3 rounded-lg">
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                disabled={isLoading}
                className={`${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                disabled={isLoading}
                className={`${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </SessionProvider>
    </div>
  );
}
