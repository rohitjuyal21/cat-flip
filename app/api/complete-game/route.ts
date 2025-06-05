import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { verifyGameToken } from "@/lib/jwt";
import { GameSession } from "@/model/GameSession";

export async function POST(req: NextRequest) {
  await dbConnect();

  const token = req.cookies.get("game_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { valid, decoded, reason } = verifyGameToken(token);
  if (!valid || !decoded?.sessionId) {
    return NextResponse.json(
      { error: reason || "Invalid session" },
      { status: 401 },
    );
  }

  const { timeTaken } = await req.json(); // Get time taken from frontend

  const session = await GameSession.findOne({ sessionId: decoded.sessionId });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }

  if (session.completed) {
    return NextResponse.json({ message: "Session already marked complete" });
  }

  session.endedAt = new Date();
  session.completed = true;
  session.timeTaken = timeTaken; // Store the frontend time
  await session.save();

  return NextResponse.json({ success: true });
}
