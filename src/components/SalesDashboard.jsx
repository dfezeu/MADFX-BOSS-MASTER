import { useState, useEffect } from "react";

const PROMOS = [
  { id: 1, name: "MAXAI Lifetime Deal", original: 1999, price: 299, limit: 50, sold: 23, ends: "2026-05-15", color: "#00ff88" },
  { id: 2, name: "Pro Signals Bundle", original: 199, price: 49, limit: 100, sold: 67, ends: "2026-05-10", color: "#00aaff" },
  { id: 3, name: "Token Launch Discount", original: 1.5, price: 0.5, limit: 25, sold: 18, ends: "2026-05-20", color: "#d4a012" },
  { id: 4, name: "VIP Year Access", original: 599, price: 149, limit: 30, sold: 12, ends: "2026-05-31", color: "#ff6b6b" }
];

const TESTIMONIALS = [
  { id: 1, name: "TradingPro", handle: "@crypto_pro", text: "Made $12K in 30 days with MADFX signals. Best investment!", profit: "+$12,000", tier: "VIP" },
  { id: 2, name: "DiamondHands", handle: "@diamond_hands", text: "Passed FTMO evaluation thanks to compliance checker. Funded $100K!", profit: "$100K Funded", tier: "Pro" },
  { id: 3, name: "CryptoQueen", handle: "@cryptoqueen", text: "The AI agents changed my trading completely.", profit: "+$8,500", tier: "MAXAI" },
  { id: 4, name: "BullRunner", handle: "@bullrun", text: "Token launch was seamless. 500 holders day 1!", profit: "500 holders", tier: "Launch" },
  { id: 5, name: "SwingKing", handle: "@swingking", text: "Harmonic patterns are accurate AF. Been using 6 months.", profit: "+$15K", tier: "Signals" }
];

const REFERRAL_TIERS = [
  { referrals: 1, reward: 50, bonus: "10% commission" },
  { referrals: 5, reward: 300, bonus: "15% commission" },
  { referrals: 10, reward: 750, bonus: "20% commission + MAXAI" },
  { referrals: 25, reward: 2500, bonus: "25% commission + VIP" },
  { referrals: 50, reward: 6000, bonus: "30% lifetime + All Access" }
];

