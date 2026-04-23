const url = process.argv[2] || "http://localhost:3005/";
try {
  const r = await fetch(url);
  console.log("status", r.status, "len", (await r.text()).length);
} catch (e) {
  console.log("err", e.message, e.cause?.message || "");
}
