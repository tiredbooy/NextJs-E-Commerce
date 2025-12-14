import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  linkOAuthToAccount,
  loginUserWithOAuth,
  signupUser,
} from "@/app/_lib/services/authService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const intent = searchParams.get("intent");

  // Get OAuth session
  const session = await auth();

  const email = session?.user?.email || "";
  const name = session?.user?.name || "";
  const image = session?.user?.image || "";
  const provider = session?.oauth_provider || "";
  const providerId = session?.oauth_id || "";

  // Validate
  if (!email || !provider || !providerId) {
    return NextResponse.redirect(
      new URL("/auth/login?error=invalid_oauth", request.url)
    );
  }
  const userObj = {
    email,
    oauth_provider: provider,
    oauth_id: providerId,
  };

  // SIGNUP INTENT
  if (intent === "signup") {
    const [first_name, last_name] = name.split(" ");

    try {
      // 1. Try to create user
      await signupUser({
        first_name: first_name || "",
        last_name: last_name || "",
        email,
        password: "",
        image,
        oauth_provider: provider,
        oauth_id: providerId,
      });

      // 2. Login immediately after signup
      await loginUserWithOAuth(userObj);

      return NextResponse.redirect(new URL("/", request.url));
    } catch (error: any) {
      console.error("OAuth signup error:", error);

      // Check if error is "user already exists"
      if (
        error.message?.includes("already exists") ||
        error.response?.status === 409 ||
        error.response?.status === 500
      ) {
        // Connect oAuth To User Then Login
        try {
          await linkOAuthToAccount(userObj);

          await loginUserWithOAuth(userObj);

          // Login successful - user had OAuth linked
          return NextResponse.redirect(new URL("/", request.url));
        } catch (loginError) {
          return NextResponse.redirect(
            new URL(
              "/auth/login?error=account_exists&email=" +
                encodeURIComponent(email),
              request.url
            )
          );
        }
      }

      return NextResponse.redirect(
        new URL("/auth/signup?error=oauth_failed", request.url)
      );
    }
  }

  // LOGIN INTENT
  if (intent === "login") {
    try {
      await loginUserWithOAuth(userObj);

      return NextResponse.redirect(new URL("/", request.url));
    } catch (error: any) {
      console.error("OAuth login error:", error);
      return NextResponse.redirect(
        new URL("/auth/login?error=account_not_found", request.url)
      );
    }
  }

  // Invalid intent
  return NextResponse.redirect(new URL("/auth/login", request.url));
}
