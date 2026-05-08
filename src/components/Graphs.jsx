import { useState } from "react";

export default function Graphs() {
  const [timeframe, setTimeframe] = useState("1D");
  const [activeTab, setActiveTab] = useState("price");

  const tabs = [
    { id: "price", label: "Price Charts" },
    { id: "volume", label: "Volume Analysis" },
    { id: "indicators", label: "Technical Indicators" },
    { id: "correlation", label: "Correlation Matrix" }
  ];

  const timeframes = [
    { id: "1H", label: "1 Hour" },
    { id: "4H", label: "4 Hours" },
    { id: "1D", label: "1 Day" },
    { id: "1W", label: "1 Week" },
    { id: "1M", label: "1 Month" }
  ];

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MARKET GRAPHS & ANALYTICS</h2>
        <div>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            style={{ background: "#1e3a5f", color: "#fff", border: "1px solid #3b82f6", padding: "8px 12px", borderRadius: "6px", fontSize: "14px" }}
          >
            {timeframes.map(tf => (
              <option key={tf.id} value={tf.id}>{tf.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? "#1e3a5f" : "transparent",
              border: activeTab === tab.id ? `1px solid #00ff88` : "1px solid #333",
              color: activeTab === tab.id ? "#00ff88" : "#ccc",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: activeTab === tab.id ? "600" : "400"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === "price" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", height: "300px", position: "relative" }}>
          <div style={{ position: "absolute", top: "10px", left: "10px", color: "#64748b", fontSize: "12px" }}>
            NXUS/USD Price Chart
          </div>
          <div style={{ position: "absolute", bottom: "10px", left: "10px", color: "#64748b", fontSize: "12px" }}>
            Price (USD)
          </div>
          <div style={{ position: "absolute", bottom: "10px", right: "10px", color: "#64748b", fontSize: "12px" }}>
            Time ({timeframe})
          </div>
          {/* Chart placeholder */}
          <div style={{ 
            width: "100%", 
            height: "100%", 
            background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,170,255,0.1))", 
            borderRadius: "12px",
            overflow: "hidden"
          }}>
            <div style={{ 
              position: "absolute", 
              bottom: "0", 
              left: "0", 
              width: "100%", 
              height: "30%", 
              background: "linear-gradient(to top, #00ff88, transparent)",
              opacity: "0.8"
            }}></div>
          </div>
        </div>
      )}
      
      {activeTab === "volume" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", height: "300px" }}>
          <h3 style={{ color: "#00aaff", textAlign: "center", marginBottom: "15px" }}>Volume Profile Analysis</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", height: "80%", margin: "0 auto", maxWidth: "80%" }}>
            {[1,2,3,4,5,4,3,2,1].map((level, index) => (
              <div 
                key={index} 
                style={{ 
                  background: level >= 3 ? "#00ff88" : level >= 2 ? "#00aaff" : "#64748b",
                  width: "100%",
                  margin: "0 auto",
                  borderRadius: "4px"
                }} 
              />
            ))}
          </div>
        </div>
      )}
      
      {activeTab === "indicators" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", height: "300px" }}>
          <h3 style={{ color: "#00aaff", textAlign: "center", marginBottom: "15px" }}>Technical Indicators</h3>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", minWidth: "120px", textAlign: "center" }}>
              <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "700" }}>RSI</div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>58.3</div>
            </div>
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", minWidth: "120px", textAlign: "center" }}>
              <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "700" }}>MACD</div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>Bullish</div>
            </div>
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", minWidth: "120px", textAlign: "center" }}>
              <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "700" }}>EMA 20</div>
              <div style={{ color: "#64748b", fontSize: "14px" }}>Above Price</div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "correlation" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", height: "300px" }}>
          <h3 style={{ color: "#00aaff", textAlign: "center", marginBottom: "15px" }}>Asset Correlation Matrix</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", height: "70%", margin: "0 auto", maxWidth: "80%" }}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((_, index) => (
              <div 
                key={index} 
                style={{ 
                  background: index % 4 === 0 ? "#00ff88" : index % 4 === 1 ? "#00aaff" : index % 4 === 2 ? "#ff8800" : "#64748b",
                  borderRadius: "4px"
                }} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}