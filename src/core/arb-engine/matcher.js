/**

- matcher.js — Core Arbitrage Detection Engine
- Scans Kalshi × Polymarket for YES/NO price divergence.
- Edge formula: 1 - (P_yes_A + P_no_B)
  */

const { fetchKalshi }     = require(”./kalshi”);
const { fetchPolymarket } = require(”./polymarket”);
const { logSignal }       = require(”../../data/storage”);

const EDGE_THRESHOLD = parseFloat(process.env.MIN_EDGE_PCT || “0.03”); // 3% minimum

/**

- Detect arb opportunity between two platforms.
- Returns best edge or null if no opportunity.
  */
  function calcArb(kalshi, poly) {
  const candidates = [
  { type: “YES@K + NO@P”,  edge: 1 - kalshi.yes - poly.no,  buyK: “YES”, buyP: “NO”  },
  { type: “NO@K  + YES@P”, edge: 1 - kalshi.no  - poly.yes, buyK: “NO”,  buyP: “YES” },
  ];
  const valid = candidates
  .filter(c => c.edge > EDGE_THRESHOLD)
  .sort((a, b) => b.edge - a.edge);
  return valid.length > 0 ? valid[0] : null;
  }

/**

- Full market scan — fetches live prices and scores each market.
  */
  async function scanMarkets() {
  const [kalshiMarkets, polyMarkets] = await Promise.all([
  fetchKalshi(),
  fetchPolymarket(),
  ]);

const results = [];

for (const km of kalshiMarkets) {
const pm = polyMarkets.find(p => p.id === km.id);
if (!pm) continue;

```
const arb = calcArb(km.prices, pm.prices);
const signal = {
  id:       km.id,
  event:    km.event,
  category: km.category,
  volume:   km.volume,
  kalshi:   km.prices,
  poly:     pm.prices,
  arb:      arb || null,
  profit:   arb ? +(arb.edge * 500).toFixed(2) : 0, // at $500 stake
  ts:       Date.now(),
};

results.push(signal);

// Log all arb windows to Elastic + Supabase
if (arb) await logSignal(signal);
```

}

return results;
}

module.exports = { calcArb, scanMarkets };
