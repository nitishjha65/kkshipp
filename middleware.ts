import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  try {
    // Allow the request to pass through to the next handler
    return NextResponse.next();
  } catch (error) {
    // Log the error with stack trace for debugging
    console.error("Error during request handling:", error);

    // Optionally, log the error in a more structured format (like an external service)
    // For example, sending it to Sentry, LogRocket, etc.

    // Send a custom error response
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }

  //   const isPublicPath =
  //     path === "/login" || path === "/signup" || path === "/verifyemail";

  //   const token = request.cookies.get("token")?.value || "";

  //   // //login but access login page
  //   // if (isPublicPath && token) {
  //   //   return NextResponse.redirect(new URL("/profile", request.nextUrl));
  //   // }

  //   //requests private path without login
  //   if (!isPublicPath && !token) {
  //     return NextResponse.redirect(new URL("/login", request.nextUrl));
  //   }
}

// export const config = {
//   matcher: ["/login", "/signup", "/profile/:path*", "/verifyemail"],
// };
