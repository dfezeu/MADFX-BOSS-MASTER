import { useState, useEffect } from "react";

const FOREX_PAIRS = [
  { id: "EUR/USD", name: "Euro/Dollar", price: 1.0842, change: 0.12, pip: 0.0001, spread: 0.8, vol: "85%" },
  { id: "GBP/USD", name: "Pound/Dollar", price: 1.2645, change: -0.08, pip: 0.0001, spread: 1.2, vol: "72%" },
  { id: "USD/JPY", name: "Dollar/Yen", price: 156.85, change: 0.25, pip: 0.01, spread: 0.5, vol: "90%" },
  { id: "USD/CHF", name: "Dollar/Swiss", price: 0.8825, change: -0.15, pip: 0.0001, spread: 1.0, vol: "45%" },
  { id: "AUD/USD", name: "Aussie/Dollar", price: 0.6512, change: 0.32, pip: 0.0001, spread: 1.1, vol: "55%" },
  { id: "USD/CAD", name: "Dollar/Loonie", price: 1.3585, change: 0.05, pip: 0.0001, spread: 0.9, vol: "50%" }
];

const COMMODITIES = [
  { id: "XAU/USD", name: "Gold", price: 2342.50, change: 1.25, pip: 0.1, spread: 3.0, vol: "95%", unit: "/oz" },
  { id: "XTI/USD", name: "Crude Oil", price: 78.45, change: -0.85, pip: 0.01, spread: 4.0, vol: "88%", unit: "/bbl" },
  { id: "XBR/USD", name: "Brent", price: 82.15, change: -0.65, pip: 0.01, spread: 5.0, vol: "82%", unit: "/bbl" },
  { id: "XAG/USD", name: "Silver", price: 27.85, change: 2.15, pip: 0.001, spread: 25.0, vol: "75%", unit: "/oz" },
  { id: "NG", name: "Natural Gas", price: 2.85, change: -1.25, pip: 0.001, spread: 3.0, vol: "65%", unit: "/MMBtu" }
];

const INDICES = [
  { id: "US500", name: "S&P 500", price: 5185.50, change: 0.45, pip: 0.25, spread: 3.0, vol: "92%" },
  { id: "US100", name: "Nasdaq 100", price: 18245.20, change: 0.85, pip: 0.5, spread: 5.0, vol: "88%" },
  { id: "US30", name: "Dow 30", price: 39250.00, change: 0.22, pip: 1.0, spread: 8.0, vol: "78%" },
  { id: "UK100", name: "FTSE 100", price: 8450.50, change: -0.15, pip: 0.5, spread: 4.0, vol: "70%" },
  { id: "DE40", name: "DAX", price: 18520.00, change: 0.65, pip: 0.5, spread: 4.0, vol: "75%" },
  { id: "JP225", name: "Nikkei 225", price: 42850.00, change: 1.25, pip: 5.0, spread: 10.0, vol: "65%" }
];

const FUTURES = [
  { id: "ES", name: "E-mini S&P", price: 5185.50, change: 0.45, pip: 0.25, spread: 2.0, vol: "95%", expiry: "Jun 24" },
  { id: "NQ", name: "E-mini Nasdaq", price: 18245.20, change: 0.85, pip: 0.5, spread: 4.0, vol: "90%", expiry: "Jun 24" },
  { id: "YM", name: "Dow Futures", price: 39250.00, change: 0.22, pip: 5.0, spread: 10.0, vol: "75%", expiry: "Jun 24" },
  { id: "RTY", name: "Russell 2000", price: 2150.25, change: 0.55, pip: 0.1, spread: 3.0, vol: "60%", expiry: "Jun 24" },
  { id: "CL", name: "Crude Oil", price: 78.45, change: -0.85, pip: 0.01, spread: 3.0, vol: "85%", expiry: "Jun 24" },
  { id: "GC", name: "Gold Futures", price: 2342.50, change: 1.25, pip: 0.1, spread: 2.0, vol: "92%", expiry: "Jun 24" }
];

const SCALP_BOTS = [
  { id: 1, name: "PipHunter Pro", pairs: "EUR/USD,GBP/USD", winRate: 78.5, pips: 125, risk: "low", price: 149 },
  { id: 2, name: "Gold Rush", pairs: "XAU/USD", winRate: 72.2, pips: 285, risk: "medium", price: 199 },
  { id: 3, name: "Oil Sniper", pairs: "XTI/USD,CL", winRate: 68.5, pips: 165, risk: "medium", price: 179 },
  { id: 4, name: "Index Scalper", pairs: "US500,NQ,ES", winRate: 75.2, pips: 95, risk: "low", price: 199 },
  { id: 5, name: "Momentum Hunter", pairs: "All", winRate: 65.8, pips: 145, risk: "high", price: 129 },
  { id: 6, name: "Trend scalper", pairs: "EUR/USD,AUD/USD", winRate: 82.1, pips: 185, risk: "low", price: 249 }
];

