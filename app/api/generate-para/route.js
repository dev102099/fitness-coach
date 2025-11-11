import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const { prompt } = await request.json();
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return NextResponse.json({
      success: true,
      message: res.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
