import { useState } from "react";

export default function WalletConnector() {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [showConnect, setShowConnect] = useState(false);
  const [balances, setBalances] = useState([]);
  const [selectedChain, setSelectedChain] = useState("all");
  const [showImport, setShowImport] = useState(false);

  const chains = [
    { id: "solana", name: "Solana", symbol: "SOL", color: "#9945FF", rpc: "https://api.mainnet-beta.solana.com" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
    { id: "xrp", name: "XRP", symbol: "XRP", color: "#23292F" },
    { id: "polygon", name: "Polygon", symbol: "MATIC", color: "#8247E5" },
    { id: "hyperliquid", name: "Hyperliquid", symbol: "HYPER", color: "#00D4FF" }
  ];

  const walletTypes = [
    { id: "metamask", name: "MetaMask", icon: "🦊", chains: ["ethereum", "polygon"] },
    { id: "phantom", name: "Phantom", icon: "👻", chains: ["solana"] },
    { id: "coinbase", name: "Coinbase Wallet", icon: "💰", chains: ["ethereum", "polygon", "solana"] },
    { id: "trust", name: "Trust Wallet", icon: "🔐", chains: ["ethereum", "solana", "polygon"] },
    { id: "uphold", name: "Uphold", icon: "🛡️", chains: ["bitcoin", "ethereum"] },
    { id: "manual", name: "Manual Import", icon: "📝", chains: ["all"] }
  ];

  const mockBalances = [
    { chain: "solana", symbol: "SOL", balance: 12.45, usdValue: 2450, address: "7xK...23v" },
    { chain: "ethereum", symbol: "ETH", balance: 2.34, usdValue: 5850, address: "0x3f...A1c" },
    { chain: "ethereum", symbol: "USDC", balance: 12500, usdValue: 12500, address: "0x3f...A1c" },
    { chain: "bitcoin", symbol: "BTC", balance: 0.15, usdValue: 9500, address: "bc1q...k2" },
    { chain: "polygon", symbol: "MATIC", balance: 8500, usdValue: 6800, address: "0x3f...A1c" },
    { chain: "xrp", symbol: "XRP", balance: 25000, usdValue: 12500, address: "rG...t2" }
  ];

  const totalPortfolio = mockBalances.reduce((sum, b) => sum + b.usdValue, 0);

  const connectWallet = (walletType) => {
    setConnectedWallet({
      type: walletType,
      address: walletType === "metamask" ? "0x3fA...A1c" : walletType === "phantom" ? "7xK...23v" : "manual",
      connected: true
    });
    setShowConnect(false);
  };

  const disconnect = () => {
    setConnectedWallet(null);
    setBalances([]);
  };

  const copyAddress = (addr) => {
    navigator.clipboard.writeText(addr);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MULTI-CHAIN WALLET</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Connect wallets across all supported chains</p>
      </div>

      {!connectedWallet ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "25px" }}>
            {walletTypes.map(wallet => (
              <button
                key={wallet.id}
                onClick={() => {
                  if (wallet.id === "manual") {
                    setShowImport(true);
                  } else {
                    connectWallet(wallet.id);
                  }
                }}
                style={{
                  background: "#1e3a5f",
                  border: "1px solid #1e3a5f",
                  padding: "20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span style={{ fontSize: "28px" }}>{wallet.icon}</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>{wallet.name}</span>
                <span style={{ color: "#64748b", fontSize: "11px" }}>{wallet.chains.join(", ")}</span>
              </button>
            ))}
          </div>

          {showImport && (
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px" }}>
              <h3 style={{ color: "#d4a012", marginBottom: "15px" }}>Manual Address Import</h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {chains.filter(c => c.id !== "hyperliquid").map(chain => (
                  <div key={chain.id} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: chain.color }}></div>
                    <span style={{ color: "#fff", flex: 1 }}>{chain.name}</span>
                    <input
                      type="text"
                      placeholder="Enter wallet address..."
                      style={{ background: "#0d1525", border: "1px solid #1e3a5f", padding: "10px", borderRadius: "8px", color: "#fff", width: "300px", fontSize: "12px" }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => { setConnectedWallet({ type: "manual", connected: true }); setShowImport(false); }}
                  style={{ background: "#10b981", border: "none", padding: "12px", borderRadius: "8px", color: "#fff", fontWeight: "600", cursor: "pointer" }}
                >
                  Add Wallets
                </button>
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "20px", color: "#64748b", fontSize: "12px" }}>
            <p>By connecting, you agree to allow MADFX to view your balances and build transactions.</p>
            <p style={{ marginTop: "5px" }}>No private keys are stored. All transactions require your signature.</p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                {walletTypes.find(w => w.id === connectedWallet.type)?.icon}
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px" }}>
                  {walletTypes.find(w => w.id === connectedWallet.type)?.name}
                </div>
                <div style={{ color: "#64748b", fontSize: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  {connectedWallet.address}
                  <button onClick={() => copyAddress(connectedWallet.address)} style={{ background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "11px" }}>Copy</button>
                </div>
              </div>
            </div>
            <button
              onClick={disconnect}
              style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}
            >
              Disconnect
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginBottom: "25px" }}>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#d4a012", fontSize: "32px", fontWeight: "700" }}>${totalPortfolio.toLocaleString()}</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Total Portfolio</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#10b981", fontSize: "32px", fontWeight: "700" }}>${(12500).toLocaleString()}</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Staked Value</div>
            </div>
            <div style={{ background: "#1e3a5f", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ color: "#3b82f6", fontSize: "32px", fontWeight: "700" }}>6</div>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Assets</div>
            </div>
          </div>

          <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => setSelectedChain("all")}
              style={{ background: selectedChain === "all" ? "#3b82f6" : "transparent", color: selectedChain === "all" ? "#fff" : "#64748b", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
            >
              All
            </button>
            {chains.map(chain => (
              <button
                key={chain.id}
                onClick={() => setSelectedChain(chain.id)}
                style={{ 
                  background: selectedChain === chain.id ? chain.color : "transparent", 
                  color: selectedChain === chain.id ? "#fff" : "#64748b", 
                  border: "none", 
                  padding: "8px 16px", 
                  borderRadius: "6px", 
                  cursor: "pointer", 
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: chain.color }}></div>
                {chain.symbol}
              </button>
            ))}
          </div>

          <div style={{ background: "#1e3a5f", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#0d1525" }}>
                  <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>CHAIN</th>
                  <th style={{ padding: "12px", textAlign: "left", color: "#64748b", fontSize: "11px" }}>ASSET</th>
                  <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>BALANCE</th>
                  <th style={{ padding: "12px", textAlign: "right", color: "#64748b", fontSize: "11px" }}>USD VALUE</th>
                  <th style={{ padding: "12px", textAlign: "center", color: "#64748b", fontSize: "11px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {mockBalances.filter(b => selectedChain === "all" || b.chain === selectedChain).map((balance, idx) => {
                  const chain = chains.find(c => c.id === balance.chain);
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #0d152525" }}>
                      <td style={{ padding: "12px" }}>
                        <span style={{ color: chain?.color }}>●</span>
                      </td>
                      <td style={{ padding: "12px", color: "#fff", fontWeight: "600" }}>{balance.symbol}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#fff" }}>{balance.balance.toLocaleString()}</td>
                      <td style={{ padding: "12px", textAlign: "right", color: "#10b981", fontWeight: "600" }}>${balance.usdValue.toLocaleString()}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button style={{ background: "#3b82f6", border: "none", padding: "6px 12px", borderRadius: "4px", color: "#fff", cursor: "pointer", fontSize: "11px" }}>
                          Send
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}