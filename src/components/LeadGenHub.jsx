import { useState, useEffect } from "react";

const LEAD_MAGNETS = [
  { id: 1, name: "Free Trading Guide", downloads: 12500, conversion: 4.2, price: 0, category: "PDF" },
  { id: 2, name: "Harmonic Patterns Course", downloads: 8200, conversion: 6.8, price: 0, category: "Video" },
  { id: 3, name: "MAXAI Bot Template", downloads: 5600, conversion: 8.5, price: 0, category: "Template" },
  { id: 4, name: "Prop Firm Checklist", downloads: 4100, conversion: 12.2, price: 0, category: "PDF" },
  { id: 5, name: "Martingale Calculator", downloads: 3200, conversion: 15.4, price: 0, category: "Tool" },
  { id: 6, name: "VIP Signals Trial", downloads: 2800, conversion: 28.5, price: 0, category: "Access" }
];

const EMAIL_CAMPAIGNS = [
  { id: 1, name: "Weekly Analysis", status: "active", sent: 45000, open: 28.5, click: 4.2, schedule: "Every Monday" },
  { id: 2, name: "Signal Alerts", status: "active", sent: 125000, open: 65.2, click: 12.8, schedule: "Real-time" },
  { id: 3, name: "Promotional", status: "active", sent: 85000, open: 22.1, click: 3.5, schedule: "3x/week" },
  { id: 4, name: "New Product Launch", status: "scheduled", sent: 0, open: 0, click: 0, schedule: "2026-05-10" },
  { id: 5, name: "Re-engagement", status: "paused", sent: 12000, open: 15.2, click: 1.2, schedule: "Paused" }
];

const SEGMENTS = [
  { id: 1, name: "All Subscribers", count: 52000, growth: 12.5 },
  { id: 2, name: "Active Traders", count: 18500, growth: 8.2 },
  { id: 3, name: "VIP Members", count: 3200, growth: 15.6 },
  { id: 4, name: "Free Users", count: 42000, growth: 5.4 },
  { id: 5, name: "Newsletter Only", count: 28000, growth: 3.2 },
  { id: 6, name: "Churned", count: 8500, growth: -2.1 }
];

const AUTOMATIONS = [
  { id: 1, name: "Welcome Series", trigger: "New signup", emails: 5, status: "active" },
  { id: 2, name: "Purchase Thank You", trigger: "Purchase", emails: 3, status: "active" },
  { id: 3, name: "Abandoned Cart", trigger: "Cart abandoned", emails: 2, status: "active" },
  { id: 4, name: "Inactive 30 Days", trigger: "No activity", emails: 4, status: "paused" },
  { id: 5, name: "Upsell MAXAI", trigger: "Pro user", emails: 3, status: "active" }
];

const LANDING_PAGES = [
  { id: 1, name: "MAXAI Landing", url: "madfx.boss/maxai", views: 45000, conv: 8.2 },
  { id: 2, name: "FTMO Course", url: "madfx.boss/ftmo", views: 28000, conv: 12.5 },
  { id: 3, name: "Token Presale", url: "madfx.boss/presale", views: 15000, conv: 15.8 },
  { id: 4, name: "VIP Signup", url: "madfx.boss/vip", views: 8500, conv: 22.4 },
  { id: 5, name: "Webinar Reg", url: "madfx.boss/webinar", views: 5200, conv: 18.2 }
];

