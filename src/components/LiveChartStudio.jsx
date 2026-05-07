import { useState, useEffect, useRef } from "react";

const CHART_TEMPLATES = [
  { id: "candlestick", name: "Candlestick", desc: "OHLC price chart" },
  { id: "line", name: "Line", desc: "Simple line chart" },
  { id: "area", name: "Area", desc: "Filled area chart" },
  { id: "heikin", name: "Heikin-Ashi", desc: "Smooth candlesticks" },
  { id: "renko", name: "Renko", desc: "Price bricks" },
  { id: "volume", name: "Volume Profile", desc: "Volume by price" }
];

const INDICATORS = [
  { id: "sma20", name: "SMA 20", color: "#00ff88" },
  { id: "sma50", name: "SMA 50", color: "#00aaff" },
  { id: "sma200", name: "SMA 200", color: "#d4a012" },
  { id: "ema12", name: "EMA 12", color: "#ff6b6b" },
  { id: "ema26", name: "EMA 26", color: "#a855f7" },
  { id: "bb", name: "Bollinger Bands", color: "#6366f1" },
  { id: "rsi", name: "RSI 14", color: "#14b8a6" },
  { id: "macd", name: "MACD", color: "#f59e0b" },
  { id: "atr", name: "ATR", color: "#ec4899" }
];

const DRAW_TOOLS = [
  { id: "trendline", icon: "╱", name: "Trend Line" },
  { id: "fib", icon: "〰", name: "Fibonacci" },
  { id: "hlines", icon: "━", name: "Horizontal Line" },
  { id: "rect", icon: "▢", name: "Rectangle" },
  { id: "channel", icon: "║", name: "Channel" },
  { id: "text", icon: "T", name: "Text" },
  { id: "arrow", icon: "→", name: "Arrow" },
  { id: "cross", icon: "+", name: "Crosshair" }
];

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"];

