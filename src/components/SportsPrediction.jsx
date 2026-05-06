import { useState } from "react";

export default function SportsPrediction() {
  const [activeCategory, setActiveCategory] = useState("racing");
  
  const [racing] = useState([
    { id: 1, event: "F1 - Monaco GP", time: "Sun 2:00 PM", candidates: [
      { name: "Max Verstappen", odds: 1.45, probability: 69 },
      { name: "Lando Norris", odds: 3.20, probability: 31 },
      { name: "Charles Leclerc", odds: 4.50, probability: 22 },
      { name: "Lewis Hamilton", odds: 8.00, probability: 12 },
      { name: "Fernando Alonso", odds: 12.00, probability: 8 }
    ]},
    { id: 2, event: "NASCAR - Coke 600", time: "Sun 6:00 PM", candidates: [
      { name: "Kyle Larson", odds: 2.80, probability: 36 },
      { name: "Denny Hamlin", odds: 3.50, probability: 29 },
      { name: "William Byron", odds: 4.20, probability: 24 },
      { name: "Tyler Reddick", odds: 5.50, probability: 18 },
      { name: "Christopher Bell", odds: 7.00, probability: 14 }
    ]}
  ]);

  const [golf] = useState([
    { id: 1, event: "PGA - PGA Championship", time: "Sun 12:00 PM", candidates: [
      { name: "Scottie Scheffler", odds: 2.10, probability: 48 },
      { name: "Rory McIlroy", odds: 3.00, probability: 33 },
      { name: "Jon Rahm", odds: 4.50, probability: 22 },
      { name: "Brooks Koepka", odds: 6.00, probability: 17 },
      { name: "Jordan Spieth", odds: 9.00, probability: 11 }
    ]},
    { id: 2, event: "LPGA - Match Play", time: "Sat 10:00 AM", candidates: [
      { name: "Nelly Korda", odds: 2.20, probability: 45 },
      { name: "Lydia Ko", odds: 2.80, probability: 36 },
      { name: "Inbee Park", odds: 3.50, probability: 29 },
      { name: "Ariya Jutanugarn", odds: 5.00, probability: 20 },
      { name: "Min Woo Lee", odds: 7.50, probability: 13 }
    ]}
  ]);

  const [soccer] = useState([
    { id: 1, event: "Champions League Final", time: "Sat 8:00 PM", candidates: [
      { name: "Real Madrid", odds: 1.65, probability: 61 },
      { name: "Dortmund", odds: 2.40, probability: 42 },
      { name: "Draw", odds: 3.50, probability: 29 }
    ]},
    { id: 2, event: "Premier League", time: "Sun 11:00 AM", candidates: [
      { name: "Arsenal", odds: 1.85, probability: 54 },
      { name: "Man City", odds: 2.10, probability: 48 },
      { name: "Liverpool", odds: 2.30, probability: 43 },
      { name: "Draw", odds: 3.25, probability: 31 }
    ]}
  ]);

  const [hockey] = useState([
    { id: 1, event: "NHL - Stanley Cup", time: "Sat 8:00 PM", candidates: [
      { name: "Edmonton Oilers", odds: 1.80, probability: 56 },
      { name: "Florida Panthers", odds: 2.00, probability: 50 },
      { name: "New York Rangers", odds: 2.20, probability: 45 },
      { name: "Dallas Stars", odds: 2.50, probability: 40 }
    ]}
  ]);

  const [arbOpportunities] = useState([
    { id: 1, event: "F1 - Monaco GP", bookmaker1: "Bet365", odds1: 3.25, bookmaker2: "Pinnacle", odds2: 3.45, profit: "8.2%", status: "LIVE" },
    { id: 2, event: "Champions League", bookmaker1: "Betfair", odds1: 1.72, bookmaker2: "Unikrn", odds2: 1.85, profit: "5.4%", status: "LIVE" },
    { id: 3, event: "NHL Finals", bookmaker1: "Betway", odds1: 2.10, bookmaker2: "888sport", odds2: 2.25, profit: "4.1%", status: "LIVE" }
  ]);

  const categories = [
    { id: "racing", label: "Racing", icon: "🏎" },
    { id: "golf", label: "Golf", icon: "⛳" },
    { id: "soccer", label: "Soccer", icon: "⚽" },
    { id: "hockey", label: "Hockey", icon: "🏒" },
    { id: "arb", label: "Arb Scanner", icon: "📊" }
  ];

  const getEvents = () => {
    switch(activeCategory) {
      case "racing": return racing;
      case "golf": return golf;
      case "soccer": return soccer;
      case "hockey": return hockey;
      default: return [];
    }
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#3b82f6", fontSize: "28px", fontWeight: "700" }}>SPORTS PREDICTION MARKETS</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Race, golf, soccer, hockey prediction markets with arb detection</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              background: activeCategory === cat.id ? "#3b82f6" : "#1e3a5f",
              color: activeCategory === cat.id ? "#fff" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {activeCategory === "arb" ? (
        <div>
          <div style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), transparent)", borderRadius: "12px", border: "1px solid #10b981", padding: "20px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ color: "#10b981" }}>Arbitrage Opportunities</h3>
              <span style={{ color: "#10b981", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }}></div>
                LIVE SCANNING
              </span>
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              {arbOpportunities.map(arb => (
                <div key={arb.id} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "600", marginBottom: "5px" }}>{arb.event}</div>
                    <div style={{ display: "flex", gap: "15px", fontSize: "12px", color: "#64748b" }}>
                      <span>{arb.bookmaker1}: <span style={{ color: "#d4a012" }}>{arb.odds1}</span></span>
                      <span>{arb.bookmaker2}: <span style={{ color: "#d4a012" }}>{arb.odds2}</span></span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#10b981", fontWeight: "700", fontSize: "18px" }}>{arb.profit}</div>
                    <span style={{ color: "#10b981", fontSize: "11px" }}>Risk Free</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {getEvents().map(event => (
            <div key={event.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{event.event}</h3>
                <span style={{ color: "#64748b", fontSize: "12px" }}>{event.time}</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #0d1525" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>CANDIDATE</th>
                    <th style={{ padding: "10px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>ODDS</th>
                    <th style={{ padding: "10px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>PROB</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>IMPLIED</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>BET</th>
                  </tr>
                </thead>
                <tbody>
                  {event.candidates.map((cand, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #0d152525" }}>
                      <td style={{ padding: "10px", color: "#fff", fontWeight: "500" }}>{cand.name}</td>
                      <td style={{ padding: "10px", textAlign: "right", color: "#d4a012", fontWeight: "600" }}>{cand.odds}</td>
                      <td style={{ padding: "10px", textAlign: "right", color: "#3b82f6" }}>{cand.probability}%</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <div style={{ width: "60px", height: "6px", background: "#0d1525", borderRadius: "3px", overflow: "hidden", margin: "0 auto" }}>
                          <div style={{ width: `${cand.probability}%`, height: "100%", background: cand.probability > 40 ? "#10b981" : "#f59e0b", borderRadius: "3px" }}></div>
                        </div>
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button style={{ background: "#3b82f6", border: "none", padding: "6px 12px", borderRadius: "4px", color: "#fff", fontSize: "11px", cursor: "pointer" }}>
                          Bet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>12</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Live Events</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>3</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Arb Found</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: "24px", fontWeight: "700" }}>$2,450</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Potential Profit</div>
        </div>
      </div>
    </div>
  );
}