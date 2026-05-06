import { useState } from "react";

const VENDORS = [
  {
    id: 1,
    name: "MADFX Merch Store",
    category: "Apparel",
    products: [
      { id: 101, name: "MADFX Boss Hoodie", price: 65, image: "👕" },
      { id: 102, name: "TGRR Logo Tee", price: 35, image: "👕" },
      { id: 103, name: "Crypto Tracksuit", price: 120, image: "👖" },
      { id: 104, name: "Bull Run Jacket", price: 150, image: "🧥" }
    ],
    commission: 15,
    acceptedCoins: ["ETH", "USDC", "NXUS"]
  },
  {
    id: 2,
    name: "Tech Gear Pro",
    category: "Electronics",
    products: [
      { id: 201, name: "Trading Laptop Stand", price: 89, image: "💻" },
      { id: 202, name: "RGB Keycap Set", price: 45, image: "⌨️" },
      { id: 203, name: "Monitor Light Bar", price: 75, image: "💡" },
      { id: 204, name: "Ergonomic Mouse", price: 120, image: "🖱️" }
    ],
    commission: 12,
    acceptedCoins: ["ETH", "USDC", "BTC"]
  },
  {
    id: 3,
    name: "Digital Assets Co",
    category: "Digital",
    products: [
      { id: 301, name: "TradingView Premium (1mo)", price: 40, image: "📊" },
      { id: 302, name: "Bot Template Pack", price: 99, image: "🤖" },
      { id: 303, name: "Signal Indicator Set", price: 55, image: "📈" },
      { id: 304, name: "Course: Martingale Mastery", price: 199, image: "🎓" }
    ],
    commission: 20,
    acceptedCoins: ["ETH", "USDC", "NXUS", "BTC"]
  },
  {
    id: 4,
    name: "Crypto Coffee Co",
    category: "Food & Drink",
    products: [
      { id: 401, name: "Trader's Morning Blend", price: 25, image: "☕" },
      { id: 402, name: "Bull Run Espresso", price: 30, image: "☕" },
      { id: 403, name: "Merch Bundle Pack", price: 75, image: "📦" }
    ],
    commission: 10,
    acceptedCoins: ["ETH", "USDC"]
  },
  {
    id: 5,
    name: "Office Supply Hub",
    category: "Supplies",
    products: [
      { id: 501, name: "Traders Journal 2026", price: 29, image: "📓" },
      { id: 502, name: "Desk Organizer Set", price: 45, image: "🗄️" },
      { id: 503, name: "LED Candle Set", price: 35, image: "🕯️" },
      { id: 504, name: "Noise Cancel Headphones", price: 250, image: "🎧" }
    ],
    commission: 12,
    acceptedCoins: ["ETH", "USDC", "BTC"]
  },
  {
    id: 6,
    name: "Fitness Boss",
    category: "Health",
    products: [
      { id: 601, name: "Trading Desk Stretcher", price: 55, image: "🧘" },
      { id: 602, name: "Blue Light Glasses", price: 75, image: "👓" },
      { id: 603, name: "Standing Desk Mat", price: 89, image: "🧘" }
    ],
    commission: 15,
    acceptedCoins: ["ETH", "USDC", "NXUS"]
  }
];

const ADS_PLACEMENTS = [
  { id: 1, zone: "Header Banner", size: "728x90", pricePerDay: 5 },
  { id: 2, zone: "Sidebar", size: "300x600", pricePerDay: 3 },
  { id: 3, zone: "Between Tabs", size: "468x60", pricePerDay: 2 },
  { id: 4, zone: "Footer", size: "728x90", pricePerDay: 3 },
  { id: 5, zone: "Pop-up Modal", size: "500x500", pricePerDay: 10 }
];

