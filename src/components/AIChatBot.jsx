import { useState, useEffect, useRef } from "react";

const AI_NAMES = ["NEXUS", "ATLAS", "PRIME", "ZERO", "ECHO"];
const COLORS = ["#00ff88", "#00aaff", "#d4a012", "#a855f7", "#ec4899"];

const QUICK_RESPONSES = [
  { q: "show me options", a: "Scanning options... Opening Options tab" },
  { q: "sales today", a: "Checking sales... You have $45 in sales today" },
  { q: "connect wallet", a: "Opening Wallet connection panel" },
  { q: "make 100", a: "Launching sales campaign... Go to $100 tab" },
  { q: "leads", a: "Opening Lead Gen hub - 52K subscribers" },
  { q: "chart btc", a: "Opening Chart with BTC/USD" },
  { q: "backoffice", a: "Opening CEO Command Center" },
  { q: "revenue", a: "Opening Revenue streams - 15 active" },
  { q: "trade", a: "Opening Live Trading" },
  { q: "scanner", a: "Opening Trade Scanner" }
];

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm NEXUS, your AI assistant. How can I help grow MADFX today?", time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [aiName, setAiName] = useState("NEXUS");
  const [glowColor, setGlowColor] = useState("#00ff88");
  const [minimized, setMinimized] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => {
    const name = AI_NAMES[Math.floor(Math.random() * AI_NAMES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setAiName(name);
    setGlowColor(color);
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { from: "user", text, time: new Date() }]);
    setInput("");
    setTyping(true);

    const lower = text.toLowerCase();
    let response = "";
    let action = null;
    
    for (const qa of QUICK_RESPONSES) {
      if (lower.includes(qa.q)) {
        response = qa.a;
        break;
      }
    }
    
    if (!response) {
      const responses = [
        "I'll analyze that and get back to you with optimal strategies.",
        "Processing request through neural networks...",
        "Cross-referencing with market data...",
        "Consulting the trading algorithms...",
        "Running optimization parameters..."
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: "ai", text: response, time: new Date() }]);
    }, 1000 + Math.random() * 1000);
  };

  const quickAction = (q) => sendMessage(q);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${glowColor}, ${glowColor}88)`,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            boxShadow: `0 0 30px ${glowColor}66, 0 0 60px ${glowColor}44`,
            animation: "pulseGlow 2s infinite",
            zIndex: 9999
          }}
        >
          🤖
        </button>
      )}

      {open && (
        <div style={{
          position: "fixed",
          bottom: minimized ? "20px" : "20px",
          right: "20px",
          width: minimized ? "200px" : "380px",
          height: minimized ? "60px" : "500px",
          background: "rgba(10, 15, 26, 0.95)",
          border: `1px solid ${glowColor}`,
          borderRadius: "16px",
          boxShadow: `0 0 40px ${glowColor}44`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 9999,
          transition: "all 0.3s ease"
        }}>
          <div 
            onClick={() => setMinimized(!minimized)}
            style={{
              background: `linear-gradient(90deg, ${glowColor}22, transparent)`,
              padding: "12px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              borderBottom: `1px solid ${glowColor}44`
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%", 
                background: glowColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                boxShadow: `0 0 15px ${glowColor}`
              }}>
                🤖
              </div>
              <div>
                <div style={{ color: glowColor, fontWeight: "700", fontSize: "14px" }}>{aiName}</div>
                <div style={{ color: "#64748b", fontSize: "10px" }}>AI Executive Assistant</div>
              </div>
            </div>
            <div style={{ color: "#64748b", fontSize: "18px" }}>{minimized ? "▲" : "▼"}</div>
          </div>

          {!minimized && (
            <>
              <div style={{ flex: 1, overflow: "auto", padding: "15px" }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                    marginBottom: "12px"
                  }}>
                    <div style={{
                      max: "80%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: msg.from === "user" 
                        ? `linear-gradient(135deg, ${glowColor}, ${glowColor}88)` 
                        : "#1a1a2e",
                      color: msg.from === "user" ? "#050510" : "#ffffff",
                      fontSize: "12px",
                      boxShadow: msg.from === "ai" ? `0 0 10px ${glowColor}22` : "none"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "#1a1a2e",
                      color: "#64748b",
                      fontSize: "12px"
                    }}>
                      ✨ Processing...
                    </div>
                  </div>
                )}
                <div ref={messagesEnd} />
              </div>

              <div style={{ padding: "10px", borderTop: `1px solid ${glowColor}44` }}>
                <div style={{ display: "flex", gap: "5px", marginBottom: "10px", flexWrap: "wrap" }}>
                  {["show me options", "sales today", "connect wallet", "make 100", "leads"].map(q => (
                    <button
                      key={q}
                      onClick={() => quickAction(q)}
                      style={{
                        background: `${glowColor}22`,
                        border: `1px solid ${glowColor}44`,
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        fontSize: "10px",
                        cursor: "pointer"
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask anything..."
                    style={{
                      flex: 1,
                      background: "#050510",
                      border: `1px solid ${glowColor}44`,
                      padding: "10px 12px",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    style={{
                      background: glowColor,
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      color: "#050510",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px ${glowColor}66, 0 0 40px ${glowColor}33; }
          50% { box-shadow: 0 0 30px ${glowColor}88, 0 0 60px ${glowColor}55; }
        }
      `}</style>
    </>
  );
}