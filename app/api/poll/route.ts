import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from "@/lib/dbConnect"; // Adjust the path to your database connection
import { Users } from "@/models/user.model"; // Adjust paths based on your project structure
import TeamModel from "@/models/event1/Team.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, choice } = await request.json();

    const user = await Users.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    //? User does not have an event1teamId
    if (!user.event1TeamId) {
      return NextResponse.json({ success: false, message: "User is not part of a team" }, { status: 400 });
    }

    //? If user is not the team leader
    if (user.event1TeamRole !== 0) {
      return NextResponse.json({ success: false, message: "You are not a team leader" }, { status: 400 });
    }
   
    const teamId = user.event1TeamId;
    const teams=await TeamModel.find();
    const size=teams.length;
    const team = await TeamModel.findById(teamId);
    if (!team) {
      return NextResponse.json({ success: false, message: "Team not found" }, { status: 400 });
    }
    if(!team.poll_Active){
      return NextResponse.json({ success: false, message: "poll not active" }, { status: 410 });
    }
    // Check if the total number of teams with the same choice is less than 20
    const choiceCount = await TeamModel.countDocuments({ choice: choice });
    let len=size/2;
    if(size%2!=0 && choice=="Horizontal" || (size==1 && choice=='Vertical')){
      len=len+1;
    }
    if (choiceCount >= len) {
      return NextResponse.json({ success: false, message: "This choice is already filled, please select another" }, { status: 400 });
    }

    // Assign the choice to the team
    team.choice = choice;
    await team.save();

    return NextResponse.json({ success: true, message: "Choice assigned successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
