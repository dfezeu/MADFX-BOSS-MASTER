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

export default function HarmonicPatternDetector({ askOllama, loading }) {
  const [symbol, setSymbol] = useState("EUR/USD");
  const [timeframe, setTimeframe] = useState("H1");
  const [patternResponse, setPatternResponse] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const detectPatterns = async () => {
    if (!symbol.trim()) return;
    setIsScanning(true);
    try {
      const prompt = `Analyze ${symbol} on ${timeframe} timeframe for harmonic patterns such as Gartley, Butterfly, Bat, Crab, Shark. Provide detailed analysis including pattern identification, entry/exit points, and risk management in a structured format.`;
      const response = await askOllama(prompt);
      setPatternResponse(response);
    } catch (err) {
      setPatternResponse("Error analyzing patterns. Please check your Ollama connection.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div style={{
      ...GLASS_STYLE,
      borderRadius: "16px",
      padding: "25px",
      borderColor: `${NEON_BLUE}30`,
      marginTop: "20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
      `}</style>
      
      <h2 style={{ 
        color: NEON_BLUE, 
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1rem",
        letterSpacing: "2px",
        marginBottom: "20px"
      }}>
        // HARMONIC PATTERN DETECTOR
      </h2>
      
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Symbol (e.g. EUR/USD)"
          style={{ 
            flex: 1, 
            minWidth: "200px",
            background: "rgba(0,0,0,0.5)", 
            color: "#ffffff", 
            border: `1px solid ${NEON_GREEN}40`, 
            padding: "12px 15px", 
            borderRadius: "8px",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.9rem",
            outline: "none"
          }}
        />
        <select
          value={timeframe}
          onChange={e => setTimeframe(e.target.value)}
          style={{ 
            background: "rgba(0,0,0,0.5)", 
            color: "#ffffff", 
            border: `1px solid ${NEON_BLUE}40`, 
            padding: "12px 15px", 
            borderRadius: "8px",
            fontFamily: "'Rajdhani', sans-serif",
            cursor: "pointer",
            outline: "none"
          }}>
          <option value="M15">15M</option>
          <option value="H1">H1</option>
          <option value="H4">H4</option>
          <option value="D1">D1</option>
        </select>
      </div>
      
      <button
        onClick={detectPatterns}
        disabled={loading || !symbol.trim()}
        style={{ 
          background: loading || !symbol.trim() 
            ? "rgba(0,255,136,0.3)" 
            : `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`, 
          color: loading || !symbol.trim() ? "rgba(255,255,255,0.5)" : "#030712", 
          border: "none", 
          padding: "14px 28px", 
          borderRadius: "8px", 
          cursor: loading ? "wait" : "pointer", 
          fontWeight: "700", 
          width: "100%",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "1px"
        }}>
        {isScanning ? "SCANNING..." : "DETECT PATTERNS"}
      </button>
      
      {patternResponse && (
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
          <span style={{ color: NEON_GREEN }}>{patternResponse}</span>
        </div>
      )}
    </div>
  );
}