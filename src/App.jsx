import { useState, useEffect } from "react";
import HarmonicPatternDetector from "./components/HarmonicPatternDetector";
import TGRRLoop from "./components/TGRRLoop";
import PropFirmComplianceChecker from "./components/PropFirmComplianceChecker";
import ArbitrageScanner from "./components/ArbitrageScanner";
import CharityVault from "./components/CharityVault";
import AgentMarketplace from "./components/AgentMarketplace";
import TradingDashboard from "./components/TradingDashboard";
import PoolFarming from "./components/PoolFarming";
import Leaderboard from "./components/Leaderboard";
import LiveMarketFeed from "./components/LiveMarketFeed";
import TokenSystem from "./components/TokenSystem";
import Chillverse from "./components/Chillverse";
import BackendOffice from "./components/BackendOffice";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("mistral");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [secretAccess, setSecretAccess] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);

  const askOllama = async (customPrompt) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model,
          prompt: `You are MADXAI, the MADFX BOSS trading intelligence. ${customPrompt || prompt}`,
          stream: false
        })
      });
      const data = await res.json();
      return data.response;
    } catch (err) {
      return "Ollama not reachable. Make sure it's running.";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setAdminAuth(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSecretAccess = () => {
    const code = prompt("Enter admin access code:");
    if (code === "MADFXBOSS2026" || code === "DYLANN") {
      setAdminAuth(true);
      setActiveTab("admin");
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "◈" },
    { id: "markets", label: "Markets", icon: "◉" },
    { id: "trading", label: "Trading", icon: "⇄" },
    { id: "agents", label: "AI Agents", icon: "◉" },
    { id: "pools", label: "LP Farms", icon: "⬡" },
    { id: "leaderboard", label: "Leaderboard", icon: "♔" },
    { id: "token", label: "NXUS", icon: "◉" },
    { id: "chillverse", label: "Chillverse", icon: "♠" },
    { id: "signals", label: "Signals", icon: "◎" }
  ];

  if (adminAuth && activeTab === "admin") {
    return <BackendOffice />;
  }

  return (
    <div style={{ background: "#030712", minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav style={{ 
        background: "rgba(3, 7, 18, 0.9)", 
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1e293b",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "15px 0" }}>
          <h1 style={{ 
            background: "linear-gradient(135deg, #00ff88, #00d4ff)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent", 
            fontSize: "20px", 
            fontWeight: "700",
            letterSpacing: "-0.5px"
          }}>
            MADFX BOSS
          </h1>
          <span style={{ color: "#1e293b", fontSize: "20px" }}>|</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "rgba(0, 255, 136, 0.1)" : "transparent",
                  color: activeTab === tab.id ? "#00ff88" : "#64748b",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: activeTab === tab.id ? "600" : "400",
                  transition: "all 0.2s"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#00ff88" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}></div>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>LIVE</span>
          </div>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ background: "#0f172a", color: "#00ff88", border: "1px solid #1e293b", padding: "6px 10px", borderRadius: "6px", fontSize: "11px" }}
          >
            <option value="mistral">Mistral</option>
            <option value="llama3">LLaMA 3</option>
            <option value="llama3.1">LLaMA 3.1</option>
            <option value="codellama">CodeLlama</option>
            <option value="tinyllama">TinyLlama</option>
          </select>
          <div style={{ background: "linear-gradient(135deg, #ffd700, #ff8800)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }} onClick={handleSecretAccess}>
            <span style={{ color: "#000", fontSize: "12px", fontWeight: "700" }}>12,450 AURA</span>
          </div>
        </div>
      </nav>

      <main style={{ padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
        {activeTab === "dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <LiveMarketFeed />
              <Leaderboard askOllama={askOllama} loading={loading} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TradingDashboard askOllama={askOllama} loading={loading} />
            </div>
          </div>
        )}

        {activeTab === "markets" && <LiveMarketFeed />}
        
        {activeTab === "trading" && <TradingDashboard askOllama={askOllama} loading={loading} />}
        
        {activeTab === "agents" && <AgentMarketplace askOllama={askOllama} loading={loading} />}
        
        {activeTab === "pools" && <PoolFarming askOllama={askOllama} loading={loading} />}
        
        {activeTab === "leaderboard" && <Leaderboard askOllama={askOllama} loading={loading} />}
        
        {activeTab === "token" && <TokenSystem />}
        
        {activeTab === "chillverse" && <Chillverse />}
        
        {activeTab === "signals" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <HarmonicPatternDetector askOllama={askOllama} loading={loading} />
            <TGRRLoop askOllama={askOllama} loading={loading} />
            <PropFirmComplianceChecker askOllama={askOllama} loading={loading} />
            <ArbitrageScanner askOllama={askOllama} loading={loading} />
            <CharityVault />
          </div>
        )}

        <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
          {[
            { label: "TGRR", value: "ACTIVE", color: "#00ff88", icon: "⟳" },
            { label: "AI", value: model.toUpperCase(), color: "#00d4ff", icon: "◆" },
            { label: "NETWORK", value: "MAINNET", color: "#00ff88", icon: "⬡" },
            { label: "VERSION", value: "v2.1", color: "#a855f7", icon: "◆" }
          ].map(stat => (
            <div 
              key={stat.label} 
              style={{ 
                background: "rgba(15, 23, 42, 0.6)", 
                padding: "15px 20px", 
                borderRadius: "12px", 
                border: "1px solid #1e293b",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: stat.label === "VERSION" ? "pointer" : "default"
              }}
              onClick={stat.label === "VERSION" ? handleSecretAccess : undefined}
            >
              <span style={{ color: stat.color, fontSize: "16px" }}>{stat.icon}</span>
              <div>
                <div style={{ color: "#64748b", fontSize: "10px" }}>{stat.label}</div>
                <div style={{ color: stat.color, fontWeight: "600", fontSize: "14px" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}