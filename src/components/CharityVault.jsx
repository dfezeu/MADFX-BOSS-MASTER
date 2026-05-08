import { useState } from "react";

const NEON_BLUE = "#00d4ff";
const NEON_GREEN = "#00ff88";
const NEON_PURPLE = "#8b5cf6";
const NEON_ORANGE = "#ff8800";
const DARK_BG = "#030712";

const GLASS_STYLE = {
  background: "rgba(10, 15, 30, 0.7)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(0, 212, 255, 0.15)",
  boxShadow: "0 0 30px rgba(0, 212, 255, 0.1)"
};

export default function CharityVault() {
  const [donations, setDonations] = useState(1250.75);
  const [showInput, setShowInput] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  
  const initiatives = [
    { name: "Education Fund", funded: 500, goal: 1000 },
    { name: "Clean Water Project", funded: 300, goal: 800 },
    { name: "Community Health", funded: 450.75, goal: 600 }
  ];

  const addDonation = () => {
    const amount = parseFloat(newAmount);
    if (amount > 0) {
      setDonations(donations + amount);
      setNewAmount("");
      setShowInput(false);
    }
  };

  return (
    <div style={{
      ...GLASS_STYLE,
      borderRadius: "16px",
      padding: "25px",
      borderColor: `${NEON_PURPLE}30`,
      marginTop: "20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
      `}</style>
      
      <h2 style={{ 
        color: NEON_PURPLE, 
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        letterSpacing: "2px",
        marginBottom: "20px"
      }}>
        // CHARITY VAULT TRACKER
      </h2>
      
      <div style={{ 
        background: "rgba(0,0,0,0.4)", 
        padding: "20px", 
        borderRadius: "12px", 
        marginBottom: "25px",
        border: `1px solid ${NEON_GREEN}30`
      }}>
        <div style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "1px", marginBottom: "5px" }}>
          TOTAL DONATIONS
        </div>
        <div style={{ 
          color: NEON_GREEN, 
          fontSize: "2rem", 
          fontWeight: "700",
          fontFamily: "'Orbitron', sans-serif",
          textShadow: `0 0 20px ${NEON_GREEN}40`
        }}>
          ${donations.toFixed(2)}
        </div>
        
        {!showInput ? (
          <button 
            onClick={() => setShowInput(true)}
            style={{ 
              marginTop: "15px", 
              background: `${NEON_GREEN}20`,
              color: NEON_GREEN,
              border: `1px solid ${NEON_GREEN}40`,
              padding: "10px 20px", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "600",
              fontSize: "0.85rem"
            }}
          >
            ADD DONATION
          </button>
        ) : (
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <input
              type="number"
              value={newAmount}
              onChange={e => setNewAmount(e.target.value)}
              placeholder="Amount"
              style={{
                flex: 1,
                background: "rgba(0,0,0,0.5)",
                border: `1px solid ${NEON_GREEN}40`,
                color: "#ffffff",
                padding: "10px 15px",
                borderRadius: "8px",
                fontFamily: "'Share Tech Mono', monospace"
              }}
            />
            <button 
              onClick={addDonation}
              style={{
                background: `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
                color: "#030712",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "700",
                fontFamily: "'Rajdhani', sans-serif"
              }}
            >
              ADD
            </button>
            <button 
              onClick={() => setShowInput(false)}
              style={{
                background: "transparent",
                color: "#888",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif"
              }}
            >
              CANCEL
            </button>
          </div>
        )}
      </div>
      
      <h3 style={{ 
        color: NEON_ORANGE, 
        fontSize: "0.9rem", 
        letterSpacing: "1px",
        marginBottom: "15px"
      }}>
        // FUNDED INITIATIVES
      </h3>
      
      {initiatives.map(init => (
        <div key={init.name} style={{ 
          background: "rgba(0,0,0,0.3)", 
          padding: "15px", 
          borderRadius: "10px", 
          marginBottom: "12px",
          border: `1px solid rgba(255,255,255,0.05)`
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: NEON_GREEN, fontWeight: "600" }}>{init.name}</span>
            <span style={{ color: "#888", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem" }}>
              ${init.funded} / ${init.goal}
            </span>
          </div>
          <div style={{ width: "100%", background: "rgba(0,0,0,0.5)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ 
              width: `${Math.min((init.funded / init.goal) * 100, 100)}%`, 
              background: `linear-gradient(90deg, ${NEON_GREEN}, ${NEON_BLUE})`, 
              height: "8px", 
              borderRadius: "4px"
            }}></div>
          </div>
        </div>
      ))}
      
      <p style={{ 
        color: "#666", 
        fontSize: "0.8rem",
        marginTop: "15px",
        textAlign: "center",
        fontFamily: "'Share Tech Mono', monospace"
      }}>
        A portion of all platform profits funds social good initiatives.
      </p>
    </div>
  );
}