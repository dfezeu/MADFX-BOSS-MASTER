import { useState, useEffect } from "react";

const OVERNIGHT_SCANS = [
  { ticker: "NVDA", name: "NVIDIA Corp", price: 875.50, change: 4.2, iv: 65, exp: "May 17", strike: 880, type: "call", breakProb: 72, vol: 2500000, sentiment: "bullish", aiScore: 92 },
  { ticker: "AAPL", name: "Apple Inc", price: 182.45, change: 1.8, iv: 28, exp: "May 17", strike: 185, type: "call", breakProb: 68, vol: 1800000, sentiment: "bullish", aiScore: 88 },
  { ticker: "TSLA", name: "Tesla Inc", price: 175.25, change: -2.5, iv: 85, exp: "May 17", strike: 180, type: "call", breakProb: 55, vol: 3200000, sentiment: "neutral", aiScore: 72 },
  { ticker: "AMD", name: "AMD", price: 165.80, change: 3.2, iv: 52, exp: "May 17", strike: 170, type: "call", breakProb: 65, vol: 1200000, sentiment: "bullish", aiScore: 85 },
  { ticker: "META", name: "Meta Platforms", price: 485.20, change: 2.1, iv: 35, exp: "May 17", strike: 490, type: "call", breakProb: 62, vol: 950000, sentiment: "bullish", aiScore: 82 },
  { ticker: "GOOGL", name: "Alphabet", price: 172.50, change: 1.5, iv: 32, exp: "May 17", strike: 175, type: "call", breakProb: 70, vol: 1100000, sentiment: "bullish", aiScore: 86 },
  { ticker: "AMZN", name: "Amazon", price: 185.25, change: 0.85, iv: 38, exp: "May 17", strike: 190, type: "call", breakProb: 58, vol: 1500000, sentiment: "bullish", aiScore: 78 },
  { ticker: "SPY", name: "S&P 500 ETF", price: 525.50, change: 0.45, iv: 12, exp: "May 17", strike: 530, type: "call", breakProb: 75, vol: 8500000, sentiment: "bullish", aiScore: 95 }
];

const PUT_SCANS = [
  { ticker: "NVDA", name: "NVIDIA Corp", price: 875.50, change: 4.2, iv: 65, exp: "May 17", strike: 850, type: "put", breakProb: 68, vol: 2100000, sentiment: "neutral", aiScore: 75 },
  { ticker: "TSLA", name: "Tesla Inc", price: 175.25, change: -2.5, iv: 85, exp: "May 17", strike: 165, type: "put", breakProb: 62, vol: 2800000, sentiment: "bearish", aiScore: 78 },
  { ticker: "AMD", name: "AMD", price: 165.80, change: 3.2, iv: 52, exp: "May 17", strike: 155, type: "put", breakProb: 58, vol: 950000, sentiment: "neutral", aiScore: 68 }
];

