import { connectToDB } from "@utils/database";
import Snippet from "@models/snippet";

export const GET = async (request) => {
  try {
    await connectToDB();

    const snippets = await Snippet.find({}).populate("creator");

    return new Response(JSON.stringify(snippets), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(`Failed to fetch all snippets ${error}`, {
      status: 500,
    });
  }
};