export default function Vendors() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [sellAdModal, setSellAdModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [walletConnected, setWalletConnected] = useState(false);
  const [paymentCoin, setPaymentCoin] = useState("USDC");

  const categories = ["All", ...new Set(VENDORS.map(v => v.category))];
  const filteredVendors = selectedCategory === "All" 
    ? VENDORS 
    : VENDORS.filter(v => v.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const estimatedRevenue = (cartTotal * (selectedVendor?.commission || 0)) / 100;

  const addToCart = (product) => {
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      setCart(cart.map(c => c.id === product.id ? {...c, qty: c.qty + 1} : c));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const handleCheckout = () => {
    if (!walletConnected) {
      alert("Connect wallet to checkout");
      return;
    }
    alert(`Checkout: ${cartTotal} ${paymentCoin} - Order placed!`);
    setCart([]);
    setCheckoutModal(false);
  };

  const handleAdPurchase = (ad) => {
    if (!walletConnected) {
      alert("Connect wallet first");
      return;
    }
    alert(`Ad rented: ${ad.zone} for ${ad.pricePerDay} NXUS/day`);
    setSellAdModal(false);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MADFX VENDORS</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>E-commerce & Advertising Marketplace</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
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
          <button
            onClick={() => setCheckoutModal(true)}
            style={{
              background: "#d4a012",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              color: "#0a0a0a",
              cursor: "pointer",
              fontWeight: "600",
              position: "relative"
            }}
          >
            Cart ({cart.length})
            {cart.length > 0 && (
              <span style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "#ff4444",
                color: "#fff",
                borderRadius: "50%",
                width: 20,
                height: 20,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {cart.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setSellAdModal(true)}
            style={{
              background: "transparent",
              border: "1px solid #d4a012",
              padding: "10px 20px",
              borderRadius: "8px",
              color: "#d4a012",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Sell Ads
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? "#d4a012" : "transparent",
              color: selectedCategory === cat ? "#0a0a0a" : "#64748b",
              border: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: "600"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {filteredVendors.map(vendor => (
          <div 
            key={vendor.id}
            style={{
              background: "#1e3a5f",
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer",
              border: selectedVendor?.id === vendor.id ? "2px solid #d4a012" : "2px solid transparent"
            }}
            onClick={() => setSelectedVendor(vendor)}
          >
            <div style={{ marginBottom: "15px" }}>
              <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}>{vendor.name}</h3>
              <span style={{ color: "#64748b", fontSize: "12px" }}>{vendor.category}</span>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "15px" }}>
              {vendor.products.slice(0, 4).map(prod => (
                <div
                  key={prod.id}
                  onClick={(e) => { e.stopPropagation(); addToCart(prod); }}
                  style={{
                    background: "#0d1525",
                    borderRadius: "8px",
                    padding: "10px",
                    flex: "1 1 45%",
                    textAlign: "center",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ fontSize: "24px" }}>{prod.image}</div>
                  <div style={{ color: "#fff", fontSize: "11px", marginTop: "5px" }}>{prod.name}</div>
                  <div style={{ color: "#d4a012", fontSize: "13px", fontWeight: "600" }}>${prod.price}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "600" }}>
                {vendor.commission}% commission
              </span>
              <div style={{ display: "flex", gap: "5px" }}>
                {vendor.acceptedCoins.slice(0, 3).map(coin => (
                  <span key={coin} style={{ background: "#0d1525", color: "#64748b", padding: "3px 8px", borderRadius: "4px", fontSize: "10px" }}>
                    {coin}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {checkoutModal && (
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
        onClick={() => setCheckoutModal(false)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "500px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: "#d4a012", fontSize: "24px", marginBottom: "20px" }}>Checkout</h3>
            
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #0d1525" }}>
                <div>
                  <div style={{ color: "#fff" }}>{item.name}</div>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>Qty: {item.qty}</div>
                </div>
                <div style={{ color: "#d4a012", fontWeight: "600" }}>${item.price * item.qty}</div>
              </div>
            ))}

            <div style={{ marginTop: "20px", padding: "15px", background: "#0d1525", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#64748b" }}>Subtotal:</span>
                <span style={{ color: "#fff" }}>${cartTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#64748b" }}>Est. Revenue:</span>
                <span style={{ color: "#10b981" }}>${estimatedRevenue.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #1e3a5f" }}>
                <span style={{ color: "#fff", fontWeight: "600" }}>Total:</span>
                <span style={{ color: "#d4a012", fontWeight: "700", fontSize: "18px" }}>${cartTotal}</span>
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "8px" }}>Pay with:</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["USDC", "ETH", "NXUS", "BTC"].map(coin => (
                  <button
                    key={coin}
                    onClick={() => setPaymentCoin(coin)}
                    style={{
                      background: paymentCoin === coin ? "#d4a012" : "#0d1525",
                      color: paymentCoin === coin ? "#0a0a0a" : "#64748b",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    {coin}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                marginTop: "20px",
                background: "#10b981",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Complete Purchase
            </button>
          </div>
        </div>
      )}

      {sellAdModal && (
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
        onClick={() => setSellAdModal(false)}
        >
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "600px", width: "90%" }}
          onClick={e => e.stopPropagation()}
          >
            <h3 style={{ color: "#d4a012", fontSize: "24px", marginBottom: "20px" }}>Advertise on MADFX</h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>Reach our trading community</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
              {ADS_PLACEMENTS.map(ad => (
                <div key={ad.id} style={{ background: "#0d1525", borderRadius: "8px", padding: "15px", textAlign: "center" }}>
                  <div style={{ color: "#fff", fontWeight: "600", marginBottom: "5px" }}>{ad.zone}</div>
                  <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "10px" }}>{ad.size}</div>
                  <div style={{ color: "#d4a012", fontSize: "18px", fontWeight: "700", marginBottom: "10px" }}>
                    {ad.pricePerDay} NXUS<span style={{ fontSize: "11px", color: "#64748b" }}>/day</span>
                  </div>
                  <button
                    onClick={() => handleAdPurchase(ad)}
                    style={{
                      background: "#d4a012",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      color: "#0a0a0a",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "12px"
                    }}
                  >
                    Rent Ad
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSellAdModal(false)}
              style={{
                width: "100%",
                marginTop: "20px",
                background: "transparent",
                border: "1px solid #64748b",
                padding: "12px",
                borderRadius: "8px",
                color: "#64748b",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}