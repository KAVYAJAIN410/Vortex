import { dbConnect } from "@/lib/dbConnect";
import TeamModel, { Team } from "@/models/event1/Team.model";
import TeamTokenModel from "@/models/event1/TeamToken.model";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const { email } = await request.json();

    const user = await Users.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    //? User does not have an event1TeamId
    if (!user.event1TeamId) {
      return NextResponse.json({ success: false, message: "User is not part of a team" }, { status: 400 });
    }

    const team: Team | null = await TeamModel.findById(user.event1TeamId);
    if (!team) {
      return NextResponse.json({ success: false, message: "No team associated with the user" }, { status: 404 });
    }

    //? Teams with more than 1 member cannot be deleted
    //? If there is only one member, it must be the team leader
    if (team.teamMembers.length !== 1) {
      return NextResponse.json({ success: false, message: "Cannot delete team with more than one member" }, { status: 400 });
    }

    //? Delete the team token
    await TeamTokenModel.deleteOne({ teamId: team._id });

    //? Delete the team
    await TeamModel.findByIdAndDelete(team._id);

    //? Remove the user's associations with the team
    user.event1TeamId = null;
    user.event1TeamRole=null;
    delete user.event1TeamRole;
    await user.save();

    return NextResponse.json({ success: true, message: "Team deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json({ success: false, message: "Team deletion failed" }, { status: 500 });
  }
}
