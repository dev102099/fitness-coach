export const speak = async (text) => {
  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error("TTS request failed");
    }

    // Convert stream to blob and play
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error generating audio:", error);
  }
};
