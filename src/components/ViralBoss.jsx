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

const ViralBoss = ({ setActiveTab }) => {
  const [activeFeature, setActiveFeature] = useState("video");
  const [contentInput, setContentInput] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState("create");

  const platforms = [
    { id: "tiktok", name: "TikTok", color: "#ff0050" },
    { id: "youtube", name: "YouTube", color: "#ff0000" },
    { id: "instagram", name: "Instagram", color: "#e4405f" },
    { id: "twitter", name: "X", color: "#ffffff" },
    { id: "linkedin", name: "LinkedIn", color: "#0077b5" },
  ];

  const features = [
    { id: "video", name: "AI Video", desc: "Generate viral videos from text" },
    { id: "voice", name: "AI Voice", desc: "Natural voiceovers in 50+ languages" },
    { id: "script", name: "Script Writer", desc: "Viral scripts with hooks & CTAs" },
    { id: "schedule", name: "Scheduler", desc: "Plan your entire content calendar" },
    { id: "analytics", name: "Analytics", desc: "Track performance across platforms" },
    { id: "store", name: "Storefront", desc: "Built-in e-commerce & digital products" },
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContent = async () => {
    if (!contentInput.trim()) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral",
          prompt: `You are a viral content expert. Generate a viral content strategy for: ${contentInput}. Include: title, script with hook, body, CTA, and hashtags. Format as JSON with keys: title, script, hashtags.`,
          stream: false
        })
      });
      const data = await response.json();
      
      setGeneratedContent({
        title: data.response?.title || "5 Tips to Go Viral in 2025",
        script: data.response?.script || `Hook: Want to blow up on social media in 2025?\n\nBody: Here are 5 game-changing strategies...\n\nCTA: Follow for more viral tips!`,
        hashtags: data.response?.hashtags || "#viral #contentcreator #socialmedia #growth #2025",
        scheduledTime: "Tomorrow at 2PM EST"
      });
    } catch (err) {
      setGeneratedContent({
        title: "5 Tips to Go Viral in 2025",
        script: `Hook: Want to blow up on social media in 2025?\n\nBody: Here are 5 game-changing strategies...\n\nCTA: Follow for more viral tips!`,
        hashtags: "#viral #contentcreator #socialmedia #growth #2025",
        scheduledTime: "Tomorrow at 2PM EST"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{
      background: DARK_BG,
      minHeight: "100vh",
      color: "#ffffff",
      fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
      padding: "20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=Share+Tech+Mono&display=swap');
        
        .feature-btn:hover {
          background: rgba(0, 212, 255, 0.15) !important;
          border-color: ${NEON_BLUE} !important;
          transform: translateX(5px);
        }
        
        .platform-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px ${NEON_BLUE}40; }
          50% { box-shadow: 0 0 25px ${NEON_BLUE}60; }
        }
        
        .generating {
          animation: pulse-glow 1.5s infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        paddingBottom: "20px",
        borderBottom: `1px solid ${NEON_PURPLE}30`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              background: "transparent",
              border: `1px solid ${NEON_BLUE}40`,
              color: NEON_BLUE,
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "600",
              letterSpacing: "1px"
            }}>
            BACK
          </button>
          <div>
            <h1 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "1.8rem",
              fontWeight: "700",
              background: `linear-gradient(135deg, ${NEON_PURPLE}, ${NEON_BLUE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              letterSpacing: "3px"
            }}>
              VIRAL BOSS
            </h1>
            <p style={{ 
              fontSize: "0.75rem", 
              color: NEON_BLUE, 
              margin: 0, 
              opacity: 0.8,
              letterSpacing: "2px" 
            }}>
              AI-POWERED CONTENT CREATION ENGINE
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setActiveTab("viral-links")}
            style={{
              background: `${NEON_PURPLE}15`,
              border: `1px solid ${NEON_PURPLE}40`,
              color: NEON_PURPLE,
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "600",
              letterSpacing: "1px"
            }}>
            RESOURCES
          </button>
          <button style={{
            background: `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
            border: "none",
            color: "#030712",
            padding: "10px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: "700",
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "1px"
          }}>
            GO PRO
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px"
      }}>
        {["create", "schedule", "analytics", "store"].map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              background: activeSection === section ? `${NEON_BLUE}20` : "transparent",
              border: `1px solid ${activeSection === section ? NEON_BLUE : "rgba(255,255,255,0.1)"}`,
              color: activeSection === section ? NEON_BLUE : "#ffffff",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            {section}
          </button>
        ))}
      </div>

      {activeSection === "create" && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "30px" }}>
          {/* Sidebar */}
          <div>
            <h3 style={{
              color: NEON_GREEN,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "2px",
              marginBottom: "15px"
            }}>
              // AI TOOLS
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {features.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className="feature-btn"
                  style={{
                    background: activeFeature === feature.id ? "rgba(0, 212, 255, 0.15)" : "transparent",
                    border: `1px solid ${activeFeature === feature.id ? NEON_BLUE : "rgba(255,255,255,0.1)"}`,
                    color: "#ffffff",
                    padding: "15px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    fontFamily: "'Rajdhani', sans-serif"
                  }}
                >
                  <div style={{ fontWeight: "600", fontSize: "0.95rem", color: activeFeature === feature.id ? NEON_BLUE : "#ffffff" }}>
                    {feature.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "3px" }}>
                    {feature.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Panel */}
          <div>
            {/* Platform Selection */}
            <div style={{ marginBottom: "25px" }}>
              <h3 style={{ color: NEON_BLUE, marginBottom: "15px", fontSize: "0.85rem", letterSpacing: "1px" }}>
                // SELECT DESTINATION PLATFORMS
              </h3>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {platforms.map(platform => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className="platform-btn"
                    style={{
                      background: selectedPlatforms.includes(platform.id) 
                        ? `linear-gradient(135deg, ${platform.color}30, ${platform.color}10)`
                        : "rgba(15,23,42,0.5)",
                      border: `2px solid ${selectedPlatforms.includes(platform.id) ? platform.color : "rgba(255,255,255,0.1)"}`,
                      color: "#ffffff",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "all 0.3s ease",
                      fontFamily: "'Rajdhani', sans-serif"
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>{platform.name}</span>
                    {selectedPlatforms.includes(platform.id) && (
                      <span style={{ color: NEON_GREEN, fontSize: "0.9rem" }}>+</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            <div style={{
              ...GLASS_STYLE,
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "25px"
            }}>
              <h3 style={{ color: NEON_GREEN, marginBottom: "15px", fontSize: "0.85rem", letterSpacing: "1px" }}>
                // CREATE YOUR CONTENT
              </h3>
              <textarea
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                placeholder="Describe your content idea... e.g., Create a viral video about AI trading tips for beginners"
                style={{
                  width: "100%",
                  height: "120px",
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "15px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontFamily: "'Share Tech Mono', monospace",
                  resize: "none",
                  outline: "none"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["Script", "Thumbnail", "Voiceover"].map(tool => (
                    <button key={tool} style={{
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid rgba(0,255,136,0.3)",
                      color: NEON_GREEN,
                      padding: "10px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: "600"
                    }}>
                      {tool.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={generateContent}
                  disabled={isGenerating || !contentInput.trim()}
                  className={isGenerating ? "generating" : ""}
                  style={{
                    background: isGenerating || !contentInput.trim()
                      ? "rgba(0,255,136,0.3)"
                      : `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
                    border: "none",
                    color: isGenerating || !contentInput.trim() ? "rgba(255,255,255,0.5)" : "#030712",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    cursor: isGenerating ? "wait" : "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "1px"
                  }}
                >
                  {isGenerating ? "GENERATING..." : "GENERATE CONTENT"}
                </button>
              </div>
            </div>

            {/* Generated Content Display */}
            {generatedContent && (
              <div style={{
                ...GLASS_STYLE,
                borderRadius: "16px",
                padding: "25px",
                borderColor: NEON_GREEN + "30"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px"
                }}>
                  <h3 style={{ color: NEON_GREEN, margin: 0, letterSpacing: "1px" }}>
                    // AI GENERATED CONTENT
                  </h3>
                  <span style={{
                    background: "rgba(0,255,136,0.2)",
                    color: NEON_GREEN,
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontFamily: "'Share Tech Mono', monospace"
                  }}>
                    SCHEDULED: {generatedContent.scheduledTime}
                  </span>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: NEON_BLUE, fontSize: "0.85rem", marginBottom: "10px", letterSpacing: "1px" }}>
                    // TITLE
                  </h4>
                  <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>{generatedContent.title}</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: NEON_BLUE, fontSize: "0.85rem", marginBottom: "10px", letterSpacing: "1px" }}>
                    // SCRIPT
                  </h4>
                  <pre style={{
                    background: "rgba(0,0,0,0.5)",
                    padding: "15px",
                    borderRadius: "10px",
                    whiteSpace: "pre-wrap",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.9rem",
                    lineHeight: "1.6"
                  }}>
                    {generatedContent.script}
                  </pre>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: NEON_BLUE, fontSize: "0.85rem", marginBottom: "10px", letterSpacing: "1px" }}>
                    // HASHTAGS
                  </h4>
                  <p style={{ color: NEON_GREEN, fontFamily: "'Share Tech Mono', monospace" }}>
                    {generatedContent.hashtags}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  <button style={{
                    background: `linear-gradient(135deg, ${NEON_GREEN}, ${NEON_BLUE})`,
                    border: "none",
                    color: "#030712",
                    padding: "12px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "1px"
                  }}>
                    PUBLISH NOW
                  </button>
                  <button style={{
                    background: "rgba(0,255,136,0.1)",
                    border: `1px solid ${NEON_GREEN}40`,
                    color: NEON_GREEN,
                    padding: "12px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: "600"
                  }}>
                    SCHEDULE
                  </button>
                  <button style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                    padding: "12px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "'Rajdhani', sans-serif"
                  }}>
                    EDIT
                  </button>
                </div>
              </div>
            )}

            {/* Stats Overview */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginTop: "30px"
            }}>
              {[
                { label: "TOTAL VIEWS", value: "2.4M", change: "+23%", color: NEON_BLUE },
                { label: "ENGAGEMENT", value: "8.7%", change: "+5%", color: NEON_GREEN },
                { label: "FOLLOWERS", value: "45.2K", change: "+1.2K", color: NEON_PURPLE },
                { label: "REVENUE", value: "$3,240", change: "+18%", color: "#fbbf24" },
              ].map((stat, i) => (
                <div key={i} style={{
                  ...GLASS_STYLE,
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center"
                }}>
                  <div style={{ 
                    fontSize: "1.8rem", 
                    fontWeight: "700", 
                    color: stat.color,
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: `0 0 15px ${stat.color}40`
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.7rem", opacity: 0.6, marginBottom: "5px", letterSpacing: "1px" }}>
                    {stat.label}
                  </div>
                  <div style={{ color: NEON_GREEN, fontSize: "0.8rem", fontWeight: "600" }}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === "schedule" && (
        <div style={{ ...GLASS_STYLE, borderRadius: "16px", padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: NEON_BLUE, fontFamily: "'Orbitron', sans-serif", marginBottom: "20px" }}>
            // CONTENT CALENDAR
          </h2>
          <p style={{ opacity: 0.7 }}>Schedule and manage your content across all platforms.</p>
          <div style={{ 
            marginTop: "30px", 
            padding: "60px", 
            border: `2px dashed ${NEON_PURPLE}30`, 
            borderRadius: "16px" 
          }}>
            <p style={{ opacity: 0.5 }}>Calendar view coming soon...</p>
          </div>
        </div>
      )}

      {activeSection === "analytics" && (
        <div style={{ ...GLASS_STYLE, borderRadius: "16px", padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: NEON_GREEN, fontFamily: "'Orbitron', sans-serif", marginBottom: "20px" }}>
            // PERFORMANCE ANALYTICS
          </h2>
          <p style={{ opacity: 0.7 }}>Track your content performance across all platforms.</p>
          <div style={{ 
            marginTop: "30px", 
            padding: "60px", 
            border: `2px dashed ${NEON_BLUE}30`, 
            borderRadius: "16px" 
          }}>
            <p style={{ opacity: 0.5 }}>Analytics dashboard coming soon...</p>
          </div>
        </div>
      )}

      {activeSection === "store" && (
        <div style={{ ...GLASS_STYLE, borderRadius: "16px", padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: NEON_PURPLE, fontFamily: "'Orbitron', sans-serif", marginBottom: "20px" }}>
            // DIGITAL STOREFRONT
          </h2>
          <p style={{ opacity: 0.7 }}>Sell your digital products and services directly to your audience.</p>
          <div style={{ 
            marginTop: "30px", 
            padding: "60px", 
            border: `2px dashed ${NEON_GREEN}30`, 
            borderRadius: "16px" 
          }}>
            <p style={{ opacity: 0.5 }}>Store features coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViralBoss;