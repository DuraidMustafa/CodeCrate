import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const { searchParams } = new URL(request.url);
    const snippetId = searchParams.get("snippetId") || "";
    if (!snippetId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Snippet ID is missing",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    dbConnect();

    const snippet = await Snippet.findOne({ _id: snippetId });
    if (snippet) {
      if (snippet.userId == userId || snippet.visibility === "public") {
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
      }
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: "Snippet not found",
      }),
      {
        status: 404,
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
