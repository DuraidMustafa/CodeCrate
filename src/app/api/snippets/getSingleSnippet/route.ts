import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const { searchParams } = new URL(request.url);
    const snippetId = searchParams.get("snippetId") || "";

    dbConnect();

    const snippet = await Snippet.find({ _id: snippetId, userId });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Snippet fetched successfully",
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
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
