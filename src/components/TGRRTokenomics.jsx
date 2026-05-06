import { useState, useEffect } from "react";

export default function TGRRTokenomics({ askOllama, loading }) {
  const [userBalance, setUserBalance] = useState({
    nxus: 2450,
    aura: 12450,
    tgrr: 890,
    stable: 5000
  });
  const [rewards, setRewards] = useState([
    { id: 1, type: "trade", amount: 150, description: "Completed trade signal", multiplier: 1.5, time: "2h ago" },
    { id: 2, type: "learning", amount: 200, description: "Completed trading course", multiplier: 2.0, time: "5h ago" },
    { id: 3, type: "referral", amount: 500, description: "Referred new user", multiplier: 3.0, time: "1d ago" },
    { id: 4, type: "streak", amount: 100, description: "7-day login streak", multiplier: 1.0, time: "2d ago" },
    { id: 5, type: "volume", amount: 320, description: "Trading volume bonus", multiplier: 1.2, time: "3d ago" }
  ]);
  const [tiers] = useState([
    { name: "Bronze", min: 0, apy: 5, color: "#cd7f32", benefits: ["Basic signals", "5 trades/day"] },
    { name: "Silver", min: 5000, apy: 12, color: "#c0c0c0", benefits: ["Advanced signals", "25 trades/day", "AI analysis"] },
    { name: "Gold", min: 25000, apy: 25, color: "#ffd700", benefits: ["Premium signals", "Unlimited trades", "Priority AI", "Copy trading"] },
    { name: "Platinum", min: 100000, apy: 45, color: "#e5e4e2", benefits: ["VIP signals", "Personal AI agent", "API access", "Early features"] },
    { name: "Diamond", min: 500000, apy: 80, color: "#b9f2ff", benefits: ["All features", "White label", "Revenue share", "Priority support"] }
  ]);
  const [currentTier, setCurrentTier] = useState(2);
  const [pointsHistory, setPointsHistory] = useState([
    { day: "Mon", points: 450, trades: 12 },
    { day: "Tue", points: 680, trades: 18 },
    { day: "Wed", points: 320, trades: 8 },
    { day: "Thu", points: 890, trades: 24 },
    { day: "Fri", points: 750, trades: 20 },
    { day: "Sat", points: 420, trades: 14 },
    { day: "Sun", points: 280, trades: 6 }
  ]);

  const formatNumber = (num) => {
    if (num >= 1000) return num.toLocaleString();
    return num.toFixed(2);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>TGRR TOKENOMICS</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Trade - Generate - Reward - Reinvest System</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "30px" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))", padding: "24px", borderRadius: "12px", border: "1px solid #10b981" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>◇</span> NXUS
          </div>
          <div style={{ color: "#fff", fontSize: "32px", fontWeight: "700" }}>{formatNumber(userBalance.nxus)}</div>
          <div style={{ color: "#10b981", fontSize: "12px", marginTop: "8px" }}>Platform Token</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(212, 160, 18, 0.15), rgba(212, 160, 18, 0.05))", padding: "24px", borderRadius: "12px", border: "1px solid #d4a012" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>★</span> AURA
          </div>
          <div style={{ color: "#d4a012", fontSize: "32px", fontWeight: "700" }}>{formatNumber(userBalance.aura)}</div>
          <div style={{ color: "#10b981", fontSize: "12px", marginTop: "8px" }}>XP / Points</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(212, 160, 18, 0.15), rgba(59, 130, 246, 0.05))", padding: "24px", borderRadius: "12px", border: "1px solid #d4a012" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>⟳</span> TGRR
          </div>
          <div style={{ color: "#d4a012", fontSize: "32px", fontWeight: "700" }}>{formatNumber(userBalance.tgrr)}</div>
          <div style={{ color: "#3b82f6", fontSize: "12px", marginTop: "8px" }}>Reward Token</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.05))", padding: "24px", borderRadius: "12px", border: "1px solid #3b82f6" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>$</span> STABLE
          </div>
          <div style={{ color: "#fff", fontSize: "32px", fontWeight: "700" }}>{formatNumber(userBalance.stable)}</div>
          <div style={{ color: "#3b82f6", fontSize: "12px", marginTop: "8px" }}>USD-Pegged</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Membership Tiers</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {tiers.map((tier, idx) => (
              <div 
                key={tier.name} 
                style={{ 
                  background: idx === currentTier ? `${tier.color}20` : "#0d1525", 
                  padding: "12px 15px", 
                  borderRadius: "8px", 
                  border: idx === currentTier ? `1px solid ${tier.color}` : "1px solid #1e3a5f",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: tier.color }}></div>
                  <span style={{ color: "#fff", fontWeight: "600" }}>{tier.name}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ color: tier.color, fontWeight: "600" }}>{tier.apy}% APY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>Weekly Points</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px", paddingBottom: "10px" }}>
            {pointsHistory.map((day, idx) => (
              <div key={day.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "100%", background: "linear-gradient(180deg, #d4a012, #3b82f6)", borderRadius: "4px 4px 0 0", height: `${(day.points / 890) * 100}%`, minHeight: "20px" }}></div>
                <span style={{ color: "#64748b", fontSize: "10px" }}>{day.day}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span style={{ color: "#64748b", fontSize: "12px" }}>Total: 3,790 points</span>
            <span style={{ color: "#10b981", fontSize: "12px" }}>+23% vs last week</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#10b981", marginBottom: "15px" }}>Reward History</h3>
        <div style={{ display: "grid", gap: "8px" }}>
          {rewards.map(reward => (
            <div key={reward.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#0d1525", borderRadius: "8px" }}>
              <div>
                <div style={{ color: "#fff", fontSize: "13px" }}>{reward.description}</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{reward.time} • x{reward.multiplier} multiplier</div>
              </div>
              <span style={{ color: "#d4a012", fontWeight: "600" }}>+{reward.amount} AURA</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(212, 160, 18, 0.2), transparent)", padding: "15px", borderRadius: "8px", border: "1px solid #d4a012", textAlign: "center" }}>
          <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>5%</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Trade Rewards</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent)", padding: "15px", borderRadius: "8px", border: "1px solid #3b82f6", textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: "24px", fontWeight: "700" }}>10%</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Referral Bonus</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), transparent)", padding: "15px", borderRadius: "8px", border: "1px solid #10b981", textAlign: "center" }}>
          <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>15%</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Staking APY</div>
        </div>
      </div>
    </div>
  );
}