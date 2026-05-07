import { useState, useEffect } from "react";

const AI_EMPLOYEES = [
  { id: 1, name: "ALEX", role: "CEO Assistant", avatar: "🤖", status: "active", tasks: 12, color: "#00ff88", desc: "Strategic planning & decision making" },
  { id: 2, name: "MARSHA", role: "Sales Director", avatar: "💼", status: "active", tasks: 8, color: "#00aaff", desc: "Revenue generation & client relations" },
  { id: 3, name: "SEAN", role: "Marketing Chief", avatar: "📢", status: "active", tasks: 15, color: "#d4a012", desc: "Ad campaigns & lead gen" },
  { id: 4, name: "EDWARD", role: "SEO Specialist", avatar: "🔍", status: "active", tasks: 6, color: "#a855f7", desc: "Search optimization & content" },
  { id: 5, name: "CIARA", role: "Social Media", avatar: "📱", status: "active", tasks: 20, color: "#ec4899", desc: "Posts & community engagement" },
  { id: 6, name: "OSCAR", role: "CTO", avatar: "💻", status: "active", tasks: 5, color: "#14b8a6", desc: "Tech infrastructure & development" },
  { id: 7, name: "FINLEY", role: "Finance", avatar: "💰", status: "active", tasks: 4, color: "#10b981", desc: "Crypto & revenue tracking" },
  { id: 8, name: "CHAT-BOT", role: "Support", avatar: "💬", status: "active", tasks: 50, color: "#6366f1", desc: "Customer support & qualification" }
];

const CAMPAIGNS = [
  { id: 1, name: "MAXAI Launch", platform: "Facebook", budget: 500, spent: 320, leads: 850, conv: 4.2, status: "active" },
  { id: 2, name: "MAXAI Launch", platform: "Instagram", budget: 300, spent: 180, leads: 620, conv: 3.8, status: "active" },
  { id: 3, name: "MAXAI Launch", platform: "Google", budget: 800, spent: 520, leads: 1200, conv: 5.5, status: "active" },
  { id: 4, name: "MAXAI Launch", platform: "Twitter/X", budget: 200, spent: 150, leads: 420, conv: 2.1, status: "active" },
  { id: 5, name: "MAXAI Launch", platform: "YouTube", budget: 400, spent: 280, leads: 580, conv: 4.8, status: "active" },
  { id: 6, name: "Retargeting", platform: "All", budget: 150, spent: 95, leads: 320, conv: 8.2, status: "active" }
];

const LEADS = [
  { id: 1, name: "John D.", email: "john@email.com", budget: 5000, readiness: "high", source: "Facebook", score: 92, date: "2026-05-07" },
  { id: 2, name: "Sarah M.", email: "sarah@email.com", budget: 2500, readiness: "medium", source: "Instagram", score: 75, date: "2026-05-07" },
  { id: 3, name: "Mike R.", email: "mike@email.com", budget: 10000, readiness: "high", source: "Google", score: 95, date: "2026-05-06" },
  { id: 4, name: "Lisa K.", email: "lisa@email.com", budget: 3500, readiness: "high", source: "YouTube", score: 88, date: "2026-05-06" },
  { id: 5, name: "Tom B.", email: "tom@email.com", budget: 1500, readiness: "low", source: "Twitter", score: 45, date: "2026-05-05" }
];

