import { useState } from "react";

export default function Disclaimer() {
  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>EDUCATIONAL DISCLAIMER</h2>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Important Notice</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC operates strictly as an educational and training platform. All content, tools, simulations, and services provided are for educational purposes only and do not constitute financial advice, investment recommendations, or solicitation to buy or sell any securities, cryptocurrencies, or other financial instruments.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Past performance, simulated results, or hypothetical examples presented on the platform are not indicative of future results. Trading and investing involve substantial risk of loss and are not suitable for all individuals. Users acknowledge that they may lose some or all of their invested capital.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          The platform is designed to teach trading concepts, strategies, and risk management through simulations and educational content. MADFX BOSS LLC is not registered as a broker-dealer, investment advisor, or financial planner, and use of the platform does not establish a fiduciary or advisory relationship between the user and MADFX BOSS LLC.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Users are solely responsible for their own trading decisions and investment outcomes, understanding and complying with all applicable laws and regulations, conducting independent research before making any financial decisions, and seeking advice from qualified financial professionals when needed.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Risk Disclosure</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Trading financial instruments, including but not limited to stocks, forex, commodities, and cryptocurrencies, carries significant risk. Users should carefully consider their financial situation, investment experience, and risk tolerance before engaging in any trading activities.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Simulated trading environments may not fully replicate real-market conditions, including liquidity constraints, slippage, and emotional factors that affect live trading decisions.
        </p>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "25px", color: "#64748b", fontSize: "12px" }}>
        Last Updated: May 2026 | For questions, contact: legal@madfx.com
      </div>
    </div>
  );
}