import { useState } from "react";

export default function ArbitrageScanner({ askOllama, loading }) {
  const [market, setMarket] = useState("US Election 2024");
  const [opportunities, setOpportunities] = useState("");

  const scanArbitrage = async () => {
    const prompt = `Scan for arbitrage opportunities between Kalshi and Polymarket for the market: ${market}. Provide analysis of price differences, potential profits, and risks.`;
    const response = await askOllama(prompt);
    setOpportunities(response);
  };

  return (
    <div style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833", marginTop: "20px" }}>
      <h2 style={{ color: "#00aaff" }}>📊 Prediction Market Arbitrage Scanner</h2>
      <input
        type="text"
        value={market}
        onChange={e => setMarket(e.target.value)}
        placeholder="Market (e.g. US Election 2024)"
        style={{ width: "100%", background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={scanArbitrage} disabled={loading} style={{ background: "#00ff88", color: "#000", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", width: "100%" }}>
        {loading ? "⏳ Scanning..." : "🔍 Scan Arbitrage"}
      </button>
      {opportunities && (
        <div style={{ marginTop: "20px", background: "#0d1f0d", padding: "15px", borderRadius: "4px", border: "1px solid #00ff88", whiteSpace: "pre-wrap" }}>
          {opportunities}
        </div>
      )}
    </div>
  );
}