import { SessionOptions } from "iron-session";

export interface SessionData {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    name: string;
    image?: string;
    role: string;
  };
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  access: "",
  refresh: "",
  user: {
    id: 0,
    email: "",
    name: "",
    image: "",
    role: "",
  },
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!, // Must be at least 32 characters
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 604800, // 7 days
    path: "/",
  },
};
