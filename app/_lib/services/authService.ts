import { SessionData, sessionOptions } from "@/app/_lib/session";
import axios, { AxiosRequestConfig } from "axios";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSession } from "../auth";
import { serverApi } from "../server_api";
import { Login, LoginWithOAuth, Signup } from "../types/user_types";
import { decodeJWT, isTokenExpired } from "../utils/utils";

// Track ongoing refresh to prevent race conditions
let refreshPromise: Promise<string> | null = null;

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

export async function loginUserWithOAuth(userObj: LoginWithOAuth) {
  const response = await serverApi.post("/api/auth/oauth/login", userObj, {
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

  return response.data
}

export async function linkOAuthToAccount(userObj: LoginWithOAuth) {
  try {
    const response = await serverApi.post("/api/auth/link-oauth", userObj)
    return response
  }
  catch(e: any) {
    throw new Error(e.message || "Failed to Link oAuth")
  }
  
}

async function performTokenRefresh(): Promise<string> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      // Get the current cookies to pass along
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      const cookieHeader = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

      // Make internal API call with cookies
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Token refresh failed");
      }

      const data = await response.json();

      if (!data.access) {
        throw new Error("No access token returned from refresh");
      }

      return data.access;
    } catch (error) {
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function getValidAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );
  if (!session.access) {
    throw new Error("Not authenticated");
  }

  // Check token without buffer first
  const isExpiredNoBuffer = isTokenExpired(session.access, 0);
  // Decode to see actual expiration
  const payload = decodeJWT(session.access);

  if (!isExpiredNoBuffer) {
    return session.access;
  }

  try {
    const newToken = await performTokenRefresh();

    // After refresh, read the session again to get updated token
    const updatedCookieStore = await cookies();
    const updatedSession = await getIronSession<SessionData>(
      updatedCookieStore,
      sessionOptions
    );

    const finalToken = newToken;

    const newPayload = decodeJWT(finalToken);
    const newExpiryTime = newPayload?.exp
      ? new Date(newPayload.exp * 1000)
      : null;

    const isNewTokenExpired = isTokenExpired(finalToken, 0);

    if (isNewTokenExpired) {
      throw new Error("expired token. Please Login Again");
    }

    return finalToken;
  } catch (error) {
    throw new Error("Session expired. Please login again.");
  }
}

export async function getSessionReadOnly() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  return {
    access: session.access,
    refresh: session.refresh,
    user: session.user,
    isLoggedIn: session.isLoggedIn,
  };
}

export async function getCurrentUserReadOnly() {
  const session = await getSessionReadOnly();

  if (!session || !session.access || !session.isLoggedIn) {
    return null;
  }

  if (isTokenExpired(session.access)) {
    return null;
  }

  return session.user;
}

export async function authenticatedRequest<T = any>(
  config: AxiosRequestConfig,
  retryCount = 0
): Promise<T> {
  const MAX_RETRIES = 1;

  try {
    const token = await getValidAccessToken();

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
      if (retryCount < MAX_RETRIES) {
        try {
          await performTokenRefresh();
          return authenticatedRequest<T>(config, retryCount + 1);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          throw new Error("Session expired. Please login again.");
        }
      }
      throw new Error("Session expired. Please login again.");
    }

    throw error;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session || !session.access) {
    return null;
  }

  try {
    return await authenticatedRequest({
      method: "GET",
      url: "/api/auth/profile",
    });
  } catch (error) {
    return null;
  }
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

export async function logoutUser() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  await session.destroy();
}
