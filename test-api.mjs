import fs from 'fs';

async function test() {
  const res = await fetch('https://alim.dest.page/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: "user", content: "test braindump for a new feature" }],
      skill: "blog-post-writer"
    })
  });
  
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    console.log("CHUNK:", JSON.stringify(chunk));
    full += chunk;
  }
  console.log("FULL:", full.length);
}
test();
