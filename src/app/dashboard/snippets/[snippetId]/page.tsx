require("dotenv").config();

import { cookies } from "next/headers";
import SnippetDisplay from "@/components/snippet-display";
import { redirect } from "next/navigation";
const Snippet = async ({
  params,
}: {
  params: Promise<{ snippetId: string }>;
}) => {
  const snippetId = (await params).snippetId;
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const response = await fetch(
    `${process.env.SERVER_URL}/api/snippets/getSingleSnippet?snippetId=${snippetId}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieString,
      },
    },
  );

  const data = await response.json();
  if (!data.success) {
    return redirect("/dashboard");
  }

  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <SnippetDisplay snippet={data.snippet} />
      </div>
    </div>
  );
};

export default Snippet;
