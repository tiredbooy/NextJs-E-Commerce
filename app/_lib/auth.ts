"use server"

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, defaultSession, sessionOptions } from "./session";

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    return defaultSession;
  }

  // ✅ Return plain object, not the session instance
  return {
    access: session.access,
    refresh: session.refresh,
    user: session.user,
    isLoggedIn: session.isLoggedIn,
  } as SessionData;
}

// Separate function for getting the session instance (for modifying/saving)
export async function getSessionInstance() {
  const cookieStore = await cookies();
  return await getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function logout() {
  const session = await getSessionInstance();
  session.destroy();
}
