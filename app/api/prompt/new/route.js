import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tags } = await req.json();
  console.log("Received data:", { userId, prompt, tags });
  try {
    await connectToDB(); // Lambda func 이기 때문에 매번 불러줘야함
    const newPrompt = new Prompt({ creator: userId, prompt, tags });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt, { status: 201 }));
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
