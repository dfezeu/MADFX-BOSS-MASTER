import { useState } from "react";

export default function HarmonicPatternDetector({ askOllama, loading }) {
  const [symbol, setSymbol] = useState("EUR/USD");
  const [timeframe, setTimeframe] = useState("H1");
  const [patternResponse, setPatternResponse] = useState("");

  const detectPatterns = async () => {
    const prompt = `Analyze ${symbol} on ${timeframe} timeframe for harmonic patterns such as Gartley, Butterfly, Bat, Crab, Shark. Provide detailed analysis including pattern identification, entry/exit points, and risk management.`;
    const response = await askOllama(prompt);
    setPatternResponse(response);
  };

  return (
    <div style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833", marginTop: "20px" }}>
      <h2 style={{ color: "#00aaff" }}>🎯 Harmonic Pattern Detector</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Symbol (e.g. EUR/USD)"
          style={{ flex: 1, background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px", borderRadius: "4px" }}
        />
        <select
          value={timeframe}
          onChange={e => setTimeframe(e.target.value)}
          style={{ background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px", borderRadius: "4px" }}>
          <option value="M15">15M</option>
          <option value="H1">H1</option>
          <option value="H4">H4</option>
          <option value="D1">D1</option>
        </select>
      </div>
      <button
        onClick={detectPatterns}
        disabled={loading}
        style={{ background: "#00ff88", color: "#000", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", width: "100%" }}>
        {loading ? "⏳ Detecting..." : "🔍 Detect Patterns"}
      </button>
      {patternResponse && (
        <div style={{ marginTop: "20px", background: "#0d1f0d", padding: "15px", borderRadius: "4px", border: "1px solid #00ff88", whiteSpace: "pre-wrap" }}>
          {patternResponse}
        </div>
      )}
    </div>
  );
}