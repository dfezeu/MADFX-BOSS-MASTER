import { useState } from "react";

export default function TokenInfo() {
  const [tokenData, setTokenData] = useState({
    price: 0.85,
    change24h: 12.5,
    marketCap: 8500000,
    volume24h: 1250000,
    circulatingSupply: 10000000,
    maxSupply: 100000000
  });

  const [chartTimeframe, setChartTimeframe] = useState("7D");

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>TOKEN INFORMATION</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => setChartTimeframe("24H")}
            style={{
              background: chartTimeframe === "24H" ? "#00ff88" : "transparent",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              color: chartTimeframe === "24H" ? "#000" : "#fff",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "12px"
            }}
          >
            24H
          </button>
          <button 
            onClick={() => setChartTimeframe("7D")}
            style={{
              background: chartTimeframe === "7D" ? "#00ff88" : "transparent",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              color: chartTimeframe === "7D" ? "#000" : "#fff",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "12px"
            }}
          >
            7D
          </button>
          <button 
            onClick={() => setChartTimeframe("30D")}
            style={{
              background: chartTimeframe === "30D" ? "#00ff88" : "transparent",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              color: chartTimeframe === "30D" ? "#000" : "#fff",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "12px"
            }}
          >
            30D
          </button>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "25px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "5px" }}>Current Price</div>
          <div style={{ 
            fontSize: "32px", 
            fontWeight: "700", 
            color: tokenData.change24h >= 0 ? "#00ff88" : "#ff4444",
            marginBottom: "5px"
          }}>
            ${tokenData.price.toFixed(2)}
          </div>
          <div style={{ 
            color: tokenData.change24h >= 0 ? "#00ff88" : "#ff4444",
            fontSize: "14px"
          }}>
            {tokenData.change24h >= 0 ? "+" : ""}{tokenData.change24h}% (24h)
          </div>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "5px" }}>Market Cap</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "#00ff88" }}>
            ${(tokenData.marketCap / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "5px" }}>24h Volume</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "#00aaff" }}>
            ${(tokenData.volume24h / 1000000).toFixed(1)}M
          </div>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "5px" }}>Circ. Supply</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "#d4a012" }}>
            ${(tokenData.circulatingSupply / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", height: "200px", marginBottom: "25px", position: "relative" }}>
        <div style={{ position: "absolute", top: "10px", left: "10px", color: "#64748b", fontSize: "12px" }}>
          NXUS/USD Chart
        </div>
        <div style={{ position: "absolute", bottom: "10px", left: "10px", color: "#64748b", fontSize: "12px" }}>
          Price (USD)
        </div>
        <div style={{ position: "absolute", bottom: "10px", right: "10px", color: "#64748b", fontSize: "12px" }}>
          Time
        </div>
        {/* Simple chart representation - in a real app this would use a charting library */}
        <div style={{ 
          width: "100%", 
          height: "100%", 
          background: "linear-gradient(to right, #0d1525, #1e3a5f)", 
          borderRadius: "12px",
          overflow: "hidden"
        }}>
          <div style={{ 
            position: "absolute", 
            bottom: "0", 
            left: "0", 
            width: "100%", 
            height: "40%", 
            background: "linear-gradient(to top, #00ff88, transparent)",
            opacity: "0.7"
          }}></div>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Token Symbol</div>
          <div style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}>NXUS</div>
        </div>
        
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Contract Address</div>
          <div style={{ color: "#888", fontSize: "12px", wordBreak: "break-all" }}>0x742d35Cc6634C0532925a3b8D4C0532950532950...</div>
        </div>
        
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Blockchain</div>
          <div style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>Solana</div>
        </div>
        
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px" }}>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Total Supply</div>
          <div style={{ color: "#fff", fontSize: "16px", fontWeight: "700" }}>
            ${(tokenData.maxSupply / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
}