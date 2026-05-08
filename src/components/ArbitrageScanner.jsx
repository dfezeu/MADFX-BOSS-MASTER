import { useState } from "react";

const NEON_BLUE = "#00d4ff";
const NEON_GREEN = "#00ff88";
const NEON_PURPLE = "#8b5cf6";
const DARK_BG = "#030712";

const GLASS_STYLE = {
  background: "rgba(10, 15, 30, 0.7)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(0, 212, 255, 0.15)",
  boxShadow: "0 0 30px rgba(0, 212, 255, 0.1)"
};

export default function ArbitrageScanner({ askOllama, loading }) {
  const [market, setMarket] = useState("US Election 2024");
  const [opportunities, setOpportunities] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const scanArbitrage = async () => {
    if (!market.trim()) return;
    setIsScanning(true);
    try {
      const prompt = `Scan for arbitrage opportunities between prediction markets (Kalshi, Polymarket) for: ${market}. Analyze price differences, potential profits, and associated risks. Format as structured analysis.`;
      const response = await askOllama(prompt);
      setOpportunities(response);
    } catch (err) {
      setOpportunities("Error scanning for opportunities. Please check your AI connection.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div style={{
      ...GLASS_STYLE,
      borderRadius: "16px",
      padding: "25px",
      borderColor: `${NEON_GREEN}30`,
      marginTop: "20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
      `}</style>
      
      <h2 style={{ 
        color: NEON_GREEN, 
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        letterSpacing: "2px",
        marginBottom: "20px"
      }}>
        // ARBITRAGE SCANNER
      </h2>
      
      <input
        type="text"
        value={market}
        onChange={e => setMarket(e.target.value)}
        placeholder="Market (e.g. US Election 2024)"
        style={{ 
          width: "100%", 
          background: "rgba(0,0,0,0.5)", 
          color: "#ffffff", 
          border: `1px solid ${NEON_GREEN}40`, 
          padding: "12px 15px", 
          marginBottom: "15px",
          borderRadius: "8px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.9rem",
          outline: "none"
        }}
      />
      
      <button 
        onClick={scanArbitrage} 
        disabled={loading || isScanning || !market.trim()}
        style={{ 
          background: isScanning || !market.trim() 
            ? "rgba(0,255,136,0.3)" 
            : `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_PURPLE})`,
          color: isScanning || !market.trim() ? "rgba(255,255,255,0.5)" : "#030712",
          border: "none", 
          padding: "14px 24px", 
          borderRadius: "8px", 
          cursor: isScanning ? "wait" : "pointer", 
          fontWeight: "700", 
          width: "100%",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "1px"
        }}
      >
        {isScanning ? "SCANNING MARKETS..." : "SCAN ARBITRAGE"}
      </button>
      
      {opportunities && (
        <div style={{ 
          marginTop: "20px", 
          background: "rgba(0,0,0,0.5)", 
          padding: "20px", 
          borderRadius: "10px", 
          border: `1px solid ${NEON_GREEN}30`,
          whiteSpace: "pre-wrap",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.85rem",
          lineHeight: "1.6",
          maxHeight: "400px",
          overflowY: "auto"
        }}>
          <span style={{ color: NEON_GREEN }}>{opportunities}</span>
        </div>
      )}
    </div>
  );
}