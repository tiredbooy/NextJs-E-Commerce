import { serverApi } from "@/app/_lib/server_api";
import { SessionData, sessionOptions } from "@/app/_lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJWT } from "@/app/_lib/utils/utils";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions
    );

    if (!session.refresh) {
      await session.destroy();
      return NextResponse.json(
        { error: "No refresh token found" },
        { status: 401 }
      );
    }
    const res = await serverApi.post(
      "/api/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${session.refresh}`,
        },
      }
    );

    const newAccessToken = res.data.accessToken || res.data.access;
    if (!newAccessToken) {
      throw new Error("No access token returned from backend");
    }

    // DEBUG: Confirm the new token is actually valid
    // const payload = decodeJWT(newAccessToken);
    // console.log("New access token exp:", payload?.exp);
    // console.log(
    //   "New token expires at:",
    //   payload?.exp ? new Date(payload.exp! * 1000) : "N/A"
    // );

    await session.destroy();

    const freshSession = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions
    );

    freshSession.access = newAccessToken;
    freshSession.refresh = session.refresh; // keep the working refresh token
    freshSession.user = session.user; // preserve user data if you have it
    freshSession.isLoggedIn = true;

    await freshSession.save();

    return NextResponse.json({
      access: newAccessToken,
      success: true,
    });
  } catch (error: any) {
    try {
      const cookieStore = await cookies();
      const session = await getIronSession<SessionData>(
        cookieStore,
        sessionOptions
      );
      await session.destroy();
    } catch (destroyError) {
      console.error("Failed to destroy session on error:", destroyError);
    }

    return NextResponse.json(
      {
        error: "Token refresh failed",
        message: error?.message || "Unknown error",
      },
      { status: 401 }
    );
  }
}