export default function MultiMarketHub() {
  const [marketType, setMarketType] = useState("commodities");
  const [selectedPair, setSelectedPair] = useState(null);
  const [prices, setPrices] = useState({});
  const [showBot, setShowBot] = useState(null);
  const [orderForm, setOrderForm] = useState({ side: "buy", size: 1, stopLoss: 0, takeProfit: 0 });
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState(50000);

  useEffect(() => {
    const all = [...FOREX_PAIRS, ...COMMODITIES, ...INDICES];
    const initial = {};
    all.forEach(p => {
      initial[p.id] = {
        bid: p.price * (1 - (p.spread / 20000)),
        ask: p.price * (1 + (p.spread / 20000)),
        change: p.change
      };
    });
    setPrices(initial);

    const interval = setInterval(() => {
      setPrices(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const spread = (next[key].ask - next[key].bid) / 2;
          const newPrice = next[key].bid * (1 + (Math.random() - 0.5) * 0.0002);
          next[key] = {
            bid: newPrice - spread,
            ask: newPrice + spread,
            change: (Math.random() - 0.5) * 0.1
          };
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getMarketData = () => {
    switch (marketType) {
      case "forex": return FOREX_PAIRS;
      case "commodities": return COMMODITIES;
      case "indices": return INDICES;
      case "futures": return FUTURES;
      default: return COMMODITIES;
    }
  };

  const placeOrder = () => {
    if (!selectedPair) return;
    const cost = (selectedPair.price * orderForm.size * (orderForm.side === "buy" ? 1.001 : 0.999));
    if (cost > balance) {
      alert("Insufficient balance!");
      return;
    }
    alert(`Order placed: ${orderForm.side} ${orderForm.size} ${selectedPair.id} @ ${selectedPair.price}`);
    setSelectedPair(null);
    setOrderForm({ side: "buy", size: 1, stopLoss: 0, takeProfit: 0 });
  };

  return (
    <div style={{ background: "#050510", borderRadius: "16px", border: "1px solid #00aaff", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>MULTI-MARKET HUB</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Forex • Commodities • Indices • Futures</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setWalletConnected(!walletConnected)}
            style={{
              background: walletConnected ? "#00ff88" : "transparent",
              color: walletConnected ? "#050510" : "#00aaff",
              border: "1px solid #00aaff",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {walletConnected ? "CONNECTED" : "CONNECT WALLET"}
          </button>
          <div style={{ background: "#0a0a15", padding: "10px 20px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>BALANCE</div>
            <div style={{ color: "#00ff88", fontSize: "20px", fontWeight: "700" }}>${balance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {[
          { id: "forex", label: "Forex", icon: "💱" },
          { id: "commodities", label: "Gold/Oil", icon: "🪙" },
          { id: "indices", label: "Indices", icon: "📈" },
          { id: "futures", label: "Futures", icon: "📊" },
          { id: "scalp", label: "Scalp Bots", icon: "🤖" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMarketType(tab.id)}
            style={{
              background: marketType === tab.id ? "rgba(0, 255, 136, 0.15)" : "transparent",
              color: marketType === tab.id ? "#00ff88" : "#64748b",
              border: "1px solid " + (marketType === tab.id ? "#00ff88" : "transparent"),
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              boxShadow: marketType === tab.id ? "0 0 20px rgba(0, 255, 136, 0.3)" : "none"
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {marketType === "scalp" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
          {SCALP_BOTS.map(bot => (
            <div key={bot.id} style={{ background: "#0a0a15", borderRadius: "12px", padding: "20px", borderLeft: "4px solid #00ff88" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "600" }}>{bot.name}</h3>
                <span style={{ background: bot.risk === "low" ? "rgba(0,255,136,0.2)" : bot.risk === "medium" ? "rgba(245,158,11,0.2)" : "rgba(239,68,68,0.2)", color: bot.risk === "low" ? "#00ff88" : bot.risk === "medium" ? "#f59e0b" : "#ef4444", padding: "3px 10px", borderRadius: "4px", fontSize: "10px" }}>
                  {bot.risk.toUpperCase()}
                </span>
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "15px" }}>{bot.pairs}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <div><span style={{ color: "#64748b", fontSize: "10px" }}>Win Rate</span><div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "700" }}>{bot.winRate}%</div></div>
                <div><span style={{ color: "#64748b", fontSize: "10px" }}>Pips/Mo</span><div style={{ color: "#00aaff", fontSize: "18px", fontWeight: "700" }}>+{bot.pips}</div></div>
              </div>
              <button
                onClick={() => setShowBot(bot)}
                style={{ width: "100%", background: "#00ff88", border: "none", padding: "12px", borderRadius: "8px", color: "#050510", fontWeight: "700", cursor: "pointer" }}
              >
                Get Bot - ${bot.price}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: "#0a0a15", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "15px", background: "#0d0d20", color: "#64748b", fontSize: "11px", fontWeight: "600" }}>
            <span>PAIR</span>
            <span>BID</span>
            <span>ASK</span>
            <span>CHANGE</span>
            <span>SPREAD</span>
            <span>VOL</span>
            <span>ACTION</span>
          </div>
          {getMarketData().map(pair => (
            <div key={pair.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "15px", borderBottom: "1px solid #0d0d20", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: "600" }}>{pair.id}<span style={{ color: "#64748b", fontSize: "10px", marginLeft: "8px" }}>{pair.name}</span></span>
              <span style={{ color: "#ef4444" }}>{pair.price.toFixed(pair.pip < 0.01 ? 4 : 2)}</span>
              <span style={{ color: "#00ff88" }}>{(pair.price * 1.0001).toFixed(pair.pip < 0.01 ? 4 : 2)}</span>
              <span style={{ color: pair.change >= 0 ? "#00ff88" : "#ef4444", fontWeight: "600" }}>{pair.change >= 0 ? "+" : ""}{pair.change}%</span>
              <span style={{ color: "#d4a012" }}>{pair.spread}</span>
              <span style={{ color: "#00aaff" }}>{pair.vol}</span>
              <button
                onClick={() => { setSelectedPair(pair); setShowBot(pair); }}
                style={{ background: "#00aaff", border: "none", padding: "8px 12px", borderRadius: "6px", color: "#050510", fontWeight: "600", fontSize: "11px", cursor: "pointer" }}
              >
                TRADE
              </button>
            </div>
          ))}
        </div>
      )}

      {showBot && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => setShowBot(null)}
        >
          <div style={{ background: "#0a0a15", borderRadius: "16px", padding: "30px", maxWidth: "450px", width: "90%", border: "1px solid #00aaff" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: "#00ff88", fontSize: "24px", marginBottom: "10px" }}>{showBot.name}</h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>ID: {showBot.id}</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
              <div style={{ background: "#050510", padding: "15px", borderRadius: "8px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>Entry</div>
                <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>{showBot.price || selectedPair?.price}</div>
              </div>
              <div style={{ background: "#050510", padding: "15px", borderRadius: "8px" }}>
                <div style={{ color: "#64748b", fontSize: "11px" }}>Change</div>
                <div style={{ color: (showBot.change || selectedPair?.change || 0) >= 0 ? "#00ff88" : "#ef4444", fontSize: "24px", fontWeight: "700" }}>
                  {(showBot.change || selectedPair?.change || 0) >= 0 ? "+" : ""}{showBot.change || selectedPair?.change || 0}%
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Direction</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setOrderForm({...orderForm, side: "buy"})}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", background: orderForm.side === "buy" ? "#00ff88" : "#050510", color: orderForm.side === "buy" ? "#050510" : "#64748b", border: "none", cursor: "pointer", fontWeight: "600" }}
                >
                  BUY
                </button>
                <button
                  onClick={() => setOrderForm({...orderForm, side: "sell"})}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", background: orderForm.side === "sell" ? "#ef4444" : "#050510", color: orderForm.side === "sell" ? "#fff" : "#64748b", border: "none", cursor: "pointer", fontWeight: "600" }}
                >
                  SELL
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Size</label>
              <input
                type="number"
                value={orderForm.size}
                onChange={(e) => setOrderForm({...orderForm, size: parseInt(e.target.value) || 1})}
                style={{ width: "100%", padding: "12px", background: "#050510", border: "1px solid #1a1a2e", borderRadius: "8px", color: "#fff", fontSize: "16px" }}
              />
            </div>

            <button
              onClick={placeOrder}
              style={{ width: "100%", background: "#00ff88", border: "none", padding: "15px", borderRadius: "8px", color: "#050510", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 0 30px rgba(0,255,136,0.5)" }}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}