# MADFX BOSS — AI Memory File (CLAUDE.md)

> Read this file first before writing any code for this project.

## Who I Am

- **Founder:** Dylann (MadXBoss)
- **Platform:** MADFX BOSS — “Making A Difference through Futures Exchange, Built On Superior Systems”
- **Mission:** Restore financial equity to everyday investors while funding social good initiatives
- **Style:** Systems-level thinker, iterative builder, production-ready outputs only

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