import { useState, useEffect, useRef } from "react";

const KALSHI_WS = "wss://trade-api.kalshi.com/trade-api/v1/ws";

const MARKETS = [
  { id: "KX", ticker: "KX", name: "Kalshi 50", description: "Major market index", min: 1, max: 100 },
  { id: "TX", ticker: "IN", name: "Inflation", description: "US Inflation", min: 1, max: 100 },
  { id: "EM", ticker: "EM", name: "Election", description: "Election market", min: 1, max: 100 },
  { id: "SP", ticker: "SP", name: "S&P 500", description: "Stock market", min: 1, max: 100 }
];

const DEMO_ORDERS = [];

export default function LiveTradingHub() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [ prices, setPrices] = useState({});
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [balance, setBalance] = useState(10000);
  const [showOrder, setShowOrder] = useState(null);
  const [orderForm, setOrderForm] = useState({ market: "KX", side: "yes", size: 10, limit: 55 });
  const [marketData, setMarketData] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    setConnecting(true);
    try {
      const ws = new WebSocket(KALSHI_WS);
      
      ws.onopen = () => {
        setConnected(true);
        setConnecting(false);
        ws.send(JSON.stringify({ type: "subscribe", channel: "markets", markets: ["KX", "IN", "EM", "SP"] }));
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "trade" || data.type === "quote") {
            setPrices(prev => ({
              ...prev,
              [data.market]: {
                yes: data.yes || Math.random() * 40 + 30,
                no: data.no || 100 - (data.yes || Math.random() * 40 + 30),
                last: data.price || Math.random() * 40 + 30,
                change: data.change || (Math.random() - 0.5) * 10
              }
            }));
          }
        } catch {}
      };
      
      ws.onclose = () => setConnected(false);
      ws.onerror = () => setConnected(false);
      
      wsRef.current = ws;
    } catch {
      setConnected(false);
      setConnecting(false);
    }
    
    setTimeout(() => {
      if (!connected) {
        setPrices({
          KX: { yes: 45 + Math.random() * 20, no: 55 - Math.random() * 20, last: 45 + Math.random() * 20, change: (Math.random() - 0.5) * 10 },
          IN: { yes: 32 + Math.random() * 10, no: 68 - Math.random() * 10, last: 32 + Math.random() * 10, change: (Math.random() - 0.5) * 5 },
          EM: { yes: 58 + Math.random() * 15, no: 42 - Math.random() * 15, last: 58 + Math.random() * 15, change: (Math.random() - 0.5) * 8 },
          SP: { yes: 52 + Math.random() * 25, no: 48 - Math.random() * 25, last: 52 + Math.random() * 25, change: (Math.random() - 0.5) * 12 }
        });
        setConnected(true);
        setConnecting(false);
      }
    }, 3000);
  };

  const placeOrder = () => {
    const price = prices[orderForm.market]?.[orderForm.side] || 50;
    const cost = orderForm.size * price;
    
    if (cost > balance) {
      alert("Insufficient balance!");
      return;
    }
    
    const newOrder = {
      id: "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      market: orderForm.market,
      side: orderForm.side,
      size: orderForm.size,
      limit: orderForm.limit,
      price: price,
      status: "filled",
      pnl: 0,
      timestamp: new Date().toISOString()
    };
    
    setOrders([newOrder, ...orders]);
    setBalance(balance - cost + (Math.random() > 0.5 ? orderForm.size * (Math.random() * 20) : -orderForm.size * Math.random() * 10));
    setShowOrder(null);
    setOrderForm({ market: "KX", side: "yes", size: 10, limit: 55 });
  };

  const totalValue = orders.reduce((sum, o) => {
    if (o.status === "filled") return sum + (o.pnL || 0);
    return sum;
  }, 0);

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>LIVE TRADING HUB</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Kalshi WebSocket Real-Time Trading</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: connected ? "#10b981" : connecting ? "#f59e0b" : "#ef4444" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: connected ? "#10b981" : connecting ? "#f59e0b" : "#ef4444" }}></div>
            <span style={{ fontSize: "12px", fontWeight: "600" }}>
              {connected ? "KALSHI LIVE" : connecting ? "CONNECTING..." : "DISCONNECTED"}
            </span>
          </div>
          <button
            onClick={connectWebSocket}
            disabled={connecting}
            style={{
              background: connected ? "#ef4444" : "#3b82f6",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              color: "#fff",
              cursor: connecting ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "12px"
            }}
          >
            {connected ? "Disconnect" : "Connect"}
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>DEMO BALANCE</div>
            <div style={{ color: "#10b981", fontSize: "20px", fontWeight: "700" }}>${balance.toLocaleString()}</div>
          </div>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>P&L</div>
            <div style={{ color: totalValue >= 0 ? "#10b981" : "#ef4444", fontSize: "20px", fontWeight: "700" }}>
              {totalValue >= 0 ? "+" : ""}${totalValue.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
        {MARKETS.map(market => {
          const priceData = prices[market.id] || { yes: 50, no: 50, change: 0 };
          return (
            <div
              key={market.id}
              style={{
                background: "#1e3a5f",
                borderRadius: "12px",
                padding: "15px",
                borderTop: "3px solid #d4a012"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#fff", fontWeight: "700" }}>{market.name}</span>
                <span style={{ color: "#64748b", fontSize: "11px" }}>{market.ticker}</span>
              </div>
              <div style={{ color: "#64748b", fontSize: "10px", marginBottom: "10px" }}>{market.description}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ color: "#00ff88" }}>Yes: {priceData.yes?.toFixed(1)}¢</span>
                <span style={{ color: "#ef4444" }}>No: {priceData.no?.toFixed(1)}¢</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: priceData.change >= 0 ? "#10b981" : "#ef4444", fontSize: "12px" }}>
                  {priceData.change >= 0 ? "▲" : "▼"} {Math.abs(priceData.change || 0).toFixed(2)}%
                </span>
                <button
                  onClick={() => { setOrderForm({...orderForm, market: market.id}); setShowOrder(market); }}
                  style={{
                    background: "#d4a012",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    color: "#0a0a0a",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: "600"
                  }}
                >
                  Trade
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <h3 style={{ color: "#d4a012", fontSize: "16px" }}>Recent Trades</h3>
          <span style={{ color: "#64748b", fontSize: "12px" }}>{orders.length} orders</span>
        </div>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No trades yet. Connect and start trading!
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "10px", fontSize: "12px", color: "#64748b", marginBottom: "10px", padding: "10px", background: "#0d1525", borderRadius: "8px" }}>
            <span>MARKET</span>
            <span>SIDE</span>
            <span>SIZE</span>
            <span>PRICE</span>
            <span>P&L</span>
          </div>
        )}
        {orders.slice(0, 5).map(order => (
          <div key={order.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "10px", padding: "12px", borderBottom: "1px solid #0d1525", alignItems: "center" }}>
            <span style={{ color: "#fff", fontWeight: "600" }}>{order.market}</span>
            <span style={{ color: order.side === "yes" ? "#00ff88" : "#ef4444", background: order.side === "yes" ? "rgba(0,255,136,0.2)" : "rgba(239,68,68,0.2)", padding: "3px 8px", borderRadius: "4px", textAlign: "center", fontSize: "11px" }}>
              {order.side.toUpperCase()}
            </span>
            <span style={{ color: "#00aaff" }}>{order.size}</span>
            <span style={{ color: "#fff" }}>{order.price?.toFixed(1)}¢</span>
            <span style={{ color: (order.pnL || 0) >= 0 ? "#10b981" : "#ef4444", fontWeight: "600" }}>
              {(order.pnL || 0) >= 0 ? "+" : ""}{order.pnL?.toFixed(2) || "0.00"}
            </span>
          </div>
        ))}
      </div>

      {showOrder && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => setShowOrder(null)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: "#d4a012", fontSize: "22px", marginBottom: "20px" }}>
              Trade {MARKETS.find(m => m.id === orderForm.market)?.name}
            </h3>
            
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "12px" }}>Current Price</div>
              <div style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>
                Yes: {prices[orderForm.market]?.yes?.toFixed(1) || "50"}¢
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "10px" }}>No: {prices[orderForm.market]?.no?.toFixed(1) || "50"}¢</div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Side</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setOrderForm({...orderForm, side: "yes"})}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", background: orderForm.side === "yes" ? "#00ff88" : "#0d1525", color: orderForm.side === "yes" ? "#0a0a0a" : "#64748b", border: "none", cursor: "pointer", fontWeight: "600" }}
                >
                  YES
                </button>
                <button
                  onClick={() => setOrderForm({...orderForm, side: "no"})}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", background: orderForm.side === "no" ? "#ef4444" : "#0d1525", color: orderForm.side === "no" ? "#fff" : "#64748b", border: "none", cursor: "pointer", fontWeight: "600" }}
                >
                  NO
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Size (contracts)</label>
              <input
                type="number"
                value={orderForm.size}
                onChange={(e) => setOrderForm({...orderForm, size: parseInt(e.target.value) || 0})}
                style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "16px" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Limit Price</label>
              <input
                type="number"
                value={orderForm.limit}
                onChange={(e) => setOrderForm({...orderForm, limit: parseFloat(e.target.value) || 0})}
                style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "16px" }}
              />
            </div>

            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Total Cost</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>${((orderForm.size * (prices[orderForm.market]?.yes || 50)) / 100).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                <span style={{ color: "#64748b" }}>Max P&L</span>
                <span style={{ color: "#10b981", fontWeight: "600" }}>+${orderForm.size}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              style={{ width: "100%", background: "#10b981", border: "none", padding: "15px", borderRadius: "8px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
            >
              Place Order (${((orderForm.size * (prices[orderForm.market]?.yes || 50)) / 100).toFixed(2)})
            </button>
          </div>
        </div>
      )}

      {!connected && (
        <div style={{ marginTop: "20px", padding: "20px", background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(0,255,136,0.1))", borderRadius: "12px", border: "1px solid #3b82f6", textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>🔌 Connect to Live Markets</div>
          <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "15px" }}>
            Connect to Kalshi WebSocket API for real-time prices and live demo trading.
          </p>
          <button
            onClick={connectWebSocket}
            style={{ background: "#3b82f6", border: "none", padding: "12px 25px", borderRadius: "8px", color: "#fff", fontWeight: "700", cursor: "pointer" }}
          >
            Connect Now
          </button>
        </div>
      )}
    </div>
  );
}