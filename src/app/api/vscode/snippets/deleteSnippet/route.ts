import dbConnect from "@/lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { verifyToken } from "@clerk/backend";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
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
    const { id } = body;
    if (!id) {
      return new Response(
        JSON.stringify({
          message: "Please provide your snippet id",
          success: false,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    dbConnect();
    await Snippet.findOneAndDelete({
      _id: id,
      userId,
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Snippet deleted successfully",
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
