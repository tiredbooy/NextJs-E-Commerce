import { SessionData, sessionOptions } from "@/app/_lib/session";
import axios, { AxiosRequestConfig } from "axios";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSession } from "../auth";
import { Login, Signup } from "../types/user_types";

const API_URL = process.env.API_URL;

// Create axios instance for server-side use
const serverApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    }
  }

  return response.data;
}

// Refresh token function
export async function refreshAccessToken() {
  const session = await getSession();

  if (!session.refresh) {
    throw new Error("No refresh token available");
  }

  const response = await serverApi.post("/api/auth/refresh", {
    refreshToken: session.refresh,
  });

  const newAccessToken = response.data.access || response.data.accessToken;

  // Update session with new access token
  const cookieStore = await cookies();
  const updatedSession = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  updatedSession.access = newAccessToken;
  await updatedSession.save();

  return newAccessToken;
}

// Authenticated axios wrapper with auto-refresh
export async function authenticatedRequest<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  const session = await getSession();

  if (!session || !session.access) {
    throw new Error("You must be logged in");
  }

  // First attempt with current token
  try {
    const response = await serverApi({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${session.access}`,
      },
    });
    return response.data;
  } catch (error) {
    // If 401, refresh and retry
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();

        // Retry with new token
        const response = await serverApi({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        return response.data;
      } catch (refreshError) {
        throw new Error("Session expired. Please login again.");
      }
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
