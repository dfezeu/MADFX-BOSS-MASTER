import { useState, useEffect } from "react";

const TOP_TRADERS = [
  { id: 1, name: "CryptoWhale", pnl: 284000, winRate: 78.5, trades: 1245, Sharpe: 2.4, following: 8500, tier: "Elite" },
  { id: 2, name: "MacroMaster", pnl: 156000, winRate: 72.1, trades: 856, Sharpe: 1.9, following: 4200, tier: "Pro" },
  { id: 3, name: "OptionsKing", pnl: 98000, winRate: 68.5, trades: 2100, Sharpe: 1.7, following: 3100, tier: "Pro" },
  { id: 4, name: "ScalpPro", pnl: 72000, winRate: 82.1, trades: 4500, Sharpe: 2.1, following: 2800, tier: "Pro" },
  { id: 5, name: "SwingQueen", pnl: 45000, winRate: 65.2, trades: 420, Sharpe: 1.5, following: 1800, tier: "Gold" }
];

const COPY_OPTS = [
  { name: "Full Copy", desc: "Copy all trades 1:1", fee: 0 },
  { name: "Auto Copy", desc: "Copy above threshold", fee: 5 },
  { name: "Manual", desc: "Get signals only", fee: 29 }
];

const ARB_OPPS = [
  { id: 1, market: "KX", leg1: "Kalshi Yes @ 62", leg2: "Betfair No @ 58", spread: 4, expected: 2.5, risk: "low" },
  { id: 2, market: "IN", leg1: "Kalshi Yes @ 35", leg2: "Polymarket Yes @ 38", spread: 3, expected: 1.8, risk: "medium" },
  { id: 3, market: "EM", leg1: "Kalshi Yes @ 51", leg2: "FTX Yes @ 49", spread: 2, expected: 1.2, risk: "low" },
  { id: 4, market: "SP", leg1: "Betfair > 5100", leg2: "Kalshi < 5100", spread: 5, expected: 3.2, risk: "high" }
];

const STRATEGIES = [
  { id: 1, name: "Mean Reversion", winRate: 58, avgWin: 1.8, avgLoss: 1.2, sharpe: 1.4, maxDD: 12 },
  { id: 2, name: "Momentum Breakout", winRate: 52, avgWin: 2.5, avgLoss: 1.0, sharpe: 1.8, maxDD: 18 },
  { id: 3, name: "Grid Trading", winRate: 78, avgWin: 1.2, avgLoss: 1.5, sharpe: 1.1, maxDD: 8 },
  { id: 4, name: "Martingale", winRate: 85, avgWin: 1.0, avgLoss: 2.0, sharpe: 2.2, maxDD: 35 },
  { id: 5, name: "Scalping", winRate: 72, avgWin: 0.8, avgLoss: 0.5, sharpe: 1.6, maxDD: 6 },
  { id: 6, name: "Swing Hold", winRate: 48, avgWin: 4.5, avgLoss: 1.8, sharpe: 2.0, maxDD: 22 }
];

const TEST_RESULTS = [];

