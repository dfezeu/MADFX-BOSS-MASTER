import { useState } from "react";

export default function TokenLauncher() {
  const [step, setStep] = useState(1);
  const [tokenConfig, setTokenConfig] = useState({
    name: "",
    symbol: "",
    supply: 1000000000,
    decimals: 9,
    chain: "ethereum",
    type: "ERC20",
    description: "",
    image: null,
    tax: 0,
    maxWallet: 5
  });
  const [launched, setLaunched] = useState(false);

  const chains = [
    { id: "ethereum", name: "Ethereum", color: "#627EEA", fee: "$150+" },
    { id: "solana", name: "Solana", color: "#9945FF", fee: "~$2" },
    { id: "polygon", name: "Polygon", color: "#8247E5", fee: "~$5" },
    { id: "bsc", name: "BNB Chain", color: "#F3BA2F", fee: "~$5" }
  ];

  const presets = [
    { name: "Standard Token", tax: 0, maxWallet: 5 },
    { name: "Deflationary", tax: 5, maxWallet: 2 },
    { name: "Anti-Whale", tax: 2, maxWallet: 1 },
    { name: "Community", tax: 3, maxWallet: 10 }
  ];

  const deployToken = () => {
    setLaunched(true);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>NXUS TOKEN LAUNCHER</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Deploy your own token to multiple chains</p>
      </div>

      {!launched ? (
        <div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
            {[1, 2, 3, 4].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: step >= s ? "#3b82f6" : "#1e3a5f",
                  color: step >= s ? "#fff" : "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  {s}
                </div>
                {s < 4 && <div style={{ width: "50px", height: "2px", background: step > s ? "#3b82f6" : "#1e3a5f" }}></div>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Select Chain</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "25px" }}>
                {chains.map(chain => (
                  <button
                    key={chain.id}
                    onClick={() => setTokenConfig({ ...tokenConfig, chain: chain.id })}
                    style={{
                      background: tokenConfig.chain === chain.id ? `${chain.color}30` : "#1e3a5f",
                      border: tokenConfig.chain === chain.id ? `2px solid ${chain.color}` : "1px solid #1e3a5f",
                      padding: "20px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      textAlign: "center"
                    }}
                  >
                    <div style={{ color: chain.color, fontWeight: "700", fontSize: "16px", marginBottom: "5px" }}>{chain.name}</div>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>Fee: {chain.fee}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                style={{ background: "#3b82f6", border: "none", padding: "12px 30px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Token Details</h3>
              <div style={{ display: "grid", gap: "15px", marginBottom: "25px" }}>
                <div>
                  <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Token Name</label>
                  <input
                    type="text"
                    value={tokenConfig.name}
                    onChange={(e) => setTokenConfig({ ...tokenConfig, name: e.target.value })}
                    placeholder="e.g. Nexus Token"
                    style={{ width: "100%", padding: "12px", background: "#1e3a5f", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Symbol</label>
                  <input
                    type="text"
                    value={tokenConfig.symbol}
                    onChange={(e) => setTokenConfig({ ...tokenConfig, symbol: e.target.value.toUpperCase() })}
                    placeholder="e.g. NXUS"
                    style={{ width: "100%", padding: "12px", background: "#1e3a5f", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Total Supply</label>
                    <input
                      type="number"
                      value={tokenConfig.supply}
                      onChange={(e) => setTokenConfig({ ...tokenConfig, supply: parseInt(e.target.value) })}
                      style={{ width: "100%", padding: "12px", background: "#1e3a5f", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                    />
                  </div>
                  <div>
                    <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Decimals</label>
                    <input
                      type="number"
                      value={tokenConfig.decimals}
                      onChange={(e) => setTokenConfig({ ...tokenConfig, decimals: parseInt(e.target.value) })}
                      style={{ width: "100%", padding: "12px", background: "#1e3a5f", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(1)} style={{ background: "transparent", border: "1px solid #64748b", color: "#64748b", padding: "12px 20px", borderRadius: "8px", cursor: "pointer" }}>Back</button>
                <button onClick={() => setStep(3)} disabled={!tokenConfig.name || !tokenConfig.symbol} style={{ background: "#3b82f6", border: "none", padding: "12px 30px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600", opacity: !tokenConfig.name || !tokenConfig.symbol ? 0.5 : 1 }}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Token Presets</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "25px" }}>
                {presets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setTokenConfig({ ...tokenConfig, tax: preset.tax, maxWallet: preset.maxWallet })}
                    style={{
                      background: tokenConfig.tax === preset.tax ? "rgba(59, 130, 246, 0.2)" : "#1e3a5f",
                      border: tokenConfig.tax === preset.tax ? "2px solid #3b82f6" : "1px solid #1e3a5f",
                      padding: "15px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <div style={{ color: "#fff", fontWeight: "600", marginBottom: "5px" }}>{preset.name}</div>
                    <div style={{ color: "#64748b", fontSize: "11px" }}>Tax: {preset.tax}% • Max wallet: {preset.maxWallet}%</div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(2)} style={{ background: "transparent", border: "1px solid #64748b", color: "#64748b", padding: "12px 20px", borderRadius: "8px", cursor: "pointer" }}>Back</button>
                <button onClick={() => setStep(4)} style={{ background: "#3b82f6", border: "none", padding: "12px 30px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}>Continue</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Deploy Token</h3>
              <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
                <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Chain:</span>
                    <span style={{ color: "#fff" }}>{tokenConfig.chain}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Name:</span>
                    <span style={{ color: "#fff" }}>{tokenConfig.name}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Symbol:</span>
                    <span style={{ color: "#fff" }}>{tokenConfig.symbol}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Supply:</span>
                    <span style={{ color: "#fff" }}>{tokenConfig.supply.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Tax:</span>
                    <span style={{ color: "#fff" }}>{tokenConfig.tax}%</span>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #0d1525", paddingTop: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#d4a012", fontWeight: "600" }}>Deploy Fee:</span>
                    <span style={{ color: "#d4a012", fontWeight: "700" }}>{chains.find(c => c.id === tokenConfig.chain)?.fee}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setStep(3)} style={{ background: "transparent", border: "1px solid #64748b", color: "#64748b", padding: "12px 20px", borderRadius: "8px", cursor: "pointer" }}>Back</button>
                <button onClick={deployToken} style={{ background: "#10b981", border: "none", padding: "12px 30px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}>Deploy to {tokenConfig.chain}</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
          <h3 style={{ color: "#10b981", fontSize: "24px", marginBottom: "15px" }}>Token Deployed!</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Your token <strong>{tokenConfig.name}</strong> ({tokenConfig.symbol}) has been deployed to {tokenConfig.chain}
          </p>
          <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Token Address:</div>
            <div style={{ color: "#fff", fontFamily: "monospace" }}>0x{Date.now().toString(16)}...{Math.random().toString(16).slice(2,6)}</div>
          </div>
          <button onClick={() => { setStep(1); setLaunched(false); setTokenConfig({ name: "", symbol: "", supply: 1000000000, decimals: 9, chain: "ethereum", type: "ERC20", description: "", image: null, tax: 0, maxWallet: 5 }); }} style={{ background: "#3b82f6", border: "none", padding: "12px 30px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}>
            Launch Another
          </button>
        </div>
      )}
    </div>
  );
}