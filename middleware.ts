import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;



  if (token) {
    
  } else {
 
  }
}

export const config = {
  matcher: [
    '/',
    '/(.*)'        // (.*) matches all sub-paths
  ]
}