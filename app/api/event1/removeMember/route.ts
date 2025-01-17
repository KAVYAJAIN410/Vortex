import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import TeamModel from "@/models/event1/Team.model";
import { Users } from "@/models/user.model";


export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, memberIdToRemove } = await req.json();
      console.log(email);
    // Validate leader existence
    const leader = await Users.findOne({email});
    if (!leader) {
      return NextResponse.json(
        { message: "Leader not found" },
        { status: 406 }
      );
    }

    // console.log(',,,,,,,,,,,,,,,,,,,,,,,,',leader);

    // Ensure leader has a valid role and is assigned to a team
    if (leader.event1TeamRole !== 0) {
      return NextResponse.json(
        { message: "User is not a team leader" },
        { status: 420 }
      );
    }
    if (!leader.event1TeamId) {
      return NextResponse.json(
        { message: "Leader has no team assigned" },
        { status: 419 }
      );
    }

    // Convert event1TeamId to ObjectId if necessary
    // const event1Id = TeamModel.findById(leader.event1TeamId)
    // console.log("Leader's Team ID:", event1Id);

    // Fetch the leader's team

    // const userrr = await Users.find();
    // console.log('jddddddddddddddddddddddddd',userrr);

    const teams = await TeamModel.find();
    console.log("jjjjjjjjjjjjjjjjjjjjjjj", teams);
    console.log(".........................", leader.event1TeamId);
    const team = await TeamModel.findOne({ _id: leader.event1TeamId });
    console.log("Team Found:", team);
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    // Ensure the leader matches the team's leader
    if (team.teamLeaderId.toString() !== leader._id.toString()) {
      return NextResponse.json(
        { message: "User is not the leader of this team" },
        { status: 403 }
      );
    }

    

    // Ensure the team does not have fewer than 1 member after removal
    if (team.teamMembers.length <= 1) {
      return NextResponse.json(
        { message: "Cannot remove the last team member" },
        { status: 400 }
      );
    }

    // Get the member ID to remove
   

    // Fetch and update the removed member's data
    console.log(memberIdToRemove)
    const removedMember = await Users.findById(memberIdToRemove);
    if (!removedMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }
    const memberIndexToRemove = team.teamMembers.indexOf(memberIdToRemove);
    // Remove the member from the team
    team.teamMembers.splice(memberIndexToRemove, 1);
    await team.save();

    removedMember.event1TeamId = null;
    removedMember.event1TeamRole = null;
    await removedMember.save();

    return NextResponse.json(
      { message: "Member removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
