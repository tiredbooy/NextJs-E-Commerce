import { redirect } from 'next/navigation';
import { SessionData, sessionOptions } from "@/app/_lib/session";
import axios, { AxiosRequestConfig } from "axios";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSession } from "../auth";
import { serverApi } from "../server_api";
import { Login, Signup } from "../types/user_types";
import { isTokenExpired } from "../utils/utils";

export async function signupUser(userObj: Signup) {
  const response = await serverApi.post("/api/auth/signup", userObj);
  return response.data;
}

export async function loginUser(userObj: Login) {
  const response = await serverApi.post("/api/auth/login", userObj, {
    withCredentials: true,
  });

  const setCookieHeader = response.headers["set-cookie"];

  if (setCookieHeader) {
    const cookieString = Array.isArray(setCookieHeader)
      ? setCookieHeader.join("; ")
      : setCookieHeader;

    const accessMatch = cookieString.match(/access=([^;]+)/);
    const refreshMatch = cookieString.match(/refresh=([^;]+)/);
    const userMatch = cookieString.match(/user=([^;]+)/);

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
      console.log('session:', session);
    }
  }

  return response.data;
}

export async function refreshAccessToken(): Promise<string> {
  const cookieStore = await cookies();

  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session?.refresh) {
    throw new Error("No refresh token");
  }

  const response = await serverApi.post("/api/auth/refresh", {
    refreshToken: session.refresh,
  });

  const newAccessToken = response.data.access || response.data.accessToken;
  if (!newAccessToken) throw new Error("No access token returned");

  session.access = newAccessToken;
  await session.save();

  return newAccessToken;
}

export async function getValidAccessToken() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session.access) throw new Error("Not authenticated");

  if (!isTokenExpired(session.access)) {
    return session.access;
  }

  // Instead of calling session.save() here (illegal in layouts)
  const res = await fetch(
    `http://localhost:3000/api/auth/refresh-token`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    console.log('res:', res);
  };

  const data = await res.json();
  return data.access;
}

export async function authenticatedRequest<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  let token: string;

  try {
    token = await getValidAccessToken();
  } catch (error: any) {
    throw new Error(error.message || "Authentication failed");
  }

  try {
    const response = await serverApi({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Session expired. Please login again");
    }
    throw error;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session || !session.access) {
    return null;
  }

  return authenticatedRequest({
    method: "GET",
    url: "/api/auth/profile",
  });
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
