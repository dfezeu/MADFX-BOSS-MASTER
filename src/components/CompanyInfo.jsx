import { useState } from "react";

export default function CompanyInfo() {
  const [expanded, setExpanded] = useState(false);
  
  const companyInfo = {
    name: "MADFX BOSS",
    tagline: "Making A Difference through Futures Exchange, Built On Superior Systems",
    founded: "2024",
    mission: "Restore financial equity to everyday investors while funding social good initiatives",
    vision: "To become the leading AI-powered trading platform that empowers users with autonomous trading agents while creating positive social impact",
    values: [
      "Innovation & Technology Excellence",
      "Financial Inclusion & Accessibility", 
      "Social Responsibility & Community Impact",
      "Transparency & Trust",
      "Continuous Learning & Improvement"
    ],
    team: [
      { name: "Dylann Fezeu", role: "Founder & CEO", bio: "Systems-level thinker and iterative builder with expertise in AI, trading systems, and blockchain technology" },
      { name: "Alex Morgan", role: "CTO", bio: "Full-stack developer specializing in React/Vite applications and AI integration" },
      { name: "Samira Khan", role: "Head of AI", bio: "Machine learning expert focused on financial AI models and autonomous trading systems" }
    ],
    stats: [
      { label: "Active Users", value: "1,245", icon: "👥" },
      { label: "Trades Executed", value: "45,820", icon: "📊" },
      { label: "AI Agents Deployed", value: "89", icon: "🤖" },
      { label: "Social Impact Fund", value: "$12,450", icon: "💰" }
    ]
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>COMPANY INFORMATION</h2>
        <button 
          onClick={() => setExpanded(!expanded)}
          style={{
            background: expanded ? "#10b981" : "#3b82f6",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {expanded ? "Collapse" : "Expand Details"}
        </button>
      </div>
      
      {expanded && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "25px" }}>
          <div>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>About MADFX BOSS</h3>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}><strong>Tagline:</strong> {companyInfo.tagline}</p>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}><strong>Founded:</strong> {companyInfo.founded}</p>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}><strong>Mission:</strong> {companyInfo.mission}</p>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}><strong>Vision:</strong> {companyInfo.vision}</p>
          </div>
          
          <div>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Core Values</h3>
            <ul style={{ color: "#64748b", lineHeight: "1.8", paddingLeft: "20px" }}>
              {companyInfo.values.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Leadership Team</h3>
            {companyInfo.team.map((member, index) => (
              <div key={index} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "10px", marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h4 style={{ color: "#fff", margin: "0" }}>{member.name}</h4>
                  <span style={{ color: "#10b981", fontSize: "14px" }}>{member.role}</span>
                </div>
                <p style={{ color: "#888", fontSize: "13px", margin: "0" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px", textAlign: "center" }}>Key Statistics</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
          {companyInfo.stats.map((stat, index) => (
            <div key={index} style={{ textAlign: "center", padding: "15px", background: "#0d1525", borderRadius: "8px" }}>
              <div style={{ fontSize: "24px", marginBottom: "5px" }}>{stat.icon}</div>
              <div style={{ color: "#00ff88", fontSize: "20px", fontWeight: "700" }}>{stat.value}</div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}