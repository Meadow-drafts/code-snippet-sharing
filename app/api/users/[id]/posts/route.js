import Snippet from "@models/snippet";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const snippets = await Snippet.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(snippets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch snippets created by user", { status: 500 })
    }
} 