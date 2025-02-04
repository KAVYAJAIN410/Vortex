import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Secret for JWT decoding (set this in your environment variables)
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/auth/login"];

  if (token) {
    // If authenticated, allow access to the requested path
    return NextResponse.next();
  } else {
      const redirectUrl = new URL("/", request.url);
    }
    return NextResponse.next(); // Allow access to public paths
  }

export const config = {
  matcher: [
    "/",            // Homepage
    "/(.*)",        // All sub-paths
  ],
};
