import { NextResponse } from "next/server";
import { askAI } from "@/lib/askAI";
import { GenerateParamsSchema } from "@/features/notepad/interfaces/response.interface";
import z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, model } = GenerateParamsSchema.parse(body);
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    const aiResponse = await askAI(prompt, model);  

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', issues: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}