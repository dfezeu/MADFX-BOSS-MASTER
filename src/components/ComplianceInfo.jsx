import { useState } from "react";

export default function ComplianceInfo() {
  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>COMPLIANCE & REGULATORY INFORMATION</h2>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Company Registration</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC is a limited liability company registered in the State of New York. Our educational and training services are provided under this legal entity.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Educational Registration</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC operates as an educational technology company. We are not registered with the SEC, FINRA, CFTC, or any other financial regulatory body as we do not provide brokerage, investment advisory, or financial planning services.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Crowdfunding Compliance</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Any crowdfunding campaigns conducted by MADFX BOSS LLC will comply with applicable regulations including Regulation Crowdfunding (Reg CF) under the JOBS Act, where applicable. We will work with licensed funding portals or broker-dealers for any securities offerings.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}
          >Current Status: MADFX BOSS LLC is not actively conducting a securities offering. Any future fundraising will be conducted in full compliance with applicable laws.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Angel Investment Framework</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC welcomes interest from accredited angel investors. Any investment discussions will be conducted in compliance with securities laws, and all offerings to accredited investors will be made under appropriate exemptions from registration requirements.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Educational Exemptions</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Our platform relies on educational exemptions that allow us to provide trading education, simulations, and educational content without requiring financial services licensing. We carefully structure our offerings to remain within these educational boundaries.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Consumer Protection</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We adhere to consumer protection principles by providing clear disclaimers, transparent pricing, honest marketing, and accessible customer support. Our Terms of Service and Privacy Policy are designed to protect both our users and our company.
        </p>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Ongoing Compliance</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC maintains ongoing compliance efforts including regular review of our educational content, monitoring of regulatory developments in the fintech and edtech spaces, and consultation with legal professionals specializing in financial education and technology.
        </p>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "25px", color: "#64748b", fontSize: "12px" }}>
        Last Updated: May 2026 | For compliance questions, contact: legal@madfx.com
      </div>
    </div>
  );
}