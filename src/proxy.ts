import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl;

  // Intercept all routes under the /admin namespace
  if (url.pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
      try {
        const auth = authHeader.split(" ")[1];
        // Safely decode using Web-Standard atob for edge compatibility
        const decoded = atob(auth);
        const [user, pwd] = decoded.split(":");

        if (user === "admin" && pwd === "admin123") {
          return NextResponse.next();
        }
      } catch (error) {
        console.error("Auth header parse failure:", error);
      }
    }

    // Request Credentials via standard browser Basic Authentication prompt
    return new NextResponse("Admin Authentication Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Goodluck CRM Admin Panel"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
