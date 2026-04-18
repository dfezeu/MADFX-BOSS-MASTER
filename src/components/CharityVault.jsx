import { useState } from "react";

export default function CharityVault() {
  const [donations, setDonations] = useState(1250.75);
  const [initiatives] = useState([
    { name: "Education Fund", funded: 500, goal: 1000 },
    { name: "Clean Water Project", funded: 300, goal: 800 },
    { name: "Community Health", funded: 450.75, goal: 600 }
  ]);

  const addDonation = () => {
    const amount = prompt("Enter donation amount:");
    if (amount) {
      setDonations(donations + Number(amount));
    }
  };

  return (
    <div style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #00ff8833", marginTop: "20px" }}>
      <h2 style={{ color: "#00aaff" }}>❤️ Charity Vault Tracker</h2>
      <div style={{ background: "#222", padding: "15px", borderRadius: "4px", marginBottom: "20px" }}>
        <div style={{ color: "#888" }}>Total Donations</div>
        <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: "bold" }}>${donations.toFixed(2)}</div>
        <button onClick={addDonation} style={{ marginTop: "10px", background: "#00ff88", color: "#000", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>
          Add Donation
        </button>
      </div>
      <h3 style={{ color: "#ff8800" }}>Funded Initiatives</h3>
      {initiatives.map(init => (
        <div key={init.name} style={{ background: "#222", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#00ff88" }}>{init.name}</span>
            <span style={{ color: "#888" }}>${init.funded} / ${init.goal}</span>
          </div>
          <div style={{ width: "100%", background: "#333", height: "8px", borderRadius: "4px", marginTop: "5px" }}>
            <div style={{ width: `${(init.funded / init.goal) * 100}%`, background: "#00ff88", height: "8px", borderRadius: "4px" }}></div>
          </div>
        </div>
      ))}
      <p style={{ color: "#888", fontSize: "12px" }}>A portion of all platform profits funds social good initiatives.</p>
    </div>
  );
}