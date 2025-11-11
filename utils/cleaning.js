export function safeJsonParse(str) {
  try {
    // Remove Markdown fences like ```json ... ```
    const cleaned = str
      .replace(/```json|```/g, "") // remove code block markers
      .trim();

    // Find JSON inside
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");

    return JSON.parse(match[0]);
  } catch (error) {
    console.error("❌ Failed to parse AI JSON:", error);
    return null;
  }
}
