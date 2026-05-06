import { useState } from "react";

const REVENUE_STREAMS = [
  {
    id: 1,
    name: "AI Trading Signals",
    description: "Premium harmonic pattern & trading signals",
    price: 49,
    billing: "monthly",
    category: "Software",
    active: true,
    color: "#00ff88"
  },
  {
    id: 2,
    name: "MAXAI Trader License",
    description: "AI-powered automated trading bot",
    price: 199,
    billing: "monthly",
    category: "Software",
    active: true,
    color: "#00aaff"
  },
  {
    id: 3,
    name: "Prop Firm Compliance",
    description: "FTMO/Funded Next pass verification",
    price: 299,
    billing: "one-time",
    category: "Service",
    active: true,
    color: "#d4a012"
  },
  {
    id: 4,
    name: "Token Launchpad",
    description: "Launch tokens on MADFX ecosystem",
    price: 0.5,
    billing: "per-launch",
    category: "Service",
    active: true,
    color: "#ff6b6b",
    unit: "ETH"
  },
  {
    id: 5,
    name: "DeFi Staking Pool",
    description: "TGRR staking rewards (APY: 45%)",
    price: 45,
    billing: "apy",
    category: "DeFi",
    active: true,
    color: "#10b981"
  },
  {
    id: 6,
    name: "LP Farming",
    description: "Liquidity provider rewards",
    price: 35,
    billing: "apy",
    category: "DeFi",
    active: true,
    color: "#8b5cf6"
  },
  {
    id: 7,
    name: "Agent Marketplace",
    description: "Buy/sell AI trading agents",
    price: 99,
    billing: "average",
    category: "Marketplace",
    active: true,
    color: "#f59e0b"
  },
  {
    id: 8,
    name: "Copy Trading",
    description: "Follow top traders automatically",
    price: 29,
    billing: "monthly",
    category: "Service",
    active: true,
    color: "#ec4899"
  },
  {
    id: 9,
    name: "MADFX Merch Store",
    description: "Apparel & branded products",
    price: 15,
    billing: "commission",
    category: "E-commerce",
    active: true,
    color: "#14b8a6"
  },
  {
    id: 10,
    name: "Ad Network",
    description: "Banner ads on platform",
    price: 5,
    billing: "daily",
    category: "Advertising",
    active: true,
    color: "#6366f1"
  },
  {
    id: 11,
    name: "Affiliate Program",
    description: "30% lifetime commission",
    price: 30,
    billing: "percent",
    category: "Affiliate",
    active: true,
    color: "#22c55e"
  },
  {
    id: 12,
    name: "Premium Courses",
    description: "Trading education",
    price: 199,
    billing: "one-time",
    category: "Education",
    active: true,
    color: "#0ea5e9"
  },
  {
    id: 13,
    name: "VIP Membership",
    description: "Exclusive signals & alerts",
    price: 149,
    billing: "monthly",
    category: "Subscription",
    active: true,
    color: "#eab308"
  },
  {
    id: 14,
    name: "API Access",
    description: "Trading API for developers",
    price: 99,
    billing: "monthly",
    category: "Software",
    active: true,
    color: "#a855f7"
  },
  {
    id: 15,
    name: "NFT Collection",
    description: "Limited edition IXT NFTs",
    price: 0.1,
    billing: "mint",
    category: "NFT",
    active: false,
    color: "#f97316"
  }
];

const MARKETING_CAMPAIGNS = [
  { id: 1, name: "Crypto Twitter/X", platform: "Twitter", followers: 12500, engagement: 4.2, status: "active" },
  { id: 2, name: "Discord Community", platform: "Discord", members: 8500, engagement: 12.5, status: "active" },
  { id: 3, name: "Telegram Signals", platform: "Telegram", subscribers: 15000, engagement: 8.3, status: "active" },
  { id: 4, name: "YouTube Trading", platform: "YouTube", subscribers: 4200, engagement: 6.1, status: "active" },
  { id: 5, name: "Instagram", platform: "Instagram", followers: 3800, engagement: 3.8, status: "paused" },
  { id: 6, name: "LinkedIn B2B", platform: "LinkedIn", connections: 2100, engagement: 2.1, status: "active" }
];

