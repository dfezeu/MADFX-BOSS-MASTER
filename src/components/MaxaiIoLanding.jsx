import { useState } from "react";

export default function MaxaiIoLanding() {
  const [email, setEmail] = useState("");
  const [waitlist, setWaitlist] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Here you would typically send the email to a backend service
    setWaitlist(true);
    setTimeout(() => {
      setWaitlist(false);
    }, 3000);
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
        border: "1px solid #3b82f6",
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
        maxWidth: "800px",
        width: "100%"
      }}>
        <h1 style={{ 
          color: "#3b82f6", 
          fontSize: "3.5rem", 
          marginBottom: "20px",
          textShadow: "0 0 10px #3b82f6",
          letterSpacing: "-1px"
        }}>
          MAXAI.IO
        </h1>
        <p style={{ 
          fontSize: "1.25rem", 
          color: "#64748b", 
          marginBottom: "40px",
          maxWidth: "600px"
        }}>
          The Most Advanced AI Trading Agent Ever Created
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
            <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>🧠 AGI-Powered Intelligence</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Advanced reasoning capabilities that surpass GPT-4 for complex trading strategies
            </p>
          </div>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>📈 Multi-Market Analysis</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Simultaneously analyzes forex, crypto, stocks, commodities, and derivatives
            </p>
          </div>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>⚡ Real-Time Execution</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Sub-second signal generation and automated trade execution
            </p>
          </div>
          <div style={{ 
            background: "#0d1525", 
            borderRadius: "16px", 
            padding: "25px", 
            border: "1px solid #1e3a5f"
          }}>
            <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>🛡️ Risk Management</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Institutional-grade position sizing, stop loss optimization, and portfolio protection
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
          <h3 style={{ color: "#3b82f6", marginBottom: "20px" }}>Early Access Waitlist</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Be among the first to experience MAXAI's revolutionary trading capabilities.
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
              disabled={waitlist}
              style={{ 
                background: waitlist ? "#64748b" : "#3b82f6", 
                color: "#0a0a0a", 
                border: "none", 
                padding: "15px 30px", 
                borderRadius: "8px", 
                fontWeight: "700", 
                cursor: waitlist ? "not-allowed" : "pointer",
                fontSize: "1rem",
                boxShadow: waitlist ? "none" : "0 0 15px rgba(59, 130, 246, 0.5)"
              }}
            >
              {waitlist ? "Joined Waitlist!" : "Join Waitlist"}
            </button>
          </form>
        </div>

        <div style={{ 
          color: "#64748b", 
          fontSize: "0.9rem", 
          marginTop: "30px"
        }}>
          <p>© 2026 MAXAI Labs. All rights reserved.</p>
          <p>MAXAI.IO is an AI trading assistant and does not provide financial advice.</p>
          <p>Past performance does not guarantee future results.</p>
        </div>
      </div>
    </div>
  );
}