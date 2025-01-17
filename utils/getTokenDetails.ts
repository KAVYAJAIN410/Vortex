import { jwtVerify, JWTPayload } from 'jose';

export async function getTokenDetails(token: string | null): Promise<string | null> {
  try {
    if (!token) {
      console.error("Token is null");
      throw new Error("Token is null");
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    if (!secretKey) {
      throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
    }

    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );

    const userId = tokenDetails.payload._id as string | undefined;

    if (!userId) {
      throw new Error("User ID is missing in the token payload");
    }

    return userId;
  } catch (err: unknown) {
    console.error("Error verifying token:", err);
    return null;
  }
}
