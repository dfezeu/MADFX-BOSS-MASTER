import { useState } from "react";

export default function TGRRLoop({ askOllama, loading }) {
  const [tradeAmount, setTradeAmount] = useState(1000);
  const [generated, setGenerated] = useState(0);
  const [rewarded, setRewarded] = useState(0);
  const [reinvested, setReinvested] = useState(0);

  const simulateTrade = async () => {
    const prompt = `Simulate a trade with $${tradeAmount} capital. Provide realistic profit/loss based on harmonic pattern analysis.`;
    const response = await askOllama(prompt);
    // Mock: assume some profit
    const profit = Math.random() * 200 - 100; // -100 to 100
    setGenerated(profit);
    setRewarded(profit * 0.1); // 10% reward
  };

  const reinvest = () => {
    setReinvested(reinvested + rewarded);
    setRewarded(0);
  };

  return (
    <div style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833", marginTop: "20px" }}>
      <h2 style={{ color: "#00aaff" }}>🔄 TGRR Execution Loop</h2>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <div style={{ textAlign: "center", background: "#222", padding: "10px", borderRadius: "4px", border: "1px solid #00ff88" }}>
          <div style={{ color: "#888" }}>Trade</div>
          <input
            type="number"
            value={tradeAmount}
            onChange={e => setTradeAmount(Number(e.target.value))}
            style={{ background: "#333", color: "#00ff88", border: "1px solid #00ff88", padding: "5px", width: "80px" }}
          />
          <button onClick={simulateTrade} disabled={loading} style={{ display: "block", marginTop: "5px", background: "#00ff88", color: "#000", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
            Trade
          </button>
        </div>
        <div style={{ textAlign: "center", background: "#222", padding: "10px", borderRadius: "4px", border: "1px solid #00aaff" }}>
          <div style={{ color: "#888" }}>Generate</div>
          <div style={{ color: "#00aaff", fontSize: "18px" }}>${generated.toFixed(2)}</div>
        </div>
        <div style={{ textAlign: "center", background: "#222", padding: "10px", borderRadius: "4px", border: "1px solid #ff8800" }}>
          <div style={{ color: "#888" }}>Reward</div>
          <div style={{ color: "#ff8800", fontSize: "18px" }}>${rewarded.toFixed(2)}</div>
        </div>
        <div style={{ textAlign: "center", background: "#222", padding: "10px", borderRadius: "4px", border: "1px solid #00ff88" }}>
          <div style={{ color: "#888" }}>Reinvest</div>
          <div style={{ color: "#00ff88", fontSize: "18px" }}>${reinvested.toFixed(2)}</div>
          <button onClick={reinvest} style={{ display: "block", marginTop: "5px", background: "#00ff88", color: "#000", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
            Reinvest
          </button>
        </div>
      </div>
      <p style={{ color: "#888", textAlign: "center" }}>Simulate the TGRR loop with AI-assisted trading decisions.</p>
    </div>
  );
}