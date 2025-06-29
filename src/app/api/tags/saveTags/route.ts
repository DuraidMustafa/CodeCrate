import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Tag } from "@/models/Tag";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const body = await request.json();
    const { tag } = body;

    if (!tag) {
      return new Response(
        JSON.stringify({ message: "Please provide your tag", success: false }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    dbConnect();
    const isAlreadyUserTag = await Tag.findOne({ userId, name: tag });
    if (isAlreadyUserTag) {
      return new Response(
        JSON.stringify({
          message: "Tag already exists",
          success: false,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const newTags = await Tag.create({ userId, name: tag });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Tag created successfully",
        newTags,
      }),
      {
        status: 201,
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