export default function SalesDashboard() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [walletConnected, setWalletConnected] = useState(false);
  const [showPromo, setShowPromo] = useState(null);
  const [activePromo, setActivePromo] = useState("all");
  const [referralLink, setReferralLink] = useState("madfx.boss/ref/dylann");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    sales: 156,
    revenue: 45200,
    conversions: 4.2,
    traffic: 12500,
    referrals: 89,
    goal: 75000,
    daysLeft: 25
  });

  useEffect(() => {
    const now = new Date();
    const end = new Date("2026-05-31");
    const diff = end - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeLeft({ days, hours, mins, secs });
  }, []);

  const progress = (stats.sales / (stats.goal / 300)) * 100;
  const daysProgress = ((31 - timeLeft.days) / 31) * 100;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>SALES DASHBOARD</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>End of Month Push - {timeLeft.days} days remaining</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setWalletConnected(!walletConnected)}
          style={{
            background: walletConnected ? "#10b981" : "#3b82f6",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>MONTHLY SALES</div>
            <div style={{ color: "#00ff88", fontSize: "20px", fontWeight: "700" }}>{stats.sales}</div>
          </div>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>REVENUE</div>
            <div style={{ color: "#d4a012", fontSize: "20px", fontWeight: "700" }}>${stats.revenue.toLocaleString()}</div>
          </div>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>GOAL</div>
            <div style={{ color: "#ef4444", fontSize: "20px", fontWeight: "700" }}>${stats.goal.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#fff", fontWeight: "600" }}>Monthly Goal Progress</span>
          <span style={{ color: "#00ff88" }}>{progress.toFixed(0)}%</span>
        </div>
        <div style={{ background: "#0d1525", height: "12px", borderRadius: "6px", overflow: "hidden", marginBottom: "15px" }}>
          <div style={{ 
            width: `${Math.min(progress, 100)}%`, 
            height: "100%", 
            background: progress > 60 ? "#00ff88" : progress > 30 ? "#d4a012" : "#ef4444",
            borderRadius: "6px",
            transition: "width 0.5s"
          }}></div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#fff", fontWeight: "600" }}>Time Remaining</span>
          <span style={{ color: "#f59e0b" }}>{daysProgress.toFixed(0)}% used</span>
        </div>
        <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: `${daysProgress}%`, height: "100%", background: "#f59e0b", borderRadius: "4px" }}></div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "24px", fontWeight: "700" }}>
          <span style={{ color: "#64748b" }}>{timeLeft.days}d {timeLeft.hours}h</span>
          <span style={{ color: "#f59e0b" }}>{timeLeft.mins}m {timeLeft.secs}s</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["all", "active", "ending"].map(tab => (
          <button
            key={tab}
            onClick={() => setActivePromo(tab)}
            style={{
              background: activePromo === tab ? "#d4a012" : "transparent",
              color: activePromo === tab ? "#0a0a0a" : "#64748b",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "12px"
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px", marginBottom: "25px" }}>
        {PROMOS.map(promo => (
          <div
            key={promo.id}
            style={{
              background: "#1e3a5f",
              borderRadius: "12px",
              padding: "20px",
              borderLeft: `4px solid ${promo.color}`
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{promo.name}</h3>
              <span style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", padding: "3px 8px", borderRadius: "4px", fontSize: "10px" }}>
                {promo.limit - promo.sold} left
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
              <span style={{ color: promo.color, fontSize: "28px", fontWeight: "700" }}>${promo.price}</span>
              <span style={{ color: "#64748b", fontSize: "14px", textDecoration: "line-through" }}>${promo.original}</span>
              <span style={{ color: "#10b981", fontSize: "14px" }}>{Math.round((1 - promo.price/promo.original)*100)}% OFF</span>
            </div>
            
            <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px", marginBottom: "10px" }}>
              <div style={{ width: `${(promo.sold/promo.limit)*100}%`, height: "100%", background: promo.color, borderRadius: "4px" }}></div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "15px" }}>
              <span style={{ color: "#64748b" }}>{promo.sold}/{promo.limit} sold</span>
              <span style={{ color: "#ef4444" }}>Ends {promo.ends}</span>
            </div>
            
            <button
              onClick={() => setShowPromo(promo)}
              style={{
                width: "100%",
                background: promo.color,
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                color: "#0a0a0a",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Claim Deal
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ color: "#d4a012", fontSize: "18px" }}>Referral Program</h3>
          <span style={{ color: "#10b981", fontSize: "14px" }}>{stats.referrals} referrals</span>
        </div>
        
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", marginBottom: "15px" }}>
          <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "8px" }}>Your Referral Link</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={referralLink}
              readOnly
              style={{
                flex: 1,
                background: "#0d1525",
                border: "1px solid #1e3a5f",
                padding: "12px",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px"
              }}
            />
            <button
              onClick={copyReferral}
              style={{
                background: copied ? "#10b981" : "#d4a012",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                color: "#0a0a0a",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
          {REFERRAL_TIERS.map((tier, i) => (
            <div key={i} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "10px" }}>{tier.referrals}+ refs</div>
              <div style={{ color: "#10b981", fontSize: "16px", fontWeight: "700" }}>${tier.reward}</div>
              <div style={{ color: "#00aaff", fontSize: "10px" }}>{tier.bonus}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "15px" }}>Success Stories</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
          {TESTIMONIALS.map(testimonial => (
            <div key={testimonial.id} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#fff", fontWeight: "600" }}>{testimonial.name}</span>
                <span style={{ background: "rgba(212,160,18,0.2)", color: "#d4a012", padding: "2px 8px", borderRadius: "4px", fontSize: "10px" }}>
                  {testimonial.tier}
                </span>
              </div>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "10px" }}>"{testimonial.text}"</p>
              <div style={{ color: "#10b981", fontSize: "16px", fontWeight: "700" }}>{testimonial.profit}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(212,160,18,0.1))", 
        borderRadius: "12px", 
        padding: "25px",
        border: "1px solid #ef4444",
        textAlign: "center"
      }}>
        <h3 style={{ color: "#ef4444", fontSize: "22px", marginBottom: "10px" }}>FLASH SALE - 24 HOURS</h3>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>Everything 50% off for the next 24 hours!</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
          <div style={{ background: "#0d1525", padding: "15px 25px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>HOURS</div>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>24</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px 25px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>MINS</div>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>00</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px 25px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>SECS</div>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>00</div>
          </div>
        </div>
        <button
          style={{
            background: "#ef4444",
            border: "none",
            padding: "15px 40px",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          GET 50% OFF NOW
        </button>
      </div>

      {showPromo && (
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
        }}
        onClick={() => setShowPromo(null)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: showPromo.color, fontSize: "22px", marginBottom: "10px" }}>{showPromo.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "20px" }}>
              <span style={{ color: showPromo.color, fontSize: "36px", fontWeight: "700" }}>${showPromo.price}</span>
              <span style={{ color: "#64748b", fontSize: "18px", textDecoration: "line-through" }}>${showPromo.original}</span>
            </div>
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Total saved</div>
              <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>${showPromo.original - showPromo.price}</div>
            </div>
            <button
              onClick={() => { alert("Promo claimed!"); setShowPromo(null); }}
              style={{
                width: "100%",
                background: showPromo.color,
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                color: "#0a0a0a",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Claim ${showPromo.price} Deal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}