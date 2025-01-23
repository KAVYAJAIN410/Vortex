"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ChoiceSelector: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [teamChoiceAssigned, setTeamChoiceAssigned] = useState(false);
  const [pollingDone, setPollingDone] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/userDataGet", {
          method: "GET",
        });

        const data = await response.json();

        if (data.message === "success") {
          if (data.team && data.team.choice) {
            setTeamChoiceAssigned(true);
            setMessage("Team has already made a choice.");
            router.push("/memberDashboard");
          }
        } else {
          setMessage(data.message || "Failed to fetch user data.");
        }
      } catch (error) {
        setMessage("Failed to fetch user data.");
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  const handleSubmit = async () => {
    if (!selectedChoice) {
      setMessage("Please select a choice.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const email = session?.user?.email;

      if (!email) {
        setMessage("Email not found in session.");
        return;
      }

      const response = await fetch("/api/poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, choice: selectedChoice }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "An error occurred.");
      } else {
        setPollingDone(true);
        setMessage("Choice assigned successfully!");
        setTimeout(() => {
          router.push("/memberDashboard");
        }, 2000);
      }
    } catch (error) {
      setMessage("Failed to process the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select Your Choice</h1>
        {session ? (
          <>
            <p className="mb-6 text-gray-600 text-center">
              Logged in as: <strong>{session.user?.email}</strong>
            </p>
            {teamChoiceAssigned ? (
              <div className="text-center text-red-500 font-medium">
                Team has already made a choice. Redirecting to the dashboard...
              </div>
            ) : (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 text-center mb-4">
                  Choose your preference
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-6 border-2 rounded-lg transition text-xl font-semibold text-center ${
                      selectedChoice === "Horizontal"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                    onClick={() => setSelectedChoice("Horizontal")}
                    disabled={pollingDone || teamChoiceAssigned}
                  >
                    Horizontal
                  </button>
                  <button
                    className={`p-6 border-2 rounded-lg transition text-xl font-semibold text-center ${
                      selectedChoice === "Vertical"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                    onClick={() => setSelectedChoice("Vertical")}
                    disabled={pollingDone || teamChoiceAssigned}
                  >
                    Vertical
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={loading || teamChoiceAssigned || pollingDone}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
            {message && (
              <div
                className={`mt-6 text-center font-medium ${
                  message.includes("success") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </>
        ) : (
          <p className="text-red-500 text-center font-medium">
            You must be logged in to make a choice.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChoiceSelector;
