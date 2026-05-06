import { useState, useEffect } from "react";

export default function Leaderboard({ askOllama, loading }) {
  const [traders, setTraders] = useState([
    { rank: 1, name: "QuantumX", avatar: "Q", pnl: "+847.2%", trades: 1247, winRate: "94.2%", copyCount: 342, tier: "Elite", aura: 24500 },
    { rank: 2, name: "NeonTrader", avatar: "N", pnl: "+623.8%", trades: 892, winRate: "91.7%", copyCount: 218, tier: "Pro", aura: 18400 },
    { rank: 3, name: "CryptoKing", avatar: "C", pnl: "+589.1%", trades: 2103, winRate: "88.4%", copyCount: 156, tier: "Pro", aura: 15200 },
    { rank: 4, name: "VoltSignal", avatar: "V", pnl: "+445.6%", trades: 567, winRate: "86.2%", copyCount: 98, aura: 11400 },
    { rank: 5, name: "AlphaHunter", avatar: "A", pnl: "+398.2%", trades: 445, winRate: "84.9%", copyCount: 87, aura: 9800 },
    { rank: 6, name: "CyberBull", avatar: "B", pnl: "+356.7%", trades: 789, winRate: "82.1%", copyCount: 76, aura: 8200 },
    { rank: 7, name: "TokenMaster", avatar: "T", pnl: "+312.4%", trades: 1234, winRate: "79.8%", copyCount: 54, aura: 6500 },
    { rank: 8, name: "GridFlow", avatar: "G", pnl: "+289.1%", trades: 445, winRate: "77.4%", copyCount: 43, aura: 4800 },
    { rank: 9, name: "SignalPro", avatar: "S", pnl: "+245.8%", trades: 678, winRate: "75.2%", copyCount: 32, aura: 3200 },
    { rank: 10, name: "FluxTrader", avatar: "F", pnl: "+198.3%", trades: 356, winRate: "73.1%", copyCount: 28, aura: 2100 }
  ]);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [copyAmount, setCopyAmount] = useState("1000");
  const [copiedTraders, setCopiedTrades] = useState([
    { name: "QuantumX", amount: 5000, profit: 892, status: "active" }
  ]);
  const [filter, setFilter] = useState("all");
  const [timeframe, setTimeframe] = useState("month");

  const getTierColor = (tier) => {
    if (tier === "Elite") return { bg: "linear-gradient(135deg, #ffd700, #ff8c00)", text: "#000" };
    if (tier === "Pro") return { bg: "linear-gradient(135deg, #00d4ff, #0066ff)", text: "#fff" };
    return { bg: "linear-gradient(135deg, #a855f7, #6366f1)", text: "#fff" };
  };

  const handleCopy = (trader) => {
    setSelectedTrader(trader);
  };

  const confirmCopy = () => {
    if (!selectedTrader) return;
    const newCopy = {
      name: selectedTrader.name,
      amount: parseFloat(copyAmount),
      profit: 0,
      status: "active"
    };
    setCopiedTrades([newCopy, ...copiedTraders]);
    setSelectedTrader(null);
  };

  const filteredTraders = filter === "all" ? traders : traders.filter(t => t.tier === filter);

  return (
    <div style={{ background: "linear-gradient(180deg, #0f172a 0%, #030712 100%)", padding: "30px", borderRadius: "16px", border: "1px solid #1e293b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2 style={{ background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "28px", fontWeight: "700", marginBottom: "5px" }}>
            Leaderboard
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Copy top traders and earn passive income</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {["day", "week", "month", "all"].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? "#00ff88" : "transparent",
                color: timeframe === tf ? "#000" : "#64748b",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "30px" }}>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>TOP TRADER</div>
          <div style={{ color: "#ffd700", fontSize: "24px", fontWeight: "700" }}>QuantumX</div>
          <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "600" }}>+847.2%</div>
        </div>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>TOTAL COPIES</div>
          <div style={{ color: "#00d4ff", fontSize: "24px", fontWeight: "700" }}>1,847</div>
        </div>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>AVG WIN RATE</div>
          <div style={{ color: "#a855f7", fontSize: "24px", fontWeight: "700" }}>82.4%</div>
        </div>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>AURA EARNED</div>
          <div style={{ color: "#ff8800", fontSize: "24px", fontWeight: "700" }}>94.2K</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["all", "Elite", "Pro"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? "rgba(0, 255, 136, 0.15)" : "transparent",
              color: filter === f ? "#00ff88" : "#64748b",
              border: `1px solid ${filter === f ? "#00ff88" : "#1e293b"}`,
              padding: "8px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500"
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} Tier
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(15, 23, 42, 0.4)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(30, 41, 59, 0.5)", borderBottom: "1px solid #1e293b" }}>
              <th style={{ padding: "15px", textAlign: "left", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>Rank</th>
              <th style={{ padding: "15px", textAlign: "left", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>Trader</th>
              <th style={{ padding: "15px", textAlign: "right", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>P/L</th>
              <th style={{ padding: "15px", textAlign: "right", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>Trades</th>
              <th style={{ padding: "15px", textAlign: "right", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>Win Rate</th>
              <th style={{ padding: "15px", textAlign: "right", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>Copiers</th>
              <th style={{ padding: "15px", textAlign: "right", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>AURA</th>
              <th style={{ padding: "15px", textAlign: "center", color: "#64748b", fontSize: "12px", fontWeight: "500", textTransform: "uppercase" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTraders.map((trader) => {
              const tierStyle = getTierColor(trader.tier);
              return (
                <tr key={trader.rank} style={{ borderBottom: "1px solid #1e293b", transition: "background 0.2s" }}>
                  <td style={{ padding: "15px" }}>
                    <div style={{ 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "8px", 
                      background: trader.rank === 1 ? "linear-gradient(135deg, #ffd700, #ff8c00)" : trader.rank === 2 ? "linear-gradient(135deg, #c0c0c0, #808080)" : trader.rank === 3 ? "linear-gradient(135deg, #cd7f32, #8b4513)" : "#1e293b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      color: trader.rank <= 3 ? "#000" : "#fff",
                      fontSize: "14px"
                    }}>
                      {trader.rank}
                    </div>
                  </td>
                  <td style={{ padding: "15px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "10px", 
                        background: tierStyle.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        color: tierStyle.text,
                        fontSize: "16px"
                      }}>
                        {trader.avatar}
                      </div>
                      <div>
                        <div style={{ color: "#fff", fontWeight: "600" }}>{trader.name}</div>
                        {trader.tier && (
                          <div style={{ 
                            color: "#64748b", 
                            fontSize: "11px", 
                            background: "rgba(255,255,255,0.1)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            display: "inline-block"
                          }}>
                            {trader.tier}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "15px", textAlign: "right" }}>
                    <span style={{ color: "#00ff88", fontWeight: "700", fontSize: "16px" }}>{trader.pnl}</span>
                  </td>
                  <td style={{ padding: "15px", textAlign: "right", color: "#cbd5e1" }}>{trader.trades}</td>
                  <td style={{ padding: "15px", textAlign: "right" }}>
                    <span style={{ color: parseFloat(trader.winRate) > 80 ? "#00ff88" : "#ff8800", fontWeight: "600" }}>
                      {trader.winRate}
                    </span>
                  </td>
                  <td style={{ padding: "15px", textAlign: "right", color: "#00d4ff" }}>{trader.copyCount}</td>
                  <td style={{ padding: "15px", textAlign: "right" }}>
                    <span style={{ color: "#ffd700", fontWeight: "600" }}>{trader.aura.toLocaleString()}</span>
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => handleCopy(trader)}
                      style={{
                        background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                        color: "#000",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "12px"
                      }}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedTrader && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: "rgba(0,0,0,0.8)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{ 
            background: "#0f172a", 
            padding: "30px", 
            borderRadius: "16px", 
            border: "1px solid #00ff88",
            maxWidth: "400px",
            width: "90%"
          }}>
            <h3 style={{ color: "#00ff88", marginBottom: "20px", fontSize: "20px" }}>
              Copy {selectedTrader.name}
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "8px" }}>Copy Amount (NXUS)</label>
              <input
                type="number"
                value={copyAmount}
                onChange={(e) => setCopyAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px"
                }}
              />
            </div>
            <div style={{ background: "#1e293b", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#64748b" }}>Trader's Win Rate</span>
                <span style={{ color: "#00ff88", fontWeight: "600" }}>{selectedTrader.winRate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#64748b" }}>Total Trades</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>{selectedTrader.trades}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Copy Fee</span>
                <span style={{ color: "#ffd700", fontWeight: "600" }}>2% AURA</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setSelectedTrader(null)}
                style={{
                  flex: 1,
                  background: "transparent",
                  color: "#64748b",
                  border: "1px solid #334155",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmCopy}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                  color: "#000",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700"
                }}
              >
                Confirm Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {copiedTraders.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#00d4ff", marginBottom: "15px" }}>Your Copied Traders</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {copiedTraders.map((copy, idx) => (
              <div key={idx} style={{ background: "rgba(15, 23, 42, 0.6)", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: "600" }}>{copy.name}</div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>${copy.amount.toLocaleString()} copy balance</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#00ff88", fontWeight: "600" }}>+{copy.profit.toFixed(2)}</div>
                  <div style={{ color: "#00ff88", fontSize: "11px" }}>Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}