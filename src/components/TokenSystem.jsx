import { useState, useEffect } from "react";

export default function TokenSystem() {
  const [balance, setBalance] = useState({
    nxus: 2450.00,
    aura: 12450,
    stable: 5000.00
  });
  const [transactions, setTransactions] = useState([
    { id: 1, type: "earning", amount: 150, currency: "AURA", description: "Completed trading tutorial", time: "2h ago" },
    { id: 2, type: "earning", amount: 320, currency: "AURA", description: "Daily login bonus", time: "5h ago" },
    { id: 3, type: "swap", amount: 1000, from: "NXUS", to: "AURA", description: "Token swap", time: "1d ago" },
    { id: 4, type: "earning", amount: 500, currency: "AURA", description: "Win rate achievement", time: "2d ago" },
    { id: 5, type: "spend", amount: 2500, currency: "AURA", description: "Copy trading fee", time: "3d ago" }
  ]);
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Trade", desc: "Complete your first trade", progress: 100, reward: 100, icon: "🎯", unlocked: true },
    { id: 2, name: "Speed Runner", desc: "Complete 10 trades in one day", progress: 70, reward: 300, icon: "⚡", unlocked: false },
    { id: 3, name: "Diamond Hands", desc: "Hold a position for 24h", progress: 100, reward: 500, icon: "💎", unlocked: true },
    { id: 4, name: "Big Whale", desc: "Deposit over $10,000", progress: 50, reward: 1000, icon: "🐋", unlocked: false },
    { id: 5, name: "Social Butterfly", desc: "Copy 5 traders", progress: 40, reward: 750, icon: "🦋", unlocked: false },
    { id: 6, name: "Win Streak", desc: "10 winning trades in a row", progress: 100, reward: 1500, icon: "🔥", unlocked: true }
  ]);
  const [quests, setQuests] =useState([
    { id: 1, name: "Daily Login", desc: "Log in every day this week", progress: 5, max: 7, reward: 200, icon: "📅" },
    { id: 2, name: "Trade Master", desc: "Complete 50 trades", progress: 32, max: 50, reward: 500, icon: "📈" },
    { id: 3, name: "Learn & Earn", desc: "Complete trading courses", progress: 3, max: 10, reward: 1000, icon: "📚" },
    { id: 4, name: " Referral", desc: "Refer 3 friends", progress: 1, max: 3, reward: 2000, icon: "👥" }
  ]);
  const [dailyBonus, setDailyBonus] = useState({ day: 3, claimed: false });
  const [airdrop, setAirdrop] = useState({ amount: 5000, timeLeft: "23:45:12" });

  const claimDaily = () => {
    if (!dailyBonus.claimed) {
      setBalance(prev => ({ ...prev, aura: prev.aura + (dailyBonus.day * 100) }));
      setDailyBonus(prev => ({ ...prev, claimed: true, day: prev.day + 1 }));
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) return num.toLocaleString();
    return num.toFixed(2);
  };

  return (
    <div style={{ background: "linear-gradient(180deg, #0f172a 0%, #030712 100%)", padding: "30px", borderRadius: "16px", border: "1px solid #1e293b" }}>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ background: "linear-gradient(135deg, #ffd700, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "28px", fontWeight: "700", marginBottom: "5px" }}>
          NEXUS Token
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Earn, spend, and unlock rewards</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "30px" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 212, 255, 0.1))", padding: "24px", borderRadius: "16px", border: "1px solid #00ff88", position: "relative" }}>
          <div style={{ position: "absolute", top: "12px", right: "12px", width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 10px #00ff88" }}></div>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>🪙</span> NXUS
          </div>
          <div style={{ color: "#fff", fontSize: "32px", fontWeight: "700" }}>{formatNumber(balance.nxus)}</div>
          <div style={{ color: "#00ff88", fontSize: "12px", marginTop: "8px" }}>Platform Token</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))", padding: "24px", borderRadius: "16px", border: "1px solid #ffd700", position: "relative" }}>
          <div style={{ position: "absolute", top: "12px", right: "12px", width: "8px", height: "8px", borderRadius: "50%", background: "#ffd700", boxShadow: "0 0 10px #ffd700" }}></div>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>✨</span> AURA
          </div>
          <div style={{ color: "#ffd700", fontSize: "32px", fontWeight: "700" }}>{formatNumber(balance.aura)}</div>
          <div style={{ color: "#00ff88", fontSize: "12px", marginTop: "8px" }}>Points / XP</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(168, 85, 247, 0.1))", padding: "24px", borderRadius: "16px", border: "1px solid #00d4ff" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px" }}>💵</span> NXUS-STABLE
          </div>
          <div style={{ color: "#fff", fontSize: "32px", fontWeight: "700" }}>{formatNumber(balance.stable)}</div>
          <div style={{ color: "#00d4ff", fontSize: "12px", marginTop: "8px" }}>USD-Pegged</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#fff", marginBottom: "15px", fontSize: "16px" }}>Daily Bonus</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {[1,2,3,4,5,6,7].map(day => (
                <div 
                  key={day}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: day <= dailyBonus.day ? (day === dailyBonus.day && dailyBonus.claimed ? "#00ff88" : "linear-gradient(135deg, #00ff88, #00d4ff)") : "#1e293b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: day <= dailyBonus.day ? "#000" : "#64748b"
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            {!dailyBonus.claimed && (
              <button
                onClick={claimDaily}
                style={{
                  background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                  color: "#000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                Claim +{dailyBonus.day * 100} AURA
              </button>
            )}
          </div>
          <p style={{ color: "#64748b", fontSize: "12px" }}>Day {dailyBonus.day} of 7 • Streak bonus increases daily</p>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(168, 85, 247, 0.2))", padding: "20px", borderRadius: "12px", border: "1px solid #ff0080" }}>
          <h3 style={{ color: "#ff0080", marginBottom: "10px", fontSize: "14px" }}>🎁 Airdrop Event</h3>
          <div style={{ color: "#ffd700", fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>+{airdrop.amount} NXUS</div>
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "15px" }}>Time remaining: {airdrop.timeLeft}</div>
          <button style={{ background: "#ff0080", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            Claim Airdrop
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#00d4ff", marginBottom: "15px", fontSize: "14px" }}>Achievements</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {achievements.map(ach => (
              <div key={ach.id} style={{ background: ach.unlocked ? "rgba(0, 255, 136, 0.1)" : "#1e293b", padding: "12px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", border: ach.unlocked ? "1px solid #00ff88" : "1px solid #1e293b" }}>
              <span style={{ fontSize: "20px" }}>{ach.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: ach.unlocked ? "#00ff88" : "#fff", fontWeight: "600", fontSize: "12px" }}>{ach.name}</div>
                <div style={{ color: "#64748b", fontSize: "10px" }}>{ach.desc}</div>
                {!ach.unlocked && (
                  <div style={{ marginTop: "5px", height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${ach.progress}%`, height: "100%", background: "linear-gradient(90deg, #00ff88, #00d4ff)", borderRadius: "2px" }}></div>
                  </div>
                )}
              </div>
              {ach.unlocked ? (
                <span style={{ color: "#00ff88", fontSize: "16px" }}>✓</span>
              ) : (
                <span style={{ color: "#ffd700", fontSize: "11px" }}>+{ach.reward}</span>
              )}
            </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "15px", fontSize: "14px" }}>Daily Quests</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {quests.map(quest => (
              <div key={quest.id} style={{ background: "#1e293b", padding: "12px", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "18px" }}>{quest.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{quest.name}</div>
                    <div style={{ color: "#64748b", fontSize: "11px" }}>{quest.desc}</div>
                  </div>
                  <span style={{ color: "#ffd700", fontSize: "12px", fontWeight: "600" }}>+{quest.reward}</span>
                </div>
                <div style={{ height: "4px", background: "#0f172a", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${(quest.progress / quest.max) * 100}%`, height: "100%", background: "linear-gradient(90deg, #ffd700, #ff8800)", borderRadius: "2px" }}></div>
                </div>
                <div style={{ color: "#64748b", fontSize: "10px", marginTop: "5px", textAlign: "right" }}>{quest.progress} / {quest.max}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: "#64748b", marginBottom: "15px", fontSize: "12px", textTransform: "uppercase" }}>Recent Transactions</h3>
        <div style={{ background: "rgba(15, 23, 42, 0.4)", borderRadius: "8px", overflow: "hidden" }}>
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} style={{ padding: "12px 15px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#fff", fontSize: "13px" }}>{tx.description}</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{tx.time}</div>
              </div>
              <span style={{ 
                color: tx.type === "spend" ? "#ff4444" : "#00ff88", 
                fontWeight: "600",
                fontSize: "13px"
              }}>
                {tx.type === "spend" ? "-" : "+"}{tx.amount} {tx.currency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}