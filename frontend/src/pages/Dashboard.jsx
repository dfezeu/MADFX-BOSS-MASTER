import React from 'react';
import Navbar from '../components/Navbar';
import PortfolioOverview from '../components/PortfolioOverview';
import CoinGeckoGainers from '../components/CoinGeckoGainers';
import TradingViewChart from '../components/TradingViewChart';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { account } = useAuth();

  if (!account) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Navbar />
        <div style={{ marginTop: '100px' }}>
          <h1 style={{ color: 'var(--accent-color)', fontSize: '3rem' }}>RESTRICTED ACCESS</h1>
          <p style={{ color: '#888', fontSize: '1.2rem' }}>PLEASE CONNECT YOUR WALLET TO ACCESS THE MADFX TERMINAL</p>
          <div className="terminal-border" style={{ padding: '20px', marginTop: '20px', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
            SYSTEM STATUS: READY_FOR_AUTH // ENCRYPTION: AES-256 // NODE: MAINNET
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="grid-dashboard">
        <div style={{ gridColumn: 'span 1' }}>
          <PortfolioOverview />
          <div style={{ height: '20px' }}></div>
          <CoinGeckoGainers />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <TradingViewChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
