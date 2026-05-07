import { useState, useEffect } from "react";

const FLASH_DEALS = [
  { id: 1, name: "MAXAI Pro Monthly", original: 199, price: 49, commission: 30, limit: 50, sold: 23 },
  { id: 2, name: "Signals Bundle", original: 99, price: 29, commission: 20, limit: 100, sold: 45 },
  { id: 3, name: "Bot Template Pack", original: 149, price: 39, commission: 25, limit: 30, sold: 12 }
];

const RECENT_SALES = [
  { customer: "john@email.com", product: "MAXAI Pro", amount: 49, time: "2 min ago" },
  { customer: "sarah@email.com", product: "Signals", amount: 29, time: "5 min ago" },
  { customer: "mike@email.com", product: "MAXAI Pro", amount: 49, time: "8 min ago" }
];

export default function Make100() {
  const [sales, setSales] = useState(0);
  const [goal, setGoal] = useState(100);
  const [deals, setDeals] = useState(FLASH_DEALS);
  const [showCheckout, setShowCheckout] = useState(null);
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sales < goal) {
        const sale = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 29 : 0;
        if (sale > 0) {
          setSales(prev => {
            const newSales = Math.min(prev + sale, goal);
            return newSales;
          });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [sales, goal]);

  const quickSell = (deal) => {
    setShowCheckout(deal);
  };

  const processPayment = () => {
    if (!email) {
      alert("Enter email!");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSales(prev => Math.min(prev + showCheckout.price, goal));
      setDeals(deals.map(d => d.id === showCheckout.id ? {...d, sold: d.sold + 1} : d));
      setShowCheckout(null);
      setEmail("");
      alert(`💰 SOLD! +$${showCheckout.price}`);
    }, 1500);
  };

  const progress = (sales / goal) * 100;

  return (
    <div style={{ background: "#050510", borderRadius: "16px", border: "1px solid #00ff88", padding: "25px", boxShadow: "0 0 40px rgba(0, 255, 136, 0.3)" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ color: "#00ff88", fontSize: "32px", fontWeight: "700", textShadow: "0 0 30px #00ff88", animation: "pulse 1s infinite" }}>
          🎯 MAKE $100 TODAY
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Quick sales campaign</p>
      </div>

      <div style={{ background: "linear-gradient(90deg, rgba(0, 255, 136, 0.2), rgba(0, 170, 255, 0.2))", borderRadius: "12px", padding: "20px", marginBottom: "25px", border: "1px solid #00aaff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#fff", fontSize: "18px", fontWeight: "600" }}>Progress</span>
          <span style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>${sales} / ${goal}</span>
        </div>
        <div style={{ background: "#1a1a2e", height: "20px", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #00ff88, #00aaff)", borderRadius: "10px", transition: "width 0.5s", boxShadow: "0 0 20px #00ff88" }}></div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px", color: "#00aaff", fontSize: "14px" }}>
          {progress >= 100 ? "🎉 GOAL REACHED!" : `${(goal - sales).toFixed(0)} more to go`}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "25px" }}>
        {deals.map(deal => (
          <div 
            key={deal.id}
            onClick={() => quickSell(deal)}
            style={{ 
              background: "#0a0a15", 
              borderRadius: "12px", 
              padding: "20px", 
              cursor: "pointer",
              border: "2px solid transparent",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "2px solid #00ff88";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 255, 136, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "2px solid transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ color: "#d4a012", fontSize: "12px", marginBottom: "5px" }}>{deal.name}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
              <span style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>${deal.price}</span>
              <span style={{ color: "#64748b", fontSize: "14px", textDecoration: "line-through" }}>${deal.original}</span>
            </div>
            <div style={{ background: "#1a1a2e", height: "6px", borderRadius: "3px", marginBottom: "10px" }}>
              <div style={{ width: `${(deal.sold/deal.limit)*100}%`, height: "100%", background: "#d4a012", borderRadius: "3px" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b" }}>
              <span>{deal.sold}/{deal.limit} sold</span>
              <span style={{ color: "#00ff88" }}>+${deal.commission} commission</span>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ color: "#00aaff", fontSize: "16px", marginBottom: "15px" }}>Recent Sales Activity</h3>
      <div style={{ background: "#0a0a15", borderRadius: "12px", padding: "15px", marginBottom: "25px" }}>
        {RECENT_SALES.map((sale, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: i < 2 ? "1px solid #1a1a2e" : "none" }}>
            <div>
              <span style={{ color: "#fff" }}>{sale.customer}</span>
              <span style={{ color: "#64748b", fontSize: "11px", marginLeft: "8px" }}>{sale.product}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#00ff88", fontWeight: "600" }}>+${sale.amount}</span>
              <span style={{ color: "#64748b", fontSize: "11px" }}>{sale.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(0, 255, 136, 0.1))", borderRadius: "12px", padding: "25px", textAlign: "center", border: "1px solid #ef4444" }}>
        <div style={{ color: "#ef4444", fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>⚡ LIMITED TIME OFFER</div>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>Get $49 MAXAI Pro - 75% OFF</p>
        <button
          onClick={() => quickSell(deals[0])}
          style={{ background: "#ef4444", border: "none", padding: "15px 40px", borderRadius: "8px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)" }}
        >
          CLAIM $49 DEAL
        </button>
      </div>

      {showCheckout && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => setShowCheckout(null)}
        >
          <div style={{ background: "#0a0a15", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%", border: "1px solid #00ff88" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: "#00ff88", fontSize: "24px", textAlign: "center", marginBottom: "20px" }}>{showCheckout.name}</h3>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
              <span style={{ color: "#00ff88", fontSize: "36px", fontWeight: "700" }}>${showCheckout.price}</span>
              <span style={{ color: "#64748b", fontSize: "18px", textDecoration: "line-through", alignSelf: "center" }}>${showCheckout.original}</span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ width: "100%", padding: "15px", background: "#050510", border: "1px solid #1a1a2e", borderRadius: "8px", color: "#fff", fontSize: "16px" }}
              />
            </div>

            <button
              onClick={processPayment}
              disabled={processing}
              style={{ width: "100%", background: processing ? "#64748b" : "#00ff88", border: "none", padding: "18px", borderRadius: "8px", color: "#050510", fontSize: "18px", fontWeight: "700", cursor: processing ? "not-allowed" : "pointer", boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)" }}
            >
              {processing ? "PROCESSING..." : `PAY $${showCheckout.price}`}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}