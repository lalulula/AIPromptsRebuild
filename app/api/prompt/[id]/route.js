import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET(read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Failed to fint prompt", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
// PATCH/PUT (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const promptForUpdate = await Prompt.findById(params.id);
    if (!promptForUpdate)
      return new Response("Failed to find prompt", { status: 404 });

    promptForUpdate.prompt = prompt;
    promptForUpdate.tag = tag;

    await promptForUpdate.save();
    return new Response(JSON.stringify(promptForUpdate), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};
// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
