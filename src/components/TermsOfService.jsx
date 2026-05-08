import { useState } from "react";

export default function TermsOfService() {
  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>TERMS OF SERVICE</h2>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Acceptance of Terms</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          By accessing and using the MADFX BOSS website, platform, and services (collectively, the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Platform.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Educational Nature</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Platform Purpose:</strong> MADFX BOSS LLC provides an educational and training platform focused on teaching trading concepts, financial literacy, and investment strategies through simulations, educational content, and community interaction.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>No Financial Advice:</strong> The Platform does not provide personalized financial advice, investment recommendations, or brokerage services. All content is for general educational purposes only.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Simulation Disclaimer:</strong> Trading simulations and virtual trading features are for educational purposes only and do not represent actual trading or guarantee future results.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>User Accounts</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Registration:</strong> Users must provide accurate information when creating an account and are responsible for maintaining the confidentiality of their login credentials.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Age Requirement:</strong> Users must be at least 18 years old to create an account and use the Platform.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Account Security:</strong> Users are responsible for all activities that occur under their account and must notify MADFX BOSS immediately of any unauthorized use.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>User Conduct</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Users agree to:
        </p>
        <ul style={{ color: "#64748b", lineHeight: "1.8", marginLeft: "20px", marginBottom: "15px" }}>
          <li>Use the Platform only for lawful purposes and in accordance with these Terms</li>
          <li>Not engage in any activity that interferes with or disrupts the Platform</li>
          <li>Not attempt to gain unauthorized access to any portion of the Platform</li>
          <li>Not upload or transmit any viruses, malware, or harmful code</li>
          <li>Respect the intellectual property rights of others</li>
        </ul>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Content and Intellectual Property</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Platform Content:</strong> All content on the Platform, including text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of MADFX BOSS LLC or its licensors and is protected by copyright and other intellectual property laws.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>User-Generated Content:</strong> Users retain ownership of content they submit to the Platform but grant MADFX BOSS a worldwide, royalty-free, perpetual license to use, display, reproduce, and distribute such content in connection with the Platform.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Trademarks:</strong> MADFX BOSS, the MADFX BOSS logo, and other trademarks are trademarks of MADFX BOSS LLC.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Disclaimers</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Educational Use Only:</strong> The Platform is provided for educational purposes only. MADFX BOSS LLC does not guarantee the accuracy, completeness, or usefulness of any information provided.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>No Warranty:</strong> The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied.
        </p>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          <strong>Limitation of Liability:</strong> MADFX BOSS LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from access to or use of the Platform.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Indemnification</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Users agree to indemnify, defend, and hold harmless MADFX BOSS LLC, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with:
        </p>
        <ul style={{ color: "#64748b", lineHeight: "1.8", marginLeft: "20px", marginBottom: "15px" }}>
          <li>The user's access to or use of the Platform</li>
          <li>The user's violation of these Terms</li>
          <li>The user's violation of any rights of another</li>
        </ul>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Governing Law</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Changes to Terms</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC reserves the right to modify or replace these Terms at any time. Continued use of the Platform after any such changes constitutes acceptance of the new Terms.
        </p>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "25px", color: "#64748b", fontSize: "12px" }}>
        Last Updated: May 2026 | For questions, contact: legal@madfx.com
      </div>
    </div>
  );
}