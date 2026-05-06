import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const RPC_ENDPOINTS = {
  ethereum: "https://eth.llamarpc.com",
  polygon: "https://polygon-rpc.com",
  bsc: "https://bsc-dataseed.binance.org",
  arbitrum: "https://arb1.arbitrum.io/rpc",
};

export default function Web3Wallet() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [chain, setChain] = useState(null);
  const [balances, setBalances] = useState({});
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  const chains = [
    { id: "ethereum", name: "Ethereum", color: "#627EEA", symbol: "ETH" },
    { id: "polygon", name: "Polygon", color: "#8247E5", symbol: "MATIC" },
    { id: "bsc", name: "BNB Chain", color: "#F3BA2F", symbol: "BNB" },
  ];

  const connectMetaMask = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed. Please install MetaMask browser extension.");
      }

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      await browserProvider.send("eth_requestAccounts", []);
      
      const browserSigner = await browserProvider.getSigner();
      const walletAddress = await browserSigner.getAddress();
      const network = await browserProvider.getNetwork();
      
      setProvider(browserProvider);
      setSigner(browserSigner);
      setAddress(walletAddress);
      setChain(network.chainId?.toString() || "1");
      
      await fetchBalances(browserProvider, walletAddress);
    } catch (err) {
      setError(err.message);
    } finally {
      setConnecting(false);
    }
  }, []);

  const connectWalletConnect = useCallback(async () => {
    // WalletConnect v2 implementation would go here
    // For now, just show the option
    setError("WalletConnect integration coming soon");
  }, []);

  const fetchBalances = async (providerObj, addr) => {
    const newBalances = {};
    
    // Fetch native token balances for each chain
    for (const c of chains) {
      try {
        const chainProvider = new ethers.JsonRpcProvider(RPC_ENDPOINTS[c.id]);
        const bal = await chainProvider.getBalance(addr);
        newBalances[c.symbol] = {
          amount: parseFloat(ethers.formatEther(bal)).toFixed(4),
          usd: parseFloat(ethers.formatEther(bal)) * (c.symbol === "ETH" ? 2500 : c.symbol === "MATIC" ? 0.8 : 300)
        };
      } catch {
        newBalances[c.symbol] = { amount: "0", usd: 0 };
      }
    }
    
    setBalances(newBalances);
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setChain(null);
    setBalances({});
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getChainColor = (chainId) => {
    const chainMap = { "1": "#627EEA", "56": "#F3BA2F", "137": "#8247E5" };
    return chainMap[chainId] || "#64748b";
  };

  const isMetaMaskInstalled = typeof window !== "undefined" && !!window.ethereum?.isMetaMask;

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "30px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>WEB3 WALLET</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Connect real wallets via browser extension</p>
      </div>

      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <span style={{ color: "#ef4444" }}>{error}</span>
        </div>
      )}

      {!address ? (
        <div>
          <div style={{ display: "grid", gap: "15px", marginBottom: "25px" }}>
            <button
              onClick={connectMetaMask}
              disabled={connecting || !isMetaMaskInstalled}
              style={{
                background: "#F68520",
                border: "none",
                padding: "20px",
                borderRadius: "12px",
                cursor: isMetaMaskInstalled ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                opacity: connecting || !isMetaMaskInstalled ? 0.5 : 1
              }}
            >
              <span style={{ fontSize: "28px" }}>🦊</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px" }}>MetaMask</div>
                <div style={{ color: "#fff", fontSize: "12px", opacity: 0.7 }}>
                  {isMetaMaskInstalled ? "Click to connect" : "Not installed"}
                </div>
              </div>
            </button>

            <button
              onClick={() => setError("WalletConnect v2 coming soon")}
              disabled
              style={{
                background: "#1e3a5f",
                border: "1px solid #1e3a5f",
                padding: "20px",
                borderRadius: "12px",
                cursor: "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                opacity: 0.5
              }}
            >
              <span style={{ fontSize: "28px" }}>🔗</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px" }}>WalletConnect</div>
                <div style={{ color: "#64748b", fontSize: "12px" }}>Coming soon</div>
              </div>
            </button>
          </div>

          <div style={{ textAlign: "center", color: "#64748b", fontSize: "12px" }}>
            <p>Install a browser wallet to connect:</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
              <a href="https://metamask.io/download/" target="_blank" style={{ color: "#3b82f6" }}>MetaMask</a>
              <a href="https://phantom.app/" target="_blank" style={{ color: "#3b82f6" }}>Phantom</a>
              <a href="https://www.coinbase.com/wallet" target="_blank" style={{ color: "#3b82f6" }}>Coinbase</a>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#F68520", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                🦊
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: "700" }}>MetaMask</div>
                <div style={{ color: "#64748b", fontSize: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: getChainColor(chain) }}>●</span>
                  {formatAddress(address)}
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
            {Object.entries(balances).map(([symbol, data]) => (
              <div key={symbol} style={{ background: "#1e3a5f", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
                <div style={{ color: chains.find(c => c.symbol === symbol)?.color || "#fff", fontWeight: "700", fontSize: "18px" }}>
                  {symbol}
                </div>
                <div style={{ color: "#fff", fontSize: "14px", marginTop: "5px" }}>
                  {data.amount}
                </div>
                <div style={{ color: "#10b981", fontSize: "12px" }}>
                  ${data.usd.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#1e3a5f", borderRadius: "10px", padding: "15px", marginBottom: "15px" }}>
            <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>Connected Wallet</div>
            <div style={{ color: "#fff", fontFamily: "monospace", fontSize: "13px", wordBreak: "break-all" }}>
              {address}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <button style={{ background: "#3b82f6", border: "none", padding: "12px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}>
              Send
            </button>
            <button style={{ background: "#10b981", border: "none", padding: "12px", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: "600" }}>
              Receive
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px", background: "rgba(212, 160, 18, 0.1)", borderRadius: "8px", padding: "15px", border: "1px solid #d4a012" }}>
        <p style={{ color: "#f59e0b", fontSize: "12px" }}>
          🔒 <strong>Security Note:</strong> Your private keys never leave your wallet. All transactions require your explicit approval. This dApp cannot access your funds without your signature.
        </p>
      </div>
    </div>
  );
}