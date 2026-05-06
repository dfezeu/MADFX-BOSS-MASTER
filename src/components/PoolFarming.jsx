import { useState } from "react";

export default function PoolFarming({ askOllama, loading }) {
  const [pools, setPools] = useState([
    { 
      id: 1, 
      name: "NXUS-USDC LP", 
      protocol: "Uniswap V3", 
      apy: "45.8%", 
      tvl: "$2.4M", 
      lockPeriod: "30 days", 
      tier: "Diamond",
      rewards: "+12.5 NXUS/day",
      action: "Stake"
    },
    { 
      id: 2, 
      name: "NXUS-ETH LP", 
      protocol: "Uniswap V3", 
      apy: "32.4%", 
      tvl: "$1.8M", 
      lockPeriod: "60 days", 
      tier: "Platinum",
      rewards: "+8.2 NXUS/day",
      action: "Stake"
    },
    { 
      id: 3, 
      name: "NXUS-WBTC LP", 
      protocol: "Curve", 
      apy: "28.1%", 
      tvl: "$940K", 
      lockPeriod: "90 days", 
      tier: "Gold",
      rewards: "+5.1 NXUS/day",
      action: "Stake"
    }
  ]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [analytics, setAnalytics] = useState("");
  const [activePools, setActivePools] = useState([
    { name: "NXUS-USDC LP", staked: "5000", earnings: "125.4", lockedUntil: "2026-06-05" }
  ]);

  const handleAnalyze = async () => {
    const result = await askOllama('Analyze current DeFi liquidity pool opportunities. Which pools have the best APY vs risk ratio? Include impermanent loss risk assessment.');
    setAnalytics(result);
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case "Diamond": return "#b9f2ff";
      case "Platinum": return "#e5e4e2";
      case "Gold": return "#ffd700";
      default: return "#888";
    }
  };

  return (
    <div style={{ marginTop: "20px", background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833" }}>
      <h2 style={{ color: "#00ff88", borderBottom: "1px solid #00ff8833", paddingBottom: "10px" }}>
        Liquidity Pool Farming
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "20px" }}>
        <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px", border: "1px solid #00ff8833", textAlign: "center" }}>
          <div style={{ color: "#888", fontSize: "10px" }}>Total Staked</div>
          <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "bold" }}>$12,450</div>
        </div>
        <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px", border: "1px solid #00ff8833", textAlign: "center" }}>
          <div style={{ color: "#888", fontSize: "10px" }}>Daily Rewards</div>
          <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "bold" }}>+25.8 NXUS</div>
        </div>
        <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px", border: "1px solid #00ff8833", textAlign: "center" }}>
          <div style={{ color: "#888", fontSize: "10px" }}>Weighted APY</div>
          <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "bold" }}>38.2%</div>
        </div>
      </div>

      <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00aaff", marginBottom: "15px" }}>Available Pools</h3>
        <div style={{ display: "grid", gap: "10px" }}>
          {pools.map(pool => (
            <div 
              key={pool.id}
              style={{ 
                background: "#222", 
                padding: "15px", 
                borderRadius: "8px", 
                border: "1px solid #333",
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 100px",
                gap: "10px",
                alignItems: "center"
              }}
            >
              <div>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}>{pool.name}</div>
                <div style={{ color: "#888", fontSize: "11px" }}>{pool.protocol}</div>
              </div>
              <div>
                <div style={{ color: "#00ff88", fontWeight: "bold" }}>{pool.apy}</div>
                <div style={{ color: "#888", fontSize: "10px" }}>APY</div>
              </div>
              <div>
                <div style={{ color: "#00aaff" }}>{pool.tvl}</div>
                <div style={{ color: "#888", fontSize: "10px" }}>TVL</div>
              </div>
              <div>
                <div style={{ color: getTierColor(pool.tier) }}>{pool.tier}</div>
                <div style={{ color: "#888", fontSize: "10px" }}>Tier</div>
              </div>
              <div>
                <div style={{ color: "#ff8800" }}>{pool.lockPeriod}</div>
                <div style={{ color: "#888", fontSize: "10px" }}>Lock</div>
              </div>
              <div>
                <div style={{ color: "#00ff88", fontSize: "12px" }}>{pool.rewards}</div>
                <div style={{ color: "#888", fontSize: "10px" }}>Rewards</div>
              </div>
              <button
                onClick={() => setSelectedPool(pool)}
                style={{ 
                  background: "#00ff88", 
                  color: "#000", 
                  border: "none", 
                  padding: "8px 12px", 
                  borderRadius: "4px", 
                  cursor: "pointer", 
                  fontWeight: "bold",
                  fontSize: "12px"
                }}
              >
                Stake
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedPool && (
        <div style={{ background: "#0d1f0d", padding: "15px", borderRadius: "8px", border: "1px solid #00ff88", marginBottom: "20px" }}>
          <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Stake: {selectedPool.name}</h3>
          <input
            type="text"
            placeholder="Amount to stake (USDC)"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#fff", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          />
          <button
            style={{ 
              background: "#00ff88", 
              color: "#000", 
              border: "none", 
              padding: "12px 24px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              width: "100%" 
            }}
          >
            Confirm Stake
          </button>
        </div>
      )}

      <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00aaff", marginBottom: "15px" }}>Your Active Stakes</h3>
        {activePools.map((pool, idx) => (
          <div key={idx} style={{ background: "#222", padding: "15px", borderRadius: "8px", marginBottom: "10px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
            <div>
              <div style={{ color: "#888", fontSize: "10px" }}>Pool</div>
              <div style={{ color: "#fff", fontWeight: "bold" }}>{pool.name}</div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "10px" }}>Staked</div>
              <div style={{ color: "#00ff88" }}>{pool.staked}</div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "10px" }}>Earnings</div>
              <div style={{ color: "#00ff88" }}>+{pool.earnings} NXUS</div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "10px" }}>Locked Until</div>
              <div style={{ color: "#ff8800" }}>{pool.lockedUntil}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ 
          background: "#00aaff", 
          color: "#000", 
          border: "none", 
          padding: "12px 24px", 
          borderRadius: "4px", 
          cursor: "pointer", 
          fontWeight: "bold",
          width: "100%" 
        }}
      >
        Get Pool Analytics
      </button>
      {analytics && (
        <div style={{ marginTop: "15px", background: "#111", padding: "15px", borderRadius: "4px", whiteSpace: "pre-wrap", fontSize: "12px" }}>
          {analytics}
        </div>
      )}
    </div>
  );
}