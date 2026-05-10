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
import MadfxHQControlCenter from "./components/MadfxHQControlCenter";
import Make100 from "./components/Make100";
import ViralBoss from "./components/ViralBoss";
import ViralBossLinks from "./components/ViralBossLinks";

const GLASS_STYLE = {
  background: "rgba(10, 15, 30, 0.7)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(0, 212, 255, 0.15)",
  boxShadow: "0 0 30px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.03)"
};

const NEON_BLUE = "#00d4ff";
const NEON_GREEN = "#00ff88";
const NEON_PURPLE = "#8b5cf6";
const DARK_BG = "#030712";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  const NAV_CATEGORIES = [
    { 
      id: "home", 
      label: "HOME", 
      items: [
        { id: "dashboard", label: "Dashboard" }
      ]
    },
    { 
      id: "trading", 
      label: "TRADING", 
      items: [
        { id: "markets", label: "Markets" },
        { id: "chart", label: "Chart" },
        { id: "trade", label: "Trade" },
        { id: "options", label: "Options" }
      ]
    },
    { 
      id: "signals", 
      label: "SIGNALS", 
      items: [
        { id: "signals", label: "AI Signals" },
        { id: "scanner", label: "Scanner" }
      ]
    },
    { 
      id: "tools", 
      label: "TOOLS", 
      items: [
        { id: "maxai", label: "MAXAI" },
        { id: "agents", label: "Agents" }
      ]
    },
    { 
      id: "viral", 
      label: "VIRAL", 
      items: [
        { id: "viral-boss", label: "Content Engine" },
        { id: "viral-links", label: "Resources" }
      ]
    },
    { 
      id: "finance", 
      label: "FINANCE", 
      items: [
        { id: "wallet", label: "Wallet" },
        { id: "revenue", label: "Revenue" },
        { id: "pools", label: "Farms" }
      ]
    },
    { 
      id: "business", 
      label: "BUSINESS", 
      items: [
        { id: "madfx-hq", label: "MADFX HQ" },
        { id: "sales", label: "Sales" },
        { id: "leads", label: "Leads" },
        { id: "backoffice", label: "CEO" }
      ]
    },
    { 
      id: "products", 
      label: "PRODUCTS", 
      items: [
        { id: "vendors", label: "Store" },
        { id: "checkout", label: "Buy" },
        { id: "launch", label: "Token" }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "online": return NEON_GREEN;
      case "checking": return "#fbbf24";
      default: return "#ef4444";
    }
  };

  if (adminAuth && activeTab === "admin") {
    return <BackendOffice />;
  }

  return (
    <div style={{
      background: DARK_BG,
      minHeight: "100vh",
      fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
      color: "#ffffff"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
        
        * { box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        ::-webkit-scrollbar-thumb { background: ${NEON_BLUE}40; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${NEON_BLUE}60; }
        
        .nav-item:hover { 
          background: rgba(0, 212, 255, 0.1) !important;
          border-color: ${NEON_BLUE} !important;
          transform: translateX(5px);
        }
        
        .glow-text {
          text-shadow: 0 0 10px ${NEON_BLUE}, 0 0 20px ${NEON_BLUE}40;
        }
        
        .glow-green {
          text-shadow: 0 0 10px ${NEON_GREEN}, 0 0 20px ${NEON_GREEN}40;
        }
        
        .glow-purple {
          text-shadow: 0 0 10px ${NEON_PURPLE}, 0 0 20px ${NEON_PURPLE}40;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-in {
          animation: slideIn 0.5s ease forwards;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <nav style={{
        background: "rgba(5, 10, 20, 0.95)",
        backdropFilter: "blur(30px)",
        borderBottom: `1px solid ${NEON_BLUE}30`,
        boxShadow: `0 0 40px ${NEON_BLUE}10`,
        padding: "0 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "70px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {/* Logo */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            cursor: "pointer"
          }} onClick={() => setActiveTab("dashboard")}>
            <div style={{
              width: "45px",
              height: "45px",
              background: `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px ${NEON_GREEN}40`
            }}>
              <span style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                fontWeight: "800", 
                fontSize: "1.2rem",
                color: "#030712"
              }}>M</span>
            </div>
            <div>
              <h1 style={{ 
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1.4rem", 
                fontWeight: "700", 
                color: NEON_GREEN,
                margin: 0,
                letterSpacing: "2px",
                textShadow: `0 0 10px ${NEON_GREEN}`
              }}>
                MADFX BOSS
              </h1>
              <p style={{ 
                fontSize: "0.65rem", 
                color: NEON_BLUE, 
                margin: 0, 
                opacity: 0.8,
                letterSpacing: "1px"
              }}>
                TRADING INTELLIGENCE
              </p>
            </div>
          </div>

          {/* Navigation Categories */}
          <div style={{ display: "flex", gap: "5px" }}>
            {NAV_CATEGORIES.map(category => {
              const hasActive = category.items.some(item => item.id === activeTab);
              return (
                <div key={category.id} style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      if (!hasActive) setActiveTab(category.items[0].id);
                    }}
                    onMouseEnter={(e) => {
                      const dropdown = e.currentTarget.parentElement.querySelector('.dropdown');
                      if (dropdown) dropdown.style.display = "block";
                    }}
                    onMouseLeave={(e) => {
                      const dropdown = e.currentTarget.parentElement.querySelector('.dropdown');
                      if (dropdown) dropdown.style.display = "none";
                    }}
                    style={{
                      background: hasActive ? `rgba(0, 255, 136, 0.15)` : "transparent",
                      color: hasActive ? NEON_GREEN : "#ffffff",
                      padding: "12px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      fontFamily: "'Rajdhani', sans-serif",
                      letterSpacing: "1.5px",
                      transition: "all 0.3s ease",
                      border: `1px solid ${hasActive ? NEON_GREEN + '40' : 'transparent'}`
                    }}
                  >
                    {category.label}
                  </button>
                  <div 
                    className="dropdown"
                    style={{
                      display: "none",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "rgba(10, 15, 30, 0.98)",
                      border: `1px solid ${NEON_BLUE}30`,
                      borderRadius: "10px",
                      padding: "8px 0",
                      minWidth: "180px",
                      boxShadow: `0 0 30px ${NEON_BLUE}20`,
                      zIndex: 1000,
                      marginTop: "8px"
                    }}
                  >
                    {category.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          const dropdown = document.querySelector('.dropdown');
                          if (dropdown) dropdown.style.display = "none";
                        }}
                        style={{
                          background: activeTab === item.id ? `rgba(0, 212, 255, 0.15)` : "transparent",
                          color: activeTab === item.id ? NEON_BLUE : "#ffffff",
                          border: "none",
                          width: "100%",
                          padding: "12px 20px",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: "500",
                          transition: "all 0.2s ease",
                          borderLeft: activeTab === item.id ? `3px solid ${NEON_BLUE}` : "3px solid transparent"
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Status & Settings */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Ollama Status */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px",
            padding: "8px 15px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: getStatusColor(ollamaStatus),
              boxShadow: `0 0 10px ${getStatusColor(ollamaStatus)}`,
              animation: ollamaStatus === "checking" ? "pulse 1s infinite" : "none"
            }}></div>
            <span style={{ 
              fontSize: "0.75rem", 
              color: "#ffffff",
              fontFamily: "'Share Tech Mono', monospace",
              opacity: 0.8
            }}>
              AI: {ollamaStatus.toUpperCase()}
            </span>
          </div>

          {/* Model Selector */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${NEON_BLUE}30`,
              color: "#ffffff",
              padding: "8px 15px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontFamily: "'Share Tech Mono', monospace",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <option value="mistral">Mistral</option>
            <option value="codellama">CodeLlama</option>
            <option value="llama2">Llama2</option>
            <option value="phi">Phi</option>
          </select>

          {/* Admin Button */}
          <button
            onClick={handleSecretAccess}
            style={{
              background: "transparent",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: NEON_PURPLE,
              padding: "8px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "600",
              letterSpacing: "1px"
            }}
          >
            ADMIN
          </button>
        </div>
      </nav>

      {/* Admin Modal */}
      {showAdminModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            ...GLASS_STYLE,
            padding: "40px",
            borderRadius: "20px",
            maxWidth: "400px",
            width: "90%"
          }}>
            <h3 style={{
              color: NEON_PURPLE,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1.2rem",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              SECURE ACCESS
            </h3>
            <input
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Enter admin code"
              style={{
                width: "100%",
                background: "rgba(0,0,0,0.5)",
                border: `1px solid ${NEON_PURPLE}30`,
                color: "#ffffff",
                padding: "15px",
                borderRadius: "10px",
                fontSize: "1rem",
                fontFamily: "'Share Tech Mono', monospace",
                marginBottom: "20px",
                outline: "none"
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={verifyAdminCode}
                style={{
                  flex: 1,
                  background: `linear-gradient(135deg, ${NEON_PURPLE}, ${NEON_BLUE})`,
                  border: "none",
                  color: "#ffffff",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontFamily: "'Rajdhani', sans-serif"
                }}
              >
                AUTHENTICATE
              </button>
              <button
                onClick={() => setShowAdminModal(false)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "'Rajdhani', sans-serif"
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ 
        padding: "30px",
        maxWidth: "1800px",
        margin: "0 auto"
      }}>
        {activeTab === "dashboard" && (
          <div className="animate-in">
            {/* Hero Stats */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "20px",
              marginBottom: "30px"
            }}>
              {[
                { label: "TGRR STATUS", value: "ACTIVE", color: NEON_GREEN, icon: ">" },
                { label: "AI ENGINE", value: model.toUpperCase(), color: NEON_BLUE, icon: "#" },
                { label: "NETWORK", value: "MAINNET", color: NEON_GREEN, icon: "N" },
                { label: "VERSION", value: "v3.3 ENT", color: NEON_PURPLE, icon: "V" }
              ].map((stat, i) => (
                <div key={i} style={{
                  ...GLASS_STYLE,
                  padding: "25px",
                  borderRadius: "16px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${stat.color}, transparent)`
                  }}></div>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    margin: "0 auto 15px",
                    background: `${stat.color}15`,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1rem",
                    color: stat.color
                  }}>
                    {stat.icon}
                  </div>
                  <div style={{ 
                    fontSize: "2rem", 
                    fontWeight: "700", 
                    color: stat.color,
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: `0 0 20px ${stat.color}40`
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: "0.75rem", 
                    opacity: 0.6,
                    letterSpacing: "2px",
                    marginTop: "5px"
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{
              ...GLASS_STYLE,
              padding: "30px",
              borderRadius: "16px",
              marginBottom: "30px"
            }}>
              <h3 style={{
                color: NEON_BLUE,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1rem",
                letterSpacing: "2px",
                marginBottom: "20px"
              }}>
                // QUICK ACCESS
              </h3>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {[
                  { id: "viral-boss", label: "VIRAL CONTENT ENGINE", color: NEON_PURPLE },
                  { id: "signals", label: "AI TRADING SIGNALS", color: NEON_GREEN },
                  { id: "maxai", label: "MAXAI TRADER", color: NEON_BLUE },
                  { id: "markets", label: "LIVE MARKETS", color: "#f59e0b" },
                  { id: "wallet", label: "WALLET", color: NEON_PURPLE },
                  { id: "scanner", label: "ARBITRAGE SCANNER", color: NEON_GREEN }
                ].map(action => (
                  <button
                    key={action.id}
                    onClick={() => setActiveTab(action.id)}
                    style={{
                      background: `${action.color}15`,
                      border: `1px solid ${action.color}40`,
                      color: action.color,
                      padding: "15px 25px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      fontFamily: "'Rajdhani', sans-serif",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Query Interface */}
            <div style={{
              ...GLASS_STYLE,
              padding: "30px",
              borderRadius: "16px"
            }}>
              <h3 style={{
                color: NEON_GREEN,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1rem",
                letterSpacing: "2px",
                marginBottom: "20px"
              }}>
                // MADXAI QUERY
              </h3>
              <div style={{ display: "flex", gap: "15px" }}>
                <input
                  type="text"
                  placeholder="Enter your trading query..."
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      const result = await askAI(e.target.value);
                      alert(result);
                    }
                  }}
                  style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid ${NEON_GREEN}30`,
                    color: "#ffffff",
                    padding: "15px 20px",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontFamily: "'Share Tech Mono', monospace",
                    outline: "none"
                  }}
                />
                <button
                  onClick={async () => {
                    const input = document.querySelector('input[placeholder="Enter your trading query..."]');
                    if (input?.value) {
                      const result = await askAI(input.value);
                      alert(result);
                    }
                  }}
                  disabled={loading}
                  style={{
                    background: `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
                    border: "none",
                    color: "#030712",
                    padding: "15px 30px",
                    borderRadius: "10px",
                    cursor: loading ? "wait" : "pointer",
                    fontWeight: "700",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "1px"
                  }}
                >
                  {loading ? "PROCESSING..." : "EXECUTE"}
                </button>
              </div>
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
        {activeTab === "madfx-hq" && <MadfxHQControlCenter />}
        {activeTab === "backoffice" && <BackOfficeCEO />}
        {activeTab === "make100" && <Make100 />}
        {activeTab === "launch" && <TokenLauncher />}
        {activeTab === "chillverse" && <Chillverse />}
        
        {activeTab === "viral-boss" && <ViralBoss setActiveTab={setActiveTab} />}
        
        {activeTab === "viral-links" && <ViralBossLinks setActiveTab={setActiveTab} />}
        
        {activeTab === "signals" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <HarmonicPatternDetector askOllama={askOllama} loading={loading} />
            <TGRRLoop askOllama={askOllama} loading={loading} />
            <PropFirmComplianceChecker askOllama={askOllama} loading={loading} />
            <ArbitrageScanner askOllama={askOllama} loading={loading} />
            <CharityVault />
          </div>
        )}

        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
          {[
            { label: "TGRR", value: "ACTIVE", color: NEON_GREEN, icon: ">" },
            { label: "AI", value: model.toUpperCase(), color: NEON_BLUE, icon: "#" },
            { label: "NETWORK", value: "MAINNET", color: NEON_GREEN, icon: "N" },
            { label: "VERSION", value: "v3.3 ENTERPRISE", color: NEON_PURPLE, icon: "V" }
          ].map(stat => (
            <div 
              key={stat.label} 
              style={{
                ...GLASS_STYLE,
                padding: "15px",
                borderRadius: "12px",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: "5px" }}>{stat.label}</div>
              <div style={{ 
                color: stat.color, 
                fontWeight: "700",
                fontFamily: "'Share Tech Mono', monospace",
                textShadow: `0 0 10px ${stat.color}40`
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}