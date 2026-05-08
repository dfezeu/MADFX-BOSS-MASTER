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

export default function PropFirmComplianceChecker({ askOllama, loading }) {
  const [entry, setEntry] = useState(1.0500);
  const [sl, setSl] = useState(1.0400);
  const [tp, setTp] = useState(1.0700);
  const [balance, setBalance] = useState(100000);
  const [firm, setFirm] = useState("FTMO");
  const [compliance, setCompliance] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const checkCompliance = async () => {
    setIsChecking(true);
    try {
      const risk = Math.abs(entry - sl) / entry * 100;
      const reward = Math.abs(tp - entry) / entry * 100;
      const rr = reward / risk;
      let rules = "";
      if (firm === "FTMO") {
        rules = "Max drawdown: 10%, Min RR: 1:1, Max risk per trade: 2%";
      } else if (firm === "FundedNext") {
        rules = "Max drawdown: 5%, Min RR: 1:1.5, Max risk per trade: 1%";
      } else {
        rules = "Max drawdown: 8%, Min RR: 1:1.2, Max risk per trade: 1.5%";
      }
      const prompt = `Check if this trade complies with ${firm} rules. Entry: ${entry}, SL: ${sl}, TP: ${tp}, Balance: ${balance}. Risk: ${risk.toFixed(2)}%, Reward: ${reward.toFixed(2)}%, RR: ${rr.toFixed(2)}. Rules: ${rules}. Provide compliance status and recommendations.`;
      const response = await askOllama(prompt);
      setCompliance(response);
    } catch (err) {
      setCompliance("Error checking compliance. Please verify your AI connection.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div style={{
      ...GLASS_STYLE,
      borderRadius: "16px",
      padding: "25px",
      borderColor: `${NEON_ORANGE}30`,
      marginTop: "20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
      `}</style>
      
      <h2 style={{ 
        color: NEON_ORANGE, 
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        letterSpacing: "2px",
        marginBottom: "20px"
      }}>
        // PROP FIRM COMPLIANCE
      </h2>
      
      <select
        value={firm}
        onChange={e => setFirm(e.target.value)}
        style={{ 
          background: "rgba(0,0,0,0.5)", 
          color: "#ffffff", 
          border: `1px solid ${NEON_BLUE}40`, 
          padding: "12px 15px", 
          marginBottom: "15px", 
          width: "100%",
          borderRadius: "8px",
          fontFamily: "'Rajdhani', sans-serif",
          cursor: "pointer",
          outline: "none"
        }}
      >
        <option value="FTMO">FTMO</option>
        <option value="FundedNext">FUNDED NEXT</option>
        <option value="TrueForexFunds">TRUE FOREX FUNDS</option>
      </select>
      
      <div style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
        <input 
          type="number" 
          step="0.0001" 
          value={entry} 
          onChange={e => setEntry(Number(e.target.value))} 
          placeholder="Entry"
          style={{ 
            flex: 1, 
            minWidth: "100px",
            background: "rgba(0,0,0,0.5)", 
            color: NEON_GREEN, 
            border: `1px solid ${NEON_GREEN}40`, 
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "'Share Tech Mono', monospace"
          }} 
        />
        <input 
          type="number" 
          step="0.0001" 
          value={sl} 
          onChange={e => setSl(Number(e.target.value))} 
          placeholder="Stop Loss"
          style={{ 
            flex: 1, 
            minWidth: "100px",
            background: "rgba(0,0,0,0.5)", 
            color: "#ef4444", 
            border: `1px solid #ef444440`, 
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "'Share Tech Mono', monospace"
          }} 
        />
        <input 
          type="number" 
          step="0.0001" 
          value={tp} 
          onChange={e => setTp(Number(e.target.value))} 
          placeholder="Take Profit"
          style={{ 
            flex: 1, 
            minWidth: "100px",
            background: "rgba(0,0,0,0.5)", 
            color: NEON_BLUE, 
            border: `1px solid ${NEON_BLUE}40`, 
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "'Share Tech Mono', monospace"
          }} 
        />
      </div>
      
      <input 
        type="number" 
        value={balance} 
        onChange={e => setBalance(Number(e.target.value))} 
        placeholder="Account Balance"
        style={{ 
          width: "100%",
          background: "rgba(0,0,0,0.5)", 
          color: NEON_PURPLE, 
          border: `1px solid ${NEON_PURPLE}40`, 
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          fontFamily: "'Share Tech Mono', monospace"
        }}
      />
      
      <button 
        onClick={checkCompliance} 
        disabled={loading || isChecking}
        style={{ 
          background: isChecking ? "rgba(255,136,0,0.3)" : `linear-gradient(135deg, ${NEON_ORANGE}, ${NEON_PURPLE})`,
          color: isChecking ? "rgba(255,255,255,0.5)" : "#030712",
          border: "none", 
          padding: "14px 24px", 
          borderRadius: "8px", 
          cursor: isChecking ? "wait" : "pointer", 
          fontWeight: "700", 
          width: "100%",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "1px"
        }}
      >
        {isChecking ? "CHECKING COMPLIANCE..." : "CHECK COMPLIANCE"}
      </button>
      
      {compliance && (
        <div style={{ 
          marginTop: "20px", 
          background: "rgba(0,0,0,0.5)", 
          padding: "20px", 
          borderRadius: "10px", 
          border: `1px solid ${NEON_ORANGE}30`,
          whiteSpace: "pre-wrap",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.85rem",
          lineHeight: "1.6"
        }}>
          <span style={{ color: NEON_ORANGE }}>{compliance}</span>
        </div>
      )}
    </div>
  );
}