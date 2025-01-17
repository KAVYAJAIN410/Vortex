import {dbConnect} from "@/lib/dbConnect";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { Users } from "@/models/user.model";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

export async function getUserEmail(req: NextApiRequest): Promise<string> {
    try {
      // Connect to the MongoDB database
      await dbConnect();
  
      // Get the token from the request using next-auth or Authorization header
      const token = await getToken({ req });
      const auth = token
        ? token.accessTokenFromBackend
        : req.headers.authorization?.split(" ")[1];
  
      if (!auth) {
        throw new Error("Authorization token missing");
      }
  
      // Ensure the token is not null or undefined
      if (typeof auth !== 'string') {
        throw new Error("Invalid token format");
      }
  
      // Get the user ID from the token details
      const userId = await getTokenDetails(auth);
  
      // Find the user by ID in the database
      const user = await Users.findById(userId);
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Return the user's email
      return user.email;
    } catch (err: unknown) {
      // Handle errors and rethrow them with a meaningful message
      console.error("Error getting user email:", err);
      throw new Error(err instanceof Error ? err.message : "Unknown error");
    }
  }
  