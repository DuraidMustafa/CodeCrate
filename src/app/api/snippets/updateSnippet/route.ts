import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "../../../../models/Snippet";
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const body = await request.json();
    const { title, code, language, defaultTags, id, visibility } = body;
    if (!code) {
      return new Response(
        JSON.stringify({
          message: "Please provide your snippet",
          success: false,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
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

    const newSnippet = await Snippet.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        code: code,
        language: language,
        tags: defaultTags,
        userId: userId,
        visibility,
      },
    );
    return new Response(
      JSON.stringify({
        success: true,
        message: "Snippet updated successfully",
        newSnippet,
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
