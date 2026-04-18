import { useState, useEffect } from "react";
import HarmonicPatternDetector from "./components/HarmonicPatternDetector";
import TGRRLoop from "./components/TGRRLoop";
import PropFirmComplianceChecker from "./components/PropFirmComplianceChecker";
import ArbitrageScanner from "./components/ArbitrageScanner";
import CharityVault from "./components/CharityVault";

export default function App() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("mistral");

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
      return "⚠️ Ollama not reachable. Make sure it's running.";
    } finally {
      setLoading(false);
    }
  };

  const handleAskOllama = async () => {
    const response = await askOllama();
    setAiResponse(response);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#00ff88", fontFamily: "monospace", padding: "20px" }}>
      <h1 style={{ color: "#00ff88", borderBottom: "1px solid #00ff88", paddingBottom: "10px" }}>
        ⚡ MADFX BOSS — NEXUS ENGINE
      </h1>
      <p style={{ color: "#888" }}>TGRR Loop: Trade → Generate → Reward → Reinvest</p>

      <div style={{ marginTop: "30px", background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833" }}>
        <h2 style={{ color: "#00aaff" }}>🤖 MADXAI Local Intelligence</h2>
        <select
          value={model}
          onChange={e => setModel(e.target.value)}
          style={{ background: "#222", color: "#00ff88", border: "1px solid #00ff88", padding: "8px", marginBottom: "10px", width: "100%" }}>
          <option value="mistral">Mistral 7B</option>
          <option value="llama3">LLaMA 3</option>
          <option value="tinyllama">TinyLlama (fastest)</option>
        </select>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ask MADXAI anything... e.g. Analyze EUR/USD for a bullish Gartley setup"
          style={{ width: "100%", height: "100px", background: "#222", color: "#fff", border: "1px solid #333", padding: "10px", borderRadius: "4px" }}
        />
        <button
          onClick={handleAskOllama}
          disabled={loading}
          style={{ marginTop: "10px", background: "#00ff88", color: "#000", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", width: "100%" }}>
          {loading ? "⏳ Analyzing..." : "⚡ Run MADXAI Analysis"}
        </button>
        {aiResponse && (
          <div style={{ marginTop: "20px", background: "#0d1f0d", padding: "15px", borderRadius: "4px", border: "1px solid #00ff88", whiteSpace: "pre-wrap" }}>
            {aiResponse}
          </div>
        )}
      </div>

      <HarmonicPatternDetector askOllama={askOllama} loading={loading} />

      <TGRRLoop askOllama={askOllama} loading={loading} />

      <PropFirmComplianceChecker askOllama={askOllama} loading={loading} />

      <ArbitrageScanner askOllama={askOllama} loading={loading} />

      <CharityVault />

      <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
        {[
          { label: "TGRR Status", value: "ACTIVE", color: "#00ff88" },
          { label: "Ollama Model", value: model.toUpperCase(), color: "#00aaff" },
          { label: "Mode", value: "LOCAL AI", color: "#ff8800" }
        ].map(card => (
          <div key={card.label} style={{ background: "#111", padding: "15px", borderRadius: "8px", border: `1px solid ${card.color}33`, textAlign: "center" }}>
            <div style={{ color: "#888", fontSize: "12px" }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: "20px", fontWeight: "bold" }}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
