import { connectToDB } from "@utils/database"
import Snippet from "@models/snippet";


export const POST = async(req) => {
const {userId,language, snippet,purpose, title,tag} = await req.json();

try {
    await connectToDB();
    const newSnippet = new Snippet({
        creator: userId,
        title,
        purpose,
        language,
        snippet,
        tag
    })

    await newSnippet.save();
    return new Response(JSON.stringify(newSnippet), {status: 201})
} catch (error) {
    return new Response("Failed to create a new code snippet ", {status: 500})
}
}