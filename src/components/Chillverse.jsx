import { useState, useEffect } from "react";

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
  if (["J", "Q", "K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
}

function calculateScore(hand) {
  let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
  let aces = hand.filter(card => card.value === "A").length;
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

function getCardColor(suit) {
  return (suit === "♥" || suit === "♦") ? "#ff4444" : "#fff";
}

export default function Chillverse() {
  const [balance, setBalance] = useState(10000);
  const [bet, setBet] = useState(100);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [gameState, setGameState] = useState("betting");
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({ wins: 12, losses: 8, pushes: 2, streak: 3 });
  const [showStats, setShowStats] = useState(false);
  const [animation, setAnimation] = useState(null);

  const deal = () => {
    if (bet > balance) {
      setMessage("Insufficient balance!");
      return;
    }
    const deck = createDeck();
    const player = [deck.pop(), deck.pop()];
    const dealer = [deck.pop(), deck.pop()];
    
    setBalance(prev => prev - bet);
    setPlayerHand(player);
    setDealerHand(dealer);
    setGameState("playing");
    setMessage("");
    setAnimation("deal");
    setTimeout(() => setAnimation(null), 500);
    
    const playerScore = calculateScore(player);
    if (playerScore === 21) {
      handleStand();
    }
  };

  const hit = () => {
    const deck = createDeck();
    const newCard = deck.pop();
    setPlayerHand([...playerHand, newCard]);
    setAnimation("hit");
    setTimeout(() => setAnimation(null), 300);
    
    if (calculateScore([...playerHand, newCard]) > 21) {
      handleBust();
    }
  };

  const handleBust = () => {
    setMessage("Bust! You lose.");
    setGameState("ended");
    setStats(prev => ({ ...prev, losses: prev.losses + 1, streak: 0 }));
  };

  const double = () => {
    if (balance >= bet) {
      setBalance(prev => prev - bet);
      setBet(prev => prev * 2);
      const deck = createDeck();
      const newCard = deck.pop();
      setPlayerHand([...playerHand, newCard]);
      
      if (calculateScore([...playerHand, newCard]) > 21) {
        handleBust();
      } else {
        handleStand();
      }
    } else {
      setMessage("Not enough balance to double!");
    }
  };

  const handleStand = async () => {
    setGameState("dealerTurn");
    let deck = createDeck();
    let dealerCards = [...dealerHand];
    let currentDeck = [...deck];
    
    let dealerScore = calculateScore(dealerCards);
    while (dealerScore < 17) {
      dealerCards.push(currentDeck.pop());
      dealerScore = calculateScore(dealerCards);
      setDealerHand([...dealerCards]);
      await new Promise(r => setTimeout(r, 800));
    }
    
    const playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerCards);
    
    if (dealerScore > 21) {
      setMessage("Dealer busts! You win!");
      setBalance(prev => prev + bet * 2);
      setStats(prev => ({ ...prev, wins: prev.wins + 1, streak: prev.streak + 1 }));
    } else if (playerScore > dealerScore) {
      setMessage(`You win! ${playerScore} vs ${dealerScore}`);
      setBalance(prev => prev + bet * 2);
      setStats(prev => ({ ...prev, wins: prev.wins + 1, streak: prev.streak + 1 }));
    } else if (playerScore < dealerScore) {
      setMessage(`Dealer wins! ${dealerScore} vs ${playerScore}`);
      setStats(prev => ({ ...prev, losses: prev.losses + 1, streak: 0 }));
    } else {
      setMessage("Push!");
      setBalance(prev => prev + bet);
      setStats(prev => ({ ...prev, pushes: prev.pushes + 1 }));
    }
    setGameState("ended");
  };

  const betAmounts = [50, 100, 250, 500, 1000, 2500];

  return (
    <div style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #0d0015 100%)", padding: "30px", borderRadius: "16px", border: "1px solid #ff0080", minHeight: "500px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ background: "linear-gradient(135deg, #ff0080, #a855f7, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "28px", fontWeight: "700", marginBottom: "5px" }}>
            Chillverse Casino
          </h2>
          <p style={{ color: "#a855f7", fontSize: "14px" }}>Play games, earn rewards</p>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button
            onClick={() => setShowStats(!showStats)}
            style={{ background: "transparent", color: "#64748b", border: "1px solid #334155", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}
          >
            {showStats ? "Hide" : "Show"} Stats
          </button>
          <div style={{ background: "#1a0a2e", padding: "10px 20px", borderRadius: "8px", border: "1px solid #ff0080" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>CHILL COINS</div>
            <div style={{ color: "#ff0080", fontSize: "20px", fontWeight: "700" }}>{balance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {showStats && (
        <div style={{ background: "rgba(255, 0, 128, 0.1)", padding: "15px", borderRadius: "12px", border: "1px solid #ff0080", marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700" }}>{stats.wins}</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Wins</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ff4444", fontSize: "24px", fontWeight: "700" }}>{stats.losses}</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Losses</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ffd700", fontSize: "24px", fontWeight: "700" }}>{stats.pushes}</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Pushes</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ff0080", fontSize: "24px", fontWeight: "700" }}>{stats.streak}🔥</div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>Streak</div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ background: "#120820", padding: "20px", borderRadius: "12px", border: "1px solid #a855f7" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ color: "#a855f7", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Dealer</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", minHeight: "80px", alignItems: "center" }}>
              {dealerHand.map((card, idx) => (
                <div 
                  key={idx}
                  style={{
                    width: "50px",
                    height: "70px",
                    background: "linear-gradient(135deg, #1a0a2e, #2d1a4a)",
                    borderRadius: "8px",
                    border: "2px solid #a855f7",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    transform: animation === "deal" ? "translateY(-20px)" : "none",
                    transition: "all 0.3s"
                  }}
                >
                  <span style={{ color: getCardColor(card.suit) }}>{card.value}</span>
                  <span style={{ color: getCardColor(card.suit), fontSize: "20px" }}>{card.suit}</span>
                </div>
              ))}
              {gameState === "betting" && (
                <div style={{ width: "50px", height: "70px", background: "linear-gradient(135deg, #1a0a2e, #2d1a4a)", borderRadius: "8px", border: "2px solid #a855f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#a855f7", fontSize: "24px" }}>?</span>
                </div>
              )}
            </div>
            {gameState !== "betting" && (
              <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700", marginTop: "10px" }}>
                {calculateScore(dealerHand)}
                {gameState === "dealerTurn" && " → "}
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "20px" }}>
            <div style={{ color: "#00d4ff", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Your Hand</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", minHeight: "80px", alignItems: "center" }}>
              {playerHand.map((card, idx) => (
                <div 
                  key={idx}
                  style={{
                    width: "50px",
                    height: "70px",
                    background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    transform: animation === "hit" ? "translateY(-10px)" : "none",
                    transition: "all 0.3s"
                  }}
                >
                  <span style={{ color: "#000" }}>{card.value}</span>
                  <span style={{ color: "#000", fontSize: "20px" }}>{card.suit}</span>
                </div>
              ))}
            </div>
            <div style={{ color: "#00ff88", fontSize: "24px", fontWeight: "700", marginTop: "10px" }}>
              {calculateScore(playerHand)}
            </div>
          </div>

          {message && (
            <div style={{ 
              background: message.includes("win") ? "rgba(0, 255, 136, 0.2)" : message.includes("Bust") || message.includes("lose") ? "rgba(255, 68, 68, 0.2)" : "rgba(255, 215, 0, 0.2)", 
              padding: "15px", 
              borderRadius: "8px", 
              textAlign: "center",
              marginBottom: "15px"
            }}>
              <span style={{ color: message.includes("win") ? "#00ff88" : message.includes("Bust") || message.includes("lose") ? "#ff4444" : "#ffd700", fontWeight: "700", fontSize: "16px" }}>
                {message}
              </span>
            </div>
          )}

          {gameState === "betting" && (
            <div>
              <div style={{ color: "#64748b", fontSize: "12px", textAlign: "center", marginBottom: "15px" }}>Select Bet</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
                {betAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => setBet(amount)}
                    style={{
                      background: bet === amount ? "#ff0080" : "#1a0a2e",
                      color: bet === amount ? "#fff" : "#64748b",
                      border: bet === amount ? "none" : "1px solid #334155",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "13px"
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {gameState === "betting" && (
              <button
                onClick={deal}
                disabled={bet > balance}
                style={{
                  background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                  color: "#000",
                  border: "none",
                  padding: "15px 40px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px"
                }}
              >
                DEAL
              </button>
            )}
            
            {gameState === "playing" && (
              <>
                <button
                  onClick={hit}
                  style={{
                    background: "transparent",
                    color: "#00d4ff",
                    border: "2px solid #00d4ff",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px"
                  }}
                >
                  HIT
                </button>
                <button
                  onClick={handleStand}
                  style={{
                    background: "transparent",
                    color: "#ff4444",
                    border: "2px solid #ff4444",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px"
                  }}
                >
                  STAND
                </button>
                <button
                  onClick={double}
                  disabled={balance < bet}
                  style={{
                    background: "transparent",
                    color: "#ffd700",
                    border: "2px solid #ffd700",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: balance < bet ? "not-allowed" : "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    opacity: balance < bet ? 0.5 : 1
                  }}
                >
                  x2
                </button>
              </>
            )}
            
            {gameState === "ended" && (
              <button
                onClick={() => { setGameState("betting"); setPlayerHand([]); setDealerHand([]); }}
                style={{
                  background: "linear-gradient(135deg, #ff0080, #a855f7)",
                  color: "#fff",
                  border: "none",
                  padding: "15px 40px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "16px"
                }}
              >
                NEXT HAND
              </button>
            )}
          </div>
        </div>

        <div style={{ background: "#120820", padding: "20px", borderRadius: "12px", border: "1px solid #ff0080" }}>
          <h3 style={{ color: "#ff0080", marginBottom: "15px", textAlign: "center" }}>Other Games</h3>
          {[
            { name: "Dice Roll", icon: "🎲", color: "#00d4ff", desc: "Roll dice, predict outcome" },
            { name: "Slot Machine", icon: "🎰", color: "#ffd700", desc: "Match symbols, win jackpots" },
            { name: "Roulette", icon: "🎯", color: "#ff4444", desc: "Bet on numbers and colors" },
            { name: "Poker", icon: "🃏", color: "#00ff88", desc: "Texas Hold'em tournaments" }
          ].map(game => (
            <div key={game.name} style={{ background: "#1a0a2e", padding: "15px", borderRadius: "8px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", border: "1px solid #333" }}>
              <span style={{ fontSize: "28px" }}>{game.icon}</span>
              <div>
                <div style={{ color: game.color, fontWeight: "600" }}>{game.name}</div>
                <div style={{ color: "#64748b", fontSize: "11px" }}>{game.desc}</div>
              </div>
              <span style={{ marginLeft: "auto", color: "#64748b", fontSize: "14px" }}>→</span>
            </div>
          ))}
          
          <div style={{ marginTop: "20px", padding: "15px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(168, 85, 247, 0.2))", border: "1px solid #ff0080" }}>
            <div style={{ color: "#ffd700", fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>VIP Status</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#64748b", fontSize: "12px" }}>Level</span>
              <span style={{ color: "#ff0080", fontWeight: "700" }}>Platinum</span>
            </div>
            <div style={{ height: "6px", background: "#1a0a2e", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: "68%", height: "100%", background: "linear-gradient(90deg, #ff0080, #a855f7)" }}></div>
            </div>
            <div style={{ color: "#64748b", fontSize: "10px", marginTop: "5px", textAlign: "right" }}>3200 / 5000 XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}