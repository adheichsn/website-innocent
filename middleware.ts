"use server"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const sessionCookie = request.cookies.get("sessionToken");
  const sessionToken = sessionCookie ? sessionCookie.value : null;

  if (sessionToken) {
    try {
      // Decode the JWT to find the user's role
      const { payload } = await jwtVerify(sessionToken, JWT_SECRET);

      // Assuming 'role' is stored in the token's payload
      if (payload.role == "ADMIN" && url.pathname.startsWith("/auth")) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }

      if (payload.role == "USER" && url.pathname.startsWith("/auth")) {
        url.pathname = "/vrtour";
        return NextResponse.redirect(url);
      }

      if (payload.role == "USER" && url.pathname.startsWith("/dashboard")) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      // Handle JWT verification error by redirecting to login
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
  }

  // Redirect to /auth if trying to access /home without being logged in
  if (!sessionToken && (url.pathname.startsWith("/vrtour") || url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/feedback"))) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
