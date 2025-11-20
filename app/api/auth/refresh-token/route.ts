import { serverApi } from "@/app/_lib/server_api";
import { SessionData, sessionOptions } from "@/app/_lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

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
    if (!newAccessToken) throw new Error("No access token returned");

    session.access = newAccessToken;
    await session.save();

    return NextResponse.json({
      access: newAccessToken,
      success: true,
    });
  } catch (error: any) {
    console.log("Token Refresh Error:", error);

    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions
    );
    await session.destroy();

    return NextResponse.json(
      {
        error: "Token refresh failed",
        message: error?.message || "Unknown error",
      },
      { status: 401 }
    );
  }
}
