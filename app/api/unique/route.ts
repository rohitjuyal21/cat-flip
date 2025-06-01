import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name") || "";
    const user = await User.findOne({ name });
    if (user) {
      return NextResponse.json({ unique: false });
    }
    return NextResponse.json({ unique: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to check unique name" },
      { status: 500 },
    );
  }
}
