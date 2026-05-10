# MADFX HQ Operating System

This document defines a concrete local + cloud operating flow for MADFXBOSSPC.

## 1) What This Repo Now Contains

- Frontend command center tab: `src/components/MadfxHQControlCenter.jsx`
- Control-plane API (NestJS): `backend/src/control-plane/*`
- Persistent state file generated at runtime: `backend/data/control-plane.json`

The control plane currently manages:

- C-suite and agent roster with status
- Workflow tasks and Kanban lane changes
- Leads memory by customer segment
- Trading risk policy guardrails (`-2%`, `-4%`, `-5%`)

## 2) C-Suite Agent Topology

```text
CEO Command
  -> CTO Builder (platform / architecture / delivery)
  -> CFO Guard (risk / controls / cashflow)
  -> CMO Growth (campaigns / demand generation)
  -> CRO Sales (pipeline / closing)
  -> Quant Ops (backtesting / signal quality)
  -> DevOps Runtime (deployments / uptime / incidents)
```

## 3) Local Development Flow

From project root:

```bash
# Terminal 1
cd backend
npm run start:dev

# Terminal 2
cd ..
npm run dev
```

Open `http://localhost:5173` then navigate to **BUSINESS -> MADFX HQ**.

## 4) GitHub + Codespaces Phone-First Flow

### Initial setup

```bash
git add .
git commit -m "Add MADFX HQ control plane and dashboard"
git push origin <your-branch>
```

### Codespaces runtime

1. Open GitHub repo
2. Click **Code -> Codespaces -> Create codespace**
3. Start services:

```bash
cd backend && npm install && npm run start:dev
# new terminal
cd /workspaces/MADFX-BOSS-MASTER && npm install && npm run dev -- --host 0.0.0.0 --port 5173
```

4. Use forwarded ports in browser (both desktop and phone):
   - Backend: `3000`
   - Frontend: `5173`

## 5) Risk + Trading Safety

- Keep trading mode defaulted to `paper` until validated.
- Use hard stop rules in code and broker-side controls.
- No strategy should claim guaranteed win rates.
- Add broker API throttling and kill-switch tests before live trading.

## 6) 24-Hour Roadmap

- Finalize auth for HQ endpoints and remove hardcoded admin code.
- Add Postgres persistence for tasks/leads/agents.
- Add role-based permissions (`CEO`, `Ops`, `Sales`, `Quant`).
- Integrate one market data feed and one paper-trading adapter.
- Add event audit log for every status/risk change.

## 7) 7-Day Roadmap

- Migrate control plane to multi-tenant architecture.
- Add marketing campaign manager and conversion attribution.
- Add deal pipeline with close probability and velocity metrics.
- Add backtesting service with report export.
- Add deployments with health checks and on-call alerts.
- Add secure wallet operations policy + manual approval workflow.
