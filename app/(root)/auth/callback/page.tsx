import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    intent: "signup" | "login";
  };
}

export default async function CallbackPage({ searchParams }: Props) {
  // 1. Get OAuth session
  const session = await auth();

  // 2. Extract data
  const email = session?.user?.email || "";
  const name = session?.user?.name || "";
  const image = session?.user?.image || "";
  const provider = session?.oauth_provider || "";
  const providerId = session?.oauth_id || "";

  // 3. Check intent
  const {intent} = await searchParams; // "signup" or "login"

  // 4. If signup: redirect to signup form with data
  if (intent === "signup") {
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    if (name) params.set("name", name);
    if (image) params.set("image", image);
    if (provider) params.set("oauth_provider", provider);
    if (providerId) params.set("oauth_id", providerId);

    redirect(`/auth/signup?${params.toString()}`);
  }

  // 5. If login: try to login
  //   if (intent === "login") {
  //     // Call your oauthLogin action
  //     // If success: redirect to /
  //     // If fail: redirect to /auth/login?error=notfound
  //   }
}
