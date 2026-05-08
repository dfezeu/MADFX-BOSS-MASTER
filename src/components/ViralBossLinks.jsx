import { useState } from "react";

const NEON_BLUE = "#00d4ff";
const NEON_GREEN = "#00ff88";
const NEON_PURPLE = "#8b5cf6";
const DARK_BG = "#030712";

const GLASS_STYLE = {
  background: "rgba(10, 15, 30, 0.7)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(0, 212, 255, 0.15)",
  boxShadow: "0 0 30px rgba(0, 212, 255, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.03)"
};

const ViralBossLinks = ({ setActiveTab }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    {
      id: "madfxbosspc",
      name: "MADFX BOSS PC",
      description: "Download the MADFX BOSS desktop application for Windows, Mac, and Linux. Access advanced trading tools, AI signals, and the full TGRR NEXUS Loop engine directly from your desktop.",
      url: "https://madfxbosspc.example.com",
      color: NEON_GREEN
    },
    {
      id: "maxai",
      name: "MAXAI",
      description: "The MAXAI Intelligence Engine powers our AI trading signals with advanced machine learning models. Get real-time market predictions, arbitrage opportunities, and automated trading strategies.",
      url: "https://maxai.example.com",
      color: NEON_BLUE
    }
  ];

  return (
    <div style={{
      background: DARK_BG,
      minHeight: "100vh",
      color: "#ffffff",
      fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
      padding: "40px 20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
        
        .link-card:hover {
          border-color: ${NEON_BLUE} !important;
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 212, 255, 0.2) !important;
        }
      `}</style>

      {/* Header */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto 50px",
        textAlign: "center"
      }}>
        <button 
          onClick={() => setActiveTab("viral-boss")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: NEON_BLUE,
            background: "transparent",
            border: `1px solid ${NEON_BLUE}40`,
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "30px",
            fontSize: "0.8rem",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "600",
            letterSpacing: "1px"
          }}>
          BACK TO CONTENT ENGINE
        </button>
        
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "2.5rem",
          fontWeight: "700",
          background: `linear-gradient(135deg, ${NEON_BLUE}, ${NEON_PURPLE})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "15px",
          letterSpacing: "3px"
        }}>
          PARTNER RESOURCES
        </h1>
        <p style={{
          fontSize: "1rem",
          opacity: 0.7,
          maxWidth: "500px",
          margin: "0 auto",
          fontFamily: "'Share Tech Mono', monospace"
        }}>
          Essential tools and resources to supercharge your content creation and trading journey.
        </p>
      </div>

      {/* Links Grid */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "30px"
      }}>
        {links.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
            style={{
              background: "rgba(15,23,42,0.5)",
              borderRadius: "20px",
              border: `2px solid ${link.color}30`,
              padding: "30px",
              textDecoration: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: "25px",
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Background Glow */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "-20%",
              width: "200px",
              height: "200px",
              background: `radial-gradient(circle, ${link.color}20 0%, transparent 70%)`,
              borderRadius: "50%"
            }}></div>

            {/* Icon Box */}
            <div style={{
              width: "80px",
              height: "80px",
              background: `linear-gradient(135deg, ${link.color}30, ${link.color}10)`,
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: "700",
              color: link.color,
              flexShrink: 0,
              border: `1px solid ${link.color}30`,
              boxShadow: `0 0 20px ${link.color}20`
            }}>
              {link.id === "madfxbosspc" ? "PC" : "AI"}
            </div>

            {/* Content */}
            <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
              <h2 style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                color: link.color,
                marginBottom: "10px",
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: "1px"
              }}>
                {link.name}
              </h2>
              <p style={{
                fontSize: "0.95rem",
                opacity: 0.8,
                lineHeight: "1.6",
                margin: 0,
                fontFamily: "'Rajdhani', sans-serif"
              }}>
                {link.description}
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              width: "50px",
              height: "50px",
              background: `${link.color}15`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: link.color,
              fontSize: "1.2rem",
              fontFamily: "'Share Tech Mono', monospace",
              flexShrink: 0,
              transition: "all 0.3s ease"
            }}>
              &rarr;
            </div>
          </a>
        ))}
      </div>

      {/* Additional Info */}
      <div style={{
        maxWidth: "800px",
        margin: "50px auto 0",
        textAlign: "center",
        padding: "30px",
        background: "rgba(0,255,136,0.05)",
        borderRadius: "16px",
        border: `1px solid ${NEON_GREEN}10`
      }}>
        <h3 style={{ 
          color: NEON_GREEN, 
          marginBottom: "15px",
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "1px"
        }}>
          BECOME A PARTNER
        </h3>
        <p style={{ opacity: 0.7, marginBottom: "20px", fontFamily: "'Rajdhani', sans-serif" }}>
          Join our affiliate program and earn commissions while helping creators succeed.
        </p>
        <button style={{
          background: `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
          border: "none",
          color: "#030712",
          padding: "12px 30px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "700",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "1rem",
          letterSpacing: "1px"
        }}>
          APPLY FOR PARTNERSHIP
        </button>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "50px",
        textAlign: "center",
        padding: "20px",
        borderTop: `1px solid ${NEON_BLUE}10`,
        opacity: 0.5
      }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace" }}>
          {new Date().getFullYear()} MADFX BOSS. All rights reserved.
        </p>
        <p style={{ 
          fontSize: "0.8rem", 
          marginTop: "10px",
          fontFamily: "'Rajdhani', sans-serif",
          letterSpacing: "1px"
        }}>
          POWERED BY MADFX BOSS PLATFORM
        </p>
      </div>
    </div>
  );
};

export default ViralBossLinks;