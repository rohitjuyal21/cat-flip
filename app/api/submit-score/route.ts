import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { verifyGameToken } from "@/lib/jwt";
import { GameSession } from "@/model/GameSession";
import { User } from "@/model/User";
import { TIME } from "@/lib/constants";

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

  const session = await GameSession.findOne({ sessionId: decoded.sessionId });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }

  if (!session.completed || !session.endedAt) {
    return NextResponse.json(
      { error: "Game not yet completed" },
      { status: 400 },
    );
  }

  const body = await req.json();
  const { name } = body;

  if (typeof name !== "string" || name.trim() === "") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  // Use the timeTaken from the session instead of calculating it
  const timeTaken = session.timeTaken || 0;
  const timeLeft = Math.max(0, TIME - timeTaken); // Use the same TIME constant as frontend
  const isWin = session.score === 120;

  const MAX_SCORE = 120;
  const MAX_TIME = TIME;
  const MAX_TIME_LEFT = TIME;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof session.score !== "number" ||
    session.score < 0 ||
    session.score > MAX_SCORE ||
    typeof timeTaken !== "number" ||
    timeTaken < 0 ||
    timeTaken > MAX_TIME ||
    typeof timeLeft !== "number" ||
    timeLeft < 0 ||
    timeLeft > MAX_TIME_LEFT ||
    typeof isWin !== "boolean"
  ) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Save user score
  await User.create({
    name: name.trim(),
    score: session.score,
    timeTaken,
    timeLeft,
    isWin,
  });

  // Clear token cookie
  const res = NextResponse.json({ success: true });
  res.cookies.delete("game_token");
  return res;
}
