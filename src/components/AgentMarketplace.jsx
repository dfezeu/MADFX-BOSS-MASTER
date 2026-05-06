import { useState } from "react";

export default function AgentMarketplace({ askOllama, loading }) {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentTask, setAgentTask] = useState("");
  const [taskResult, setTaskResult] = useState("");

  const agents = [
    {
      id: "harmonic-scanner",
      name: "Harmonic Scanner Agent",
      description: "Detects Gartley, Butterfly, Bat, Crab, Shark patterns using AI analysis",
      capabilities: ["Pattern Detection", "Price Analysis", "Signal Generation"],
      status: "active",
      tier: "Pro",
      performance: "+23.4%"
    },
    {
      id: "martingale-scalper",
      name: "Martingale Scalper Agent",
      description: "Adaptive position sizing with prop firm compliance (FTMO, FundedNext, True Forex)",
      capabilities: ["Auto-Scaling", "Risk Management", "Compliance"],
      status: "active",
      tier: "Pro",
      performance: "+18.7%"
    },
    {
      id: "multi-hedge",
      name: "Multi-Hedge Agent",
      description: "Multi-strategy hedging with dynamic risk-managed position management",
      capabilities: ["Hedging", "Delta Neutral", "Correlation"],
      status: "active",
      tier: "Elite",
      performance: "+31.2%"
    },
    {
      id: "liquidity-pool",
      name: "Liquidity Pool Agent",
      description: "DeFi liquidity pool farming with lock-tier incentives and APY optimization",
      capabilities: ["LP Farming", "APY Tracking", "Auto-Compound"],
      status: "active",
      tier: "Elite",
      performance: "+45.8%"
    },
    {
      id: "arbitrage-hunter",
      name: "Arbitrage Hunter Agent",
      description: "Kalshi x Polymarket spread detection with cross-exchange execution",
      capabilities: ["Spread Detection", "Cross-Exchange", "Auto-Execution"],
      status: "active",
      tier: "Pro",
      performance: "+12.1%"
    },
    {
      id: "prediction-scanner",
      name: "Prediction Scanner Agent",
      description: "Real-time market scanner for prediction market arbitrage opportunities",
      capabilities: ["Market Scan", "Arbitrage", "Event Tracking"],
      status: "active",
      tier: "Basic",
      performance: "+8.5%"
    }
  ];

  const handleDeployAgent = async () => {
    if (!selectedAgent || !agentTask) return;
    
    setTaskResult("Deploying agent...");
    try {
      const result = await askOllama(`Deploy ${selectedAgent.name} to: ${agentTask}. Provide execution details and expected outcome.`);
      setTaskResult(result);
    } catch (err) {
      setTaskResult("Agent deployment failed. Check Ollama connection.");
    }
  };

  const handleActivate = async (agent) => {
    setSelectedAgent(agent);
    setAgentTask(`Activate ${agent.name} and begin trading operations`);
    await handleDeployAgent();
  };

  return (
    <div style={{ marginTop: "20px", background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00aaff33" }}>
      <h2 style={{ color: "#00aaff", borderBottom: "1px solid #00aaff33", paddingBottom: "10px" }}>
        AI Agent Marketplace
      </h2>
      <p style={{ color: "#888", marginBottom: "20px" }}>
        Deploy autonomous AI trading agents with Ollama intelligence
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px", marginBottom: "20px" }}>
        {agents.map(agent => (
          <div 
            key={agent.id}
            style={{ 
              background: "#1a1a1a", 
              padding: "15px", 
              borderRadius: "8px", 
              border: selectedAgent?.id === agent.id ? "2px solid #00ff88" : "1px solid #333",
              cursor: "pointer"
            }}
            onClick={() => setSelectedAgent(agent)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ color: "#00ff88", fontWeight: "bold" }}>{agent.name}</span>
              <span style={{ 
                background: agent.tier === "Elite" ? "#ff8800" : agent.tier === "Pro" ? "#00aaff" : "#666",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "10px",
                color: "#000"
              }}>
                {agent.tier}
              </span>
            </div>
            <p style={{ color: "#888", fontSize: "12px", marginBottom: "10px" }}>{agent.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
              {agent.capabilities.map(cap => (
                <span key={cap} style={{ background: "#222", padding: "2px 6px", borderRadius: "3px", fontSize: "10px", color: "#aaa" }}>
                  {cap}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: agent.status === "active" ? "#00ff88" : "#f00", fontSize: "12px" }}>
                {agent.status === "active" ? "● Active" : "○ Inactive"}
              </span>
              <span style={{ color: "#00ff88", fontWeight: "bold" }}>{agent.performance}</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleActivate(agent); }}
              disabled={loading}
              style={{ 
                marginTop: "10px", 
                background: "#00aaff", 
                color: "#000", 
                border: "none", 
                padding: "8px 16px", 
                borderRadius: "4px", 
                cursor: "pointer", 
                width: "100%" 
              }}
            >
              Deploy Agent
            </button>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <div style={{ background: "#0d1f0d", padding: "15px", borderRadius: "8px", border: "1px solid #00ff88" }}>
          <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
            Active Agent: {selectedAgent.name}
          </h3>
          <input
            type="text"
            placeholder="Enter task for agent..."
            value={agentTask}
            onChange={(e) => setAgentTask(e.target.value)}
            style={{ width: "100%", padding: "10px", background: "#222", color: "#fff", border: "1px solid #333", borderRadius: "4px", marginBottom: "10px" }}
          />
          <button
            onClick={handleDeployAgent}
            disabled={loading || !agentTask}
            style={{ 
              background: "#00ff88", 
              color: "#000", 
              border: "none", 
              padding: "12px 24px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              width: "100%" 
            }}
          >
            Execute Task
          </button>
          {taskResult && (
            <div style={{ marginTop: "15px", background: "#111", padding: "15px", borderRadius: "4px", whiteSpace: "pre-wrap", fontSize: "12px" }}>
              {loading ? "Processing..." : taskResult}
            </div>
          )}
        </div>
      )}
    </div>
  );
}