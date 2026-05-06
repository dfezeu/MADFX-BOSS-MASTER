import { useState } from "react";

export default function DeFiStaking() {
  const [selectedChain, setSelectedChain] = useState("all");
  const [view, setView] = useState("staking");

  const chains = [
    { id: "solana", name: "Solana", color: "#9945FF" },
    { id: "ethereum", name: "Ethereum", color: "#627EEA" },
    { id: "polygon", name: "Polygon", color: "#8247E5" },
    { id: "hyperliquid", name: "Hyperliquid", color: "#00D4FF" }
  ];

  const stakingOpportunities = [
    {
      chain: "solana",
      protocol: "Marinade",
      token: "SOL",
      apy: 8.2,
      tvl: "$2.4B",
      lockPeriod: "No lock",
      minStake: 0.1,
      featured: true
    },
    {
      chain: "solana",
      protocol: "JPool",
      token: "SOL",
      apy: 12.5,
      tvl: "$890M",
      lockPeriod: "30 days",
      minStake: 1,
      featured: true
    },
    {
      chain: "ethereum",
      protocol: "Lido",
      token: "ETH",
      apy: 4.2,
      tvl: "$32B",
      lockPeriod: "No lock",
      minStake: 0.1,
      featured: true
    },
    {
      chain: "ethereum",
      protocol: "Rocket Pool",
      token: "ETH",
      apy: 6.8,
      tvl: "$2.8B",
      lockPeriod: "No lock",
      minStake: 0.1,
      featured: false
    },
    {
      chain: "polygon",
      protocol: "Aave",
      token: "MATIC",
      apy: 15.2,
      tvl: "$1.2B",
      lockPeriod: "No lock",
      minStake: 10,
      featured: false
    },
    {
      chain: "polygon",
      protocol: "QuickSwap",
      token: "MATIC",
      apy: 24.5,
      tvl: "$890M",
      lockPeriod: "60 days",
      minStake: 100,
      featured: true
    },
    {
      chain: "ethereum",
      protocol: "Curve",
      token: "ETH",
      apy: 45.2,
      tvl: "$3.2B",
      lockPeriod: "90 days",
      minStake: 1,
      featured: false
    },
    {
      chain: "hyperliquid",
      protocol: "Hyperliquid",
      token: "HYPER",
      apy: 38.5,
      tvl: "$420M",
      lockPeriod: "No lock",
      minStake: 100,
      featured: true
    }
  ];

  const yourStakes = [
    { protocol: "Marinade", token: "SOL", staked: 10, earned: 0.82, apy: 8.2 },
    { protocol: "Lido", token: "ETH", staked: 2, earned: 0.084, apy: 4.2 },
    { protocol: "QuickSwap", token: "MATIC", staked: 500, earned: 123.5, apy: 24.5 }
  ];

  const totalValue = yourStakes.reduce((sum, s) => {
    if (s.token === "SOL") return sum + s.staked * 190;
    if (s.token === "ETH") return sum + s.staked * 2500;
    if (s.token === "MATIC") return sum + s.staked * 0.8;
    return sum;
  }, 0);

  const totalEarned = yourStakes.reduce((sum, s) => sum + s.earned, 0);

  const filtered = stakingOpportunities.filter(o => selectedChain === "all" || o.chain === selectedChain);

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>DEFI STAKING & FARMING</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Earn yield across multi-chain protocols</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {[
          { id: "staking", label: "Staking" },
          { id: "farming", label: "LP Farming" },
          { id: "vaults", label: "Vaults" }
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            style={{
              background: view === v.id ? "#3b82f6" : "transparent",
              color: view === v.id ? "#fff" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "25px" }}>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>${(totalValue).toLocaleString()}</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Total Staked</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#10b981", fontSize: "28px", fontWeight: "700" }}>+{totalEarned.toFixed(4)}</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Total Earned</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: "28px", fontWeight: "700" }}>12.4%</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Weighted APY</div>
        </div>
      </div>

      {yourStakes.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Your Active Stakes</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {yourStakes.map((stake, idx) => (
              <div key={idx} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: "600" }}>{stake.protocol}</div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>{stake.staked} {stake.token} @ {stake.apy}% APY</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#10b981", fontWeight: "600" }}>+{stake.earned} {stake.token}</div>
                  <button style={{ background: "#10b981", border: "none", padding: "6px 12px", borderRadius: "4px", color: "#fff", cursor: "pointer", fontSize: "11px", marginTop: "5px" }}>
                    Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setSelectedChain("all")}
          style={{ background: selectedChain === "all" ? "#3b82f6" : "transparent", color: selectedChain === "all" ? "#fff" : "#64748b", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
        >
          All Chains
        </button>
        {chains.map(chain => (
          <button
            key={chain.id}
            onClick={() => setSelectedChain(chain.id)}
            style={{ background: selectedChain === chain.id ? chain.color : "transparent", color: selectedChain === chain.id ? "#fff" : "#64748b", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
          >
            {chain.name}
          </button>
        ))}
      </div>

      <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0d1525" }}>
              <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>PROTOCOL</th>
              <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>TOKEN</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>APY</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>TVL</th>
              <th style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>LOCK</th>
              <th style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((opp, idx) => {
              const chain = chains.find(c => c.id === opp.chain);
              return (
                <tr key={idx} style={{ borderBottom: "1px solid #0d152525" }}>
                  <td style={{ padding: "12px" }}>
                    <span style={{ color: opp.featured ? "#d4a012" : "#fff", fontWeight: "600" }}>{opp.protocol}</span>
                    {opp.featured && <span style={{ color: "#d4a012", fontSize: "10px", marginLeft: "5px" }}>★</span>}
                  </td>
                  <td style={{ padding: "12px", color: chain?.color }}>{opp.token}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: opp.apy > 20 ? "#10b981" : "#fff", fontWeight: "700" }}>
                    {opp.apy}%
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#64748b" }}>{opp.tvl}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "12px" }}>{opp.lockPeriod}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button style={{ background: "#3b82f6", border: "none", padding: "6px 14px", borderRadius: "4px", color: "#fff", cursor: "pointer", fontSize: "11px" }}>
                      Stake
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", background: "rgba(212, 160, 18, 0.1)", borderRadius: "8px", padding: "15px", border: "1px solid #d4a012", textAlign: "center" }}>
        <p style={{ color: "#f59e0b", fontSize: "12px" }}>
          ⚠️ Always verify APY rates on official protocol websites. Rates change constantly. Never invest more than you can afford to lose.
        </p>
      </div>
    </div>
  );
}