import { NextResponse } from "next/server";

const { ai } = require("@/utils/gemini");

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
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
