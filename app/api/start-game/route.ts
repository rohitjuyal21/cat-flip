import { NextRequest, NextResponse } from "next/server";
import { generateGameToken } from "@/lib/jwt";
import { nanoid } from "nanoid";
import { GameSession } from "@/model/GameSession";
import dbConnect from "@/lib/dbConnect"; // ✅ important!

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const sessionId = nanoid(16);
    await GameSession.create({ sessionId, ip, userAgent });

    const token = generateGameToken(sessionId);
    const res = NextResponse.json({ success: true });

    res.cookies.set("game_token", token, {
      httpOnly: true,
      maxAge: 2 * 60,
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    return res;
  } catch (err) {
    console.error("Start game error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
