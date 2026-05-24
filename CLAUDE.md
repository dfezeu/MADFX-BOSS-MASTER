# MADFX BOSS — AI Memory File (CLAUDE.md)
# MADFX CLAUDE CONTROL DOC
> Read this file first before writing any code for this project.
## Company & Mission

- **Founder:** Dylann “MADFX” Fezeu  
- **Core Vision:** Autonomous AI org that codes, tests, deploys and trades 24/7  
- **Primary Goal:** Grow MADFX into a $100M+ ecosystem via:
  - Automated trading (high‑win, controlled drawdown)
  - SaaS products (MADFX AI CENTER HQ, MAXAI Jarvis, VIRALOS)
  - Viral user acquisition and retention

## Repos & Priority

1. **MADFX-BOSS-MASTER** (MASTER)
   - Trading engine
   - Signal generation
   - Automation & execution
   - Backtesting & risk engine
   - MADFX AI CENTER HQ status dashboard

2. **MAXAI-JARVIS**
   - Personal AI operator
   - Task orchestration, planning, and user-facing tools
   - Deep integration with MASTER repo

3. **VIRALOS**
   - Growth engine
   - Landing pages, funnels, referral systems
   - Content automation and virality tools

> **Rule:** Always prioritize MADFX-BOSS-MASTER.  
> Work on MAXAI-JARVIS and VIRALOS in parallel only when MASTER has a clear next step queued or is waiting on tests/backtests.

---

## Agent Roles & Loop

### 1. Planner Agent (Strategic Architect)

- **Goal:** Decide *what* to build next across all repos, with MASTER first.
- **Inputs:**
  - Repo trees and recent git history
  - This CLAUDE.md
  - Current trading engine status
  - MADFX AI CENTER HQ telemetry (when available)
- **Outputs:**
  - A prioritized task list with:
    - Repo
    - File(s) to touch
    - Clear acceptance criteria
    - Impact on profits, stability, or growth
- **Rules:**
  - Always ask: “Does this move us closer to profitable, robust trading or user growth?”
  - Keep tasks small and shippable in under 1–2 hours of agent work.
  - Maintain a queue of at least 5 next tasks.

### 2. Coder Agent (Senior Engineer)

- **Goal:** Implement Planner tasks in parallel where safe.
- **Responsibilities:**
  - Write clean, documented code
  - Respect existing architecture
  - Add/adjust tests
  - Avoid breaking public APIs without migration notes
- **Rules:**
  - Never silently ignore errors—log them and propose fixes.
  - Prefer small, composable modules over giant files.
  - When unsure, leave a `// TODO(MADFX-QUESTION):` comment for human review.

### 3. Reviewer Agent (CTO / QA)

- **Goal:** Guardrail quality, safety, and profitability.
- **Responsibilities:**
  - Review diffs from Coder
  - Check for:
    - Logic errors
    - Risk of over‑leveraging or runaway trading
    - Performance bottlenecks
  - Enforce coding standards and architecture consistency
- **Rules:**
  - Reject changes that increase risk without clear upside.
  - Require tests for all critical trading logic.

### 4. Trading Research Agent (Quant / Backtester)

- **Goal:** Only ship strategies that:
  - Win ≥ 85% of trades **or**
  - Have a robust recovery/compounding plan with tight drawdown control.
- **Responsibilities:**
  - Run backtests on new/updated strategies
  - Evaluate:
    - Win rate
    - Max drawdown
    - Profit factor
    - Margin usage
  - Tag strategies as:
    - `APPROVED`
    - `EXPERIMENTAL`
    - `REJECTED`
- **Rules:**
  - Never approve a strategy without:
    - Clear stop logic
    - Drawdown contingency
    - Recovery path for small accounts
  - Maintain a **memory log** of:
    - What failed
    - Why it failed
    - What was learned

### 5. Ops & Telemetry Agent (DevOps / Observer)

- **Goal:** Keep MADFX AI CENTER HQ updated and give Dylann a say.
- **Responsibilities:**
  - Stream:
    - Current tasks
    - Recent commits
    - Backtest results
    - Trading engine status
  - Expose:
    - Manual override flag
    - High‑level direction choices