export default function OptionsScanner() {
  const [scanType, setScanType] = useState("calls");
  const [selectedStrike, setSelectedStrike] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [rankBy, setRankBy] = useState("aiScore");

  useEffect(() => {
    const interval = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getData = () => {
    const data = scanType === "calls" ? OVERNIGHT_SCANS : PUT_SCANS;
    return [...data].sort((a, b) => b[rankBy] - a[rankBy]);
  };

  return (
    <div style={{ background: "#050510", borderRadius: "16px", border: "1px solid #00aaff", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700", textShadow: "0 0 20px #00ff88" }}>OPTIONS SCANNER</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>AI-Powered Breakout Detection</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>LAST UPDATE</div>
          <div style={{ color: "#00aaff", fontSize: "14px" }}>{lastUpdate.toLocaleTimeString()}</div>
          <div style={{ color: "#00ff88", fontSize: "12px", marginTop: "5px" }}>
            🔍 Scanning 2,400 contracts...
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setScanType("calls")}
          style={{
            background: scanType === "calls" ? "rgba(0, 255, 136, 0.15)" : "transparent",
            color: scanType === "calls" ? "#00ff88" : "#64748b",
            border: "1px solid " + (scanType === "calls" ? "#00ff88" : "transparent"),
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            boxShadow: scanType === "calls" ? "0 0 20px rgba(0, 255, 136, 0.3)" : "none"
          }}
        >
          📈 CALLS
        </button>
        <button
          onClick={() => setScanType("puts")}
          style={{
            background: scanType === "puts" ? "rgba(239, 68, 68, 0.15)" : "transparent",
            color: scanType === "puts" ? "#ef4444" : "#64748b",
            border: "1px solid " + (scanType === "puts" ? "#ef4444" : "transparent"),
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            boxShadow: scanType === "puts" ? "0 0 20px rgba(239, 68, 68, 0.3)" : "none"
          }}
        >
          📉 PUTS
        </button>
        
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <select
            value={rankBy}
            onChange={(e) => setRankBy(e.target.value)}
            style={{ background: "#0a0a15", color: "#fff", border: "1px solid #1a1a2e", padding: "10px 15px", borderRadius: "8px" }}
          >
            <option value="aiScore">AI Score</option>
            <option value="breakProb">Break %</option>
            <option value="iv">IV</option>
            <option value="vol">Volume</option>
          </select>
        </div>
      </div>

      <div style={{ background: "#0a0a15", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "15px", background: "#0d0d20", color: "#64748b", fontSize: "10px", fontWeight: "600" }}>
          <span>TICKER</span>
          <span>PRICE</span>
          <span>STRIKE</span>
          <span>IV</span>
          <span>BREAK%</span>
          <span>VOLUME</span>
          <span>AI SCORE</span>
          <span>ACTION</span>
        </div>
        {getData().map((opt, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "15px", borderBottom: "1px solid #0d0d20", alignItems: "center", background: i === 0 ? "rgba(0, 255, 136, 0.05)" : "transparent" }}>
            <div>
              <span style={{ color: "#fff", fontWeight: "700" }}>{opt.ticker}</span>
              <span style={{ color: "#00aaff", fontSize: "10px", marginLeft: "8px", background: "rgba(0, 170, 255, 0.2)", padding: "2px 6px", borderRadius: "4px" }}>
                {opt.sentiment}
              </span>
            </div>
            <span style={{ color: "#fff" }}>${opt.price}</span>
            <span style={{ color: "#d4a012", fontWeight: "600" }}>${opt.strike}</span>
            <span style={{ color: opt.iv > 50 ? "#f59e0b" : "#fff" }}>{opt.iv}%</span>
            <span style={{ color: opt.breakProb > 65 ? "#00ff88" : "#fff" }}>{opt.breakProb}%</span>
            <span style={{ color: "#00aaff" }}>{(opt.vol/1000000).toFixed(1)}M</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "40px", height: "6px", background: "#1a1a2e", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${opt.aiScore}%`, height: "100%", background: opt.aiScore > 85 ? "#00ff88" : opt.aiScore > 75 ? "#00aaff" : "#f59e0b", borderRadius: "3px" }}></div>
              </div>
              <span style={{ color: opt.aiScore > 85 ? "#00ff88" : opt.aiScore > 75 ? "#00aaff" : "#f59e0b", fontSize: "12px", fontWeight: "600" }}>{opt.aiScore}</span>
            </div>
            <button
              onClick={() => setShowDetails(opt)}
              style={{ background: "#00aaff", border: "none", padding: "8px 12px", borderRadius: "6px", color: "#050510", fontWeight: "600", fontSize: "11px", cursor: "pointer", boxShadow: "0 0 15px rgba(0, 170, 255, 0.5)" }}
            >
              TRADE
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginTop: "20px" }}>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>TOP PICK</div>
          <div style={{ color: "#00ff88", fontSize: "20px", fontWeight: "700" }}>{getData()[0]?.ticker}</div>
          <div style={{ color: "#d4a012", fontSize: "14px" }}>{getData()[0]?.aiScore}/100</div>
        </div>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>AVG BREAK%</div>
          <div style={{ color: "#00aaff", fontSize: "20px", fontWeight: "700" }}>
            {(getData().reduce((s, o) => s + o.breakProb, 0) / getData().length).toFixed(0)}%
          </div>
        </div>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>TOTAL VOL</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>
            {(getData().reduce((s, o) => s + o.vol, 0) / 1000000).toFixed(1)}M
          </div>
        </div>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>EXPIRATION</div>
          <div style={{ color: "#d4a012", fontSize: "20px", fontWeight: "700" }}>May 17</div>
        </div>
      </div>

      {showDetails && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => setShowDetails(null)}
        >
          <div style={{ background: "#0a0a15", borderRadius: "16px", padding: "30px", maxWidth: "450px", width: "90%", border: "1px solid #00aaff" }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <h3 style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>{showDetails.ticker}</h3>
                <div style={{ color: "#64748b" }}>{showDetails.name}</div>
              </div>
              <span style={{ background: showDetails.sentiment === "bullish" ? "rgba(0, 255, 136, 0.2)" : showDetails.sentiment === "bearish" ? "rgba(239, 68, 68, 0.2)" : "rgba(100, 116, 139, 0.2)", color: showDetails.sentiment === "bullish" ? "#00ff88" : showDetails.sentiment === "bearish" ? "#ef4444" : "#64748b", padding: "8px 15px", borderRadius: "8px", fontSize: "12px", fontWeight: "600" }}>
                {showDetails.sentiment.toUpperCase()}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div style={{ background: "#050510", padding: "15px", borderRadius: "8px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>Current Price</div>
                <div style={{ color: "#fff", fontSize: "22px", fontWeight: "700" }}>${showDetails.price}</div>
              </div>
              <div style={{ background: "#050510", padding: "15px", borderRadius: "8px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>Strike</div>
                <div style={{ color: "#d4a012", fontSize: "22px", fontWeight: "700" }}>${showDetails.strike}</div>
              </div>
              <div style={{ background: "#050510", padding: "15px", borderRadius: "8px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>IV</div>
                <div style={{ color: "#f59e0b", fontSize: "22px", fontWeight: "700" }}>{showDetails.iv}%</div>
              </div>
              <div style={{ background: "#050510", padding: "15px", borderRadius: "8px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>Break Probability</div>
                <div style={{ color: "#00ff88", fontSize: "22px", fontWeight: "700" }}>{showDetails.breakProb}%</div>
              </div>
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 170, 255, 0.1))", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #00aaff" }}>
              <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>AI SCORE</div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ flex: 1, height: "12px", background: "#1a1a2e", borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ width: `${showDetails.aiScore}%`, height: "100%", background: "linear-gradient(90deg, #00ff88, #00aaff)", borderRadius: "6px", boxShadow: "0 0 20px #00ff88" }}></div>
                </div>
                <span style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>{showDetails.aiScore}</span>
              </div>
            </div>

            <button
              style={{ width: "100%", background: "#00ff88", border: "none", padding: "15px", borderRadius: "8px", color: "#050510", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)" }}
            >
              TRADE {showDetails.type.toUpperCase()} ${showDetails.strike}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}