const TRAFFIC_SOURCES = [
  { source: "Direct", visits: 45000, conversion: 3.2, revenue: 12500 },
  { source: "Organic Search", visits: 38000, conversion: 2.8, revenue: 8900 },
  { source: "Social Media", visits: 28000, conversion: 4.1, revenue: 15200 },
  { source: "Referral", visits: 15000, conversion: 5.2, revenue: 8200 },
  { source: "Email", visits: 12000, conversion: 6.8, revenue: 5400 },
  { source: "Paid Ads", visits: 8500, conversion: 2.1, revenue: 2800 }
];

export default function MonetizationHub() {
  const [activeTab, setActiveTab] = useState("streams");
  const [walletConnected, setWalletConnected] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(null);

  const activeStreams = REVENUE_STREAMS.filter(s => s.active);
  const totalMRR = activeStreams.reduce((sum, s) => {
    if (s.billing === "monthly" || s.billing === "apy") return sum + s.price;
    if (s.billing === "average") return sum + (s.price * 0.3);
    return sum;
  }, 0);

  const totalTraffic = TRAFFIC_SOURCES.reduce((sum, t) => sum + t.visits, 0);
  const totalRevenue = TRAFFIC_SOURCES.reduce((sum, t) => sum + t.revenue, 0);
  const avgConversion = totalTraffic > 0 ? (TRAFFIC_SOURCES.reduce((sum, t) => sum + (t.conversion * t.visits), 0) / totalTraffic) : 0;

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MADFX REVENUE ENGINE</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>15 Passive Income Streams for $100M Target</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setWalletConnected(!walletConnected)}
          style={{
            background: walletConnected ? "#10b981" : "#3b82f6",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "11px" }}>MONTHLY REVENUE</div>
            <div style={{ color: "#10b981", fontSize: "20px", fontWeight: "700" }}>${totalMRR.toFixed(0)}K</div>
          </div>
          <div style={{ background: "#1e3a5f", padding: "10px 20px", borderRadius: "8px" }}>
            <div style={{ color: "#64748b", fontSize: "11px" }}>MONTHLY TRAFFIC</div>
            <div style={{ color: "#00aaff", fontSize: "20px", fontWeight: "700" }}>{(totalTraffic/1000).toFixed(0)}K</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {["streams", "traffic", "marketing", "campaigns"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "#d4a012" : "transparent",
              color: activeTab === tab ? "#0a0a0a" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "streams" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
          {REVENUE_STREAMS.map(stream => (
            <div
              key={stream.id}
              style={{
                background: "#1e3a5f",
                borderRadius: "12px",
                padding: "20px",
                borderLeft: `4px solid ${stream.color}`,
                opacity: stream.active ? 1 : 0.5
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{stream.name}</h3>
                <span style={{ 
                  background: stream.active ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                  color: stream.active ? "#10b981" : "#ef4444",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: "600"
                }}>
                  {stream.active ? "ACTIVE" : "COMING"}
                </span>
              </div>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "15px" }}>{stream.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: stream.color, fontSize: "18px", fontWeight: "700" }}>${stream.price}</span>
                  <span style={{ color: "#64748b", fontSize: "11px" }}> {stream.billing === "apy" ? "APY" : stream.billing === "percent" ? "%" : stream.unit ? stream.unit : "/" + stream.billing}</span>
                </div>
                <button
                  onClick={() => setShowSubscribe(stream)}
                  style={{
                    background: stream.active ? stream.color : "#1e3a5f",
                    color: stream.active ? "#0a0a0a" : "#64748b",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "12px"
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "traffic" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "20px" }}>
            <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px" }}>TOTAL VISITS</div>
              <div style={{ color: "#00aaff", fontSize: "24px", fontWeight: "700" }}>{(totalTraffic/1000).toFixed(1)}K</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px" }}>CONVERSION RATE</div>
              <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "700" }}>{avgConversion.toFixed(1)}%</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px" }}>REVENUE</div>
              <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>${totalRevenue.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "15px", borderBottom: "1px solid #0d1525", display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "12px", fontWeight: "600" }}>
              <span>SOURCE</span>
              <span>VISITS</span>
              <span>CONV</span>
              <span>REVENUE</span>
            </div>
            {TRAFFIC_SOURCES.map(source => (
              <div key={source.source} style={{ padding: "12px 15px", borderBottom: "1px solid #0d1525", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#fff", fontWeight: "500" }}>{source.source}</span>
                <span style={{ color: "#00aaff" }}>{source.visits.toLocaleString()}</span>
                <span style={{ color: source.conversion > 4 ? "#10b981" : "#64748b" }}>{source.conversion}%</span>
                <span style={{ color: "#10b981", fontWeight: "600" }}>${source.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "marketing" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "15px" }}>Lead Generation</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Email List</span>
                <span style={{ color: "#fff" }}>52,000 subscribers</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Lead Magnets</span>
                <span style={{ color: "#fff" }}>5 active</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Landing Pages</span>
                <span style={{ color: "#fff" }}>8 active</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Conversion Rate</span>
                <span style={{ color: "#10b981" }}>4.2%</span>
              </div>
            </div>
          </div>

          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "15px" }}>Email Campaigns</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Weekly Newsletter</span>
                <span style={{ color: "#fff" }}>Sent</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Signal Alerts</span>
                <span style={{ color: "#fff" }}>Real-time</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Promotional</span>
                <span style={{ color: "#fff" }}>3x/week</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Open Rate</span>
                <span style={{ color: "#10b981" }}>28%</span>
              </div>
            </div>
          </div>

          <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "15px" }}>Paid Advertising</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Google Ads</span>
                <span style={{ color: "#fff" }}>$500/mo</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Meta Ads</span>
                <span style={{ color: "#fff" }}>$300/mo</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Crypto Ads</span>
                <span style={{ color: "#fff" }}>$200/mo</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>ROAS</span>
                <span style={{ color: "#10b981" }}>3.2x</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "campaigns" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "15px", borderBottom: "1px solid #0d1525", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", color: "#64748b", fontSize: "12px", fontWeight: "600" }}>
            <span>CAMPAIGN</span>
            <span>PLATFORM</span>
            <span>FOLLOWERS</span>
            <span>ENGAGEMENT</span>
            <span>STATUS</span>
          </div>
          {MARKETING_CAMPAIGNS.map(campaign => (
            <div key={campaign.id} style={{ padding: "15px", borderBottom: "1px solid #0d1525", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: "500" }}>{campaign.name}</span>
              <span style={{ color: "#64748b" }}>{campaign.platform}</span>
              <span style={{ color: "#00aaff" }}>{campaign.followers.toLocaleString()}</span>
              <span style={{ color: campaign.engagement > 5 ? "#10b981" : "#f59e0b" }}>{campaign.engagement}%</span>
              <span style={{ 
                color: campaign.status === "active" ? "#10b981" : "#64748b",
                background: campaign.status === "active" ? "rgba(16,185,129,0.2)" : "rgba(100,116,139,0.2)",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "11px",
                textAlign: "center"
              }}>
                {campaign.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {showSubscribe && (
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
        }}
        onClick={() => setShowSubscribe(null)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: showSubscribe.color, fontSize: "22px", marginBottom: "10px" }}>{showSubscribe.name}</h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>{showSubscribe.description}</p>
            <div style={{ background: "#0d1525", padding: "20px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: "12px" }}>PRICE</div>
              <div style={{ color: showSubscribe.color, fontSize: "32px", fontWeight: "700" }}>${showSubscribe.price}</div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>{showSubscribe.billing}</div>
            </div>
            <button
              onClick={() => { alert("Subscribe: " + showSubscribe.name); setShowSubscribe(null); }}
              style={{
                width: "100%",
                background: showSubscribe.color,
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                color: "#0a0a0a",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "25px", padding: "20px", background: "linear-gradient(135deg, rgba(212,160,18,0.1), rgba(0,255,136,0.1))", borderRadius: "12px", border: "1px solid #d4a012" }}>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "15px" }}>REVENUE PROJECTIONS</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>MONTH 1</div><div style={{ color: "#10b981", fontSize: "20px", fontWeight: "700" }}>$5K</div></div>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>MONTH 3</div><div style={{ color: "#10b981", fontSize: "20px", fontWeight: "700" }}>$25K</div></div>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>MONTH 6</div><div style={{ color: "#10b981", fontSize: "20px", fontWeight: "700" }}>$100K</div></div>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>YEAR 1</div><div style={{ color: "#d4a012", fontSize: "20px", fontWeight: "700" }}>$500K</div></div>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>YEAR 2</div><div style={{ color: "#d4a012", fontSize: "20px", fontWeight: "700" }}>$2M</div></div>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>YEAR 3</div><div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>$10M</div></div>
            <div><div style={{ color: "#64748b", fontSize: "11px" }}>2029</div><div style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>$100M</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}