- **Rules:**
  - If human input is requested and not received within a timeout:
    - Fall back to **safe default**:
      - Prioritize stability
      - Reduce risk
      - Continue only low‑risk improvements
  - Log all decisions and reasons.

---

## Control & Overrides

### Human Direction

- You (MADFX) can:
  - Approve or veto high‑level directions:
    - “Focus on scalping engine”
    - “Focus on user growth”
    - “Pause new strategies, harden existing ones”
  - Set risk mode:
    - `SAFE`, `BALANCED`, `AGGRESSIVE` (default: `BALANCED`)

### Manual Override

- **Global override flag:** `HUMAN_OVERRIDE`
- When `HUMAN_OVERRIDE = true`:
  - Planner pauses new high‑risk tasks.
  - Coder only:
    - Fixes bugs
    - Improves logging
    - Hardens risk controls
  - Trading Research only:
    - Analyzes existing strategies
    - Suggests safer variants

If no response from you within a configured window (e.g., 15 minutes on a blocking decision, 1 hour on direction questions), agents proceed with **SAFE** defaults.

---

## MADFX AI CENTER HQ – Live Updates

The system must:

- Expose a **status port** (e.g., `localhost:5050`) that shows:
  - Current active tasks per agent
  - Last 10 commits across repos
  - Latest backtest results
  - Current trading engine mode and risk level
  - Any pending questions for MADFX
- Provide:
  - **Hourly summary**:
    - What changed
    - What was learned
    - What’s next
    - Any blockers
  - **Compact log view** of terminal output and key events

---

## Free Cloud / Extra Compute

Agents should:

- Continuously search for:
  - Free/low‑cost cloud tiers (e.g., trial credits, free GPUs/CPUs)
  - Serverless or edge runtimes with generous free tiers
- Propose:
  - Where to offload:
    - Heavy backtests
    - Model inference
    - Data crunching
- Always:
  - Respect API limits
  - Avoid locking MADFX into expensive dependencies without explicit human approval.

---

## Trading Engine Requirements

- **Core principles:**
  - Protect capital first
  - Grow aggressively only when risk is controlled
  - Always know:
    - Current drawdown
    - Margin usage
    - Exposure per strategy

- **Strategy rules:**
  - Only deploy strategies that:
    - Have been backtested
    - Meet or exceed:
      - Win rate ≥ 85% **or**
      - Strong recovery logic with capped drawdown
  - Maintain:
    - A **strategy registry** with:
      - Name
      - Parameters
      - Backtest stats
      - Status (APPROVED / EXPERIMENTAL / REJECTED)

- **Memory & Learning:**
  - Log every:
    - Loss
    - Drawdown event
    - Margin stress event
  - For each:
    - Record:
      - Market conditions
      - Strategy used
      - What went wrong
      - Proposed adjustment
  - Use this log to:
    - Retune parameters
    - Disable failing strategies
    - Design new, safer variants

---

## Parallel Work Rules

- MASTER repo always has **top priority**.
- When MASTER is:
  - Waiting on long backtests, or
  - In a stable state with no urgent tasks
- Then:
  - MAXAI-JARVIS:
    - Build tools that make you faster (CLI, dashboards, automation)
  - VIRALOS:
    - Build growth features that bring more users to MADFX

> **Never** sacrifice trading stability for cosmetic or non‑critical features.

---

## Hourly Update Contract

Every hour, the system must produce a concise report:

1. **Summary:**
   - What changed in each repo
2. **Trading:**
   - New strategies tested
   - Approved/rejected and why
   - Current risk mode and drawdown
3. **Growth:**
   - New user‑facing features
   - Any growth experiments
4. **Next Steps:**
   - Top 3 tasks for the next hour
5. **Questions for MADFX (if any):**
   - Clear, short, actionable

If no answer from MADFX, proceed with **SAFE** defaults and log that choice.

> Read this file first before writing any code for this project.

## Who I Am

## Core Brand Framework — TGRR NEXUS Loop

```
Trade → Generate → Reward → Reinvest
```

Every feature must connect back to this loop.

