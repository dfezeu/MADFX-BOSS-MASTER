import { useState, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "MAXAI Trader Pro", type: "software", price: 299, original: 1999, category: "AI Trading", features: ["All AI Agents", "Unlimited Signals", "API Access", "Priority Support"], popular: true },
  { id: 2, name: "Pro Signals Monthly", type: "subscription", price: 49, original: 199, category: "Signals", features: ["Daily Signals", "Harmonic Patterns", "Entry/Exit Alerts", "Email Support"], popular: false },
  { id: 3, name: "FTMO Compliance", type: "service", price: 299, original: 499, category: "Prop Firm", features: ["Rule Checker", "Risk Calculator", "Trade Journal", "Verified"], popular: true },
  { id: 4, name: "Token Launch", type: "service", price: 0.5, original: 1.5, category: "Launchpad", features: ["Smart Contract", "Presale Page", "Marketing", "Liquidity"], popular: false, unit: "ETH" },
  { id: 5, name: "VIP Membership", type: "subscription", price: 149, original: 599, category: "Membership", features: ["All Access", "1-on-1 Calls", "Private Group", "Early Signals"], popular: true },
  { id: 6, name: "Course Bundle", type: "product", price: 199, original: 399, category: "Education", features: ["All Courses", "Trading Lab", "Templates", "Certifications"], popular: false },
  { id: 7, name: "Agent Marketplace", type: "marketplace", price: 99, original: 199, category: "Agents", features: ["Buy Agents", "Sell Agents", "Ratings", "Support"], popular: false },
  { id: 8, name: "Copy Trading", type: "subscription", price: 29, original: 99, category: "Copy", features: ["Follow Trades", "Risk Controls", "Analytics", "Leaderboard"], popular: false }
];

const FUNNEL_STEPS = [
  { id: 1, name: "Landing", status: "active", visitors: 45000, conv: 12.5 },
  { id: 2, name: "Lead Magnet", status: "active", visitors: 28000, conv: 45.2 },
  { id: 3, name: "Application", status: "active", visitors: 8500, conv: 62.1 },
  { id: 4, name: "Checkout", status: "active", visitors: 3200, conv: 78.4 },
  { id: 5, name: "Thank You", status: "active", visitors: 2510, conv: 100 }
];

const COUPONS = [
  { code: "FLASH50", discount: 50, type: "percent", uses: 156, max: 500, active: true, expires: "2026-05-07" },
  { code: "EARLYBIRD", discount: 100, type: "fixed", uses: 89, max: 200, active: true, expires: "2026-05-15" },
  { code: "VIPLAUNCH", discount: 25, type: "percent", uses: 45, max: 100, active: true, expires: "2026-05-20" },
  { code: "MAXAI2026", discount: 200, type: "fixed", uses: 234, max: 500, active: true, expires: "2026-12-31" }
];

