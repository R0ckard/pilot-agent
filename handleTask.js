import { gatherContext } from "./gatherContext.js";

export default async function handleTask(task) {
  console.log("🔍 Received task:", JSON.stringify(task, null, 2));

  try {
    console.log("🧾 task.content:", task.content);
    const context = await gatherContext(task.content);
    console.log("📦 Context generated:", JSON.stringify(context, null, 2));

    // Placeholder for further processing
    console.log("✅ Context handling passed. Ready for next step.");
  } catch (error) {
    console.error("❌ Error in handleTask:", error.message);
    console.error("🧨 Stack trace:", error.stack);
  }
}