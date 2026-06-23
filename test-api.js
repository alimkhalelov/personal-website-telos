async function test() {
  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "test braindump for blog post" }],
      skill: "blog-post-writer"
    })
  });
  console.log("Status:", res.status);
  
  const reader = res.body?.getReader();
  if (!reader) throw new Error("No reader");

  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    fullText += decoder.decode(value, { stream: true });
    console.log("Got chunk of size:", value.length);
  }
  console.log("Full text length:", fullText.length);
  console.log("Snippet:", fullText.substring(0, 100));
}
test().catch(console.error);
