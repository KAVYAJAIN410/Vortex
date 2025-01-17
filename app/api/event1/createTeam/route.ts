import { dbConnect } from "@/lib/dbConnect";
import TeamModel, { Team } from "@/models/event1/Team.model";
import TeamTokenModel from "@/models/event1/TeamToken.model";
import { IUser, Users } from "@/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

async function generateUniqueTeamCode() {
  try {
    let teamCode;
    let isUnique = false;

    while (!isUnique) {
      teamCode = Math.random().toString(36).substring(2, 10);
      const existingTeam = await TeamModel.findOne({ teamCode });
      if (!existingTeam) {
        isUnique = true;
      }
    }

    return teamCode;
  } catch (err) {
    console.error("Error generating unique team code:", err);
    throw new Error("Team code generation failed");
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  await dbConnect();

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const email = token; // Replace with JWT validation logic if necessary.

    const { teamName } = await request.json();

    // Validate input
    if (!teamName || typeof teamName !== "string" || teamName.trim().length < 3) {
      return NextResponse.json({ message: "Invalid team name" }, { status: 400 });
    }

    const leader = await Users.findOne({ email });
    if (!leader) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!leader.hasFilledDetails) {
      return NextResponse.json({ message: "User has not filled the details" }, { status: 401 });
    }

    if (leader.event1TeamId) {
      return NextResponse.json({ message: "User is already part of a team" }, { status: 409 });
    }

    const existingTeam = await TeamModel.findOne({ teamName });
    if (existingTeam) {
      return NextResponse.json({ message: "Team with the same name already exists" }, { status: 409 });
    }

    const teamCode = await generateUniqueTeamCode();
    const team = new TeamModel({
      teamName:teamName,
      teamCode:teamCode,
      teamLeaderId: leader._id,
      teamLeaderName: leader.name,
      teamLeaderEmail: email,
      teamMembers: [leader._id],
    });
    await team.save();

    await new TeamTokenModel({ teamId: team._id, teamCode: teamCode }).save();

    leader.event1TeamRole = 0;
    leader.event1TeamId = team._id;
    await leader.save();

    return NextResponse.json(
      { message: "Team created successfully", teamCode },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
