/**

- keeper-agent.js — KEEPER AGENT
- Cron-based automation backbone for all MADFX BOSS agents.
- Runs on server start via keeperInit().
- 
- Schedule:
- Every 60s  → ARB scan
- Every 5min → Analytics update
- Every 1hr  → Engagement scoring
- Every 24hr → APY calculation
- Sunday UTC → Weekly reward distribution
  */

const { scanMarkets }        = require(”../core/arb-engine/matcher”);
const { refreshEdgeReport }  = require(”../core/data/analysis”);
const { calcWeeklyAPY }      = require(”../core/liquidity/apy-calculator”);
const { updateEngagement }   = require(”../core/engagement/metrics”);
const { distributeRewards }  = require(”../core/liquidity/apy-calculator”);
const { log }                = require(”../utils/logger”);

function every(ms, label, fn) {
log(`[KEEPER] Scheduling: ${label} every ${ms / 1000}s`);
setInterval(async () => {
try {
log(`[KEEPER] Running: ${label}`);
await fn();
} catch (err) {
log(`[KEEPER] ERROR in ${label}: ${err.message}`, “error”);
}
}, ms);
}

function keeperInit() {
log(”[KEEPER] KEEPER AGENT initialized — TGRR NEXUS ACTIVE”);

// L1 — Signal scans every 60s
every(60_000,      “ARB SCAN”,           scanMarkets);

// L2 — Analytics every 5 min
every(300_000,     “ANALYTICS REFRESH”,  refreshEdgeReport);

// L5 — Engagement every hour
every(3_600_000,   “ENGAGEMENT SCORE”,   updateEngagement);

// L4 — APY calculation every 24h
every(86_400_000,  “APY CALCULATION”,    calcWeeklyAPY);

// Weekly reward distribution (Sunday 00:00 UTC)
scheduleWeeklyRewards();
}

function scheduleWeeklyRewards() {
const now     = new Date();
const nextSun = new Date(now);
nextSun.setUTCDate(now.getUTCDate() + ((7 - now.getUTCDay()) % 7 || 7));
nextSun.setUTCHours(0, 0, 0, 0);
const msUntilSunday = nextSun - now;

log(`[KEEPER] Weekly rewards scheduled in ${Math.round(msUntilSunday / 3600000)}h`);

setTimeout(() => {
distributeRewards();
every(604_800_000, “WEEKLY REWARD DISTRIBUTION”, distributeRewards);
}, msUntilSunday);
}

module.exports = { keeperInit };
