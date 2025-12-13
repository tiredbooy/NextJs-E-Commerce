"use server"
import { oauthLogin } from "@/app/_lib/actions/authAction";
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

  const params = new URLSearchParams();
  // 3. Check intent
  const { intent } = await searchParams; // "signup" or "login"

  // 4. If signup: redirect to signup form with data
  if (intent === "signup") {
    if (email) params.set("email", email);
    if (name) params.set("name", name);
    if (image) params.set("image", image);
    if (provider) params.set("oauth_provider", provider);
    if (providerId) params.set("oauth_id", providerId);

    redirect(`/auth/signup?${params.toString()}`);
  }

  // 5. If login: try to login
  if (intent === "login") {
    console.log("Error IS Happenning");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("oauth_provider", provider);
    formData.append("oauth_id", providerId);
    
    const result = await oauthLogin(undefined, formData);
    console.log('result:', result);
    // if (result.success) {
      redirect("/");
    // }
    // Call your oauthLogin action
    // If success: redirect to /
    // If fail: redirect to /auth/login?error=notfound
  }
}
