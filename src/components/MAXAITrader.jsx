import { useState } from "react";

export default function MAXAITrader({ askOllama, loading }) {
  const [activeMode, setActiveMode] = useState("chat");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "I am MAXAI - Your intelligent trading assistant. I can analyze markets, generate signals, create Pine Script strategies, and execute trades. How can I help you today?" }
  ]);
  const [signals, setSignals] = useState([]);
  const [pineScript, setPineScript] = useState("");
  const [tradingView, setTradingView] = useState("");
  const [alerts, setAlerts] = useState([
    { id: 1, symbol: "EUR/USD", condition: "Above 1.0900", action: "BUY", status: "active" },
    { id: 2, symbol: "XAU/USD", condition: "RSI < 30", action: "BUY", status: "active" },
    { id: 3, symbol: "BTC/USD", condition: "Cross SMA 50", action: "SELL", status: "paused" }
  ]);

  const generateSignal = async () => {
    const newSignal = await askOllama(`Generate a trading signal for EUR/USD. Include entry, take profit, stop loss, and confidence level. Keep it concise.`);
    setSignals([...signals, { text: newSignal, time: new Date().toLocaleTimeString() }]);
  };

  const generatePineScript = async () => {
    const script = await askOllama(`Create a Pine Script v5 strategy for a simple moving average crossover. Include long and short entry conditions, stop loss and take profit. Keep it concise and properly formatted.`);
    setPineScript(script);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    const response = await askOllama(`You are MAXAI trading assistant. ${message}. Provide helpful trading insights.`);
    setChatHistory([...chatHistory, { role: "user", content: message }, { role: "ai", content: response }]);
    setMessage("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ color: "#3b82f6", fontSize: "28px", fontWeight: "700" }}>MAXAI TRADER</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>AI-powered trading with Pine Script automation</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></div>
          <span style={{ color: "#10b981", fontWeight: "600" }}>ONLINE</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {[
          { id: "chat", label: "Chat" },
          { id: "signals", label: "Signals" },
          { id: "pine", label: "Pine Script" },
          { id: "alerts", label: "Alerts" },
          { id: "auto", label: "Auto Trade" }
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            style={{
              background: activeMode === mode.id ? "#3b82f6" : "#1e3a5f",
              color: activeMode === mode.id ? "#fff" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {activeMode === "chat" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", height: "400px" }}>
            <div style={{ flex: 1, overflowY: "auto", marginBottom: "15px" }}>
              {chatHistory.map((msg, idx) => (
                <div key={idx} style={{ 
                  background: msg.role === "ai" ? "#0d1525" : "#3b82f620", 
                  padding: "12px 15px", 
                  borderRadius: "10px", 
                  marginBottom: "10px",
                  maxWidth: "85%",
                  marginLeft: msg.role === "ai" ? "0" : "auto"
                }}>
                  <span style={{ color: msg.role === "ai" ? "#3b82f6" : "#10b981", fontSize: "11px", fontWeight: "600", display: "block", marginBottom: "5px" }}>
                    {msg.role === "ai" ? "MAXAI" : "YOU"}
                  </span>
                  <span style={{ color: "#fff", fontSize: "13px", lineHeight: "1.5" }}>{msg.content}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask MAXAI about markets, strategies..."
                style={{ flex: 1, background: "#0d1525", border: "1px solid #1e3a5f", padding: "12px 15px", borderRadius: "8px", color: "#fff", fontSize: "13px" }}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                style={{ background: "#3b82f6", border: "none", padding: "12px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}
              >
                Send
              </button>
            </div>
          </div>

          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h4 style={{ color: "#d4a012", marginBottom: "15px" }}>Quick Actions</h4>
            <div style={{ display: "grid", gap: "10px" }}>
              {[
                { label: "Analyze EUR/USD", icon: "📊" },
                { label: "Scan Markets", icon: "🎯" },
                { label: "Generate Signal", icon: "⚡" },
                { label: "Backtest Strategy", icon: "📈" },
                { label: "Check News", icon: "📰" }
              ].map(action => (
                <button
                  key={action.label}
                  onClick={generateSignal}
                  style={{ background: "#0d1525", border: "none", padding: "12px", borderRadius: "8px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeMode === "signals" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012" }}>Generated Signals</h3>
            <button
              onClick={generateSignal}
              disabled={loading}
              style={{ background: "#10b981", border: "none", padding: "10px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}
            >
              {loading ? "Generating..." : "Generate New"}
            </button>
          </div>
          <div style={{ display: "grid", gap: "10px" }}>
            {signals.length === 0 ? (
              <div style={{ color: "#64748b", textAlign: "center", padding: "40px" }}>No signals generated yet</div>
            ) : (
              signals.map((sig, idx) => (
                <div key={idx} style={{ background: "#0d1525", padding: "15px", borderRadius: "8px" }}>
                  <div style={{ color: "#fff", fontSize: "13px", marginBottom: "5px" }}>{sig.text}</div>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>{sig.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeMode === "pine" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012" }}>Pine Script Generator</h3>
            <button
              onClick={generatePineScript}
              disabled={loading}
              style={{ background: "#10b981", border: "none", padding: "10px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
          <textarea
            value={pineScript}
            onChange={(e) => setPineScript(e.target.value)}
            placeholder="// Pine Script will be generated here..."
            style={{ width: "100%", height: "300px", background: "#0d1525", border: "1px solid #1e3a5f", padding: "15px", borderRadius: "8px", color: "#10b981", fontFamily: "monospace", fontSize: "12px", resize: "none" }}
          />
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button
              onClick={() => copyToClipboard(pineScript)}
              style={{ background: "#3b82f6", border: "none", padding: "10px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}
            >
              Copy Script
            </button>
            <button
              style={{ background: "#10b981", border: "none", padding: "10px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}
            >
              Copy to TradingView
            </button>
          </div>
        </div>
      )}

      {activeMode === "alerts" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#d4a012", marginBottom: "20px" }}>Trade Alerts</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#fff", fontWeight: "600" }}>{alert.symbol}</span>
                  <span style={{ color: "#64748b", marginLeft: "10px", fontSize: "12px" }}>{alert.condition}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <span style={{ color: alert.action === "BUY" ? "#10b981" : "#ef4444", fontWeight: "600" }}>{alert.action}</span>
                  <button
                    onClick={() => setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a))}
                    style={{ background: alert.status === "active" ? "#10b981" : "#f59e0b", border: "none", padding: "6px 12px", borderRadius: "4px", color: "#fff", fontSize: "11px", cursor: "pointer" }}
                  >
                    {alert.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            style={{ background: "#3b82f6", border: "none", padding: "12px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600", marginTop: "15px", width: "100%" }}
          >
            Add New Alert
          </button>
        </div>
      )}

      {activeMode === "auto" && (
        <div style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)", borderRadius: "12px", border: "1px solid #3b82f6", padding: "30px", textAlign: "center" }}>
          <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>Automated Trading</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>Configure MAXAI to automatically execute trades based on signals</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "20px" }}>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "8px" }}>
              <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>24</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Trades Today</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "8px" }}>
              <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>+78%</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Win Rate</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "8px" }}>
              <div style={{ color: "#3b82f6", fontSize: "24px", fontWeight: "700" }}>$1,240</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Profit</div>
            </div>
          </div>
          <button style={{ background: "#10b981", border: "none", padding: "14px 30px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "700" }}>
            Enable Auto Trading
          </button>
        </div>
      )}
    </div>
  );
}