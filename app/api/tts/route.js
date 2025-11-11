import { createClient } from "@deepgram/sdk";

const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

export async function POST(req) {
  const { text } = await req.json();

  const response = await deepgram.speak.request(
    { text },
    {
      model: "aura-2-thalia-en",
      encoding: "mp3",
    }
  );

  const stream = await response.getStream();
  if (!stream) {
    return new Response("Failed to get audio stream", { status: 500 });
  }

  return new Response(stream, {
    headers: {
      "Content-Type": "audio/wav",
    },
  });
}
