import { NextRequest, NextResponse } from "next/server";

const unAuthRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const token = request.cookies.get("token");

  // Redirect logged-in users trying to access login or register pages
  if (unAuthRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}
