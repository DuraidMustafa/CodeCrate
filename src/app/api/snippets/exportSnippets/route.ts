import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    dbConnect();
    const snippets = await Snippet.find({ userId });
    const json = JSON.stringify(snippets, null, 2);

    return new Response(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=snippets.json",
      },
    });
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
