import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, score, timeTaken, timeLeft, isWin } = await req.json();
    const user = await User.create({ name, score, timeTaken, timeLeft, isWin });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 },
    );
  }
}
