import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = parseInt(searchParams.get("skip") || "0");
    dbConnect();
    const snippets = await Snippet.find({ userId }).skip(skip).limit(limit);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Snippets fetched successfully",
        snippets,
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
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
