import { useState, useEffect } from "react";

export default function LiveMarketFeed() {
  const [markets, setMarkets] = useState([
    { symbol: "EUR/USD", name: "Euro/US Dollar", bid: 1.0842, ask: 1.0843, change: "+0.12%", high: 1.0865, low: 1.0821, volume: "8.2B", sentiment: "bullish", trend: "up" },
    { symbol: "GBP/USD", name: "British Pound/US Dollar", bid: 1.2634, ask: 1.2636, change: "-0.08%", high: 1.2680, low: 1.2610, volume: "4.1B", sentiment: "neutral", trend: "down" },
    { symbol: "XAU/USD", name: "Gold/US Dollar", bid: 2045.30, ask: 2045.80, change: "+0.45%", high: 2052.10, low: 2035.00, volume: "12.8B", sentiment: "bullish", trend: "up" },
    { symbol: "BTC/USD", name: "Bitcoin/US Dollar", bid: 67420, ask: 67450, change: "+2.34%", high: 68200, low: 65800, volume: "28.4B", sentiment: "bullish", trend: "up" },
    { symbol: "ETH/USD", name: "Ethereum/US Dollar", bid: 3456.20, ask: 3458.50, change: "+1.87%", high: 3510.00, low: 3380.00, volume: "15.2B", sentiment: "bullish", trend: "up" },
    { symbol: "NQ100", name: "Nasdaq 100", bid: 18245, ask: 18248, change: "+0.56%", high: 18320, low: 18100, volume: "2.1B", sentiment: "bullish", trend: "up" },
    { symbol: "ES100", name: "S&P 500", bid: 5245, ask: 5247, change: "+0.34%", high: 5265, low: 5210, volume: "4.8B", sentiment: "bullish", trend: "up" },
    { symbol: "USD/JPY", name: "US Dollar/Yen", bid: 154.85, ask: 154.87, change: "-0.22%", high: 155.20, low: 154.60, volume: "3.2B", sentiment: "bearish", trend: "down" },
    { symbol: "AUD/USD", name: "Australian Dollar/US", bid: 0.6512, ask: 0.6515, change: "+0.05%", high: 0.6540, low: 0.6480, volume: "1.8B", sentiment: "neutral", trend: "flat" },
    { symbol: "XTI/USD", name: "Crude Oil", bid: 78.45, ask: 78.50, change: "-1.12%", high: 79.80, low: 77.20, volume: "6.5B", sentiment: "bearish", trend: "down" }
  ]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [time, setTime] = useState(new Date());
  const [alerts, setAlerts] = useState([
    { id: 1, symbol: "EUR/USD", type: "above", price: 1.0900, status: "active" },
    { id: 2, symbol: "BTC/USD", type: "below", price: 65000, status: "active" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMarkets(prev => prev.map(m => ({
        ...m,
        bid: m.bid * (1 + (Math.random() - 0.5) * 0.0001),
        ask: m.ask * (1 + (Math.random() - 0.5) * 0.0001),
        change: (parseFloat(m.change) + (Math.random() - 0.5) * 0.1).toFixed(2) + "%"
      })));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "→";
  };

  const getTrendColor = (trend) => {
    if (trend === "up") return "#00ff88";
    if (trend === "down") return "#ff4444";
    return "#64748b";
  };

  const formatPrice = (price, isCrypto) => {
    if (isCrypto && price > 1000) {
      return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return price.toFixed(price > 100 ? 2 : 4);
  };

  const isCrypto = (symbol) => symbol === "BTC/USD" || symbol === "ETH/USD";

  return (
    <div style={{ background: "linear-gradient(180deg, #0f172a 0%, #030712 100%)", padding: "30px", borderRadius: "16px", border: "1px solid #1e293b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <div>
          <h2 style={{ background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "28px", fontWeight: "700", marginBottom: "5px" }}>
            Live Markets
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Real-time market data</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#00ff88" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88", animation: "pulse 1s infinite" }}></div>
            <span style={{ fontSize: "12px", fontWeight: "600" }}>LIVE</span>
          </div>
          <div style={{ color: "#64748b", fontSize: "13px", fontFamily: "monospace" }}>
            {time.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "15px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "5px" }}>BTC/USD</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700", fontFamily: "monospace" }}>
            {formatPrice(markets.find(m => m.symbol === "BTC/USD")?.bid || 0, true)}
          </div>
          <div style={{ color: "#00ff88", fontSize: "13px", fontWeight: "600" }}>
            {markets.find(m => m.symbol === "BTC/USD")?.change}
          </div>
        </div>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "15px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "5px" }}>EUR/USD</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700", fontFamily: "monospace" }}>
            {formatPrice(markets.find(m => m.symbol === "EUR/USD")?.bid || 0, false)}
          </div>
          <div style={{ color:markets.find(m => m.symbol === "EUR/USD")?.trend === "up" ? "#00ff88" : "#ff4444", fontSize: "13px", fontWeight: "600" }}>
            {markets.find(m => m.symbol === "EUR/USD")?.change}
          </div>
        </div>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "15px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "5px" }}>XAU/USD</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700", fontFamily: "monospace" }}>
            {formatPrice(markets.find(m => m.symbol === "XAU/USD")?.bid || 0, true)}
          </div>
          <div style={{ color: "#00ff88", fontSize: "13px", fontWeight: "600" }}>
            {markets.find(m => m.symbol === "XAU/USD")?.change}
          </div>
        </div>
        <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "15px", borderRadius: "12px", border: "1px solid #1e293b", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "5px" }}>NQ100</div>
          <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700", fontFamily: "monospace" }}>
            {formatPrice(markets.find(m => m.symbol === "NQ100")?.bid || 0, true)}
          </div>
          <div style={{ color: "#00ff88", fontSize: "13px", fontWeight: "600" }}>
            {markets.find(m => m.symbol === "NQ100")?.change}
          </div>
        </div>
      </div>

      <div style={{ background: "rgba(15, 23, 42, 0.4)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(30, 41, 59, 0.5)", borderBottom: "1px solid #1e293b" }}>
              <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Symbol</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Bid</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Ask</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Change</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>High</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Low</th>
              <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Volume</th>
              <th style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "11px", fontWeight: "500", textTransform: "uppercase" }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market, idx) => (
              <tr 
                key={market.symbol} 
                style={{ 
                  borderBottom: "1px solid #1e293b", 
                  cursor: "pointer",
                  transition: "background 0.2s",
                  background: selectedMarket?.symbol === market.symbol ? "rgba(0, 255, 136, 0.1)" : "transparent"
                }}
                onClick={() => setSelectedMarket(market)}
              >
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{market.symbol}</span>
                    <span style={{ color: "#64748b", fontSize: "10px" }}>{market.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontFamily: "monospace", color: "#fff", fontSize: "13px" }}>
                  {formatPrice(market.bid, isCrypto(market.symbol))}
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontFamily: "monospace", color: "#00ff88", fontSize: "13px" }}>
                  {formatPrice(market.ask, isCrypto(market.symbol))}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  <span style={{ 
                    color: market.change.startsWith("+") ? "#00ff88" : "#ff4444", 
                    fontWeight: "600",
                    fontSize: "12px"
                  }}>
                    {market.change}
                  </span>
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontFamily: "monospace", color: "#64748b", fontSize: "12px" }}>
                  {formatPrice(market.high, isCrypto(market.symbol))}
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontFamily: "monospace", color: "#64748b", fontSize: "12px" }}>
                  {formatPrice(market.low, isCrypto(market.symbol))}
                </td>
                <td style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>
                  {market.volume}
                </td>
                <td style={{ padding: "12px", textAlign: "center", fontSize: "16px", color: getTrendColor(market.trend) }}>
                  {getTrendIcon(market.trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {alerts.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ color: "#64748b", marginBottom: "10px", fontSize: "12px", textTransform: "uppercase" }}>Price Alerts</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{ background: "rgba(255, 136, 0, 0.15)", padding: "8px 12px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#fff", fontSize: "12px" }}>{alert.symbol}</span>
                <span style={{ color: "#64748b", fontSize: "11px" }}>{alert.type}</span>
                <span style={{ color: "#ff8800", fontFamily: "monospace", fontSize: "12px" }}>
                  {isCrypto(alert.symbol) ? alert.price.toLocaleString() : alert.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}