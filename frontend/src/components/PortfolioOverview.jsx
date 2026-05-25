import React from 'react';

const PortfolioOverview = () => {
  const portfolioData = [
    { asset: 'BTC', balance: '0.42', value: '25,200' },
    { asset: 'ETH', balance: '12.5', value: '31,250' },
    { asset: 'SOL', balance: '150', value: '12,000' },
    { asset: 'USDT', balance: '5,000', value: '5,000' },
  ];

  return (
    <div className="card">
      <h3 style={{ color: 'var(--accent-color)', marginTop: 0 }}>PORTFOLIO VIEW</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {portfolioData.map(item => (
          <div key={item.asset} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#000', border: '1px solid #222' }}>
            <span>{item.asset}</span>
            <span>{item.balance}</span>
            <span style={{ color: 'var(--accent-color)' }}>${item.value}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderTop: '2px solid var(--accent-color)', fontWeight: 'bold', marginTop: '10px' }}>
          <span>TOTAL ESTIMATED VALUE</span>
          <span style={{ color: 'var(--accent-color)' }}>$68,450.00</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
