"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  regNo: string;
  number: string;
  hostel: string; // 'lh', 'mh', or 'ds'
  block: string;
  roomNumber: string;
}

interface Errors {
  name?: string;
  regNo?: string;
  number?: string;
  hostel?: string;
  block?: string;
  roomNumber?: string;
}

const menBlocks = [
  "A",
  "B",
  "B-annexe",
  "C",
  "D",
  "D-annexe",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
];
const womenBlocks = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "E-annexe",
  "F",
  "G",
  "H",
  "J",
  "RJT",
];

export default function UserDetail() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
const [user,setUser]=useState({});


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
            router.push("/events/event1/leaderDashboard");
          } else {
            router.push("/memberDashboard");
          }
        } else {
          router.push("/Team");
        }
      } 
    } catch {
      toast.error("An error occurred while fetching user data.");
    }
  };
  


  useEffect(() => {
    setLoading(true);
    if (status === "unauthenticated") {
      router.push("/");
    }
    getUserData();
    setLoading(false);
  }, [status, router]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    regNo: "",
    number: "",
    hostel: "",
    block: "",
    roomNumber: "",
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
  
    if (!formData.regNo) newErrors.regNo = "Registration number is required";
    else if (!/^\d{2}[A-Z]{3}\d{4}$/.test(formData.regNo.trim()))
      newErrors.regNo = "Invalid registration number format";
    
    if (!formData.number) {
      newErrors.number = "Phone number is required";
    } else if (!/^(\+91)?\d{10}$/.test(formData.number.trim())) {
      newErrors.number = "Invalid phone number format";
    }
    if (!formData.hostel) newErrors.hostel = "Hostel selection is required";
  
    if (formData.hostel !== "ds") {
      if (!formData.block) newErrors.block = "Block is required for hostel residents";
  
      if (!formData.roomNumber) {
        newErrors.roomNumber = "Room number is required for hostel residents";
      } 
    }
  
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Unknown error"}`);
        setLoading(false);
        return;
      }

      const result = await response.json();
      toast.success(result.message || "Form submitted successfully!");
      setFormData({
        name: "",
        regNo: "",
        number: "",
        hostel: "",
        block: "",
        roomNumber: "",
      });

      setLoading(false);
      router.push("/Team");
    } catch {
      setLoading(false);
      toast.error("Form submission failed: Network error");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-100 z-50">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-neutral-900">
      {loading && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
      <div className="flex justify-center items-center lg:grid-cols-3 min-h-screen gap-4 p-4 md:p-8 lg:p-10">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center justify-center p-4 lg:p-8 bg-cover bg-center sm:border border-gray-600 rounded-3xl overflow-hidden">
          <div className="w-full max-w-md lg:max-w-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 bg-transparent p-2 rounded-lg shadow-none min-w-[full] min-h-[full] text-3xl"
            >
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Full Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Registration Number"
                  type="text"
                  id="regNo"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Phone Number"
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <select
                  id="hostel"
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                  className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                >
                  <option value="" disabled>
                    Select Hostel
                  </option>
                  <option value="lh">Ladies Hostel</option>
                  <option value="mh">Men's Hostel</option>
                  <option value="ds">Day Scholar</option>
                </select>
              </div>
              {formData.hostel === "mh" && (
                <div className="flex flex-col gap-2">
                  <select
                    id="block"
                    name="block"
                    value={formData.block}
                    onChange={handleChange}
                    className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                  >
                    <option value="" disabled>
                      Select Block
                    </option>
                    {menBlocks.map((block) => (
                      <option key={block} value={block}>
                        {block}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {formData.hostel === "lh" && (
                <div className="flex flex-col gap-2">
                  <select
                    id="block"
                    name="block"
                    value={formData.block}
                    onChange={handleChange}
                    className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                  >
                    <option value="" disabled>
                      Select Block
                    </option>
                    {womenBlocks.map((block) => (
                      <option key={block} value={block}>
                        {block}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {formData.hostel !== "ds" && (
                <div className="flex flex-col gap-2">
                  <input
                    placeholder="Room Number"
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    className="border rounded-md text-2xl text-black border-gray-300 focus:ring-blue-200 focus:outline-none focus:ring-2 p-2"
                  />
                </div>
              )}
              <button
                type="submit"
               className="hover:text- hover:bg-transparent hover:shadow-sm hover:shadow-white text-sm bg-[#FF6B00] text-white px-4 py-3 rounded-xl hover:scale-110 active:scale-95 font-[BrigendsExpanded]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
