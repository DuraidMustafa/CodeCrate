import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { sessionId } = await auth();
    const client = await clerkClient();
    const token = await client.sessions.getToken(sessionId || "", "vscode");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Snippet fetched successfully",
        token,
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
        message: "Error fetching snippet",
        error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
