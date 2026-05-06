import { useState } from "react";

export default function UpgradeSystem() {
  const [activePlan, setActivePlan] = useState("free");
  const [billing, setBilling] = useState("monthly");
  
  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "forever",
      features: [
        "Basic market signals (5/min)",
        "Limited AI analysis",
        "Basic leaderboard access",
        "Community chat",
        "1 Strategy template"
      ],
      limits: ["5 trades/day", "1 indicator", "Email support"]
    },
    {
      id: "pro",
      name: "Pro",
      price: billing === "monthly" ? 49 : 39,
      period: billing === "monthly" ? "/month" : "/month (billed yearly)",
      popular: true,
      features: [
        "Real-time signals (every 5min)",
        "Advanced AI analysis",
        "Full leaderboard + copy trading",
        "Priority support",
        "10 Strategy templates",
        "Backtesting tool",
        "Custom indicators"
      ],
      limits: ["100 trades/day", "Unlimited AI queries", "API access (basic)"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billing === "monthly" ? 199 : 149,
      period: billing === "monthly" ? "/month" : "/month (billed yearly)",
      features: [
        "Premium signals (real-time)",
        "MAXAI Trading Bot",
        "Pine Script integration",
        "Automated trade execution",
        "White-label license",
        "Dedicated support",
        "Custom strategy development",
        "Revenue share program",
        "All indicators & tools"
      ],
      limits: ["Unlimited trades", "Full API access", "Priority hosting"]
    }
  ];

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>UPGRADE TO PRO</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Support dev team and unlock premium features</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "25px" }}>
        <button
          onClick={() => setBilling("monthly")}
          style={{
            background: billing === "monthly" ? "#3b82f6" : "transparent",
            color: billing === "monthly" ? "#fff" : "#64748b",
            border: "1px solid #3b82f6",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          style={{
            background: billing === "yearly" ? "#10b981" : "transparent",
            color: billing === "yearly" ? "#fff" : "#64748b",
            border: "1px solid #10b981",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Yearly (Save 20%)
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {plans.map(plan => (
          <div 
            key={plan.id}
            style={{ 
              background: plan.popular ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.1))" : "#1e3a5f",
              borderRadius: "16px", 
              border: plan.popular ? "2px solid #3b82f6" : "1px solid #1e3a5f",
              padding: "25px",
              position: "relative"
            }}
          >
            {plan.popular && (
              <div style={{ position: "absolute", top: "-12px", right: "20px", background: "#3b82f6", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>
                POPULAR
              </div>
            )}
            <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "5px" }}>{plan.name}</h3>
            <div style={{ marginBottom: "20px" }}>
              <span style={{ color: "#d4a012", fontSize: "36px", fontWeight: "700" }}>${plan.price}</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>{plan.period}</span>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              {plan.features.map((feat, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#10b981", fontSize: "14px" }}>✓</span>
                  <span style={{ color: "#fff", fontSize: "13px" }}>{feat}</span>
                </div>
              ))}
            </div>
            
            <div style={{ marginBottom: "20px", paddingTop: "15px", borderTop: "1px solid #0d1525" }}>
              {plan.limits?.map((limit, idx) => (
                <div key={idx} style={{ color: "#64748b", fontSize: "11px", marginBottom: "5px" }}>
                  • {limit}
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setActivePlan(plan.id)}
              style={{
                width: "100%",
                background: plan.id === "free" ? "transparent" : plan.popular ? "#3b82f6" : "#10b981",
                color: plan.id === "free" ? "#64748b" : "#fff",
                border: plan.id === "free" ? "1px solid #64748b" : "none",
                padding: "14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px"
              }}
            >
              {plan.id === "free" ? "Current Plan" : "Upgrade Now"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", background: "linear-gradient(135deg, rgba(212, 160, 18, 0.1), transparent)", borderRadius: "12px", border: "1px solid #d4a012", padding: "20px", textAlign: "center" }}>
        <h3 style={{ color: "#d4a012", marginBottom: "10px" }}>Support the Dev Team</h3>
        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>
          Your subscription helps us build better features, maintain servers, and grow the platform
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>5,240</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Active Users</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>$127K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Monthly Revenue</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>98%</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}