import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "../../../../models/Snippet";
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
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
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
