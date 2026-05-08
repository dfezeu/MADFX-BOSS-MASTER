import { useState } from "react";

export default function MiningOptions() {
  const [miningContracts, setMiningContracts] = useState([
    { id: 1, name: "Starter Hash Power", hashrate: "100 TH/s", dailyReward: 0.005, price: 49, duration: "30 days", sold: 12, limit: 50 },
    { id: 2, name: "Growth Hash Power", hashrate: "500 TH/s", dailyReward: 0.025, price: 199, duration: "60 days", sold: 8, limit: 25 },
    { id: 3, name: "Enterprise Hash Power", hashrate: "2000 TH/s", dailyReward: 0.12, price: 699, duration: "90 days", sold: 3, limit: 10 }
  ]);

  const [selectedContract, setSelectedContract] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSelect = (contract) => {
    setSelectedContract(contract);
    setShowDetails(true);
  };

  const handlePurchase = () => {
    if (!selectedContract) return;
    alert(`Successfully purchased ${selectedContract.name}! Check your wallet for confirmation.`);
    setShowDetails(false);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MINING OPPORTUNITIES</h2>
        <div style={{ color: "#64748b", fontSize: "14px" }}>Earn passive income through decentralized computing</div>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", height: "200px", marginBottom: "25px", position: "relative" }}>
        <div style={{ position: "absolute", top: "10px", left: "10px", color: "#64748b", fontSize: "12px" }}>
          Mining Hashrate Distribution
        </div>
        {/* Simple chart representation */}
        <div style={{ 
          width: "100%", 
          height: "100%", 
          background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(212,160,18,0.1))", 
          borderRadius: "12px",
          overflow: "hidden"
        }}>
          <div style={{ 
            position: "absolute", 
            bottom: "0", 
            left: "0", 
            width: "60%", 
            height: "70%", 
            background: "linear-gradient(to top, #00ff88, transparent)",
            opacity: "0.7"
          }}></div>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px", marginBottom: "25px" }}>
        {miningContracts.map(contract => (
          <div
            key={contract.id}
            onClick={() => handleSelect(contract)}
            style={{
              background: "#1e3a5f",
              borderRadius: "12px",
              padding: "20px",
              borderLeft: `4px solid #00ff88`,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600" }}>{contract.name}</h3>
              <span style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", padding: "3px 8px", borderRadius: "4px", fontSize: "10px" }}>
                {contract.limit - contract.sold} left
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
              <span style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>${contract.dailyReward}</span>
              <span style={{ color: "#64748b", fontSize: "14px" }}>NXUS/day</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "15px" }}>
              <span style={{ color: "#64748b" }}>{contract.hashrate}</span>
              <span style={{ color: "#ef4444" }}>{contract.duration}</span>
            </div>
            
            <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px", marginBottom: "10px" }}>
              <div style={{ width: `${(contract.sold/contract.limit)*100}%`, height: "100%", background: "#00ff88", borderRadius: "4px" }}></div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ color: "#64748b" }}>{contract.sold}/{contract.limit} sold</span>
              <span style={{ color: "#10b981", fontWeight: "600" }}>${contract.price}</span>
            </div>
          </div>
        ))}
      </div>
      
      {showDetails && selectedContract && (
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
        onClick={() => setShowDetails(false)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "400px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: "#00ff88", marginBottom: "15px", textAlign: "center" }}>{selectedContract.name}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "20px" }}>
              <div>
                <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Hashrate</div>
                <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "700" }}>{selectedContract.hashrate}</div>
              </div>
              <div>
                <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Daily Reward</div>
                <div style={{ color: "#00ff88", fontSize: "18px", fontWeight: "700" }}>{selectedContract.dailyReward} NXUS</div>
              </div>
              <div>
                <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Price</div>
                <div style={{ color: "#10b981", fontSize: "18px", fontWeight: "700" }}>${selectedContract.price}</div>
              </div>
              <div>
                <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Duration</div>
                <div style={{ color: "#ff8800", fontSize: "18px", fontWeight: "700" }}>{selectedContract.duration}</div>
              </div>
            </div>
            
            <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px", marginBottom: "20px" }}>
              <div style={{ width: `${(selectedContract.sold/selectedContract.limit)*100}%`, height: "100%", background: "#00ff88", borderRadius: "4px" }}></div>
            </div>
            <div style={{ textAlign: "center", color: "#64748b", fontSize: "12px", marginBottom: "15px" }}>
              {selectedContract.sold}/{selectedContract.limit} sold
            </div>
            
            <button
              onClick={handlePurchase}
              style={{
                width: "100%",
                background: "#00ff88",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                color: "#0a0a0a",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Purchase Contract
            </button>
          </div>
        </div>
      )}
    </div>
  );
}