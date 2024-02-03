import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
import User from "@models/user"


export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        const prompts = await Prompt.find({creator : request.id })

        if(!prompt) return new Response("Promt not found", {status: 404});

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500})
        
    }
}

