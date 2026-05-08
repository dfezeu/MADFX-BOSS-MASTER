import { useState, useEffect, useRef } from "react";

export default function AIFloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I'm your AI assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(true);

  const msgs = useRef(null);

  useEffect(() => {
    msgs.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickasks = ["show sales", "show options", "show chart", "show leads", "connect wallet"];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "user", text: input }]);
    setInput("");
    
    setTimeout(() => {
      const responses = [
        "Processing your request...",
        "Analyzing market data...",
        "I'll help you with that!",
        "Accessing trading algorithms..."
      ];
      setMessages(m => [...m, { from: "ai", text: responses[Math.floor(Math.random()*responses.length)] }]);
    }, 800);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00ff88, #00aaff)",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            boxShadow: "0 0 30px rgba(0,255,136,0.5)",
            zIndex: 9999
          }}
        >
          🤖
        </button>
      )}

      {open && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: minimized ? "250px" : "350px",
          height: minimized ? "50px" : "420px",
          background: "rgba(5,5,16,0.95)",
          border: "1px solid #00ff88",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(0,255,136,0.3)",
          zIndex: 9999,
          overflow: "hidden",
          transition: "all 0.3s ease"
        }}>
          <div 
            onClick={() => setMinimized(!minimized)}
            style={{
              padding: "12px 15px",
              background: "linear-gradient(90deg, rgba(0,255,136,0.2), transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              borderBottom: "1px solid #00ff8833"
            }}
          >
            <span style={{ color: "#00ff88", fontWeight: "700" }}>AI Assistant</span>
            <span style={{ color: "#64748b" }}>{minimized ? "▲" : "▼"}</span>
          </div>

          {!minimized && (
            <>
              <div style={{ height: "300px", overflow: "auto", padding: "15px" }}>
                {messages.map((m, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px"
                  }}>
                    <div style={{
                      max: "80%",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: m.from === "user" ? "#00ff88" : "#1a1a2e",
                      color: m.from === "user" ? "#050510" : "#fff",
                      fontSize: "12px"
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={msgs} />
              </div>

              <div style={{ padding: "10px", borderTop: "1px solid #00ff8833" }}>
                <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
                  {quickasks.map(q => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); handleSend(); }}
                      style={{
                        background: "#00ff8833",
                        border: "none",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "12px",
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
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask..."
                    style={{
                      flex: 1,
                      background: "#050510",
                      border: "1px solid #00ff8844",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  />
                  <button
                    onClick={handleSend}
                    style={{
                      background: "#00ff88",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
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
    </>
  );
}