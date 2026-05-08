import { useState } from "react";

export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>PRIVACY POLICY</h2>
      </div>
      
      <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Introduction</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          MADFX BOSS LLC ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our platform, or otherwise interact with us.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Information We Collect</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We may collect personal information that you voluntarily provide to us, such as name, email address, phone number, account credentials, and payment information (processed securely by third-party providers). We also automatically collect technical information like IP address, browser type, pages visited, and usage data about how you interact with our Platform.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>How We Use Your Information</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We use your information to provide, maintain, and improve our Platform; personalize your experience; communicate with you about updates and educational materials; process transactions; analyze usage trends; prevent fraud; enforce our Terms of Service; and comply with legal obligations.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Sharing Your Information</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We do not sell your personal information to third parties. We may share your information with service providers who assist us in operating our Platform, payment processors for handling transactions (they only receive necessary payment information), legal authorities when required by law, and business partners in connection with educational programs (with aggregated, anonymized data).
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Data Security</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We implement reasonable security measures including encryption of sensitive data, secure authentication mechanisms, regular security assessments, and access controls. However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Data Retention</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We retain your personal information only as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Your Rights</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, or object to certain processing activities, and to data portability. To exercise these rights, please contact us at privacy@madfx.com.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Children's Privacy</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          Our Platform is not directed to children under 13 years of age, and we do not knowingly collect personal information from children under 13.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>International Transfers</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including personal information, to the United States and process it there.
        </p>
        
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>Changes to This Privacy Policy</h3>
        <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "15px" }}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "25px", color: "#64748b", fontSize: "12px" }}>
        Last Updated: May 2026 | For questions, contact: privacy@madfx.com
      </div>
    </div>
  );
}