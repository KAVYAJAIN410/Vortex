import { dbConnect } from "../../../lib/dbConnect";
import  {Users}  from "@/models/user.model";
import Round1Submmission from "@/models/event1/round1Submission.model"
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    // Get token from NextAuth
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
   
    const token = authHeader.split(' ')[1]; // Extract token
    if (!token) return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    const existingUser = await Users.findOne({ email:token });
    if (!existingUser) {
       console.log(token)
      return NextResponse.json({ message: 'User not found' }, { status: 409 });
    }

    // Fetch user from database
    if(!existingUser.event1TeamId){
        return NextResponse.json({ message: 'User is not part of team' }, { status: 409 });
    }
   

    // Fetch journal entries
    const Id=existingUser.event1TeamId;
    const Idea = await Round1Submmission.findOne({teamId:Id}); // Fixed findOne()
    if (!Idea) {
      return NextResponse.json({ message: "No Idea found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "success", Round1Idea: Idea }, // Fixed response structure
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "error", error: err.message },
      { status: 500 }
    );
  }
}