export default function TradeScanner() {
  const [tab, setTab] = useState("scanner");
  const [traders, setTraders] = useState(TOP_TRADERS);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [copyMode, setCopyMode] = useState("manual");
  const [testRunning, setTestRunning] = useState(false);
  const [testResults, setTestResults] = useState(TEST_RESULTS);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [testParams, setTestParams] = useState({ capital: 10000, duration: 30, runs: 100 });

  const runBacktest = () => {
    setTestRunning(true);
    setTimeout(() => {
      const strategy = STRATEGIES.find(s => s.id === selectedStrategy);
      const results = [];
      for (let i = 0; i < testParams.runs; i++) {
        const wins = Math.random() < (strategy.winRate / 100);
        const pnl = wins 
          ? testParams.capital * strategy.avgWin * Math.random() 
          : -testParams.capital * strategy.avgLoss * Math.random();
        results.push({ 
          run: i + 1, 
          pnl: pnl, 
          win: wins,
          equity: testParams.capital + pnl
        });
      }
      const totalPnl = results.reduce((sum, r) => sum + r.pnl, 0);
      const wins = results.filter(r => r.win).length;
      setTestResults({
        runs: testParams.runs,
        winRate: (wins / testParams.runs) * 100,
        totalPnl,
        avgPnl: totalPnl / testParams.runs,
        maxEquity: Math.max(...results.map(r => r.equity)),
        minEquity: Math.min(...results.map(r => r.equity)),
        sharpe: (totalPnl / testParams.runs) / (results.reduce((sum, r) => sum + Math.pow(r.pnl - totalPnl/testParams.runs, 2), 0) / testParams.runs)
      });
      setTestRunning(false);
    }, 2000);
  };

  const copyTrader = (trader) => {
    if (!trader) return;
    alert(`Now copying ${trader.name} via ${copyMode} mode!`);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>TRADE SCANNER</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Find best trades, spreads & strategies</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>TOP TRADERS</div>
          <div style={{ color: "#00aaff", fontSize: "22px", fontWeight: "700" }}>{traders.length}</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>ARB OPP</div>
          <div style={{ color: "#00ff88", fontSize: "22px", fontWeight: "700" }}>{ARB_OPPS.length}</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>STRATEGIES</div>
          <div style={{ color: "#d4a012", fontSize: "22px", fontWeight: "700" }}>{STRATEGIES.length}</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>TEST RUNS</div>
          <div style={{ color: "#ef4444", fontSize: "22px", fontWeight: "700" }}>{testResults.runs || 0}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {["scanner", "copy", "arbitrage", "strategies", "backtest"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? "#d4a012" : "transparent",
              color: tab === t ? "#0a0a0a" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "scanner" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "15px", background: "#0d1525", color: "#64748b", fontSize: "11px", fontWeight: "600" }}>
            <span>TRADER</span>
            <span>P&L</span>
            <span>WIN RATE</span>
            <span>TRADES</span>
            <span>SHARPE</span>
            <span>ACTION</span>
          </div>
          {traders.map(trader => (
            <div key={trader.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "15px", borderBottom: "1px solid #0d1525", alignItems: "center" }}>
              <div>
                <span style={{ color: "#fff", fontWeight: "600" }}>{trader.name}</span>
                <span style={{ background: trader.tier === "Elite" ? "rgba(212,160,18,0.2)" : trader.tier === "Pro" ? "rgba(0,255,136,0.2)" : "rgba(100,116,139,0.2)", color: trader.tier === "Elite" ? "#d4a012" : trader.tier === "Pro" ? "#00ff88" : "#64748b", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", marginLeft: "8px" }}>
                  {trader.tier}
                </span>
              </div>
              <span style={{ color: "#10b981", fontWeight: "700" }}>+${(trader.pnl/1000).toFixed(0)}K</span>
              <span style={{ color: trader.winRate > 70 ? "#10b981" : "#fff" }}>{trader.winRate}%</span>
              <span style={{ color: "#00aaff" }}>{trader.trades.toLocaleString()}</span>
              <span style={{ color: trader.Sharpe > 2 ? "#10b981" : "#f59e0b" }}>{trader.Sharpe}</span>
              <button
                onClick={() => { setSelectedTrader(trader); setTab("copy"); }}
                style={{ background: "#d4a012", border: "none", padding: "6px 12px", borderRadius: "6px", color: "#0a0a0a", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "copy" && (
        <div>
          {selectedTrader ? (
            <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
              <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "15px" }}>Copy {selectedTrader.name}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "20px" }}>
                <div style={{ textAlign: "center", padding: "15px", background: "#0d1525", borderRadius: "8px" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>P&L (90d)</div>
                  <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>+${(selectedTrader.pnl/1000).toFixed(0)}K</div>
                </div>
                <div style={{ textAlign: "center", padding: "15px", background: "#0d1525", borderRadius: "8px" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>Win Rate</div>
                  <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>{selectedTrader.winRate}%</div>
                </div>
                <div style={{ textAlign: "center", padding: "15px", background: "#0d1525", borderRadius: "8px" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>Followers</div>
                  <div style={{ color: "#00aaff", fontSize: "24px", fontWeight: "700" }}>{selectedTrader.following.toLocaleString()}</div>
                </div>
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px", display: "block" }}>Copy Mode</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {COPY_OPTS.map(opt => (
                    <button
                      key={opt.name}
                      onClick={() => setCopyMode(opt.name)}
                      style={{ flex: 1, padding: "15px", borderRadius: "8px", background: copyMode === opt.name ? "#d4a012" : "#0d1525", color: copyMode === opt.name ? "#0a0a0a" : "#64748b", border: "none", cursor: "pointer" }}
                    >
                      <div style={{ fontWeight: "600" }}>{opt.name}</div>
                      <div style={{ fontSize: "11px" }}>{opt.desc}</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", marginTop: "5px" }}>{opt.fee === 0 ? "FREE" : `$${opt.fee}/mo`}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => copyTrader(selectedTrader)}
                style={{ width: "100%", background: "#10b981", border: "none", padding: "15px", borderRadius: "8px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
              >
                Start Copying {selectedTrader.name}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
              Select a trader from the Scanner tab first
            </div>
          )}
        </div>
      )}

      {tab === "arbitrage" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
          {ARB_OPPS.map(opp => (
            <div key={opp.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", borderLeft: opp.risk === "low" ? "4px solid #10b981" : opp.risk === "medium" ? "4px solid #f59e0b" : "4px solid #ef4444" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#fff", fontWeight: "700" }}>{opp.market}</span>
                <span style={{ background: opp.risk === "low" ? "rgba(16,185,129,0.2)" : opp.risk === "medium" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)", color: opp.risk === "low" ? "#10b981" : opp.risk === "medium" ? "#f59e0b" : "#ef4444", padding: "3px 10px", borderRadius: "4px", fontSize: "10px" }}>
                  {opp.risk.toUpperCase()}
                </span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{opp.leg1}</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{opp.leg2}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <div><span style={{ color: "#64748b", fontSize: "10px" }}>Spread</span><div style={{ color: "#00aaff", fontSize: "18px", fontWeight: "700" }}>{opp.spread}%</div></div>
                <div><span style={{ color: "#64748b", fontSize: "10px" }}>Expected</span><div style={{ color: "#10b981", fontSize: "18px", fontWeight: "700" }}>{opp.expected}x</div></div>
              </div>
              <button style={{ width: "100%", background: "#d4a012", border: "none", padding: "10px", borderRadius: "6px", color: "#0a0a0a", fontWeight: "600", cursor: "pointer" }}>
                Execute arb
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "strategies" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "15px", background: "#0d1525", color: "#64748b", fontSize: "11px", fontWeight: "600" }}>
            <span>STRATEGY</span>
            <span>WIN</span>
            <span>AVG WIN</span>
            <span>AVG LOSS</span>
            <span>SHARPE</span>
            <span>MAX DD</span>
          </div>
          {STRATEGIES.map(strat => (
            <div key={strat.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "15px", borderBottom: "1px solid #0d1525", alignItems: "center", cursor: "pointer", background: selectedStrategy === strat.id ? "rgba(212,160,18,0.1)" : "transparent" }}
            onClick={() => setSelectedStrategy(strat.id)}
            >
              <span style={{ color: "#fff", fontWeight: "600" }}>{strat.name}</span>
              <span style={{ color: strat.winRate > 60 ? "#10b981" : "#fff" }}>{strat.winRate}%</span>
              <span style={{ color: "#10b981" }}>{strat.avgWin}x</span>
              <span style={{ color: "#ef4444" }}>{strat.avgLoss}x</span>
              <span style={{ color: strat.sharpe > 1.5 ? "#10b981" : "#f59e0b" }}>{strat.sharpe}</span>
              <span style={{ color: strat.maxDD > 20 ? "#ef4444" : "#64748b" }}>{strat.maxDD}%</span>
            </div>
          ))}
        </div>
      )}

      {tab === "backtest" && (
        <div>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "16px", marginBottom: "15px" }}>Strategy Backtest</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "20px" }}>
              <div>
                <label style={{ color: "#64748b", fontSize: "11px", display: "block", marginBottom: "5px" }}>Capital</label>
                <input
                  type="number"
                  value={testParams.capital}
                  onChange={(e) => setTestParams({...testParams, capital: parseInt(e.target.value) || 0})}
                  style={{ width: "100%", padding: "10px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "6px", color: "#fff" }}
                />
              </div>
              <div>
                <label style={{ color: "#64748b", fontSize: "11px", display: "block", marginBottom: "5px" }}>Duration (days)</label>
                <input
                  type="number"
                  value={testParams.duration}
                  onChange={(e) => setTestParams({...testParams, duration: parseInt(e.target.value) || 0})}
                  style={{ width: "100%", padding: "10px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "6px", color: "#fff" }}
                />
              </div>
              <div>
                <label style={{ color: "#64748b", fontSize: "11px", display: "block", marginBottom: "5px" }}>Test Runs</label>
                <input
                  type="number"
                  value={testParams.runs}
                  onChange={(e) => setTestParams({...testParams, runs: parseInt(e.target.value) || 0})}
                  style={{ width: "100%", padding: "10px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "6px", color: "#fff" }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px", display: "block" }}>Select Strategy</label>
              <select
                value={selectedStrategy || ""}
                onChange={(e) => setSelectedStrategy(parseInt(e.target.value))}
                style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
              >
                <option value="">Choose strategy...</option>
                {STRATEGIES.map(s => <option key={s.id} value={s.id}>{s.name} ({s.winRate}% win)</option>)}
              </select>
            </div>
            
            <button
              onClick={runBacktest}
              disabled={testRunning || !selectedStrategy}
              style={{ width: "100%", background: testRunning ? "#64748b" : "#ef4444", border: "none", padding: "15px", borderRadius: "8px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: testRunning ? "not-allowed" : "pointer" }}
            >
              {testRunning ? "Running Backtest..." : "Run Backtest"}
            </button>
          </div>

          {testResults.runs && (
            <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
              <h3 style={{ color: "#10b981", fontSize: "18px", marginBottom: "20px" }}>Results</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
                <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>Total P&L</div>
                  <div style={{ color: testResults.totalPnl >= 0 ? "#10b981" : "#ef4444", fontSize: "28px", fontWeight: "700" }}>
                    {testResults.totalPnl >= 0 ? "+" : ""}{testResults.totalPnl.toFixed(2)}
                  </div>
                </div>
                <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>Win Rate</div>
                  <div style={{ color: "#fff", fontSize: "28px", fontWeight: "700" }}>{testResults.winRate.toFixed(1)}%</div>
                </div>
                <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>Max Equity</div>
                  <div style={{ color: "#00aaff", fontSize: "28px", fontWeight: "700" }}>{testResults.maxEquity.toFixed(2)}</div>
                </div>
                <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>Min Equity</div>
                  <div style={{ color: "#ef4444", fontSize: "28px", fontWeight: "700" }}>{testResults.minEquity.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}