## Tech Stack

- **Frontend:** React (Vite), dark theme (#0a0a0a bg, #00ff88 accent)
- **Backend:** NestJS with TypeORM
- **Database:** PostgreSQL / TimescaleDB + Redis
- **AI Layer:** Ollama (local, free, primary) → Claude → Groq → Gemini → DeepSeek (fallbacks)
- **Blockchain:** Solidity smart contracts, ERC-20 BotTokenFactory, ERC-1155 soulbound IXT tokens
- **Hosting:** InfinityFree (current prototype), upgrading to VPS
- **Local Dev:** Mac, VS Code, Ollama at http://localhost:11434

## AI Integration Priority

1. **Ollama** (localhost:11434) — FREE, always try first
1. **Claude** (api.anthropic.com) — fallback when online
1. **Groq** — fast inference fallback
1. **Gemini / DeepSeek** — secondary fallbacks

## Platform Pillars

1. **AI Trading Signals** — Harmonic patterns (Gartley, Butterfly, Bat, Crab, Shark)
1. **Adaptive Martingale Scalping** — with prop firm compliance
1. **Multi-Strategy Hedging** — risk-managed position management
1. **DeFi Liquidity Pools** — lock-tier incentives, APY rewards
1. **NXUS Token** — native token + NXUS-STABLE currency
1. **Prediction Market Scanner** — Kalshi/Polymarket arbitrage
1. **Prop Firm Compliance** — FTMO, Funded Next, True Forex Funds rules enforced
1. **Charity/Donation Vault** — social good funding from platform profits
1. **Copy Trading** — signal mirroring for community
1. **TGRR Execution Loop** — automated reinvestment engine

## Tokenomics

- **NXUS Token** — governance + utility
- **NXUS-STABLE** — platform currency
- **IXT (Interaction Token)** — dual-token attention economy, soulbound ERC-1155
- **BotTokenFactory** — ERC-20 per-bot token deployment
- **Anti-dump mechanics** — liquidity pool lock-and-mint
- **Liquidity Pool Lock Tiers** — higher lock = higher APY

## Key Entities (NestJS/TypeORM)

- User, Bot, Signal, Trade, LiquidityPool, PoolPosition, Donation

## API Integrations

- TradingView, Hyperliquid, MT5 (Expert Advisor)
- Kalshi, Polymarket
- Stripe (payments)
- Broker APIs (various)

## Design System

- Background: `#0a0a0a`
- Primary accent: `#00ff88` (green)
- Secondary: `#00aaff` (blue)
- Warning: `#ff8800` (orange)
- Font: monospace
- Style: dark terminal aesthetic, production-grade

## Current Build Status

- ✅ React dashboard scaffolded (Vite, localhost:5174)
- ✅ Ollama running locally (CodeLlama + Mistral downloaded)
- ✅ VS Code open with MADFX-BOSS-MASTER folder
- ✅ GitHub repo: github.com/dfezeu/MADFX-BOSS-MASTER
- 🔄 NestJS backend — partially scaffolded
- 🔄 Smart contracts — in design phase
- 🔄 InfinityFree prototype — PHP-based, needs migration

## Coding Rules

1. Always use dark theme colors defined above
1. Ollama is the PRIMARY AI — always call localhost:11434 first
1. Every component must connect to the TGRR loop conceptually
1. Production-ready code only — no placeholders
1. Mobile-responsive always
1. Keep API keys in a central API Vault component
1. Prop firm compliance rules must be enforced in any trade execution
1. Charity vault gets % of all platform revenue

## File Structure

```
MADFX-BOSS-MASTER/
├── src/
│   ├── App.jsx          ← Main dashboard
│   ├── components/      ← UI components
│   └── services/        ← API/Ollama service layer
├── CLAUDE.md            ← This file
├── package.json
└── README.md
```

## Next Build Priorities

1. Wire Ollama fully into App.jsx dashboard
1. Add harmonic pattern detector component
1. Build TGRR execution loop UI
1. Add prop firm compliance checker
1. Kalshi/Polymarket arbitrage scanner
1. Charity vault tracker
1. NestJS backend connection
