import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { account, connectWallet, disconnectWallet, mode, toggleMode, isLoading } = useAuth();

  return (
    <nav className="nav-bar">
      <div style={{ fontWeight: 'bold', color: 'var(--accent-color)', fontSize: '1.2rem' }}>
        MADFX BOSS // TERMINAL
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: '#ccc' }}>MODE: {mode.toUpperCase()}</span>
          <label className="toggle-switch">
            <input type="checkbox" checked={mode === 'live'} onChange={toggleMode} />
            <span className="slider"></span>
          </label>
        </div>
        
        {account ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>
              {account.substring(0, 6)}...{account.substring(38, 42)}
            </span>
            <button className="btn-outline" onClick={disconnectWallet} style={{ fontSize: '0.7rem' }}>
              DISCONNECT
            </button>
          </div>
        ) : (
          <button className="btn-primary" onClick={connectWallet} disabled={isLoading}>
            {isLoading ? 'CONNECTING...' : 'CONNECT WALLET'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
