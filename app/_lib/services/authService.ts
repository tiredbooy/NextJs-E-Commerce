import { cookies } from "next/headers";
import { Login, Signup } from "../types/user_types";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/_lib/session";
import { getSession } from "../auth";

const API_URL = process.env.API_URL;

export async function signupUser(userObj: Signup) {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  });

  const data = await response.json(); // parse first

  if (!response.ok) {
    // Handle 400, 409, 500 etc.
    throw new Error(data.message || "Failed to create user");
  }

  return data;
}

export async function loginUser(userObj: Login) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(userObj),
  });

  if (!response.ok) {
    let errorMessage = "Login failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  const setCookieHeader = response.headers.get("set-cookie");

  if (setCookieHeader) {
    const accessMatch = setCookieHeader.match(/access=([^;]+)/);
    const refreshMatch = setCookieHeader.match(/refresh=([^;]+)/);
    const userMatch = setCookieHeader.match(/user=([^;]+)/);

    if (accessMatch && refreshMatch && userMatch) {
      const access = accessMatch[1];
      const refresh = refreshMatch[1];
      const userData = JSON.parse(decodeURIComponent(userMatch[1]));

      const cookieStore = await cookies();
      const session = await getIronSession<SessionData>(
        cookieStore,
        sessionOptions
      );

      session.access = access;
      session.refresh = refresh;
      session.user = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        image: userData.image || "",
        role: userData.role || "user",
      };
      session.isLoggedIn = true;

      await session.save();
    }
  }

  return;
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const res = await fetch(`${API_URL}/api/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.access}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get User Profile");
  }

  const data = await res.json();

  return data;
}

export async function getCurrentSession() {
  const session = await getSession();

  return {
    access: session.access,
    refresh: session.refresh,
    user: session.user,
    isLoggedIn: session.isLoggedIn,
  };
}
