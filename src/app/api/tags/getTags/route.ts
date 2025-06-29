import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Tag } from "@/models/Tag";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    dbConnect();
    const tags = await Tag.find({
      $or: [{ userId: userId }, { default: true }],
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Tags fetched successfully",
        tags,
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
