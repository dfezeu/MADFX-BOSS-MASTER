import { useState } from "react";

export default function PropFirmComplianceChecker({ askOllama, loading }) {
  const [entry, setEntry] = useState(1.0500);
  const [sl, setSl] = useState(1.0400);
  const [tp, setTp] = useState(1.0700);
  const [balance, setBalance] = useState(100000);
  const [firm, setFirm] = useState("FTMO");
  const [compliance, setCompliance] = useState("");

  const checkCompliance = async () => {
    const risk = Math.abs(entry - sl) / entry * 100;
    const reward = Math.abs(tp - entry) / entry * 100;
    const rr = reward / risk;
    let rules = "";
    if (firm === "FTMO") {
      rules = "Max drawdown: 10%, Min RR: 1:1, Max risk per trade: 2%";
    } else if (firm === "FundedNext") {
      rules = "Max drawdown: 5%, Min RR: 1:1.5, Max risk per trade: 1%";
    }
    const prompt = `Check if this trade complies with ${firm} rules. Entry: ${entry}, SL: ${sl}, TP: ${tp}, Balance: ${balance}. Risk: ${risk.toFixed(2)}%, Reward: ${reward.toFixed(2)}%, RR: ${rr.toFixed(2)}. Rules: ${rules}`;
    const response = await askOllama(prompt);
    setCompliance(response);
  };

  return (
    <div style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833", marginTop: "20px" }}>
      <h2 style={{ color: "#00aaff" }}>📋 Prop Firm Compliance Checker</h2>
      <select
        value={firm}
        onChange={e => setFirm(e.target.value)}
        style={{ background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px", marginBottom: "10px", width: "100%" }}>
        <option value="FTMO">FTMO</option>
        <option value="FundedNext">Funded Next</option>
        <option value="TrueForexFunds">True Forex Funds</option>
      </select>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input type="number" step="0.0001" value={entry} onChange={e => setEntry(Number(e.target.value))} placeholder="Entry" style={{ flex: 1, background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px" }} />
        <input type="number" step="0.0001" value={sl} onChange={e => setSl(Number(e.target.value))} placeholder="Stop Loss" style={{ flex: 1, background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px" }} />
        <input type="number" step="0.0001" value={tp} onChange={e => setTp(Number(e.target.value))} placeholder="Take Profit" style={{ flex: 1, background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px" }} />
      </div>
      <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} placeholder="Account Balance" style={{ width: "100%", background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px", marginBottom: "10px" }} />
      <button onClick={checkCompliance} disabled={loading} style={{ background: "#00ff88", color: "#000", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", width: "100%" }}>
        {loading ? "⏳ Checking..." : "✅ Check Compliance"}
      </button>
      {compliance && (
        <div style={{ marginTop: "20px", background: "#0d1f0d", padding: "15px", borderRadius: "4px", border: "1px solid #00ff88", whiteSpace: "pre-wrap" }}>
          {compliance}
        </div>
      )}
    </div>
  );
}