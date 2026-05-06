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
import TGRRTokenomics from "./components/TGRRTokenomics";
import MarketScanner from "./components/MarketScanner";
import SportsPrediction from "./components/SportsPrediction";
import UpgradeSystem from "./components/UpgradeSystem";
import MAXAITrader from "./components/MAXAITrader";
import WalletConnector from "./components/WalletConnector";
import DeFiStaking from "./components/DeFiStaking";
import TokenLauncher from "./components/TokenLauncher";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("mistral");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminAuth, setAdminAuth] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState("");

  const askOllama = async (customPrompt) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model,
          prompt: `You are MADXAI, the MADFX BOSS trading intelligence. ${customPrompt || ""}`,
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

  const handleSecretAccess = () => {
    setShowAdminModal(true);
  };

  const verifyAdminCode = () => {
    if (adminCode === "MADFXBOSS2026" || adminCode === "DYLANN") {
      setAdminAuth(true);
      setActiveTab("admin");
      setShowAdminModal(false);
      setAdminCode("");
    } else {
      alert("Invalid code");
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "markets", label: "Markets" },
    { id: "scanner", label: "Scanner" },
    { id: "sports", label: "Sports" },
    { id: "trading", label: "Trading" },
    { id: "agents", label: "AI Agents" },
    { id: "maxai", label: "MAXAI" },
    { id: "pools", label: "LP Farms" },
    { id: "wallet", label: "Wallet" },
    { id: "defi", label: "DeFi" },
    { id: "launch", label: "Token" },
    { id: "token", label: "NXUS" },
    { id: "tgrr", label: "TGRR" },
    { id: "leaderboard", label: "Copy" },
    { id: "upgrade", label: "Pro" },
    { id: "chillverse", label: "Casino" },
    { id: "signals", label: "Signals" }
  ];

  if (adminAuth && activeTab === "admin") {
    return <BackendOffice />;
  }

  return (
    <div style={{ background: "#0a0f1a", minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav style={{ 
        background: "rgba(13, 21, 37, 0.95)", 
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1e3a5f",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "15px 0" }}>
          <h1 style={{ color: "#d4a012", fontSize: "20px", fontWeight: "700", letterSpacing: "0.5px" }}>
            MADFX BOSS
          </h1>
          <span style={{ color: "#1e3a5f", fontSize: "20px" }}>|</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "rgba(59, 130, 246, 0.15)" : "transparent",
                  color: activeTab === tab.id ? "#3b82f6" : "#64748b",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: activeTab === tab.id ? "600" : "400"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }}></div>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>LIVE</span>
          </div>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ background: "#0d1525", color: "#3b82f6", border: "1px solid #1e3a5f", padding: "6px 10px", borderRadius: "6px", fontSize: "11px" }}
          >
            <option value="mistral">Mistral</option>
            <option value="llama3">LLaMA 3</option>
            <option value="llama3.1">LLaMA 3.1</option>
            <option value="codellama">CodeLlama</option>
            <option value="tinyllama">TinyLlama</option>
          </select>
          <div style={{ background: "linear-gradient(135deg, #d4a012, #b8860b)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }} onClick={handleSecretAccess}>
            <span style={{ color: "#0a0f1a", fontSize: "12px", fontWeight: "700" }}>12,450 AURA</span>
          </div>
        </div>
      </nav>

      <main style={{ padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
        {activeTab === "dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <MarketScanner />
              <Leaderboard askOllama={askOllama} loading={loading} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TradingDashboard askOllama={askOllama} loading={loading} />
            </div>
          </div>
        )}

        {activeTab === "markets" && <LiveMarketFeed />}
        
        {activeTab === "scanner" && <MarketScanner />}
        
        {activeTab === "sports" && <SportsPrediction />}
        
        {activeTab === "trading" && <TradingDashboard askOllama={askOllama} loading={loading} />}
        
        {activeTab === "agents" && <AgentMarketplace askOllama={askOllama} loading={loading} />}
        
        {activeTab === "maxai" && <MAXAITrader askOllama={askOllama} loading={loading} />}
        
        {activeTab === "pools" && <PoolFarming askOllama={askOllama} loading={loading} />}
        
        {activeTab === "token" && <TokenSystem />}
        
        {activeTab === "tgrr" && <TGRRTokenomics askOllama={askOllama} loading={loading} />}
        
        {activeTab === "leaderboard" && <Leaderboard askOllama={askOllama} loading={loading} />}
        
        {activeTab === "upgrade" && <UpgradeSystem />}
        
        {activeTab === "wallet" && <WalletConnector />}
        
        {activeTab === "defi" && <DeFiStaking />}
        
        {activeTab === "launch" && <TokenLauncher />}
        
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
            { label: "TGRR", value: "ACTIVE", color: "#10b981", icon: "⟳" },
            { label: "AI", value: model.toUpperCase(), color: "#3b82f6", icon: "◆" },
            { label: "NETWORK", value: "MAINNET", color: "#10b981", icon: "⬡" },
            { label: "VERSION", value: "v2.3", color: "#d4a012", icon: "◆" }
          ].map(stat => (
            <div 
              key={stat.label} 
              style={{ 
                background: "rgba(30, 58, 95, 0.5)", 
                padding: "15px 20px", 
                borderRadius: "12px", 
                border: "1px solid #1e3a5f",
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

      {showAdminModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#0d1525",
            padding: "30px",
            borderRadius: "16px",
            border: "2px solid #d4a012",
            maxWidth: "400px",
            width: "90%"
          }}>
            <h3 style={{ color: "#d4a012", marginBottom: "20px", textAlign: "center" }}>ADMIN ACCESS</h3>
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && verifyAdminCode()}
              placeholder="Enter access code..."
              style={{
                width: "100%",
                padding: "14px",
                background: "#1e3a5f",
                border: "1px solid #3b82f6",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                marginBottom: "15px"
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowAdminModal(false)}
                style={{
                  flex: 1,
                  background: "transparent",
                  color: "#64748b",
                  border: "1px solid #64748b",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Cancel
              </button>
              <button
                onClick={verifyAdminCode}
                style={{
                  flex: 1,
                  background: "#d4a012",
                  color: "#0a0f1a",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700"
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}