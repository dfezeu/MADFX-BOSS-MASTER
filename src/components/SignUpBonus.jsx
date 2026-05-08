import { useState, useEffect } from "react";

export default function SignUpBonus() {
  const [bonuses, setBonuses] = useState([
    { 
      id: 1, 
      name: "Welcome Trading Bonus", 
      description: "Get 50 NXUS when you complete your first trade", 
      value: "50 NXUS", 
      limit: 100, 
      claimed: 45, 
      ends: "2026-05-31", 
      color: "#00ff88",
      action: "Complete first trade"
    },
    { 
      id: 2, 
      name: "Liquidity Provider Bonus", 
      description: "Earn 100 NXUS for providing liquidity to any pool", 
      value: "100 NXUS", 
      limit: 50, 
      claimed: 23, 
      ends: "2026-05-20", 
      color: "#00aaff",
      action: "Add liquidity"
    },
    { 
      id: 3, 
      name: "AI Agent Starter Pack", 
      description: "Free 7-day access to Premium AI Agents", 
      value: "7 Days Premium", 
      limit: 75, 
      claimed: 38, 
      ends: "2026-06-10", 
      color: "#d4a012",
      action: "Connect wallet"
    }
  ]);

  const [showDetails, setShowDetails] = useState(null);
  const [bonusAction, setBonusAction] = useState(null);

  const handleClaim = (bonus) => {
    setBonusAction(bonus);
    // In a real app, this would trigger a blockchain transaction or API call
    setTimeout(() => {
      // Update claimed count
      setBonuses(prev => prev.map(b => 
        b.id === bonus.id ? {...b, claimed: b.claimed + 1} : b
      ));
      setShowDetails(false);
      alert(`Congratulations! You've claimed ${bonus.value}. Please complete the action: ${bonus.action} to receive your bonus.`);
    }, 1000);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>LIMITED SIGN-UP BONUSES</h2>
        <div style={{ color: "#64748b", fontSize: "14px" }}>Exclusive rewards for new users</div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px", marginBottom: "25px" }}>
        {bonuses.map(bonus => (
          <div
            key={bonus.id}
            style={{
              background: "#1e3a5f",
              borderRadius: "12px",
              padding: "20px",
              borderLeft: `4px solid ${bonus.color}`,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            onClick={() => setShowDetails(bonus)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{bonus.name}</h3>
              <span style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", padding: "3px 8px", borderRadius: "4px", fontSize: "10px" }}>
                {bonus.limit - bonus.claimed} left
              </span>
            </div>
            
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "10px" }}>{bonus.description}</p>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ 
                fontSize: "20px", 
                fontWeight: "700", 
                color: bonus.color
              }}>
                {bonus.value}
              </div>
              <div style={{ 
                background: bonus.color, 
                color: "#0a0a0a", 
                padding: "2px 8px", 
                borderRadius: "4px", 
                fontSize: "11px", 
                fontWeight: "600"
              }}>
                {bonus.action}
              </div>
            </div>
            
            <div style={{ background: "#0d1525", height: "6px", borderRadius: "3px", marginTop: "10px" }}>
              <div style={{ 
                width: `${(bonus.claimed/bonus.limit)*100}%`, 
                height: "100%", 
                background: bonus.color, 
                borderRadius: "3px" 
              }}></div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginTop: "5px" }}>
              <span>{bonus.claimed}/{bonus.limit} claimed</span>
              <span>Ends {bonus.ends}</span>
            </div>
          </div>
        ))}
      </div>
      
      {showDetails && (
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
        onClick={() => setShowDetails(null)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: showDetails.color, marginBottom: "15px", textAlign: "center" }}>{showDetails.name}</h3>
            <p style={{ color: "#64748b", textAlign: "center", marginBottom: "20px" }}>{showDetails.description}</p>
            
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ 
                fontSize: "24px", 
                fontWeight: "700", 
                color: showDetails.color
              }}>
                {showDetails.value}
              </div>
              <div style={{ 
                background: showDetails.color, 
                color: "#0a0a0a", 
                padding: "4px 12px", 
                borderRadius: "6px", 
                fontSize: "12px", 
                fontWeight: "600"
              }}>
                Claim for: {showDetails.action}
              </div>
            </div>
            
            <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px", marginBottom: "20px" }}>
              <div style={{ 
                width: `${(showDetails.claimed/showDetails.limit)*100}%`, 
                height: "100%", 
                background: showDetails.color, 
                borderRadius: "4px" 
              }}></div>
            </div>
            <div style={{ textAlign: "center", color: "#64748b", fontSize: "12px", marginBottom: "15px" }}>
              {showDetails.claimed}/{showDetails.limit} claimed
            </div>
            
            <button
              onClick={() => handleClaim(showDetails)}
              style={{
                width: "100%",
                background: showDetails.color,
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                color: "#0a0a0a",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer"
              }}
              disabled={showDetails.claimed >= showDetails.limit}
            >
              {showDetails.claimed >= showDetails.limit ? "Sold Out" : "Claim Bonus"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}