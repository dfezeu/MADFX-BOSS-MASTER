import { useState, useEffect } from "react";

export default function BackendOffice() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sarah Chen", company: "TechCorp", email: "sarah@techcorp.io", phone: "+1 555-0101", status: "hot", value: 85000, lastContact: "2h ago", notes: "Interested in enterprise security package" },
    { id: 2, name: "Marcus Johnson", company: "CloudNexus", email: "marcus@cloudnexus.com", phone: "+1 555-0102", status: "warm", value: 42000, lastContact: "1d ago", notes: "Follow up on pricing discussion" },
    { id: 3, name: "Elena Rodriguez", company: "DataVault", email: "elena@datavault.co", phone: "+1 555-0103", status: "cold", value: 15000, lastContact: "5d ago", notes: "Initial outreach sent" },
    { id: 4, name: "James Wilson", company: "SecureFlow", email: "jwilson@secureflow.net", phone: "+1 555-0104", status: "hot", value: 120000, lastContact: "Just now", notes: "Demo scheduled for tomorrow" },
    { id: 5, name: "Aisha Patel", company: "InnovateTech", email: "aisha@innovatetech.io", phone: "+1 555-0105", status: "closed", value: 95000, lastContact: "1w ago", notes: "Contract signed - implementation started" }
  ]);

  const [deals, setDeals] = useState([
    { id: 1, name: "Enterprise Security Suite", value: 125000, stage: "negotiation", probability: 75, closeDate: "2026-06-15", owner: "You" },
    { id: 2, name: "Cloud Migration Package", value: 85000, stage: "proposal", probability: 50, closeDate: "2026-06-30", owner: "You" },
    { id: 3, name: "CX Analytics Platform", value: 62000, stage: "qualified", probability: 60, closeDate: "2026-07-10", owner: "You" },
    { id: 4, name: "24/7 Support Contract", value: 35000, stage: "closed", probability: 100, closeDate: "2026-05-20", owner: "You" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Call Sarah Chen - Follow up", priority: "high", due: "Today", completed: false },
    { id: 2, title: "Send proposal to CloudNexus", priority: "high", due: "Today", completed: false },
    { id: 3, title: "Prepare demo for SecureFlow", priority: "medium", due: "Tomorrow", completed: false },
    { id: 4, title: "Review contract with DataVault", priority: "low", due: "Next week", completed: false },
    { id: 5, title: "Update contact records", priority: "low", due: "Next week", completed: true }
  ]);

  const [analytics] = useState({
    totalRevenue: 487000,
    monthlyGrowth: 23.4,
    conversionRate: 34.2,
    avgDealValue: 67500,
    pipeline: 312000,
    wonDeals: 12,
    activeLeads: 47,
    cSat: 4.8
  });

  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: "threat", severity: "critical", message: "Unusual login attempt detected - IP 192.168.1.105", time: "10m ago" },
    { id: 2, type: "compliance", severity: "warning", message: "SSL certificate expires in 7 days", time: "2h ago" },
    { id: 3, type: "backup", severity: "info", message: "Daily backup completed successfully", time: "6h ago" },
    { id: 4, type: "access", severity: "warning", message: "New API key generated for production", time: "1d ago" }
  ]);

  const [cxMetrics] = useState({
    nps: 72,
    satisfaction: 94.2,
    responseTime: "2.4h",
    firstContact: 78,
    retention: 89
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    if (status === "hot") return "#ef4444";
    if (status === "warm") return "#f59e0b";
    if (status === "cold") return "#3b82f6";
    if (status === "closed") return "#10b981";
    return "#6b7280";
  };

  const getStageColor = (stage) => {
    if (stage === "closed") return "#10b981";
    if (stage === "negotiation") return "#f59e0b";
    if (stage === "proposal") return "#3b82f6";
    if (stage === "qualified") return "#8b5cf6";
    return "#6b7280";
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "#0a0f1a", minHeight: "100vh", padding: "20px", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #0d1525 0%, #0a0f1a 100%)", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700", letterSpacing: "0.5px" }}>
              EINSTEIN CRM BACKEND
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Cloud Security • Sales Intelligence • CX Data Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#64748b", fontSize: "11px" }}>CURRENT TIME</div>
              <div style={{ color: "#3b82f6", fontSize: "18px", fontWeight: "600", fontFamily: "monospace" }}>
                {time.toLocaleTimeString()}
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #1e3a5f, #0d1525)", padding: "10px 20px", borderRadius: "8px", border: "1px solid #d4a012" }}>
              <div style={{ color: "#64748b", fontSize: "10px" }}>ADMIN</div>
              <div style={{ color: "#d4a012", fontWeight: "600" }}>Dylann (Owner)</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "15px" }}>
          <div style={{ background: "#0d1525", padding: "15px", borderRadius: "10px", border: "1px solid #1e3a5f", textAlign: "center" }}>
            <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>${(analytics.totalRevenue / 1000).toFixed(0)}K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Total Revenue</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px", borderRadius: "10px", border: "1px solid #1e3a5f", textAlign: "center" }}>
            <div style={{ color: "#3b82f6", fontSize: "24px", fontWeight: "700" }}>+{analytics.monthlyGrowth}%</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Growth</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px", borderRadius: "10px", border: "1px solid #1e3a5f", textAlign: "center" }}>
            <div style={{ color: "#8b5cf6", fontSize: "24px", fontWeight: "700" }}>{analytics.conversionRate}%</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Conversion</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px", borderRadius: "10px", border: "1px solid #1e3a5f", textAlign: "center" }}>
            <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>${(analytics.avgDealValue / 1000).toFixed(0)}K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Avg Deal</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px", borderRadius: "10px", border: "1px solid #1e3a5f", textAlign: "center" }}>
            <div style={{ color: "#f59e0b", fontSize: "24px", fontWeight: "700" }}>${analytics.pipeline / 1000}K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Pipeline</div>
          </div>
          <div style={{ background: "#0d1525", padding: "15px", borderRadius: "10px", border: "1px solid #1e3a5f", textAlign: "center" }}>
            <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>{cxMetrics.nps}</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>NPS Score</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "20px" }}>
        <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "15px" }}>
          <h3 style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", marginBottom: "15px" }}>Navigation</h3>
          {[
            { id: "dashboard", icon: "◈", label: "Dashboard" },
            { id: "contacts", icon: "◉", label: "Contacts" },
            { id: "deals", icon: "⇄", label: "Deals Pipeline" },
            { id: "tasks", icon: "✓", label: "Tasks" },
            { id: "security", icon: "◈", label: "Security Center" },
            { id: "analytics", icon: "◉", label: "CX Analytics" },
            { id: "ai", icon: "◆", label: "AI Insights" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                width: "100%",
                background: activeSection === item.id ? "rgba(212, 160, 18, 0.15)" : "transparent",
                color: activeSection === item.id ? "#d4a012" : "#64748b",
                border: "none",
                padding: "12px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                textAlign: "left",
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span style={{ color: activeSection === item.id ? "#d4a012" : "#3b82f6" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div>
          {activeSection === "dashboard" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
                <h3 style={{ color: "#10b981", marginBottom: "15px" }}>Recent Contacts</h3>
                {contacts.slice(0, 4).map(c => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#1e3a5f", borderRadius: "8px", marginBottom: "8px" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{c.name}</div>
                      <div style={{ color: "#64748b", fontSize: "11px" }}>{c.company}</div>
                    </div>
                    <span style={{ color: getStatusColor(c.status), fontSize: "11px", textTransform: "uppercase" }}>{c.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
                <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>Active Deals</h3>
                {deals.filter(d => d.stage !== "closed").map(d => (
                  <div key={d.id} style={{ padding: "10px", background: "#1e3a5f", borderRadius: "8px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{d.name}</span>
                      <span style={{ color: "#10b981" }}>${d.value.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: getStageColor(d.stage), fontSize: "11px" }}>{d.stage}</span>
                      <div style={{ flex: 1, height: "4px", background: "#0d1525", borderRadius: "2px" }}>
                        <div style={{ width: `${d.probability}%`, height: "100%", background: getStageColor(d.stage), borderRadius: "2px" }}></div>
                      </div>
                      <span style={{ color: "#64748b", fontSize: "10px" }}>{d.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "contacts" && (
            <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ color: "#d4a012" }}>Contacts</h3>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: "#1e3a5f", border: "1px solid #2d4a6f", padding: "8px 15px", borderRadius: "8px", color: "#fff", fontSize: "13px", width: "250px" }}
                />
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>NAME</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>COMPANY</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>EMAIL</th>
                    <th style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>STATUS</th>
                    <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>VALUE</th>
                    <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>LAST</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map(c => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #1e3a5f" }}>
                      <td style={{ padding: "12px", color: "#fff", fontWeight: "500" }}>{c.name}</td>
                      <td style={{ padding: "12px", color: "#64748b" }}>{c.company}</td>
                      <td style={{ padding: "12px", color: "#3b82f6" }}>{c.email}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <span style={{ color: getStatusColor(c.status), fontSize: "11px", textTransform: "uppercase", background: `${getStatusColor(c.status)}20`, padding: "4px 8px", borderRadius: "4px" }}>{c.status}</span>
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#10b981" }}>${c.value.toLocaleString()}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#64748b" }}>{c.lastContact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "deals" && (
            <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
              <h3 style={{ color: "#d4a012", marginBottom: "20px" }}>Deals Pipeline</h3>
              {deals.map(d => (
                <div key={d.id} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <div>
                      <span style={{ color: "#fff", fontWeight: "600" }}>{d.name}</span>
                      <span style={{ color: "#64748b", marginLeft: "10px", fontSize: "12px" }}>Owner: {d.owner}</span>
                    </div>
                    <span style={{ color: "#10b981", fontWeight: "700", fontSize: "18px" }}>${d.value.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ color: getStageColor(d.stage), fontSize: "12px", textTransform: "uppercase" }}>{d.stage}</span>
                    <div style={{ flex: 1, height: "6px", background: "#0d1525", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${d.probability}%`, height: "100%", background: d.stage === "closed" ? "#10b981" : "linear-gradient(90deg, #d4a012, #3b82f6)", borderRadius: "3px" }}></div>
                    </div>
                    <span style={{ color: "#64748b", fontSize: "12px" }}>{d.probability}% • {d.closeDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "tasks" && (
            <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
              <h3 style={{ color: "#d4a012", marginBottom: "20px" }}>Tasks</h3>
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    padding: "12px", 
                    background: "#1e3a5f",
                    borderRadius: "8px", 
                    marginBottom: "8px",
                    cursor: "pointer",
                    opacity: task.completed ? 0.6 : 1
                  }}
                >
                  <div style={{ 
                    width: "20px", 
                    height: "20px", 
                    borderRadius: "50%", 
                    border: task.completed ? "2px solid #10b981" : "2px solid #64748b",
                    background: task.completed ? "#10b981" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {task.completed && <span style={{ color: "#0a0f1a", fontSize: "12px" }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: task.completed ? "#64748b" : "#fff", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
                  </div>
                  <span style={{ 
                    color: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f59e0b" : "#64748b",
                    fontSize: "11px",
                    textTransform: "uppercase"
                  }}>{task.priority}</span>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{task.due}</span>
                </div>
              ))}
            </div>
          )}

          {activeSection === "security" && (
            <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
              <h3 style={{ color: "#ef4444", marginBottom: "20px" }}>Security Center</h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {securityAlerts.map(alert => (
                  <div 
                    key={alert.id} 
                    style={{ 
                      background: alert.severity === "critical" ? "rgba(239, 68, 68, 0.1)" : alert.severity === "warning" ? "rgba(245, 158, 11, 0.1)" : "rgba(59, 130, 246, 0.1)",
                      padding: "15px", 
                      borderRadius: "8px",
                      border: alert.severity === "critical" ? "1px solid #ef4444" : alert.severity === "warning" ? "1px solid #f59e0b" : "1px solid #3b82f6",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px"
                    }}
                  >
                    <span style={{ 
                      color: alert.severity === "critical" ? "#ef4444" : alert.severity === "warning" ? "#f59e0b" : "#3b82f6",
                      fontSize: "18px"
                    }}>
                      {alert.severity === "critical" ? "◉" : alert.severity === "warning" ? "⚠" : "ℹ"}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontSize: "13px" }}>{alert.message}</div>
                      <div style={{ color: "#64748b", fontSize: "11px" }}>{alert.time}</div>
                    </div>
                    <button style={{ background: "transparent", border: "1px solid #64748b", color: "#64748b", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "11px" }}>
                      Investigate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "analytics" && (
            <div style={{ background: "#0d1525", borderRadius: "12px", border: "1px solid #1e3a5f", padding: "20px" }}>
              <h3 style={{ color: "#3b82f6", marginBottom: "20px" }}>CX Analytics</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                {[
                  { label: "NPS Score", value: cxMetrics.nps, color: "#10b981" },
                  { label: "Satisfaction", value: cxMetrics.satisfaction + "%", color: "#3b82f6" },
                  { label: "Response Time", value: cxMetrics.responseTime, color: "#8b5cf6" },
                  { label: "First Contact", value: cxMetrics.firstContact + "%", color: "#d4a012" },
                  { label: "Retention", value: cxMetrics.retention + "%", color: "#f59e0b" }
                ].map(metric => (
                  <div key={metric.label} style={{ background: "#1e3a5f", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ color: metric.color, fontSize: "28px", fontWeight: "700" }}>{metric.value}</div>
                    <div style={{ color: "#64748b", fontSize: "11px", marginTop: "5px" }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "ai" && (
            <div style={{ background: "linear-gradient(135deg, rgba(212, 160, 18, 0.1), rgba(59, 130, 246, 0.1))", borderRadius: "12px", border: "1px solid #d4a012", padding: "30px", textAlign: "center" }}>
              <h3 style={{ color: "#d4a012", marginBottom: "20px", fontSize: "24px" }}>Einstein AI Insights</h3>
              <div style={{ color: "#fff", fontSize: "16px", lineHeight: "1.8", marginBottom: "20px" }}>
                <p>Based on your pipeline analysis, <span style={{ color: "#10b981" }}>CloudNexus</span> has 68% probability to close this month.</p>
                <p style={{ marginTop: "15px" }}>Recommended action: <span style={{ color: "#d4a012" }}>Send enterprise proposal by Friday</span> to maximize close rate.</p>
                <p style={{ marginTop: "15px" }}>Your top performer: <span style={{ color: "#3b82f6" }}>Security Suite deals (42% of revenue)</span></p>
              </div>
              <button style={{ background: "linear-gradient(135deg, #d4a012, #3b82f6)", color: "#0a0f1a", border: "none", padding: "12px 30px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
                Get More Insights
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}