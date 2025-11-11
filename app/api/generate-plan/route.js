import { NextResponse } from "next/server";

import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const {
      name,
      age,
      heightFt,
      heightIn,
      weight,
      goal,
      level,
      location,
      diet,
      gender,
    } = await request.json();
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `
      You will be given some information about a user and based on that you will have to generate a full workout plan, diet plan, and tips for that user according to the data provided.
      The response must be in valid JSON format only (no markdown, no explanations).

      User details:
      - Name: ${name}
      - Age: ${age}
      - Weight (kg): ${weight}
      - Height: ${heightFt}ft ${heightIn}in
      - Fitness Goal: ${goal}
      - Current Level: ${level}
      - Workout Location: ${location}
      - Diet Preference: ${diet}
      - Gender: ${gender}

      Output JSON structure:
      {
        "workout_plan": [
        focus:,
        day:,
        exercises:[
        name:
        sets:
        reps:
        ]
        ],
        "diet_plan": [
        food_item:[],
        meal_time:,
        purpose/benefits:
        ],
        "tips": [...]
      }
    `,
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