export default function LiveChartStudio() {
  const [symbol, setSymbol] = useState("BTC/USD");
  const [timeframe, setTimeframe] = useState("1h");
  const [chartType, setChartType] = useState("candlestick");
  const [priceData, setPriceData] = useState([]);
  const [selectedIndicators, setSelectedIndicators] = useState(["sma20", "sma50"]);
  const [drawTool, setDrawTool] = useState(null);
  const [crosshair, setCrosshair] = useState({ x: 0, y: 0, visible: false });
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);
  const [stats, setStats] = useState({
    price: 42850.50,
    change: 2.34,
    high: 43200,
    low: 42100,
    volume: 2850000000,
    marketcap: 845000000000
  });

  useEffect(() => {
    const data = [];
    let price = 42000;
    for (let i = 0; i < 100; i++) {
      const open = price;
      const close = price + (Math.random() - 0.48) * 500;
      const high = Math.max(open, close) + Math.random() * 200;
      const low = Math.min(open, close) - Math.random() * 200;
      data.push({ time: i, open, high, low, close, volume: Math.random() * 10000 });
      price = close;
    }
    setPriceData(data);
    
    const interval = setInterval(() => {
      setPriceData(prev => {
        const last = prev[prev.length - 1];
        const newClose = last.close + (Math.random() - 0.48) * 100;
        const newCandle = { ...last, close: newClose, high: Math.max(last.high, newClose), low: Math.min(last.low, newClose) };
        return [...prev.slice(1), newCandle];
      });
      setStats(prev => ({ ...prev, price: prev.price + (Math.random() - 0.48) * 50, change: prev.change + (Math.random() - 0.5) * 0.1 }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || priceData.length === 0) return;
    
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const padding = 50;
    
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);
    
    const prices = priceData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (h - 2 * padding) * i / 5;
      ctx.strokeStyle = "#1a1a2e";
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(w - 10, y);
      ctx.stroke();
      
      const price = maxPrice - (priceRange * i / 5);
      ctx.fillStyle = "#64748b";
      ctx.font = "10px JetBrains Mono";
      ctx.fillText(price.toFixed(0), 5, y + 3);
    }
    
    const candleWidth = (w - padding - 20) / priceData.length;
    
    priceData.forEach((candle, i) => {
      const x = padding + i * candleWidth;
      const isGreen = candle.close >= candle.open;
      const color = isGreen ? "#00ff88" : "#ef4444";
      
      if (chartType === "candlestick" || chartType === "heikin") {
        const bodyTop = padding + (h - 2 * padding) * (maxPrice - Math.max(candle.open, candle.close)) / priceRange;
        const bodyBottom = padding + (h - 2 * padding) * (maxPrice - Math.min(candle.open, candle.close)) / priceRange;
        const bodyHeight = Math.max(1, bodyBottom - bodyTop);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, padding + (h - 2 * padding) * (maxPrice - candle.high) / priceRange);
        ctx.lineTo(x + candleWidth / 2, padding + (h - 2 * padding) * (maxPrice - candle.low) / priceRange);
        ctx.stroke();
        
        ctx.fillStyle = color;
        ctx.fillRect(x + 2, bodyTop, candleWidth - 4, bodyHeight);
      } else if (chartType === "line" || chartType === "area") {
        const y = padding + (h - 2 * padding) * (maxPrice - candle.close) / priceRange;
        
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        if (i === priceData.length - 1) {
          ctx.strokeStyle = "#00aaff";
          ctx.lineWidth = 2;
          ctx.stroke();
          
          if (chartType === "area") {
            ctx.lineTo(x, h - padding);
            ctx.lineTo(padding, h - padding);
            ctx.closePath();
            const gradient = ctx.createLinearGradient(0, padding, 0, h - padding);
            gradient.addColorStop(0, "rgba(0, 170, 255, 0.3)");
            gradient.addColorStop(1, "rgba(0, 170, 255, 0)");
            ctx.fillStyle = gradient;
            ctx.fill();
          }
          
          ctx.fillStyle = "#00aaff";
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    
    selectedIndicators.forEach(ind => {
      const indicator = INDICATORS.find(i => i.id === ind);
      if (!indicator) return;
      
      ctx.strokeStyle = indicator.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      priceData.forEach((candle, i) => {
        const x = padding + i * candleWidth + candleWidth / 2;
        let value;
        
        if (ind.id === "sma20") {
          if (i < 19) return;
          value = priceData.slice(i - 19, i + 1).reduce((sum, c) => sum + c.close, 0) / 20;
        } else if (ind.id === "sma50") {
          if (i < 49) return;
          value = priceData.slice(i - 49, i + 1).reduce((sum, c) => sum + c.close, 0) / 50;
        } else {
          return;
        }
        
        const y = padding + (h - 2 * padding) * (maxPrice - value) / priceRange;
        if (i === (ind.id === "sma20" ? 19 : 49)) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    });
    
    if (crosshair.visible) {
      ctx.strokeStyle = "#00aaff";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(crosshair.x, padding);
      ctx.lineTo(crosshair.x, h - padding);
      ctx.moveTo(padding, crosshair.y);
      ctx.lineTo(w - 10, crosshair.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [priceData, chartType, selectedIndicators, crosshair, scale]);

  const toggleIndicator = (id) => {
    setSelectedIndicators(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ background: "#050510", borderRadius: "16px", border: "1px solid #00aaff", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            style={{ background: "transparent", border: "1px solid #00aaff", padding: "10px 15px", borderRadius: "8px", color: "#00ff88", fontSize: "18px", fontWeight: "700", width: "150px" }}
          />
          <div>
            <div style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>${stats.price.toLocaleString()}</div>
            <div style={{ color: stats.change >= 0 ? "#00ff88" : "#ef4444", fontSize: "14px" }}>
              {stats.change >= 0 ? "+" : ""}{stats.change.toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "10px" }}>
          {TIMEFRAMES.map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? "#00ff88" : "transparent",
                color: timeframe === tf ? "#050510" : "#64748b",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "600"
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {CHART_TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setChartType(t.id)}
              style={{
                background: chartType === t.id ? "rgba(0, 255, 136, 0.2)" : "transparent",
                color: chartType === t.id ? "#00ff88" : "#64748b",
                border: "1px solid " + (chartType === t.id ? "#00ff88" : "transparent"),
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "11px"
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
        
        <div style={{ display: "flex", gap: "5px", marginLeft: "auto" }}>
          {DRAW_TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => setDrawTool(drawTool === tool.id ? null : tool.id)}
              style={{
                background: drawTool === tool.id ? "#00aaff" : "transparent",
                color: drawTool === tool.id ? "#050510" : "#64748b",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px"
              }}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={900}
        height={400}
        style={{ width: "100%", height: "400px", borderRadius: "8px", cursor: drawTool ? "crosshair" : "default" }}
        onMouseMove={(e) => {
          const rect = e.target.getBoundingClientRect();
          setCrosshair({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
        }}
        onMouseLeave={() => setCrosshair(prev => ({ ...prev, visible: false }))}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {INDICATORS.map(ind => (
            <button
              key={ind.id}
              onClick={() => toggleIndicator(ind.id)}
              style={{
                background: selectedIndicators.includes(ind.id) ? ind.color + "33" : "transparent",
                color: selectedIndicators.includes(ind.id) ? ind.color : "#64748b",
                border: "1px solid " + (selectedIndicators.includes(ind.id) ? ind.color : "transparent"),
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "10px"
              }}
            >
              {ind.name}
            </button>
          ))}
        </div>
        
        <div style={{ display: "flex", gap: "15px", color: "#64748b", fontSize: "11px" }}>
          <span>H: <span style={{ color: "#00ff88" }}>${stats.high.toLocaleString()}</span></span>
          <span>L: <span style={{ color: "#ef4444" }}>${stats.low.toLocaleString()}</span></span>
          <span>Vol: <span style={{ color: "#00aaff" }}>${(stats.volume/1e9).toFixed(2)}B</span></span>
          <span>MCap: <span style={{ color: "#d4a012" }}>${(stats.marketcap/1e12).toFixed(2)}T</span></span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <div style={{ flex: 1, background: "#0a0a15", borderRadius: "8px", padding: "15px" }}>
          <div style={{ color: "#64748b", fontSize: "10px", marginBottom: "5px" }}>24H HIGH</div>
          <div style={{ color: "#00ff88", fontSize: "16px", fontWeight: "600" }}>${stats.high.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: "#0a0a15", borderRadius: "8px", padding: "15px" }}>
          <div style={{ color: "#64748b", fontSize: "10px", marginBottom: "5px" }}>24H LOW</div>
          <div style={{ color: "#ef4444", fontSize: "16px", fontWeight: "600" }}>${stats.low.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: "#0a0a15", borderRadius: "8px", padding: "15px" }}>
          <div style={{ color: "#64748b", fontSize: "10px", marginBottom: "5px" }}>VOLUME</div>
          <div style={{ color: "#00aaff", fontSize: "16px", fontWeight: "600" }}>${(stats.volume/1e9).toFixed(2)}B</div>
        </div>
        <div style={{ flex: 1, background: "#0a0a15", borderRadius: "8px", padding: "15px" }}>
          <div style={{ color: "#64748b", fontSize: "10px", marginBottom: "5px" }}>MARKET CAP</div>
          <div style={{ color: "#d4a012", fontSize: "16px", fontWeight: "600" }}>${(stats.marketcap/1e12).toFixed(2)}T</div>
        </div>
      </div>
    </div>
  );
}