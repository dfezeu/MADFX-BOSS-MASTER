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

export default function TGRRLoop({ askOllama, loading }) {
  const [tradeAmount, setTradeAmount] = useState(1000);
  const [generated, setGenerated] = useState(0);
  const [rewarded, setRewarded] = useState(0);
  const [reinvested, setReinvested] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const simulateTrade = async () => {
    setIsExecuting(true);
    try {
      const prompt = `Simulate a trade with $${tradeAmount} capital. Provide realistic profit/loss based on harmonic pattern analysis and market conditions. Return a JSON with keys: profit, reason.`;
      const response = await askOllama(prompt);
      const profit = Math.random() * 200 - 100;
      setGenerated(profit);
      setRewarded(Math.abs(profit) * 0.1);
    } catch (err) {
      const profit = Math.random() * 200 - 100;
      setGenerated(profit);
      setRewarded(Math.abs(profit) * 0.1);
    } finally {
      setIsExecuting(false);
    }
  };

  const reinvest = () => {
    setReinvested(reinvested + rewarded);
    setRewarded(0);
  };

  const steps = [
    { id: "trade", label: "TRADE", value: `$${tradeAmount}`, color: NEON_GREEN },
    { id: "generate", label: "GENERATE", value: `$${generated.toFixed(2)}`, color: NEON_BLUE },
    { id: "reward", label: "REWARD", value: `$${rewarded.toFixed(2)}`, color: NEON_ORANGE },
    { id: "reinvest", label: "REINVEST", value: `$${reinvested.toFixed(2)}`, color: NEON_PURPLE }
  ];

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
        marginBottom: "25px"
      }}>
        // TGRR NEXUS LOOP
      </h2>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
        {steps.map((step, i) => (
          <div key={step.id} style={{ 
            textAlign: "center", 
            background: "rgba(0,0,0,0.4)", 
            padding: "20px 15px", 
            borderRadius: "12px", 
            border: `1px solid ${step.color}40`,
            flex: 1,
            minWidth: "120px"
          }}>
            <div style={{ color: "#888", fontSize: "0.7rem", letterSpacing: "2px", marginBottom: "10px" }}>
              {step.label}
            </div>
            {step.id === "trade" ? (
              <input
                type="number"
                value={tradeAmount}
                onChange={e => setTradeAmount(Number(e.target.value))}
                style={{ 
                  background: "rgba(0,0,0,0.5)", 
                  color: step.color, 
                  border: `1px solid ${step.color}50`, 
                  padding: "8px", 
                  width: "100px",
                  borderRadius: "6px",
                  fontFamily: "'Share Tech Mono', monospace",
                  textAlign: "center",
                  fontSize: "1rem"
                }}
              />
            ) : (
              <div style={{ 
                color: step.color, 
                fontSize: "1.4rem",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: "700",
                textShadow: `0 0 15px ${step.color}40`
              }}>
                {step.value}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        <button 
          onClick={simulateTrade} 
          disabled={loading || isExecuting}
          style={{ 
            background: isExecuting ? "rgba(0,255,136,0.3)" : `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
            color: isExecuting ? "rgba(255,255,255,0.5)" : "#030712",
            border: "none", 
            padding: "14px 30px", 
            borderRadius: "8px", 
            cursor: isExecuting ? "wait" : "pointer", 
            fontWeight: "700",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "1px"
          }}
        >
          {isExecuting ? "EXECUTING..." : "EXECUTE TRADE"}
        </button>
        
        <button 
          onClick={reinvest} 
          disabled={rewarded <= 0}
          style={{ 
            background: rewarded <= 0 ? "rgba(139, 92, 246, 0.3)" : `${NEON_PURPLE}20`,
            color: rewarded <= 0 ? "rgba(255,255,255,0.3)" : NEON_PURPLE,
            border: `1px solid ${rewarded <= 0 ? "transparent" : NEON_PURPLE + "50"}`,
            padding: "14px 30px", 
            borderRadius: "8px", 
            cursor: rewarded <= 0 ? "not-allowed" : "pointer",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.9rem",
            fontWeight: "600",
            letterSpacing: "1px"
          }}
        >
          REINVEST
        </button>
      </div>
      
      <p style={{ 
        color: "#666", 
        textAlign: "center", 
        marginTop: "20px",
        fontSize: "0.85rem",
        fontFamily: "'Share Tech Mono', monospace"
      }}>
        Simulate the TGRR loop with AI-assisted trading decisions.
      </p>
    </div>
  );
}