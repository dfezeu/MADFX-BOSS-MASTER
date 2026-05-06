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

  const [analytics, setAnalytics] = useState({
    totalRevenue: 487000,
    monthlyGrowth: 23.4,
    conversionRate: 34.2,
    avgDealSize: 67500,
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

  const [cxMetrics, setCxMetrics] = useState({
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
    if (status === "hot") return "#ff4444";
    if (status === "warm") return "#ff8800";
    if (status === "cold") return "#00aaff";
    if (status === "closed") return "#00ff88";
    return "#64748b";
  };

  const getStageColor = (stage) => {
    if (stage === "closed") return "#00ff88";
    if (stage === "negotiation") return "#ff8800";
    if (stage === "proposal") return "#00aaff";
    if (stage === "qualified") return "#a855f7";
    return "#64748b";
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "#030712", minHeight: "100vh", padding: "20px", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d0015 100%)", borderRadius: "16px", border: "1px solid #a855f7", padding: "30px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ background: "linear-gradient(135deg, #a855f7, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "28px", fontWeight: "700" }}>
              Einstein CRM Backend
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Cloud Security • Sales Intelligence • CX Data Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#64748b", fontSize: "11px" }}>CURRENT TIME</div>
              <div style={{ color: "#a855f7", fontSize: "18px", fontWeight: "600", fontFamily: "monospace" }}>
                {time.toLocaleTimeString()}
              </div>
            </div>
            <div style={{ background: "#1a0a2e", padding: "10px 20px", borderRadius: "8px", border: "1px solid #a855f7" }}>
              <div style={{ color: "#64748b", fontSize: "10px" }}>ADMIN</div>
              <div style={{ color: "#fff", fontWeight: "600" }}>Dylann (Owner)</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "15px" }}>
          <div style={{ background: "rgba(26, 10, 46, 0.8)", padding: "15px", borderRadius: "10px", border: "1px solid #1e293b", textAlign: "center" }}>
            <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>${(analytics.totalRevenue / 1000).toFixed(0)}K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Total Revenue</div>
          </div>
          <div style={{ background: "rgba(26, 10, 46, 0.8)", padding: "15px", borderRadius: "10px", border: "1px solid #1e293b", textAlign: "center" }}>
            <div style={{ color: "#00d4ff", fontSize: "24px", fontWeight: "700" }}>+{analytics.monthlyGrowth}%</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Growth</div>
          </div>
          <div style={{ background: "rgba(26, 10, 46, 0.8)", padding: "15px", borderRadius: "10px", border: "1px solid #1e293b", textAlign: "center" }}>
            <div style={{ color: "#a855f7", fontSize: "24px", fontWeight: "700" }}>{analytics.conversionRate}%</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Conversion</div>
          </div>
          <div style={{ background: "rgba(26, 10, 46, 0.8)", padding: "15px", borderRadius: "10px", border: "1px solid #1e293b", textAlign: "center" }}>
            <div style={{ color: "#ffd700", fontSize: "24px", fontWeight: "700" }}>${(analytics.avgDealValue / 1000).toFixed(0)}K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Avg Deal</div>
          </div>
          <div style={{ background: "rgba(26, 10, 46, 0.8)", padding: "15px", borderRadius: "10px", border: "1px solid #1e293b", textAlign: "center" }}>
            <div style={{ color: "#ff8800", fontSize: "24px", fontWeight: "700" }}>{analytics.pipeline / 1000}K</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Pipeline</div>
          </div>
          <div style={{ background: "rgba(26, 10, 46, 0.8)", padding: "15px", borderRadius: "10px", border: "1px solid #1e293b", textAlign: "center" }}>
            <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>{cxMetrics.nps}</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>NPS Score</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "20px" }}>
        <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "15px" }}>
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
                background: activeSection === item.id ? "rgba(168, 85, 247, 0.15)" : "transparent",
                color: activeSection === item.id ? "#a855f7" : "#64748b",
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
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div>
          {activeSection === "dashboard" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
                <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Recent Contacts</h3>
                {contacts.slice(0, 4).map(c => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#1e293b", borderRadius: "8px", marginBottom: "8px" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{c.name}</div>
                      <div style={{ color: "#64748b", fontSize: "11px" }}>{c.company}</div>
                    </div>
                    <span style={{ color: getStatusColor(c.status), fontSize: "11px", textTransform: "uppercase" }}>{c.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
                <h3 style={{ color: "#00d4ff", marginBottom: "15px" }}>Active Deals</h3>
                {deals.filter(d => d.stage !== "closed").map(d => (
                  <div key={d.id} style={{ padding: "10px", background: "#1e293b", borderRadius: "8px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ color: "#fff", fontWeight: "600", fontSize: "13px" }}>{d.name}</span>
                      <span style={{ color: "#00ff88" }}>${d.value.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: getStageColor(d.stage), fontSize: "11px" }}>{d.stage}</span>
                      <div style={{ flex: 1, height: "4px", background: "#0f172a", borderRadius: "2px" }}>
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
            <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ color: "#a855f7" }}>Contacts</h3>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ background: "#1e293b", border: "1px solid #334155", padding: "8px 15px", borderRadius: "8px", color: "#fff", fontSize: "13px", width: "250px" }}
                />
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e293b" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>NAME</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>COMPANY</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>EMAIL</th>
                    <th style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>STATUS</th>
                    <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>VALUE</th>
                    <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>LAST CONTACT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map(c => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #1e293b" }}>
                      <td style={{ padding: "12px", color: "#fff", fontWeight: "500" }}>{c.name}</td>
                      <td style={{ padding: "12px", color: "#64748b" }}>{c.company}</td>
                      <td style={{ padding: "12px", color: "#00aaff" }}>{c.email}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <span style={{ color: getStatusColor(c.status), fontSize: "11px", textTransform: "uppercase", background: `${getStatusColor(c.status)}20`, padding: "4px 8px", borderRadius: "4px" }}>{c.status}</span>
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#00ff88" }}>${c.value.toLocaleString()}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#64748b" }}>{c.lastContact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "deals" && (
            <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
              <h3 style={{ color: "#a855f7", marginBottom: "20px" }}>Deals Pipeline</h3>
              {deals.map(d => (
                <div key={d.id} style={{ background: "#1e293b", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <div>
                      <span style={{ color: "#fff", fontWeight: "600" }}>{d.name}</span>
                      <span style={{ color: "#64748b", marginLeft: "10px", fontSize: "12px" }}>Owner: {d.owner}</span>
                    </div>
                    <span style={{ color: "#00ff88", fontWeight: "700", fontSize: "18px" }}>${d.value.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ color: getStageColor(d.stage), fontSize: "12px", textTransform: "uppercase" }}>{d.stage}</span>
                    <div style={{ flex: 1, height: "6px", background: "#0f172a", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${d.probability}%`, height: "100%", background: d.stage === "closed" ? "#00ff88" : "linear-gradient(90deg, #a855f7, #00d4ff)", borderRadius: "3px" }}></div>
                    </div>
                    <span style={{ color: "#64748b", fontSize: "12px" }}>{d.probability}% • {d.closeDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "tasks" && (
            <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
              <h3 style={{ color: "#a855f7", marginBottom: "20px" }}>Tasks</h3>
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px", 
                    padding: "12px", 
                    background: task.completed ? "#1e293b" : "#1e293b",
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
                    border: task.completed ? "2px solid #00ff88" : "2px solid #64748b",
                    background: task.completed ? "#00ff88" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {task.completed && <span style={{ color: "#000", fontSize: "12px" }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: task.completed ? "#64748b" : "#fff", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
                  </div>
                  <span style={{ 
                    color: task.priority === "high" ? "#ff4444" : task.priority === "medium" ? "#ff8800" : "#64748b",
                    fontSize: "11px",
                    textTransform: "uppercase"
                  }}>{task.priority}</span>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{task.due}</span>
                </div>
              ))}
            </div>
          )}

          {activeSection === "security" && (
            <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
              <h3 style={{ color: "#ff4444", marginBottom: "20px" }}>Security Center</h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {securityAlerts.map(alert => (
                  <div 
                    key={alert.id} 
                    style={{ 
                      background: alert.severity === "critical" ? "rgba(255, 68, 68, 0.1)" : alert.severity === "warning" ? "rgba(255, 136, 0, 0.1)" : "rgba(0, 212, 255, 0.1)",
                      padding: "15px", 
                      borderRadius: "8px",
                      border: alert.severity === "critical" ? "1px solid #ff4444" : alert.severity === "warning" ? "1px solid #ff8800" : "1px solid #00d4ff",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px"
                    }}
                  >
                    <span style={{ 
                      color: alert.severity === "critical" ? "#ff4444" : alert.severity === "warning" ? "#ff8800" : "#00d4ff",
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
            <div style={{ background: "#0f172a", borderRadius: "12px", border: "1px solid #1e293b", padding: "20px" }}>
              <h3 style={{ color: "#00d4ff", marginBottom: "20px" }}>CX Analytics</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                {[
                  { label: "NPS Score", value: cxMetrics.nps, color: "#00ff88" },
                  { label: "Customer Satisfaction", value: cxMetrics.satisfaction + "%", color: "#00d4ff" },
                  { label: "Avg Response Time", value: cxMetrics.responseTime, color: "#a855f7" },
                  { label: "First Contact Resolution", value: cxMetrics.firstContact + "%", color: "#ffd700" },
                  { label: "Retention Rate", value: cxMetrics.retention + "%", color: "#ff8800" }
                ].map(metric => (
                  <div key={metric.label} style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ color: metric.color, fontSize: "28px", fontWeight: "700" }}>{metric.value}</div>
                    <div style={{ color: "#64748b", fontSize: "11px", marginTop: "5px" }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "ai" && (
            <div style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(0, 212, 255, 0.1))", borderRadius: "12px", border: "1px solid #a855f7", padding: "30px", textAlign: "center" }}>
              <h3 style={{ color: "#a855f7", marginBottom: "20px", fontSize: "24px" }}>Einstein AI Insights</h3>
              <div style={{ color: "#fff", fontSize: "16px", lineHeight: "1.8", marginBottom: "20px" }}>
                <p>Based on your pipeline analysis, <span style={{ color: "#00ff88" }}>CloudNexus</span> has 68% probability to close this month.</p>
                <p style={{ marginTop: "15px" }}>Recommended action: <span style={{ color: "#ffd700" }}>Send enterprise proposal by Friday</span> to maximize close rate.</p>
                <p style={{ marginTop: "15px" }}>Your top performer: <span style={{ color: "#00d4ff" }}>Security Suite deals (42% of revenue)</span></p>
              </div>
              <button style={{ background: "linear-gradient(135deg, #a855f7, #00d4ff)", color: "#000", border: "none", padding: "12px 30px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
                Get More Insights
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}