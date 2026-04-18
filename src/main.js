/**

- MADFX BOSS — Backend API Entry Point
- TGRR NEXUS: Trade → Generate → Reward → Reinvest
  */

require(“dotenv”).config();
const express  = require(“express”);
const cors     = require(“cors”);
const { WebSocketServer } = require(“ws”);
const http     = require(“http”);

const signalRoutes    = require(”./routes/signals”);
const arbRoutes       = require(”./routes/arb”);
const analyticsRoutes = require(”./routes/analytics”);
const agentRoutes     = require(”./routes/agents”);
const mcpRoutes       = require(”./routes/mcp”);
const { keeperInit }  = require(”./agents/keeper-agent”);

const app    = express();
const server = http.createServer(app);
const wss    = new WebSocketServer({ server });

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || “*” }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────
app.use(”/v2/signals”,   signalRoutes);
app.use(”/v2/arb”,       arbRoutes);
app.use(”/v2/analytics”, analyticsRoutes);
app.use(”/v2/agents”,    agentRoutes);
app.use(”/v2/mcp”,       mcpRoutes);

// ── Health check ────────────────────────────────────────
app.get(”/health”, (req, res) => {
res.json({
status:  “LIVE”,
version: “2.4”,
engine:  “MADFX BOSS ARB SIGNAL ENGINE”,
tgrr:    “Trade → Generate → Reward → Reinvest”,
time:    new Date().toISOString(),
});
});

// ── WebSocket — live signal stream ──────────────────────
wss.on(“connection”, (ws) => {
console.log(”[WS] Client connected”);
ws.send(JSON.stringify({ type: “CONNECTED”, message: “MADFX BOSS live signal stream active” }));

const interval = setInterval(async () => {
try {
const { scanMarkets } = require(”./core/arb-engine/matcher”);
const signals = await scanMarkets();
ws.send(JSON.stringify({ type: “SIGNALS”, data: signals, ts: Date.now() }));
} catch (err) {
console.error(”[WS] Signal push error:”, err.message);
}
}, 60000); // push every 60s

ws.on(“close”, () => {
clearInterval(interval);
console.log(”[WS] Client disconnected”);
});
});

// ── Start server ────────────────────────────────────────
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
console.log(`\n🚀 MADFX BOSS Backend running on port ${PORT}`);
console.log(`🔗 Health: http://localhost:${PORT}/health`);
console.log(`📡 Signals: http://localhost:${PORT}/v2/signals\n`);
keeperInit(); // start all agent cron cycles
});
