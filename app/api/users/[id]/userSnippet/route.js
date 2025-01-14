import { connectToDB } from "@utils/database"
import Snippet from "@models/snippet";


export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const snippet = await Snippet.findById(params.id).populate('creator');

        const snippets = await Snippet.find({creator : request.id })

        if(!snippet) return new Response("Snippet not found", {status: 404});

        return new Response(JSON.stringify(snippet), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch all snippets", { status: 500})
        
    }
}

