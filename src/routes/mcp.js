/**

- mcp.js — Model Context Protocol Router
- Orchestrates all MADFX BOSS agents via unified API.
- 
- MCP Layers:
- L1 — Signal Core     (arb scanner)
- L2 — Data Analytics  (Elastic + Supabase)
- L3 — MAXAI           (OpenAI orchestration)
- L4 — Rewards         (APY + mint farming)
- L5 — Community       (social + growth)
  */

const express   = require(“express”);
const router    = express.Router();
const OpenAI    = require(“openai”);
const { scanMarkets }       = require(”../core/arb-engine/matcher”);
const { getEdgeReport }     = require(”../core/data/analysis”);
const { getAPYSummary }     = require(”../core/liquidity/apy-calculator”);
const { getEngagementScore }= require(”../core/engagement/metrics”);
const { getChatMemory, saveChatMemory } = require(”../chat/memory”);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── GET /v2/mcp/status — full system snapshot ───────────────
router.get(”/status”, async (req, res) => {
try {
const [signals, edge, apy, engagement] = await Promise.all([
scanMarkets(),
getEdgeReport(),
getAPYSummary(),
getEngagementScore(),
]);

```
res.json({
  layer1_signals:    { active: signals.filter(s => s.arb).length, total: signals.length },
  layer2_analytics:  edge,
  layer3_maxai:      { status: "ACTIVE", model: "gpt-4o" },
  layer4_rewards:    apy,
  layer5_community:  engagement,
  tgrr:              "Trade → Generate → Reward → Reinvest",
  ts:                Date.now(),
});
```

} catch (err) {
res.status(500).json({ error: err.message });
}
});

// ── POST /v2/mcp/chat — MAXAI conversational agent ──────────
router.post(”/chat”, async (req, res) => {
const { message, sessionId } = req.body;
if (!message) return res.status(400).json({ error: “message required” });

try {
// Load conversation memory
const history = await getChatMemory(sessionId);

```
// Build context-aware system prompt
const signals = await scanMarkets();
const arbCount = signals.filter(s => s.arb).length;

const systemPrompt = `You are MAXAI — the AI core of MADFX BOSS, an elite arbitrage and financial empowerment engine.
```

Current status: ${arbCount} live arb windows detected across Kalshi and Polymarket.
TGRR NEXUS is active: Trade → Generate → Reward → Reinvest.
Be precise, cinematic, and surgical in your responses.
Never give generic financial advice. Always reference live data when available.`;

```
const messages = [
  { role: "system", content: systemPrompt },
  ...history,
  { role: "user", content: message },
];

const completion = await openai.chat.completions.create({
  model:      "gpt-4o",
  messages,
  max_tokens: 800,
});

const reply = completion.choices[0].message.content;

// Save to memory
await saveChatMemory(sessionId, [
  { role: "user",      content: message },
  { role: "assistant", content: reply   },
]);

res.json({ reply, sessionId, ts: Date.now() });
```

} catch (err) {
res.status(500).json({ error: err.message });
}
});

// ── POST /v2/mcp/command — MAXAI CLI command bridge ─────────
router.post(”/command”, async (req, res) => {
const { command } = req.body;
const commands = {
“trade”:   () => scanMarkets(),
“analyze”: () => getEdgeReport(),
“apy”:     () => getAPYSummary(),
“metrics”: () => getEngagementScore(),
“status”:  () => ({ status: “ALL SYSTEMS OPERATIONAL”, tgrr: “ACTIVE” }),
};

const handler = commands[command];
if (!handler) return res.status(400).json({ error: `Unknown command: ${command}`, available: Object.keys(commands) });

try {
const result = await handler();
res.json({ command, result, ts: Date.now() });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

module.exports = router;
