import { serverApi } from "@/app/_lib/server_api";
import { SessionData, sessionOptions } from "@/app/_lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session.refresh) {
    session.destroy();
    return Response.json({ error: "Missing refresh token" }, { status: 401 });
  }

  try {
    const res = await serverApi.post(
      "/api/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${session.refresh}`,
        },
      }
    );

    const newAccess = res.data.access || res.data.accessToken;
    if (!newAccess) throw new Error("No access token returned");

    session.access = newAccess;
    await session.save();

    return Response.json({ access: newAccess });
  } catch (err) {
    session.destroy();
    redirect("/auth/login")
    return Response.json({ error: "Refresh failed" }, { status: 401 });
  }
}
