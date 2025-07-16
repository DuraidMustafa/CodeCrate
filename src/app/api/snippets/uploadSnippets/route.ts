import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { Snippet } from "@/models/Snippet";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const body = await request.json();
    const { snippets } = body;
    const sanitized = snippets
      .map((item: any) => {
        if (
          typeof item.title !== "string" ||
          typeof item.language !== "string" ||
          typeof item.code !== "string" ||
          typeof item.shortcut !== "string"
        ) {
          return null;
        }

        return {
          title: item.title,
          language: item.language,
          code: item.code,
          tags: Array.isArray(item.tags) ? item.tags : [],
          visibility:
            typeof item.visibility === "string" ? item.visibility : "private",
          userId,
          shortcut: item.shortcut,
        };
      })
      .filter(Boolean);
    dbConnect();
    const uploadedSnippets = await Snippet.insertMany(sanitized);
    return new Response(
      JSON.stringify({
        success: true,
        uploadedSnippets,
        message: "Snippets uploaded successfully",
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
