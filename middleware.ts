import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL;

const validateAccessToken = async (accessToken: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.ok
}

const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  })

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.access;
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  let isValid = await validateAccessToken(accessToken);

  if (!isValid) {
    const newAccessToken = await refreshAccessToken(refreshToken);
    console.log(newAccessToken)
    if (!newAccessToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    const response = NextResponse.next();
    response.cookies.set("accessToken", newAccessToken, { path: "/", httpOnly: true });
    return response
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}