import { connectToDB } from "@utils/database"
import Snippet from "@models/snippet";
import User from "@models/user"


export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const snippet = await Snippet.findById(params.id).populate('creator');

        if(!snippet) return new Response("Snippet not found", {status: 404});

        return new Response(JSON.stringify(snippet), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch all snippets", { status: 500})
        
    }
}

export const PATCH = async (request, {params}) => {
    const {title,snippet, tag, purpose,language} = await request.json();

    try {
        await connectToDB();

        const existingSnippet  = await Snippet.findById(params.id)
        if(!existingSnippet) return new Response("Snippet not found", {status: 404})

        existingSnippet.snippet = snippet;
        existingSnippet.tag = tag;
        existingSnippet.language = language;
        existingSnippet.title = title;
        existingSnippet.purpose = purpose;

        await existingSnippet.save();

        return new Response(JSON.stringify(existingSnippet), {status: 200});
    } catch (error) {
        return new Response("Failed to update snippet",{status:500})
    }
}

export const DELETE = async(request, {params}) => {
    try {
        await connectToDB();

        await Snippet.findByIdAndDelete(params.id);

        return new Response("Snippet deleted successfully", {status: 200})

    } catch (error) {
        return new Response("Failed to delete snippet", {
            status: 500
        })
    }
}