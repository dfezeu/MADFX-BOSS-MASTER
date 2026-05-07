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
import Web3Wallet from "./components/Web3Wallet";
import RealDeFi from "./components/RealDeFi";
import Vendors from "./components/Vendors";
import MonetizationHub from "./components/MonetizationHub";
import SalesDashboard from "./components/SalesDashboard";
import SalesEngine from "./components/SalesEngine";
import LeadGenHub from "./components/LeadGenHub";
import LiveTradingHub from "./components/LiveTradingHub";
import TradeScanner from "./components/TradeScanner";
import LiveChartStudio from "./components/LiveChartStudio";
import MultiMarketHub from "./components/MultiMarketHub";
import OptionsScanner from "./components/OptionsScanner";
import BackOfficeCEO from "./components/BackOfficeCEO";
import Make100 from "./components/Make100";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("mistral");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminAuth, setAdminAuth] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [aiProvider, setAiProvider] = useState("ollama");
  const [openaiKey, setOpenaiKey] = useState("");
  const [ollamaStatus, setOllamaStatus] = useState("checking");

  useEffect(() => {
    fetch("http://localhost:11434/api/tags", { method: "GET" })
      .then(() => setOllamaStatus("online"))
      .catch(() => setOllamaStatus("offline"));
  }, []);

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

  const askAI = async (prompt) => {
    if (aiProvider === "openai" && openaiKey) {
      setLoading(true);
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500
          })
        });
        const data = await res.json();
        return data.choices?.[0]?.message?.content || "AI error";
      } catch (err) {
        return "OpenAI error: " + err.message;
      } finally {
        setLoading(false);
      }
    }
    return askOllama(prompt);
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
    { id: "web3", label: "Web3" },
    { id: "defi", label: "DeFi" },
    { id: "rdefi", label: "Real DeFi" },
    { id: "vendors", label: "Store" },
    { id: "revenue", label: "Revenue" },
    { id: "sales", label: "SALES" },
    { id: "checkout", label: "Buy" },
    { id: "leads", label: "Leads" },
    { id: "trade", label: "Trade" },
    { id: "scanner", label: "Scanner" },
    { id: "chart", label: "Chart" },
    { id: "markets", label: "Markets" },
    { id: "options", label: "Options" },
    { id: "backoffice", label: "CEO" },
    { id: "make100", label: "$100" },
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
    <div style={{ background: "#050510", minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      <nav style={{ 
        background: "rgba(10, 15, 26, 0.98)", 
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #00aaff",
        boxShadow: "0 0 20px rgba(0, 170, 255, 0.3)",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "15px 0" }}>
          <h1 style={{ color: "#00ff88", fontSize: "22px", fontWeight: "700", letterSpacing: "1px", textShadow: "0 0 10px #00ff88" }}>
            MADFX BOSS
          </h1>
          <span style={{ color: "#00aaff", fontSize: "20px" }}>|</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "rgba(0, 255, 136, 0.15)" : "transparent",
                  color: activeTab === tab.id ? "#00ff88" : "#ffffff",
                  border: "1px solid " + (activeTab === tab.id ? "#00ff88" : "transparent"),
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: activeTab === tab.id ? "600" : "400",
                  transition: "all 0.3s ease",
                  boxShadow: activeTab === tab.id ? "0 0 15px rgba(0, 255, 136, 0.5)" : "none"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(0, 170, 255, 0.2)";
                  e.target.style.color = "#00aaff";
                  e.target.style.border = "1px solid #00aaff";
                  e.target.style.boxShadow = "0 0 15px rgba(0, 170, 255, 0.5)";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#ffffff";
                    e.target.style.border = "1px solid transparent";
                    e.target.style.boxShadow = "none";
                    e.target.style.transform = "scale(1)";
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: ollamaStatus === "online" ? "#00ff88" : ollamaStatus === "checking" ? "#f59e0b" : "#ef4444" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: ollamaStatus === "online" ? "#00ff88" : ollamaStatus === "checking" ? "#f59e0b" : "#ef4444", boxShadow: ollamaStatus === "online" ? "0 0 10px #00ff88" : "none" }}></div>
            <span style={{ fontSize: "11px", fontWeight: "500", color: "#00aaff" }}>{ollamaStatus === "online" ? "OLLAMA" : ollamaStatus === "checking" ? "CHECKING..." : "OFFLINE"}</span>
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
          <select
            value={aiProvider}
            onChange={(e) => setAiProvider(e.target.value)}
            style={{ background: "#0d1525", color: aiProvider === "openai" ? "#10b981" : "#64748b", border: "1px solid #1e3a5f", padding: "6px 10px", borderRadius: "6px", fontSize: "11px" }}
          >
            <option value="ollama">Ollama</option>
            <option value="openai">OpenAI</option>
          </select>
          {aiProvider === "openai" && (
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              style={{ background: "#0d1525", color: "#fff", border: "1px solid #1e3a5f", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", width: "120px" }}
            />
          )}
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
        
        {activeTab === "web3" && <Web3Wallet />}
        
        {activeTab === "defi" && <DeFiStaking />}
        
        {activeTab === "rdefi" && <RealDeFi />}
        
        {activeTab === "vendors" && <Vendors />}
        
        {activeTab === "revenue" && <MonetizationHub />}
        
        {activeTab === "sales" && <SalesDashboard />}
        
        {activeTab === "checkout" && <SalesEngine />}
        
        {activeTab === "leads" && <LeadGenHub />}
        
        {activeTab === "trade" && <LiveTradingHub />}
        
        {activeTab === "scanner" && <TradeScanner />}
        
        {activeTab === "chart" && <LiveChartStudio />}
        
        {activeTab === "markets" && <MultiMarketHub />}
        
        {activeTab === "options" && <OptionsScanner />}
        
        {activeTab === "backoffice" && <BackOfficeCEO />}
        
        {activeTab === "make100" && <Make100 />}
        
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
            { label: "VERSION", value: "v3.3 ENTERPRISE", color: "#00ff88", icon: "◆" }
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