export default function BackOfficeCEO() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [salesGoal, setSalesGoal] = useState(1000000);
  const [currentSales, setCurrentSales] = useState(0);
  const [goalProgress, setGoalProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSales < salesGoal) {
        setCurrentSales(prev => Math.min(prev + Math.random() * 500, salesGoal));
        setGoalProgress((currentSales / salesGoal) * 100);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSales, salesGoal]);

  const totalBudget = CAMPAIGNS.reduce((s, c) => s + c.budget, 0);
  const totalSpent = CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const totalLeads = CAMPAIGNS.reduce((s, c) => s + c.leads, 0);
  const avgConv = CAMPAIGNS.reduce((s, c) => s + c.conv, 0) / CAMPAIGNS.length;

  return (
    <div style={{ background: "#050510", borderRadius: "16px", border: "1px solid #00aaff", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
        <div>
          <h2 style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700", textShadow: "0 0 20px #00ff88" }}>CEO COMMAND CENTER</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>AI-Powered Business Operations</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>GOAL PROGRESS</div>
          <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>${currentSales.toLocaleString()} / ${salesGoal.toLocaleString()}</div>
          <div style={{ background: "#1a1a2e", height: "8px", borderRadius: "4px", marginTop: "5px", width: "200px" }}>
            <div style={{ width: `${goalProgress}%`, height: "100%", background: "linear-gradient(90deg, #00ff88, #00aaff)", borderRadius: "4px", boxShadow: "0 0 10px #00ff88" }}></div>
          </div>
          <div style={{ color: "#00aaff", fontSize: "12px", marginTop: "5px" }}>{goalProgress.toFixed(1)}% complete</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>TOTAL LEADS</div>
          <div style={{ color: "#00aaff", fontSize: "28px", fontWeight: "700" }}>{totalLeads.toLocaleString()}</div>
        </div>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>CONVERSION</div>
          <div style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>{avgConv.toFixed(1)}%</div>
        </div>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>AD SPEND</div>
          <div style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>${totalSpent}</div>
        </div>
        <div style={{ background: "#0a0a15", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "10px" }}>LEADS TODAY</div>
          <div style={{ color: "#fff", fontSize: "28px", fontWeight: "700" }}>+{LEADS.filter(l => l.date === "2026-05-07").length}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {["dashboard", "team", "campaigns", "leads", "tasks"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "rgba(0, 255, 136, 0.15)" : "transparent",
              color: activeTab === tab ? "#00ff88" : "#64748b",
              border: "1px solid " + (activeTab === tab ? "#00ff88" : "transparent"),
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              boxShadow: activeTab === tab ? "0 0 20px rgba(0, 255, 136, 0.3)" : "none"
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "team" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
          {AI_EMPLOYEES.map(emp => (
            <div 
              key={emp.id}
              onClick={() => setSelectedEmployee(emp)}
              style={{ background: "#0a0a15", borderRadius: "12px", padding: "20px", borderLeft: `4px solid ${emp.color}`, cursor: "pointer", transition: "all 0.3s" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                <span style={{ fontSize: "32px" }}>{emp.avatar}</span>
                <div>
                  <div style={{ color: "#fff", fontWeight: "700", fontSize: "18px" }}>{emp.name}</div>
                  <div style={{ color: emp.color, fontSize: "12px" }}>{emp.role}</div>
                </div>
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>{emp.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#00ff88", fontSize: "12px" }}>● {emp.status.toUpperCase()}</span>
                <span style={{ color: "#64748b", fontSize: "11px" }}>{emp.tasks} tasks</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "campaigns" && (
        <div style={{ background: "#0a0a15", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "15px", background: "#0d0d20", color: "#64748b", fontSize: "11px", fontWeight: "600" }}>
            <span>CAMPAIGN</span>
            <span>PLATFORM</span>
            <span>BUDGET</span>
            <span>SPENT</span>
            <span>LEADS</span>
            <span>CONV</span>
            <span>STATUS</span>
          </div>
          {CAMPAIGNS.map(camp => (
            <div key={camp.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "15px", borderBottom: "1px solid #0d0d20", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: "600" }}>{camp.name}</span>
              <span style={{ color: "#00aaff" }}>{camp.platform}</span>
              <span style={{ color: "#d4a012" }}>${camp.budget}</span>
              <span style={{ color: "#fff" }}>${camp.spent}</span>
              <span style={{ color: "#00ff88" }}>{camp.leads}</span>
              <span style={{ color: camp.conv > 4 ? "#00ff88" : "#f59e0b" }}>{camp.conv}%</span>
              <span style={{ background: camp.status === "active" ? "rgba(0,255,136,0.2)" : "rgba(100,116,139,0.2)", color: camp.status === "active" ? "#00ff88" : "#64748b", padding: "5px 10px", borderRadius: "4px", fontSize: "10px", textAlign: "center" }}>
                {camp.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "leads" && (
        <div style={{ background: "#0a0a15", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 80px", padding: "15px", background: "#0d0d20", color: "#64748b", fontSize: "11px", fontWeight: "600" }}>
            <span>LEAD</span>
            <span>BUDGET</span>
            <span>READINESS</span>
            <span>SOURCE</span>
            <span>SCORE</span>
            <span>DATE</span>
          </div>
          {LEADS.map(lead => (
            <div key={lead.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 80px", padding: "15px", borderBottom: "1px solid #0d0d20", alignItems: "center" }}>
              <div><span style={{ color: "#fff", fontWeight: "600" }}>{lead.name}</span><span style={{ color: "#64748b", fontSize: "10px", marginLeft: "8px" }}>{lead.email}</span></div>
              <span style={{ color: "#d4a012" }}>${lead.budget}</span>
              <span style={{ color: lead.readiness === "high" ? "#00ff88" : lead.readiness === "medium" ? "#f59e0b" : "#64748b", background: lead.readiness === "high" ? "rgba(0,255,136,0.2)" : lead.readiness === "medium" ? "rgba(245,158,11,0.2)" : "rgba(100,116,139,0.2)", padding: "3px 8px", borderRadius: "4px", fontSize: "10px" }}>{lead.readiness.toUpperCase()}</span>
              <span style={{ color: "#00aaff" }}>{lead.source}</span>
              <span style={{ color: lead.score > 80 ? "#00ff88" : "#fff" }}>{lead.score}</span>
              <span style={{ color: "#64748b", fontSize: "11px" }}>{lead.date}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "dashboard" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ background: "#0a0a15", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#00ff88", fontSize: "16px", marginBottom: "15px" }}>AI Employees Working</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {AI_EMPLOYEES.slice(0, 4).map(emp => (
                <div key={emp.id} style={{ textAlign: "center", padding: "10px", background: "#050510", borderRadius: "8px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>{emp.avatar}</div>
                  <div style={{ color: "#fff", fontSize: "11px", fontWeight: "600" }}>{emp.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#0a0a15", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#00aaff", fontSize: "16px", marginBottom: "15px" }}>Active Campaigns</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {CAMPAIGNS.slice(0, 3).map(camp => (
                <div key={camp.id} style={{ textAlign: "center", padding: "10px", background: "#050510", borderRadius: "8px" }}>
                  <div style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>{camp.platform}</div>
                  <div style={{ color: "#00ff88", fontSize: "12px" }}>{camp.leads} leads</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedEmployee && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => setSelectedEmployee(null)}
        >
          <div style={{ background: "#0a0a15", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%", border: `1px solid ${selectedEmployee.color}` }}
          onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
              <span style={{ fontSize: "48px" }}>{selectedEmployee.avatar}</span>
              <div>
                <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>{selectedEmployee.name}</div>
                <div style={{ color: selectedEmployee.color, fontSize: "14px" }}>{selectedEmployee.role}</div>
              </div>
            </div>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>{selectedEmployee.desc}</p>
            
            <div style={{ background: "#050510", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#64748b" }}>Tasks Assigned</span>
                <span style={{ color: "#fff" }}>{selectedEmployee.tasks}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ color: "#00ff88" }}>● Active</span>
              </div>
            </div>

            <button
              style={{ width: "100%", background: selectedEmployee.color, border: "none", padding: "15px", borderRadius: "8px", color: "#050510", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
            >
              ASSIGN TASK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}