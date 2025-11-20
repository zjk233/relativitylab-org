export default {
  async fetch(request) {
    const html = await fetch(new URL("./index.html", import.meta.url)).then(r => r.text());
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  }
}
