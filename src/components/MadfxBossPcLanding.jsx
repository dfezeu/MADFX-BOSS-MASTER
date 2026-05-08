import { useState } from "react";

export default function MadfxBossPcLanding() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Here you would typically send the email to a backend service
    alert(`Thank you for subscribing! We'll notify you at ${email} when MADFX BOSS PC launches.`);
    setEmail("");
  };

  return (
    <div style={{ 
      background: "#0a0a0a", 
      minHeight: "100vh", 
      color: "#fff", 
      fontFamily: "'Space Grotesk', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      <div style={{ 
        background: "rgba(10, 15, 26, 0.8)", 
        borderRadius: "20px", 
        padding: "40px", 
        border: "1px solid #00ff88",
        boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
        maxWidth: "800px",
        width: "100%"
      }}>
        <h1 style={{ 
          color: "#00ff88", 
          fontSize: "3.5rem", 
          marginBottom: "20px",
          textShadow: "0 0 10px #00ff88",
          letterSpacing: "-1px"
        }}>
          MADFX BOSS PC
        </h1>
        <p style={{ 
          fontSize: "1.25rem", 
          color: "#64748b", 
          marginBottom: "40px",
          maxWidth: "600px"
        }}>
          The Ultimate AI-Powered Trading Workstation for Professional Traders
        </p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "25px", 
          marginBottom: "40px"
        }}>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>🤖 AI Trading Signals</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Real-time harmonic pattern detection and predictive analytics powered by Ollama and Llama 3
            </p>
          </div>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>⚡ Low Latency Execution</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Direct market access with sub-millisecond order routing for scalping and HFT strategies
            </p>
          </div>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>📊 Advanced Analytics</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Institutional-grade charting, backtesting, and portfolio optimization tools
            </p>
          </div>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>🔒 Enterprise Security</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Military-grade encryption, multi-factor authentication, and cold storage for assets
            </p>
          </div>
        </div>

        <div style={{ 
          marginBottom: "40px", 
          padding: "25px", 
          background: "#0d1525", 
          borderRadius: "16px", 
          border: "1px solid #1e3a5f"
        }}>
          <h3 style={{ color: "#00ff88", marginBottom: "20px" }}>Early Access Program</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Join our exclusive beta program and get lifetime access to MADFX BOSS PC at a special founding member rate.
          </p>
          <form onSubmit={handleSubmit} style={{ 
            display: "flex", 
            gap: "10px", 
            maxWidth: "500px", 
            margin: "0 auto"
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access"
              required
              style={{ 
                flex: 1, 
                padding: "15px", 
                border: "1px solid #1e3a5f", 
                borderRadius: "8px", 
                background: "#0a0a0a", 
                color: "#fff", 
                fontSize: "1rem"
              }}
            />
            <button
              type="submit"
              style={{ 
                background: "#00ff88", 
                color: "#0a0a0a", 
                border: "none", 
                padding: "15px 30px", 
                borderRadius: "8px", 
                fontWeight: "700", 
                cursor: "pointer",
                fontSize: "1rem",
                boxShadow: "0 0 15px rgba(0, 255, 136, 0.5)"
              }}
            >
              Get Early Access
            </button>
          </form>
        </div>

        <div style={{ 
          color: "#64748b", 
          fontSize: "0.9rem", 
          marginTop: "30px"
        }}>
          <p>© 2026 MADFX BOSS. All rights reserved.</p>
          <p>MADFX BOSS PC is a trading workstation and does not provide financial advice.</p>
        </div>
      </div>
    </div>
  );
}