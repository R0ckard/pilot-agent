import { supabase } from './supabaseClient.js';
import { gatherContext } from './gatherContext.js';

export async function handleTask(task) {
  const context = await gatherContext(task.content);

  const systemPrompt = `You are the Pilot Agent. Use the context below to complete the task:\n\n${context}`;
  const userPrompt = task.content;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  const json = await response.json();
  const result = json.choices?.[0]?.message?.content || 'No response generated.';

  await supabase.from('memory_chunks').insert({
    agent: 'Pilot',
    status: 'complete',
    content: result,
    response_to: task.id
  });

  await supabase
    .from('memory_chunks')
    .update({ status: 'complete' })
    .eq('id', task.id);
}