export default function LeadGenHub() {
  const [tab, setTab] = useState("dashboard");
  const [subscribers, setSubscribers] = useState(52000);
  const [newLeads, setNewLeads] = useState(0);
  const [campaigns, setCampaigns] = useState(EMAIL_CAMPAIGNS);
  const [showCompose, setShowCompose] = useState(false);
  const [emailForm, setEmailForm] = useState({ subject: "", body: "", segment: "all", delay: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setNewLeads(Math.floor(Math.random() * 10) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const avgOpen = campaigns.length > 0 ? campaigns.filter(c => c.sent > 0).reduce((sum, c) => sum + c.open, 0) / campaigns.filter(c => c.sent > 0).length : 0;
  const avgClick = campaigns.length > 0 ? campaigns.filter(c => c.sent > 0).reduce((sum, c) => sum + c.click, 0) / campaigns.filter(c => c.sent > 0).length : 0;

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MADFX LEAD GEN</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Email Marketing & Lead Generation</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>SUBSCRIBERS</div>
          <div style={{ color: "#00aaff", fontSize: "22px", fontWeight: "700" }}>{(subscribers/1000).toFixed(1)}K</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>NEW LEADS</div>
          <div style={{ color: "#00ff88", fontSize: "22px", fontWeight: "700" }}>+{newLeads}/hr</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>EMAILS SENT</div>
          <div style={{ color: "#d4a012", fontSize: "22px", fontWeight: "700" }}>{(totalSent/1000).toFixed(0)}K</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>OPEN RATE</div>
          <div style={{ color: "#10b981", fontSize: "22px", fontWeight: "700" }}>{avgOpen.toFixed(1)}%</div>
        </div>
      </div>

      {newLeads > 0 && (
        <div style={{ background: "linear-gradient(90deg, #10b981, #00aaff)", padding: "10px", borderRadius: "8px", marginBottom: "20px", textAlign: "center", color: "#fff", fontWeight: "600" }}>
          🔔 {newLeads} new leads in the last hour!
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {["dashboard", "magnets", "emails", "pages", "automations"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? "#d4a012" : "transparent",
              color: tab === t ? "#0a0a0a" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setShowCompose(true)}
          style={{
            background: "#10b981",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
            marginLeft: "auto"
          }}
        >
          + Compose
        </button>
      </div>

      {tab === "dashboard" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "16px", marginBottom: "15px" }}>Top Segments</h3>
            {SEGMENTS.slice(0, 4).map(s => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #0d1525" }}>
                <span style={{ color: "#fff" }}>{s.name}</span>
                <span style={{ color: s.growth > 0 ? "#10b981" : "#ef4444" }}>{s.count.toLocaleString()} ({s.growth > 0 ? "+" : ""}{s.growth}%)</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "16px", marginBottom: "15px" }}>Active Campaigns</h3>
            {campaigns.filter(c => c.status === "active").map(c => (
              <div key={c.id} style={{ padding: "10px 0", borderBottom: "1px solid #0d1525" }}>
                <div style={{ color: "#fff", fontWeight: "500" }}>{c.name}</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{c.sent.toLocaleString()} sent • {c.open}% open • {c.click}% click</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "16px", marginBottom: "15px" }}>Quick Stats</h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #0d1525" }}>
              <span style={{ color: "#64748b" }}>Click Rate</span>
              <span style={{ color: "#10b981" }}>{avgClick.toFixed(1)}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #0d1525" }}>
              <span style={{ color: "#64748b" }}>Unsubscribe Rate</span>
              <span style={{ color: "#ef4444" }}>0.8%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #0d1525" }}>
              <span style={{ color: "#64748b" }}>Bounce Rate</span>
              <span style={{ color: "#f59e0b" }}>2.1%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
              <span style={{ color: "#64748b" }}>Forward Rate</span>
              <span style={{ color: "#00aaff" }}>5.2%</span>
            </div>
          </div>
        </div>
      )}

      {tab === "magnets" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
          {LEAD_MAGNETS.map(magnet => (
            <div key={magnet.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{magnet.name}</h3>
                <span style={{ background: "rgba(59,130,246,0.2)", color: "#3b82f6", padding: "3px 10px", borderRadius: "4px", fontSize: "10px" }}>{magnet.category}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div><span style={{ color: "#64748b", fontSize: "11px" }}>Downloads</span><div style={{ color: "#00aaff", fontSize: "18px", fontWeight: "700" }}>{magnet.downloads.toLocaleString()}</div></div>
                <div><span style={{ color: "#64748b", fontSize: "11px" }}>Conversion</span><div style={{ color: "#10b981", fontSize: "18px", fontWeight: "700" }}>{magnet.conversion}%</div></div>
              </div>
              <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px" }}>
                <div style={{ width: `${magnet.conversion * 3}%`, height: "100%", background: "#10b981", borderRadius: "4px" }}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "emails" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "15px", background: "#0d1525", color: "#64748b", fontSize: "12px", fontWeight: "600" }}>
            <span>CAMPAIGN</span>
            <span>STATUS</span>
            <span>SENT</span>
            <span>OPEN</span>
            <span>CLICK</span>
            <span>SCHEDULE</span>
          </div>
          {campaigns.map(c => (
            <div key={c.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", padding: "15px", borderBottom: "1px solid #0d1525", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: "500" }}>{c.name}</span>
              <span style={{ color: c.status === "active" ? "#10b981" : c.status === "scheduled" ? "#f59e0b" : "#64748b", background: c.status === "active" ? "rgba(16,185,129,0.2)" : c.status === "scheduled" ? "rgba(245,158,11,0.2)" : "rgba(100,116,139,0.2)", padding: "3px 10px", borderRadius: "4px", fontSize: "10px", textAlign: "center" }}>{c.status.toUpperCase()}</span>
              <span style={{ color: "#00aaff" }}>{c.sent > 0 ? c.sent.toLocaleString() : "-"}</span>
              <span style={{ color: c.open > 30 ? "#10b981" : "#fff" }}>{c.open > 0 ? c.open + "%" : "-"}</span>
              <span style={{ color: c.click > 5 ? "#10b981" : "#fff" }}>{c.click > 0 ? c.click + "%" : "-"}</span>
              <span style={{ color: "#64748b", fontSize: "12px" }}>{c.schedule}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "pages" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
          {LANDING_PAGES.map(page => (
            <div key={page.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{page.name}</h3>
                <span style={{ color: "#00aaff", fontSize: "12px" }}>{page.url}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div><span style={{ color: "#64748b", fontSize: "11px" }}>Views</span><div style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>{page.views.toLocaleString()}</div></div>
                <div><span style={{ color: "#64748b", fontSize: "11px" }}>Conversion</span><div style={{ color: "#10b981", fontSize: "20px", fontWeight: "700" }}>{page.conv}%</div></div>
              </div>
              <button style={{ width: "100%", background: "#0d1525", border: "1px solid #1e3a5f", padding: "10px", borderRadius: "8px", color: "#64748b", fontSize: "12px", cursor: "pointer" }}>
                Edit Page →
              </button>
            </div>
          ))}
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #1e3a5f", cursor: "pointer" }}>
            <span style={{ color: "#64748b", fontSize: "16px" }}>+ Create Landing Page</span>
          </div>
        </div>
      )}

      {tab === "automations" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
          {AUTOMATIONS.map(auto => (
            <div key={auto.id} style={{ display: "flex", alignItems: "center", padding: "20px", borderBottom: "1px solid #0d1525" }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: "600", fontSize: "16px" }}>{auto.name}</div>
                <div style={{ color: "#64748b", fontSize: "12px" }}>Trigger: {auto.trigger} • {auto.emails} emails</div>
              </div>
              <span style={{ color: auto.status === "active" ? "#10b981" : "#64748b", background: auto.status === "active" ? "rgba(16,185,129,0.2)" : "rgba(100,116,139,0.2)", padding: "5px 15px", borderRadius: "20px", fontSize: "12px" }}>
                {auto.status.toUpperCase()}
              </span>
              <button style={{ background: "#0d1525", border: "none", padding: "8px 15px", borderRadius: "6px", color: "#64748b", marginLeft: "15px", cursor: "pointer" }}>Edit</button>
            </div>
          ))}
        </div>
      )}

      {showCompose && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "600px", width: "90%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h3 style={{ color: "#d4a012", fontSize: "20px" }}>Compose Email</h3>
              <button onClick={() => setShowCompose(false)} style={{ background: "none", border: "none", color: "#64748b", fontSize: "24px", cursor: "pointer" }}>×</button>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Subject Line</label>
              <input
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                placeholder="Enter subject..."
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Recipient Segment</label>
              <select
                value={emailForm.segment}
                onChange={(e) => setEmailForm({...emailForm, segment: e.target.value})}
                style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
              >
                {SEGMENTS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.count})</option>)}
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Email Body</label>
              <textarea
                value={emailForm.body}
                onChange={(e) => setEmailForm({...emailForm, body: e.target.value})}
                rows={8}
                style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff", resize: "none" }}
                placeholder="Write your email..."
              />
            </div>
            <button
              onClick={() => { alert("Email scheduled!"); setShowCompose(false); }}
              style={{ width: "100%", background: "#10b981", border: "none", padding: "15px", borderRadius: "8px", color: "#fff", fontWeight: "700", cursor: "pointer" }}
            >
              Send or Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}