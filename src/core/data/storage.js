/**

- storage.js — Data Persistence Layer
- Writes to Elastic Cloud (search + analytics)
- and Supabase (relational + auth).
  */

const { Client }    = require(”@elastic/elasticsearch”);
const { createClient } = require(”@supabase/supabase-js”);

// ── Elastic Cloud client ─────────────────────────────────────
const elastic = new Client({
cloud: { id: process.env.ELASTIC_CLOUD_ID },
auth:  { apiKey: process.env.ELASTIC_CLOUD_API_KEY },
});

// ── Supabase client ──────────────────────────────────────────
const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SIGNAL_INDEX = process.env.ELASTIC_INDEX_SIGNALS || “madfx-signals”;
const MEMORY_INDEX = process.env.ELASTIC_INDEX_MEMORY  || “madfx-chat-memory”;

// ── Log arb signal to Elastic + Supabase ────────────────────
async function logSignal(signal) {
try {
// Elastic — fast search + analytics
await elastic.index({
index:    SIGNAL_INDEX,
document: { …signal, “@timestamp”: new Date().toISOString() },
});

```
// Supabase — relational record
await supabase.from("signals").insert({
  market_id: signal.id,
  event:     signal.event,
  category:  signal.category,
  edge_pct:  signal.arb?.edge,
  arb_type:  signal.arb?.type,
  profit:    signal.profit,
  kalshi_yes: signal.kalshi.yes,
  kalshi_no:  signal.kalshi.no,
  poly_yes:   signal.poly.yes,
  poly_no:    signal.poly.no,
  created_at: new Date().toISOString(),
});
```

} catch (err) {
console.error(”[STORAGE] logSignal error:”, err.message);
}
}

// ── Query signal history from Elastic ───────────────────────
async function getSignalHistory({ category, limit = 50 } = {}) {
const query = category
? { match: { category } }
: { match_all: {} };

const result = await elastic.search({
index: SIGNAL_INDEX,
size:  limit,
sort:  [{ “@timestamp”: { order: “desc” } }],
query,
});

return result.hits.hits.map(h => h._source);
}

// ── Save chat memory to Elastic ──────────────────────────────
async function saveChatMemory(sessionId, messages) {
for (const msg of messages) {
await elastic.index({
index:    MEMORY_INDEX,
document: { sessionId, …msg, “@timestamp”: new Date().toISOString() },
});
}
}

// ── Load chat memory from Elastic ───────────────────────────
async function loadChatMemory(sessionId, limit = 20) {
const result = await elastic.search({
index: MEMORY_INDEX,
size:  limit,
sort:  [{ “@timestamp”: { order: “asc” } }],
query: { match: { sessionId } },
});
return result.hits.hits.map(h => ({
role:    h._source.role,
content: h._source.content,
}));
}

module.exports = { logSignal, getSignalHistory, saveChatMemory, loadChatMemory };
