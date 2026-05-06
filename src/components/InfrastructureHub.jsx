import { useState, useEffect } from "react";

export default function InfrastructureHub() {
  const [activeSection, setActiveSection] = useState("employees");
  const [aiEmployees, setAiEmployees] = useState([
    { 
      id: 1, 
      name: "CODY", 
      role: "Chief Infrastructure Architect", 
      avatar: "🏗",
      status: "active",
      specialty: "Cloud Architecture & Scalability",
      tasks: [
        { id: 1, title: "Design multi-region Kubernetes cluster", progress: 75, priority: "high" },
        { id: 2, title: "Optimize cloud costs", progress: 45, priority: "medium" }
      ],
      stats: { completed: 24, active: 2, pending: 3 }
    },
    { 
      id: 2, 
      name: "NEXA", 
      role: "Lead Security Engineer", 
      avatar: "🔐",
      status: "active",
      specialty: "Zero-Trust Security",
      tasks: [
        { id: 1, title: "Implement SOC2 compliance", progress: 60, priority: "high" },
        { id: 2, title: "Deploy threat detection", progress: 30, priority: "high" }
      ],
      stats: { completed: 18, active: 2, pending: 4 }
    },
    { 
      id: 3, 
      name: "BLAZE", 
      role: "DevOps Engineer", 
      avatar: "⚡",
      status: "active",
      specialty: "CI/CD & Automation",
      tasks: [
        { id: 1, title: "Setup GitHub Actions", progress: 100, priority: "high" },
        { id: 2, title: "Configure auto-scaling", progress: 80, priority: "medium" }
      ],
      stats: { completed: 31, active: 3, pending: 1 }
    },
    { 
      id: 4, 
      name: "DATA", 
      role: "Data Infrastructure Lead", 
      avatar: "💾",
      status: "active",
      specialty: "Database & Analytics",
      tasks: [
        { id: 1, title: "Setup TimescaleDB cluster", progress: 90, priority: "high" },
        { id: 2, title: "Configure Redis cache", progress: 100, priority: "medium" }
      ],
      stats: { completed: 22, active: 1, pending: 2 }
    },
    { 
      id: 5, 
      name: "PROTOCOL", 
      role: "Blockchain Architect", 
      avatar: "⛓",
      status: "active",
      specialty: "Smart Contracts & DeFi",
      tasks: [
        { id: 1, title: "Audit NXUS token", progress: 45, priority: "high" },
        { id: 2, title: "Deploy LP contracts", progress: 20, priority: "medium" }
      ],
      stats: { completed: 8, active: 2, pending: 5 }
    },
    { 
      id: 6, 
      name: "SENTRY", 
      role: "Monitoring Director", 
      avatar: "📡",
      status: "active",
      specialty: "Observability & Alerts",
      tasks: [
        { id: 1, title: "Setup Prometheus", progress: 100, priority: "high" },
        { id: 2, title: "Configure Slack alerts", progress: 100, priority: "medium" }
      ],
      stats: { completed: 15, active: 0, pending: 0 }
    }
  ]);

  const [infrastructure, setInfrastructure] = useState({
    servers: [
      { name: "US-East-1 Primary", region: "Virginia", status: "healthy", cpu: 42, memory: 68, storage: 45, type: "Production" },
      { name: "US-West-2 Secondary", region: "Oregon", status: "healthy", cpu: 35, memory: 52, storage: 38, type: "Production" },
      { name: "EU-West-1", region: "Ireland", status: "healthy", cpu: 28, memory: 41, storage: 32, type: "EU" },
      { name: "AP-Southeast-1", region: "Singapore", status: "warning", cpu: 78, memory: 85, storage: 72, type: "Asia" }
    ],
    databases: [
      { name: "PostgreSQL Main", replicas: 3, connections: 234, size: "45GB", status: "healthy" },
      { name: "TimescaleDB", replicas: 2, connections: 156, size: "128GB", status: "healthy" },
      { name: "Redis Cache", replicas: 4, connections: 1240, size: "8GB", status: "healthy" },
      { name: "S3 Storage", buckets: 12, size: "2.4TB", status: "healthy" }
    ],
    services: [
      { name: "API Gateway", uptime: 99.98, requests: "2.4M/day", latency: "12ms", status: "healthy" },
      { name: "Auth Service", uptime: 99.99, requests: "890K/day", latency: "8ms", status: "healthy" },
      { name: "Trading Engine", uptime: 99.95, requests: "5.2M/day", latency: "2ms", status: "healthy" },
      { name: "AI Pipeline", uptime: 99.90, requests: "450K/day", latency: "45ms", status: "healthy" },
      { name: "Notification", uptime: 99.99, requests: "1.2M/day", latency: "5ms", status: "healthy" }
    ],
    costs: {
      current: 2450,
      forecast: 2680,
      savings: 12,
      breakdown: [
        { service: "EC2 Instances", cost: 890 },
        { service: "RDS Database", cost: 420 },
        { service: "S3 Storage", cost: 180 },
        { service: "Data Transfer", cost: 145 },
        { service: "AI/API Calls", cost: 815 }
      ]
    }
  });

  const [pipelines, setPipelines] = useState([
    { id: 1, name: "Production Deploy", branch: "main", status: "success", lastRun: "10m ago", duration: "2m 34s" },
    { id: 2, name: "Staging Deploy", branch: "develop", status: "success", lastRun: "45m ago", duration: "1m 52s" },
    { id: 3, name: "Security Scan", branch: "main", status: "running", lastRun: "Now", duration: "45s" },
    { id: 4, name: "Load Test", branch: "feature/load", status: "pending", lastRun: "2h ago", duration: "8m 12s" }
  ]);

  const [repos, setRepos] = useState([
    { name: "MADFX-BOSS-MASTER", language: "React", stars: 2, commits: 156, prs: 8, branches: 4, lastCommit: "15m ago" },
    { name: "MADFX-Contract", language: "Solidity", stars: 1, commits: 45, prs: 2, branches: 2, lastCommit: "3h ago" },
    { name: "MADFX-Infrastructure", language: "Terraform", stars: 0, commits: 89, prs: 4, branches: 3, lastCommit: "1d ago" },
    { name: "MADFX-ML-Models", language: "Python", stars: 1, commits: 34, prs: 1, branches: 2, lastCommit: "5d ago" }
  ]);

  const getStatusColor = (status) => {
    if (status === "healthy" || status === "active" || status === "success") return "#10b981";
    if (status === "warning" || status === "running") return "#f59e0b";
    if (status === "error" || status === "failed") return "#ef4444";
    return "#64748b";
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>INFRASTRUCTURE HUB</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>AI Employees Building Enterprise Infrastructure</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {[
          { id: "employees", label: "AI Employees", icon: "👥" },
          { id: "servers", label: "Servers", icon: "🖥" },
          { id: "databases", label: "Databases", icon: "💾" },
          { id: "pipelines", label: "CI/CD", icon: "⚡" },
          { id: "repos", label: "Repositories", icon: "📦" },
          { id: "costs", label: "Costs", icon: "💰" }
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

      {activeSection === "employees" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#10b981", fontSize: "32px", fontWeight: "700" }}>6</div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>Active AI Employees</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#3b82f6", fontSize: "32px", fontWeight: "700" }}>118</div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>Tasks Completed</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#d4a012", fontSize: "32px", fontWeight: "700" }}>17</div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>Active Tasks</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {aiEmployees.map(emp => (
              <div key={emp.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ fontSize: "32px" }}>{emp.avatar}</span>
                    <div>
                      <div style={{ color: "#d4a012", fontWeight: "700", fontSize: "18px" }}>{emp.name}</div>
                      <div style={{ color: "#64748b", fontSize: "12px" }}>{emp.role}</div>
                    </div>
                  </div>
                  <div style={{ 
                    width: "10px", 
                    height: "10px", 
                    borderRadius: "50%", 
                    background: "#10b981",
                    boxShadow: "0 0 10px #10b981"
                  }}></div>
                </div>
                <div style={{ color: "#3b82f6", fontSize: "12px", marginBottom: "15px" }}>{emp.specialty}</div>
                
                <div style={{ marginBottom: "15px" }}>
                  {emp.tasks.map(task => (
                    <div key={task.id} style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ color: "#fff", fontSize: "12px" }}>{task.title}</span>
                        <span style={{ color: task.priority === "high" ? "#ef4444" : "#f59e0b", fontSize: "11px" }}>{task.priority}</span>
                      </div>
                      <div style={{ height: "4px", background: "#0d1525", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{ width: `${task.progress}%`, height: "100%", background: task.progress === 100 ? "#10b981" : "#3b82f6", borderRadius: "2px" }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #0d1525", paddingTop: "15px" }}>
                  <span style={{ color: "#10b981", fontSize: "12px" }}>{emp.stats.completed} completed</span>
                  <span style={{ color: "#f59e0b", fontSize: "12px" }}>{emp.stats.active} active</span>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>{emp.stats.pending} pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "servers" && (
        <div>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#0d1525" }}>
                  <th style={{ padding: "15px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>SERVER</th>
                  <th style={{ padding: "15px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>REGION</th>
                  <th style={{ padding: "15px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>CPU</th>
                  <th style={{ padding: "15px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>MEMORY</th>
                  <th style={{ padding: "15px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>STORAGE</th>
                  <th style={{ padding: "15px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {infrastructure.servers.map((srv, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #0d152525" }}>
                    <td style={{ padding: "15px", color: "#fff", fontWeight: "600" }}>{srv.name}</td>
                    <td style={{ padding: "15px", color: "#64748b" }}>{srv.region}</td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ width: "60px", height: "4px", background: "#0d1525", borderRadius: "2px", margin: "0 auto" }}>
                        <div style={{ width: `${srv.cpu}%`, height: "100%", background: srv.cpu > 70 ? "#ef4444" : "#3b82f6", borderRadius: "2px" }}></div>
                      </div>
                      <div style={{ color: "#fff", fontSize: "11px", marginTop: "4px" }}>{srv.cpu}%</div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ width: "60px", height: "4px", background: "#0d1525", borderRadius: "2px", margin: "0 auto" }}>
                        <div style={{ width: `${srv.memory}%`, height: "100%", background: srv.memory > 70 ? "#ef4444" : "#3b82f6", borderRadius: "2px" }}></div>
                      </div>
                      <div style={{ color: "#fff", fontSize: "11px", marginTop: "4px" }}>{srv.memory}%</div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <div style={{ width: "60px", height: "4px", background: "#0d1525", borderRadius: "2px", margin: "0 auto" }}>
                        <div style={{ width: `${srv.storage}%`, height: "100%", background: srv.storage > 70 ? "#ef4444" : "#3b82f6", borderRadius: "2px" }}></div>
                      </div>
                      <div style={{ color: "#fff", fontSize: "11px", marginTop: "4px" }}>{srv.storage}%</div>
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <span style={{ color: getStatusColor(srv.status), fontSize: "11px", textTransform: "uppercase" }}>{srv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === "databases" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
            {infrastructure.databases.map((db, idx) => (
              <div key={idx} style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <span style={{ color: "#fff", fontWeight: "600", fontSize: "16px" }}>{db.name}</span>
                  <span style={{ color: "#10b981", fontSize: "12px" }}>{db.status}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", fontSize: "12px" }}>
                  <div>
                    <div style={{ color: "#64748b" }}>Replicas</div>
                    <div style={{ color: "#fff" }}>{db.replicas}</div>
                  </div>
                  <div>
                    <div style={{ color: "#64748b" }}>Connections</div>
                    <div style={{ color: "#fff" }}>{db.connections}</div>
                  </div>
                  <div>
                    <div style={{ color: "#64748b" }}>Size</div>
                    <div style={{ color: "#d4a012" }}>{db.size}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "pipelines" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012" }}>CI/CD Pipelines</h3>
            <button style={{ background: "#10b981", border: "none", padding: "8px 16px", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "12px" }}>+ New Pipeline</button>
          </div>
          <div style={{ display: "grid", gap: "10px" }}>
            {pipelines.map(pipe => (
              <div key={pipe.id} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: "600" }}>{pipe.name}</div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>{pipe.branch} • {pipe.lastRun}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{ color: "#64748b", fontSize: "12px" }}>{pipe.duration}</span>
                  <span style={{ color: getStatusColor(pipe.status), fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>{pipe.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "repos" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012" }}>Code Repositories</h3>
            <button style={{ background: "#3b82f6", border: "none", padding: "8px 16px", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "12px" }}>+ New Repository</button>
          </div>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
            {repos.map((repo, idx) => (
              <div key={idx} style={{ padding: "15px 20px", borderBottom: idx < repos.length - 1 ? "1px solid #0d1525" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: "600" }}>{repo.name}</div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>{repo.language} • {repo.lastCommit}</div>
                </div>
                <div style={{ display: "flex", gap: "20px", fontSize: "12px" }}>
                  <span style={{ color: "#f59e0b" }}>★ {repo.stars}</span>
                  <span style={{ color: "#3b82f6" }}>{repo.commits} commits</span>
                  <span style={{ color: "#10b981" }}>{repo.prs} PRs</span>
                  <span style={{ color: "#64748b" }}>{repo.branches} branches</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "costs" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: "28px", fontWeight: "700" }}>${infrastructure.costs.current}</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Current Monthly</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#f59e0b", fontSize: "28px", fontWeight: "700" }}>${infrastructure.costs.forecast}</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Forecast</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#10b981", fontSize: "28px", fontWeight: "700" }}>{infrastructure.costs.savings}%</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Savings</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#3b82f6", fontSize: "28px", fontWeight: "700" }}>99.98%</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Uptime</div>
            </div>
          </div>
          <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Cost Breakdown</h3>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            {infrastructure.costs.breakdown.map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: idx < infrastructure.costs.breakdown.length - 1 ? "1px solid #0d1525" : "none" }}>
                <span style={{ color: "#fff" }}>{item.service}</span>
                <span style={{ color: "#d4a012", fontWeight: "600" }}>${item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}