AI Fitness Coach

Your personal AI-powered fitness companion — generating customized workout and diet plans based on your body profile, goals, and preferences.

🚀 Overview

AI Fitness Coach is a Next.js-based web app that intelligently crafts personalized fitness plans — including workouts, diets, and wellness tips — using cutting-edge AI models.
It combines powerful LLM reasoning (Gemini) with smooth front-end animations (GSAP) and real-time text-to-speech (Deepgram) for a truly interactive experience.

🧠 Features
🧍 Personalized User Input

Users can provide:

Basic Info: Name, Age, Gender

Body Stats: Height, Weight

Fitness Goal: Weight Loss, Muscle Gain, Endurance, etc.

Fitness Level: Beginner / Intermediate / Advanced

Workout Location: Home / Gym / Outdoor

Dietary Preference: Veg / Non-Veg / Vegan / Keto

(Optional) Medical history, stress levels, lifestyle notes

⚙️ AI-Powered Plan Generation

Using the Gemini API, the app generates:

🏋️ Workout Plan — Daily routines with exercises, sets, reps & rest intervals

🥗 Diet Plan — Meals for breakfast, lunch, dinner, and snacks

💬 AI Tips & Motivation — Custom advice, form corrections, and motivational insights

🔊 Voice Interaction

Read My Plan: Listen to your AI-generated workout and diet using Deepgram TTS

Section-based Playback: Choose to hear only your Workout or Diet section

📦 Extra Features

📄 Export Plan as PDF

💾 Save your plan in Supabase

🌗 Dark / Light mode toggle (coming soon)

🔁 Regenerate plan anytime (coming soon)

⚡ Smooth animations using GSAP / Framer Motion

🧩 Tech Stack
Layer Tech Used
Frontend Next.js 14
, React.js
, TailwindCSS
, GSAP

Backend / API Node.js, Next.js API Routes
Database Supabase
for user and plan storage
AI & TTS Gemini
for content generation, Deepgram
for speech synthesis
Animations GSAP for UI transitions
Auth Supabase Auth
🧭 Workflow

User Inputs personal and fitness details

AI Engine (Gemini) processes input → returns structured JSON (Workout + Diet + Tips)

Frontend parses JSON → displays in a card-based step UI

GSAP animates transitions between cards

User can listen to plan sections via Deepgram TTS

Save / Export / Regenerate as needed
