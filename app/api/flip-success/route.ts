// /api/flip-success/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { verifyGameToken } from "@/lib/jwt";
import { GameSession } from "@/model/GameSession";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("game_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { valid, decoded } = verifyGameToken(token);
  if (!valid || !decoded?.sessionId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  await dbConnect();

  const session = await GameSession.findOne({ sessionId: decoded.sessionId });
  if (!session || session.completed) {
    return NextResponse.json(
      { error: "Session not found or already completed" },
      { status: 400 },
    );
  }

  // Update score securely (e.g., 10 points per match)
  session.score += 10;
  await session.save();

  return NextResponse.json({ success: true, updatedScore: session.score });
}
