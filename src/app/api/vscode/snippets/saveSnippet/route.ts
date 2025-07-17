import dbConnect from "@/lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { verifyToken } from "@clerk/backend";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    const userId = payload.sub;
    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    const body = await request.json();
    const { code, language, shortcut } = body;
    dbConnect();
    const snippet = await Snippet.create({ userId, code, language, shortcut });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Snippet saved successfully",
        snippet,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Server Error Occurred",
        error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
