import { cookies } from "next/headers";
import { Login, Signup } from "../types/user_types";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/_lib/session";

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

// export async function loginUser(userObj: Login) {
//   const response = await fetch(`${API_URL}/api/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     cache: "no-store",
//     body: JSON.stringify(userObj),
//   });

//   if (!response.ok) {
//     let errorMessage = "Login failed";
//     try {
//       const errorData = await response.json();
//       errorMessage = errorData.message || errorMessage;
//     } catch {
//       // ignore
//     }
//     throw new Error(errorMessage);
//   }

//   // ✅ Forward cookies from Go backend to browser
//   const setCookieHeader = response.headers.get("set-cookie");

//   if (setCookieHeader) {
//     const cookieStore = await cookies();

//     // Split multiple Set-Cookie headers (they're comma-separated)
//     // But be careful: cookies can have comma in Expires date, so we split on ", " followed by cookie name
//     const cookieStrings = setCookieHeader.split(/,(?=\s*\w+=)/);

//     for (const cookieString of cookieStrings) {
//       // Parse each cookie
//       const parts = cookieString
//         .trim()
//         .split(";")
//         .map((p) => p.trim());
//       const [nameValue] = parts;
//       const [name, value] = nameValue.split("=").map((s) => s.trim());

//       // Parse cookie attributes
//       const options: any = {};

//       for (let i = 1; i < parts.length; i++) {
//         const attr = parts[i];

//         if (attr.toLowerCase().startsWith("max-age=")) {
//           options.maxAge = parseInt(attr.split("=")[1]);
//         } else if (attr.toLowerCase().startsWith("path=")) {
//           options.path = attr.split("=")[1];
//         } else if (attr.toLowerCase().startsWith("domain=")) {
//           options.domain = attr.split("=")[1];
//         } else if (attr.toLowerCase() === "secure") {
//           options.secure = true;
//         } else if (attr.toLowerCase() === "httponly") {
//           options.httpOnly = true;
//         } else if (attr.toLowerCase().startsWith("samesite=")) {
//           const sameSiteValue = attr.split("=")[1].toLowerCase();
//           options.sameSite = sameSiteValue as "lax" | "strict" | "none";
//         }
//       }

//       // Set the cookie in Next.js to forward to browser
//       cookieStore.set(name, decodeURIComponent(value), options);
//     }
//   }

//   return;
// }
