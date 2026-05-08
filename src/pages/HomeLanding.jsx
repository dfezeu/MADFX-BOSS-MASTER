import React from 'react';
import { Link } from 'react-router-dom';

const HomeLanding = () => {
  return (
    <div style={{ 
      background: '#030712', 
      minHeight: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -2,
        background: 'linear-gradient(45deg, #0a0a0a, #030712, #0a0a0a)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}></div>
      
      {/* Grid Pattern */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        backgroundImage: 
          "linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px)",
        backgroundSize: '30px 30px',
        opacity: 0.3
      }}></div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo/Brand */}
        <div style={{ 
          marginBottom: '40px',
          animation: 'fadeInDown 1s ease'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            letterSpacing: '-1px',
            textShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
          }}>
            MADFX BOSS
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#00aaff',
            opacity: 0.8,
            fontWeight: '500'
          }}>
            Making A Difference through Futures Exchange, Built On Superior Systems
          </p>
        </div>

        {/* Hero Content */}
        <div style={{ 
          maxWidth: '800px',
          animation: 'fadeInUp 1s ease 0.2s both'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            color: '#00ff88',
            textShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
          }}>
            The Ultimate Trading & Investment Platform
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.8',
            marginBottom: '30px',
            opacity: 0.9,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Experience AI-powered trading signals, automated profit generation, reward systems, and seamless reinvestment loops. Join thousands of entrepreneurs, investors, and traders who are building wealth while funding social good initiatives.
          </p>
          
          {/* Features Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(0, 255, 136, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ color: '#00ff88', marginBottom: '10px' }}>AI Trading Signals</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Harmonic pattern detection (Gartley, Butterfly, Bat, Crab, Shark) with 90%+ accuracy
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(0, 255, 136, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ color: '#00ff88', marginBottom: '10px' }}>TGRR NEXUS Loop</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Trade → Generate → Reward → Reinvest - Automated wealth building engine
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(0, 255, 136, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ color: '#00ff88', marginBottom: '10px' }}>Social Good Funding</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Platform profits automatically fund charity initiatives worldwide
              </p>
            </div>
            
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.5)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(0, 255, 136, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ color: '#00ff88', marginBottom: '10px' }}>Prop Firm Compliance</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                FTMO, Funded Next, True Forex Funds rules enforced automatically
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link to="/app" style={{ 
              background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
              color: '#0a0a0a',
              padding: '14px 30px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}>
              Launch Dashboard
            </Link>
            
            <button style={{ 
              background: 'rgba(15, 23, 42, 0.5)',
              color: '#00ff88',
              padding: '14px 30px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              border: '2px solid #00ff88',
              cursor: 'pointer'
            }}>
              Learn More
            </button>
          </div>

          {/* MAXAI Link */}
          <div style={{ 
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0, 255, 136, 0.1)'
          }}>
            <p style={{ 
              fontSize: '0.9rem', 
              opacity: 0.6,
              marginBottom: '10px'
            }}>
              Powered by:
            </p>
            <Link to="https://maxai.example.com" target="_blank" rel="noopener noreferrer" style={{ 
              color: '#00ff88',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              MAXAI Intelligence Engine
              <span style={{ 
                display: 'inline-block',
                width: '8px',
                height: '8px',
                background: '#00ff88',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: 'auto',
          padding: '20px 0',
          fontSize: '0.9rem',
          opacity: 0.5,
          borderTop: '1px solid rgba(0, 255, 136, 0.1)'
        }}>
          <p>© {new Date().getFullYear()} MADFX BOSS. All rights reserved.</p>
          <p style={{ 
            marginTop: '5px',
            fontSize: '0.8rem'
          }}>
            <Link to="/terms" style={{ color: '#00aaff', textDecoration: 'none', marginRight: '10px' }}>Terms</Link>
            <Link to="/privacy" style={{ color: '#00aaff', textDecoration: 'none' }}>Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeLanding;