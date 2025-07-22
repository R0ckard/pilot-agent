// Force update – static context for Pilot Agent – 23 July 2025
export async function gatherContext(taskContent) {
  return [
    {
      role: "system",
      content: "You are a helpful business assistant working inside an AI-powered organization called AI Staff. You receive tasks and respond clearly, concisely, and helpfully.",
    },
    {
      role: "user",
      content: taskContent,
    }
  ];
}