import { supabase } from './supabaseClient.js';
import { handleTask } from './handleTask.js';

export async function pollTasks() {
  console.log(`[${new Date().toISOString()}] Polling for new Pilot tasks...`);

  const { data: tasks, error } = await supabase
    .from('memory_chunks')
    .select('*')
    .eq('agent', 'Pilot')
    .in('status', ['new', 'pending']);

  if (error) {
    console.error('Error fetching tasks:', error);
    return;
  }

  for (const task of tasks) {
    try {
      console.log(`Handling task ${task.id}`);
      await handleTask(task);
    } catch (err) {
      console.error(`Error handling task ${task.id}:`, err);
    }
  }
}
