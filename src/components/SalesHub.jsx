import { useState, useEffect } from "react";

export default function SalesHub() {
  const [activeSection, setActiveSection] = useState("funnel");
  const [leadsFunnel] = useState([
    { stage: "New Leads", count: 245, color: "#3b82f6", conversion: 100 },
    { stage: "Contacted", count: 189, color: "#8b5cf6", conversion: 77 },
    { stage: "Qualified", count: 124, color: "#d4a012", conversion: 66 },
    { stage: "Proposal", count: 78, color: "#f59e0b", conversion: 63 },
    { stage: "Negotiation", count: 45, color: "#ef4444", conversion: 58 },
    { stage: "Closed Won", count: 26, color: "#10b981", conversion: 100 }
  ]);

  const [funnelMetrics] = useState({
    totalLeads: 245,
    qualifiedRate: 50.6,
    avgDealSize: 45000,
    salesCycle: 18,
    closeRate: 10.6
  });

  const [recentActivity] = useState([
    { type: "lead", message: "New lead: Sarah Chen from TechCorp", time: "5m ago" },
    { type: "email", message: "Email sent to Marcus Johnson", time: "15m ago" },
    { type: "call", message: "Call scheduled with Elena Rodriguez", time: "30m ago" },
    { type: "meeting", message: "Demo completed with James Wilson", time: "1h ago" },
    { type: "deal", message: "Deal closed: $85,000 - Aisha Patel", time: "2h ago" }
  ]);

  const [upcomingTasks] = useState([
    { id: 1, title: "Follow up with CloudNexus", priority: "high", due: "Today", type: "call" },
    { id: 2, title: "Send proposal to DataVault", priority: "high", due: "Today", type: "email" },
    { id: 3, title: "Demo with SecureFlow", priority: "high", due: "Tomorrow", type: "meeting" },
    { id: 4, title: "Review contract - InnovateTech", priority: "medium", due: "Friday", type: "task" },
    { id: 5, title: "Team standup", priority: "low", due: "Daily", type: "meeting" }
  ]);

  const [campaigns, setCampaigns] = useState([
    { name: "Spring 2026 Promo", channel: "Email", sent: 12500, opened: 4250, replied: 890, converted: 145, status: "active" },
    { name: "Product Launch", channel: "LinkedIn", reach: 45000, engagement: 3200, leads: 245, status: "active" },
    { name: "Webinar Series", channel: "Webinar", registered: 890, attended: 645, converted: 78, status: "active" }
  ]);

  const [performance, setPerformance] = useState({
    revenue: 487000,
    newLeads: 245,
    conversions: 26,
    avgResponseTime: "2.4h",
    emailOpenRate: 34,
    conversionRate: 10.6
  });

  const [aiAgents, setAiAgents] = useState([
    { 
      id: 1, 
      name: "CONVERT", 
      role: "Conversion AI Agent", 
      avatar: "💰",
      status: "active",
      specialty: "Turns leads into paying customers",
      metrics: { calls: 1240, emails: 4500, conversions: 145 }
    },
    { 
      id: 2, 
      name: "OUTREACH", 
      role: "Lead Generation AI", 
      avatar: "🎯",
      status: "active",
      specialty: "Finds and qualifies new leads",
      metrics: { leads: 2450, qualified: 890, meetings: 124 }
    },
    { 
      id: 3, 
      name: "CLOSER", 
      role: "Deal Closing AI", 
      avatar: "🤝",
      status: "active",
      specialty: "Negotiates and closes deals",
      metrics: { negotiations: 45, closed: 26, value: 850000 }
    },
    { 
      id: 4, 
      name: "RETAIN", 
      role: "Retention AI", 
      avatar: "🔄",
      status: "active",
      specialty: "Keeps customers happy and renews",
      metrics: { renewals: 89, upsells: 34, nps: 72 }
    }
  ]);

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>SALES & LEADS HUB</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>AI Agents Working 24/7 to Close Deals</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {[
          { id: "funnel", label: "Funnel", icon: "📊" },
          { id: "agents", label: "AI Agents", icon: "🤖" },
          { id: "activity", label: "Activity", icon: "📝" },
          { id: "campaigns", label: "Campaigns", icon: "📧" },
          { id: "tasks", label: "Tasks", icon: "✓" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              background: activeSection === tab.id ? "#3b82f6" : "#1e3a5f",
              color: activeSection === tab.id ? "#fff" : "#64748b",
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
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#10b981", fontSize: "28px", fontWeight: "700" }}>${(performance.revenue / 1000).toFixed(0)}K</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Revenue</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: "28px", fontWeight: "700" }}>{performance.newLeads}</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>New Leads</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>{performance.conversions}</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Conversions</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ color: "#f59e0b", fontSize: "28px", fontWeight: "700" }}>{performance.emailOpenRate}%</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Email Open Rate</div>
        </div>
      </div>

      {activeSection === "funnel" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "30px" }}>
            {leadsFunnel.map((stage, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div style={{ 
                  background: stage.color, 
                  padding: "20px 10px", 
                  borderRadius: "8px 8px 0 0",
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}>
                  <div style={{ color: idx === 5 ? "#0a0f1a" : "#fff", fontSize: "20px", fontWeight: "700" }}>{stage.count}</div>
                </div>
                <div style={{ background: "#1e3a5f", padding: "10px", borderRadius: "0 0 8px 8px" }}>
                  <div style={{ color: stage.color, fontSize: "12px", fontWeight: "600" }}>{stage.stage}</div>
                  <div style={{ color: "#64748b", fontSize: "10px" }}>{stage.conversion}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "agents" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {aiAgents.map(agent => (
            <div key={agent.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <span style={{ fontSize: "32px" }}>{agent.avatar}</span>
                  <div>
                    <div style={{ color: "#d4a012", fontWeight: "700", fontSize: "18px" }}>{agent.name}</div>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>{agent.role}</div>
                  </div>
                </div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></div>
              </div>
              <div style={{ color: "#3b82f6", fontSize: "12px", marginBottom: "15px" }}>{agent.specialty}</div>
              <div style={{ display: "flex", gap: "15px", borderTop: "1px solid #0d1525", paddingTop: "15px" }}>
                {Object.entries(agent.metrics).map(([key, value]) => (
                  <div key={key} style={{ textAlign: "center" }}>
                    <div style={{ color: "#10b981", fontWeight: "600" }}>
                      {typeof value === "number" ? (key === "value" ? `$${value/1000}K` : value.toLocaleString()) : value}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "10px", textTransform: "capitalize" }}>{key}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === "activity" && (
        <div>
          <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Recent Activity</h3>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
            {recentActivity.map((activity, idx) => (
              <div key={idx} style={{ padding: "15px 20px", borderBottom: idx < recentActivity.length - 1 ? "1px solid #0d1525" : "none", display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{ fontSize: "16px" }}>
                  {activity.type === "lead" ? "🎯" : activity.type === "email" ? "📧" : activity.type === "call" ? "📞" : activity.type === "meeting" ? "📅" : "💰"}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontSize: "13px" }}>{activity.message}</div>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "campaigns" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012" }}>Marketing Campaigns</h3>
            <button style={{ background: "#10b981", border: "none", padding: "8px 16px", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "12px" }}>+ New Campaign</button>
          </div>
          <div style={{ display: "grid", gap: "15px" }}>
            {campaigns.map((camp, idx) => (
              <div key={idx} style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <div style={{ color: "#fff", fontWeight: "600" }}>{camp.name}</div>
                  <span style={{ color: "#10b981", fontSize: "12px" }}>{camp.status}</span>
                </div>
                <div style={{ display: "flex", gap: "30px", fontSize: "12px" }}>
                  <div><span style={{ color: "#64748b" }}>Channel:</span> <span style={{ color: "#fff" }}>{camp.channel}</span></div>
                  <div><span style={{ color: "#64748b" }}>Sent:</span> <span style={{ color: "#3b82f6" }}>{camp.sent || camp.registered || camp.reach}</span></div>
                  <div><span style={{ color: "#64748b" }}>Converted:</span> <span style={{ color: "#10b981" }}>{camp.converted}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "tasks" && (
        <div>
          <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Upcoming Tasks</h3>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
            {upcomingTasks.map(task => (
              <div key={task.id} style={{ padding: "15px 20px", borderBottom: "1px solid #0d1525", display: "flex", alignItems: "center", gap: "15px" }}>
                <input type="checkbox" style={{ accentColor: "#10b981" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontSize: "13px" }}>{task.title}</div>
                  <div style={{ color: "#64748b", fontSize: "11px" }}>{task.due}</div>
                </div>
                <span style={{ 
                  color: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f59e0b" : "#64748b", 
                  fontSize: "11px", textTransform: "uppercase" 
                }}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}