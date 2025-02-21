import { dbConnect } from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { Users } from "@/models/user.model";
import TeamModel from "@/models/event1/Team.model";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface User {
  _id: string;
  event1TeamId: string;
  // Add any other fields from the User model you need
}

interface Team {
  _id: string;
 teamMembers: string[]; // Array of user IDs (strings)
  // Add any other fields from the Team model you need
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    // Get token from NextAuth
    const token = await getToken({ req });

    // Ensure that token is not an empty object and accessTokenFromBackend exists
    if (!token || typeof token.accessTokenFromBackend !== 'string') {
      // If token is invalid, check the Authorization header
      const authorizationHeader = req.headers.get("Authorization");
      const auth = authorizationHeader ? authorizationHeader.split(" ")[1] : null;

      if (!auth) {
        return NextResponse.json(
          { message: "Authorization token missing" },
          { status: 401 }
        );
      }

      // Use the Authorization token if accessTokenFromBackend is missing
      const userId = await getTokenDetails(auth);

      // Fetch user details from the database
      const user = await Users.findById(userId) as User | null;
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 401 });
      }

      // Fetch the team based on the user's teamId
      const team = await TeamModel.findById(user.event1TeamId) as Team | null;
      if (!team) {
        return NextResponse.json({ message: "Team not found" }, { status: 402 });
      }

      const teamMembers = team.teamMembers;
      const finalMembers: User[] = [];

      // Fetch the details of all team members
      for (let i = 0; i < teamMembers.length; i++) {
        const member = await Users.findById(teamMembers[i]) as User | null;
        if (member) {
          finalMembers.push(member);
        }
      }

      return NextResponse.json(
        { message: "success", user, team, members: finalMembers },
        { status: 200 }
      );
    } else {
      // If token is valid, use accessTokenFromBackend
      const userId = await getTokenDetails(token.accessTokenFromBackend);

      // Fetch user details from the database
      const user = await Users.findById(userId) as User | null;
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 406 });
      }

      // Fetch the team based on the user's teamId
      const team = await TeamModel.findById(user.event1TeamId) as Team | null;
      if (!team) {
        return NextResponse.json({ message: "Team not found" }, { status: 403 });
      }

      const teamMembers = team.teamMembers;
      const finalMembers: User[] = [];

      // Fetch the details of all team members
      for (let i = 0; i < teamMembers.length; i++) {
        const member = await Users.findById(teamMembers[i]) as User | null;
        if (member) {
          finalMembers.push(member);
        }
      }

      return NextResponse.json(
        { message: "success", user, team, members: finalMembers },
        { status: 200 }
      );
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
        console.log(err);
        return NextResponse.json(
            { message: "error", error: err.message },
            { status: 500 }
        );
    } else {
        console.log("An unknown error occurred");
        return NextResponse.json(
            { message: "error", error: "Unknown error" },
            { status: 500 }
        );
    }
}

}
