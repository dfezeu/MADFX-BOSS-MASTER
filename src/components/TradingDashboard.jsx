import { useState, useEffect } from "react";

export default function TradingDashboard({ askOllama, loading }) {
  const [trades, setTrades] = useState([
    { id: 1, symbol: "EUR/USD", type: "BUY", entry: 1.0842, target: 1.0910, stop: 1.0790, status: "active", pnl: "+140", time: "2h ago" },
    { id: 2, symbol: "GBP/USD", type: "SELL", entry: 1.2630, target: 1.2550, stop: 1.2680, status: "active", pnl: "+85", time: "1h ago" },
    { id: 3, symbol: "XAU/USD", type: "BUY", entry: 2024.50, target: 2045.00, stop: 2015.00, status: "pending", pnl: "0", time: "Just now" }
  ]);
  const [selectedSymbol, setSelectedSymbol] = useState("EUR/USD");
  const [positions, setPositions] = useState([
    { label: "Active Trades", value: "3", color: "#00ff88" },
    { label: "Win Rate", value: "78.4%", color: "#00aaff" },
    { label: "Total P/L", value: "+$1,240", color: "#00ff88" },
    { label: "Margin Used", value: "$4,820", color: "#ff8800" }
  ]);
  const [orderForm, setOrderForm] = useState({ symbol: "EUR/USD", type: "BUY", lots: "0.10", entry: "", target: "", stop: "" });
  const [analysis, setAnalysis] = useState("");

  const symbols = ["EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "BTC/USD", "NQ100", "ES100"];

  const handleAnalyze = async () => {
    const result = await askOllama(`Analyze ${selectedSymbol} for a potential trade setup. Include entry, target, stop loss levels and confidence level.`);
    setAnalysis(result);
  };

  const handlePlaceOrder = () => {
    const newTrade = {
      id: trades.length + 1,
      symbol: orderForm.symbol,
      type: orderForm.type,
      entry: orderForm.entry || "Market",
      target: orderForm.target || "TBD",
      stop: orderForm.stop || "TBD",
      status: orderForm.entry ? "pending" : "active",
      pnl: "0",
      time: "Just now"
    };
    setTrades([newTrade, ...trades]);
    setOrderForm({ symbol: "EUR/USD", type: "BUY", lots: "0.10", entry: "", target: "", stop: "" });
  };

  return (
    <div style={{ marginTop: "20px", background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833" }}>
      <h2 style={{ color: "#00ff88", borderBottom: "1px solid #00ff8833", paddingBottom: "10px" }}>
        Trading Terminal
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
        {positions.map(pos => (
          <div key={pos.label} style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px", border: `1px solid ${pos.color}33`, textAlign: "center" }}>
            <div style={{ color: "#888", fontSize: "10px" }}>{pos.label}</div>
            <div style={{ color: pos.color, fontSize: "18px", fontWeight: "bold" }}>{pos.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px" }}>
          <h3 style={{ color: "#00aaff", marginBottom: "15px" }}>Place Order</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
            {symbols.map(sym => (
              <button
                key={sym}
                onClick={() => setOrderForm({ ...orderForm, symbol: sym })}
                style={{
                  background: orderForm.symbol === sym ? "#00ff88" : "#222",
                  color: orderForm.symbol === sym ? "#000" : "#888",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "11px"
                }}
              >
                {sym}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <button
              onClick={() => setOrderForm({ ...orderForm, type: "BUY" })}
              style={{
                flex: 1,
                background: orderForm.type === "BUY" ? "#00ff88" : "#222",
                color: orderForm.type === "BUY" ? "#000" : "#00ff88",
                border: "1px solid #00ff88",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderForm({ ...orderForm, type: "SELL" })}
              style={{
                flex: 1,
                background: orderForm.type === "SELL" ? "#ff4444" : "#222",
                color: orderForm.type === "SELL" ? "#fff" : "#ff4444",
                border: "1px solid #ff4444",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              SELL
            </button>
          </div>
          <input
            type="text"
            placeholder="Lots (0.10)"
            value={orderForm.lots}
            onChange={(e) => setOrderForm({ ...orderForm, lots: e.target.value })}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#fff", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Entry Price (optional)"
            value={orderForm.entry}
            onChange={(e) => setOrderForm({ ...orderForm, entry: e.target.value })}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#fff", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Target Price"
            value={orderForm.target}
            onChange={(e) => setOrderForm({ ...orderForm, target: e.target.value })}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#fff", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Stop Loss"
            value={orderForm.stop}
            onChange={(e) => setOrderForm({ ...orderForm, stop: e.target.value })}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#fff", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          />
          <button
            onClick={handlePlaceOrder}
            style={{ 
              background: orderForm.type === "BUY" ? "#00ff88" : "#ff4444", 
              color: "#000", 
              border: "none", 
              padding: "12px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              width: "100%" 
            }}
          >
            PLACE ORDER
          </button>
        </div>

        <div style={{ background: "#1a1a1a", padding: "15px", borderRadius: "8px" }}>
          <h3 style={{ color: "#00aaff", marginBottom: "15px" }}>AI Analysis</h3>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#00ff88", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          >
            {symbols.map(sym => (
              <option key={sym} value={sym}>{sym}</option>
            ))}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{ 
              background: "#00aaff", 
              color: "#000", 
              border: "none", 
              padding: "12px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              width: "100%" 
            }}
          >
            Analyze {selectedSymbol}
          </button>
          {analysis && (
            <div style={{ marginTop: "15px", background: "#111", padding: "15px", borderRadius: "4px", whiteSpace: "pre-wrap", fontSize: "12px", maxHeight: "200px", overflow: "auto" }}>
              {analysis}
            </div>
          )}
        </div>
      </div>

      <h3 style={{ color: "#00aaff", marginTop: "20px", marginBottom: "15px" }}>Open Positions</h3>
      <div style={{ background: "#1a1a1a", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ background: "#222", color: "#888" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Symbol</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Type</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Entry</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Target</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Stop</th>
              <th style={{ padding: "10px", textAlign: "right" }}>P/L</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Time</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(trade => (
              <tr key={trade.id} style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: "10px", color: "#fff" }}>{trade.symbol}</td>
                <td style={{ padding: "10px", color: trade.type === "BUY" ? "#00ff88" : "#ff4444" }}>{trade.type}</td>
                <td style={{ padding: "10px", color: "#fff", textAlign: "right" }}>{trade.entry}</td>
                <td style={{ padding: "10px", color: "#00ff88", textAlign: "right" }}>{trade.target}</td>
                <td style={{ padding: "10px", color: "#ff4444", textAlign: "right" }}>{trade.stop}</td>
                <td style={{ padding: "10px", color: trade.pnl.startsWith("+") ? "#00ff88" : "#fff", textAlign: "right", fontWeight: "bold" }}>{trade.pnl}</td>
                <td style={{ padding: "10px", color: "#888", textAlign: "right" }}>{trade.time}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button style={{ background: "#ff444488", color: "#ff4444", border: "none", padding: "4px 10px", borderRadius: "3px", cursor: "pointer", fontSize: "10px" }}>Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}