export default function SalesEngine() {
  const [step, setStep] = useState("products");
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", name: "", wallet: "", method: "crypto" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [stats, setStats] = useState({
    visitors: 45000,
    leads: 28000,
    applications: 8500,
    sales: 2510,
    revenue: 485000,
    conversion: 5.58,
    avgOrder: 193
  });

  const addToCart = (product) => {
    if (product.type === "subscription" || product.type === "service") {
      setSelectedProduct(product);
      setShowCheckout(true);
    } else {
      const existing = cart.find(c => c.id === product.id);
      if (existing) {
        setCart(cart.map(c => c.id === product.id ? {...c, qty: c.qty + 1} : c));
      } else {
        setCart([...cart, {...product, qty: 1}]);
      }
    }
  };

  const applyCoupon = () => {
    const found = COUPONS.find(c => c.code === coupon.toUpperCase() && c.active);
    if (found) {
      if (found.type === "percent") {
        const subtotal = cart.reduce((sum, p) => sum + (p.price * p.qty), 0);
        setDiscount(subtotal * (found.discount / 100));
      } else {
        setDiscount(found.discount);
      }
    } else {
      alert("Invalid or expired coupon");
    }
  };

  const subtotal = cart.reduce((sum, p) => sum + (p.price * p.qty), 0);
  const total = Math.max(0, subtotal - discount);

  const processCheckout = () => {
    const newOrderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);
    setOrderComplete(true);
    setShowCheckout(false);
    setCart([]);
  };

  const quickBuy = (product) => {
    setSelectedProduct(product);
    setCheckoutStep(1);
    setShowCheckout(true);
  };

  return (
    <div style={{ background: "#0d1525", borderRadius: "16px", border: "1px solid #1e3a5f", padding: "25px" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700" }}>MADFX SALES ENGINE</h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>Complete Sales Funnel & Checkout</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>VISITORS</div>
          <div style={{ color: "#00aaff", fontSize: "22px", fontWeight: "700" }}>{(stats.visitors/1000).toFixed(0)}K</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>LEADS</div>
          <div style={{ color: "#00ff88", fontSize: "22px", fontWeight: "700" }}>{(stats.leads/1000).toFixed(0)}K</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>SALES</div>
          <div style={{ color: "#d4a012", fontSize: "22px", fontWeight: "700" }}>{stats.sales.toLocaleString()}</div>
        </div>
        <div style={{ background: "#1e3a5f", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#64748b", fontSize: "11px" }}>REVENUE</div>
          <div style={{ color: "#10b981", fontSize: "22px", fontWeight: "700" }}>${(stats.revenue/1000).toFixed(0)}K</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        {["products", "funnel", "coupons", "orders"].map(s => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{
              background: step === s ? "#d4a012" : "transparent",
              color: step === s ? "#0a0a0a" : "#64748b",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px"
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {step === "products" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "15px" }}>
          {PRODUCTS.map(product => (
            <div key={product.id} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", borderTop: product.popular ? "3px solid #d4a012" : "none" }}>
              {product.popular && (
                <div style={{ background: "#d4a012", color: "#0a0a0a", padding: "3px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: "700", display: "inline-block", marginBottom: "10px" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "5px" }}>{product.category}</div>
              <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>{product.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "15px" }}>
                <span style={{ color: "#00ff88", fontSize: "28px", fontWeight: "700" }}>
                  ${product.price}{product.unit ? " " + product.unit : ""}
                </span>
                <span style={{ color: "#64748b", fontSize: "14px", textDecoration: "line-through" }}>${product.original}</span>
              </div>
              <div style={{ marginBottom: "15px" }}>
                {product.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", color: "#64748b", fontSize: "12px" }}>
                    <span style={{ color: "#10b981" }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => quickBuy(product)}
                style={{
                  width: "100%",
                  background: product.popular ? "#d4a012" : "#1e3a5f",
                  color: product.popular ? "#0a0a0a" : "#fff",
                  border: product.popular ? "none" : "1px solid #1e3a5f",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                {product.type === "subscription" ? "Subscribe" : product.type === "service" ? "Get Started" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}

      {step === "funnel" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ color: "#d4a012", fontSize: "18px", marginBottom: "20px" }}>Sales Funnel</h3>
          {FUNNEL_STEPS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: s.status === "active" ? "#10b981" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700" }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ color: "#fff", fontWeight: "600" }}>{s.name}</span>
                  <span style={{ color: "#00aaff" }}>{s.visitors.toLocaleString()} visitors</span>
                </div>
                <div style={{ background: "#0d1525", height: "8px", borderRadius: "4px" }}>
                  <div style={{ width: `${s.conv}%`, height: "100%", background: s.conv > 50 ? "#10b981" : "#d4a012", borderRadius: "4px" }}></div>
                </div>
              </div>
              <span style={{ color: "#10b981", fontWeight: "600", width: "60px", textAlign: "right" }}>{s.conv}%</span>
            </div>
          ))}
        </div>
      )}

      {step === "coupons" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
          {COUPONS.map(c => (
            <div key={c.code} style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px", borderLeft: c.active ? "4px solid #10b981" : "4px solid #ef4444" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#fff", fontWeight: "700", fontSize: "18px" }}>{c.code}</span>
                <span style={{ background: c.active ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)", color: c.active ? "#10b981" : "#ef4444", padding: "3px 10px", borderRadius: "4px", fontSize: "10px" }}>
                  {c.active ? "ACTIVE" : "EXPIRED"}
                </span>
              </div>
              <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700", marginBottom: "5px" }}>
                {c.type === "percent" ? `${c.discount}%` : `$${c.discount}`} OFF
              </div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>{c.uses}/{c.max} uses • Expires {c.expires}</div>
            </div>
          ))}
        </div>
      )}

      {step === "orders" && (
        <div style={{ background: "#1e3a5f", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#d4a012", fontSize: "18px" }}>Recent Orders</h3>
            <span style={{ color: "#10b981" }}>{stats.sales} total</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", color: "#64748b", fontSize: "12px", fontWeight: "600", marginBottom: "10px", padding: "10px", background: "#0d1525", borderRadius: "8px" }}>
            <span>ORDER ID</span>
            <span>AMOUNT</span>
            <span>STATUS</span>
            <span>DATE</span>
          </div>
          {[
            { id: "ORD-XK8J2M1P", amount: 299, status: "completed", date: "2026-05-06" },
            { id: "ORD-P9K3L2N", amount: 49, status: "completed", date: "2026-05-06" },
            { id: "ORD-M7N4K1J", amount: 0.5, status: "pending", date: "2026-05-05", unit: "ETH" },
            { id: "ORD-L1J8M3K", amount: 149, status: "completed", date: "2026-05-05" },
            { id: "ORD-K2M9N4P", amount: 199, status: "completed", date: "2026-05-04" }
          ].map(order => (
            <div key={order.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", padding: "12px", borderBottom: "1px solid #0d1525", alignItems: "center" }}>
              <span style={{ color: "#00aaff", fontWeight: "600" }}>{order.id}</span>
              <span style={{ color: "#fff" }}>${order.amount}{order.unit ? " " + order.unit : ""}</span>
              <span style={{ color: order.status === "completed" ? "#10b981" : "#f59e0b", background: order.status === "completed" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)", padding: "3px 10px", borderRadius: "4px", fontSize: "11px", textAlign: "center" }}>
                {order.status.toUpperCase()}
              </span>
              <span style={{ color: "#64748b" }}>{order.date}</span>
            </div>
          ))}
        </div>
      )}

      {showCheckout && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "30px", maxWidth: "500px", width: "90%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
              <h3 style={{ color: "#d4a012", fontSize: "22px" }}>Checkout</h3>
              <button onClick={() => setShowCheckout(false)} style={{ background: "none", border: "none", color: "#64748b", fontSize: "24px", cursor: "pointer" }}>×</button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: checkoutStep >= s ? "#10b981" : "#0d1525", textAlign: "center", color: checkoutStep >= s ? "#fff" : "#64748b", fontSize: "12px" }}>
                  {s === 1 ? "Info" : s === 2 ? "Payment" : "Confirm"}
                </div>
              ))}
            </div>

            {checkoutStep === 1 && (
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                    placeholder="your@email.com"
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: "100%", padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                    placeholder="Your full name"
                  />
                </div>
                <button
                  onClick={() => setCheckoutStep(2)}
                  style={{ width: "100%", background: "#d4a012", border: "none", padding: "15px", borderRadius: "8px", color: "#0a0a0a", fontWeight: "700", cursor: "pointer" }}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div>
                <div style={{ background: "#0d1525", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
                  <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "5px" }}>Product</div>
                  <div style={{ color: "#fff", fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>{selectedProduct?.name}</div>
                  <div style={{ color: "#d4a012", fontSize: "24px", fontWeight: "700" }}>${selectedProduct?.price}{selectedProduct?.unit ? " " + selectedProduct.unit : ""}</div>
                </div>
                
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Payment Method</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {["crypto", "card", "paypal"].map(m => (
                      <button
                        key={m}
                        onClick={() => setFormData({...formData, method: m})}
                        style={{ flex: 1, padding: "12px", borderRadius: "8px", background: formData.method === m ? "#d4a012" : "#0d1525", color: formData.method === m ? "#0a0a0a" : "#64748b", border: "none", cursor: "pointer", textTransform: "uppercase", fontSize: "12px", fontWeight: "600" }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setCheckoutStep(1)}
                    style={{ flex: 1, background: "transparent", border: "1px solid #64748b", padding: "15px", borderRadius: "8px", color: "#64748b", cursor: "pointer" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    style={{ flex: 1, background: "#10b981", border: "none", padding: "15px", borderRadius: "8px", color: "#fff", fontWeight: "700", cursor: "pointer" }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div>
                <div style={{ background: "#0d1525", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
                  <div style={{ color: "#64748b", fontSize: "12px" }}>Order Summary</div>
                  <div style={{ color: "#fff", margin: "10px 0" }}>{selectedProduct?.name}</div>
                  <div style={{ color: "#d4a012", fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}>${selectedProduct?.price}{selectedProduct?.unit ? " " + selectedProduct.unit : ""}</div>
                  <div style={{ color: "#10b981", fontSize: "12px" }}>You're saving ${selectedProduct?.original - selectedProduct?.price}</div>
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ color: "#64748b", fontSize: "12px", display: "block", marginBottom: "5px" }}>Coupon Code</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      style={{ flex: 1, padding: "12px", background: "#0d1525", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff" }}
                      placeholder="Enter code"
                    />
                    <button onClick={applyCoupon} style={{ background: "#1e3a5f", border: "none", padding: "12px 20px", borderRadius: "8px", color: "#fff", cursor: "pointer" }}>Apply</button>
                  </div>
                </div>
                
                <button
                  onClick={processCheckout}
                  style={{ width: "100%", background: "#10b981", border: "none", padding: "18px", borderRadius: "8px", color: "#fff", fontSize: "18px", fontWeight: "700", cursor: "pointer" }}
                >
                  Pay ${selectedProduct?.price}{selectedProduct?.unit ? " " + selectedProduct.unit : ""}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {orderComplete && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e3a5f", borderRadius: "16px", padding: "40px", maxWidth: "450px", width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
            <h3 style={{ color: "#10b981", fontSize: "28px", marginBottom: "10px" }}>Order Complete!</h3>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>Thank you for your purchase</p>
            
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Order ID</div>
              <div style={{ color: "#00aaff", fontSize: "18px", fontWeight: "700" }}>{orderId}</div>
            </div>
            
            <div style={{ background: "#0d1525", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
              <div style={{ color: "#64748b", fontSize: "11px" }}>Check your email</div>
              <div style={{ color: "#fff" }}>{formData.email}</div>
            </div>
            
            <button
              onClick={() => setOrderComplete(false)}
              style={{ width: "100%", background: "#d4a012", border: "none", padding: "15px", borderRadius: "8px", color: "#0a0a0a", fontWeight: "700", cursor: "pointer" }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}