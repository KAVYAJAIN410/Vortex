import { dbConnect } from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    // Retrieve the token from the request
    const token = await getToken({ req });
    
    // Ensure the access token is a string or null
    const auth: string | null = token && typeof token.accessTokenFromBackend === "string"
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization")?.split(" ")[1] ?? null;

    if (!auth) {
      return NextResponse.json(
        { message: "Authorization token missing" },
        { status: 401 }
      );
    }

    // Get user ID from the token
    const userId = await getTokenDetails(auth);

    // Find the user in the database
    const user = await Users.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "success", user },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(err);

    // Safely handle the error message
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      { message: "error", error: errorMessage },
      { status: 500 }
    );
  }
}