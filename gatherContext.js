export async function gatherContext(taskContent) {
  const res = await fetch(`${process.env.COS_SEARCH_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: taskContent })
  });

  const result = await res.json();
  return result.context || '';
}
