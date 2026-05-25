import React from 'react';

const TradingViewChart = () => {
  return (
    <div className="card" style={{ height: '500px' }}>
      <h3 style={{ color: 'var(--accent-color)', marginTop: 0 }}>S-SIGNAL ANALYSIS</h3>
      <div style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
        <iframe 
          src="https://s.tradingview.com/widgetembed/?frameWidth=940&frameHeight=690&symbol=BINANCE:BTCUSDT&interval=D&hidesidebar=1&symboledit=1&saveimage=1&e720=1" 
          style={{ border: 'none', width: '100%', height: '100%' }}
        ></iframe>
      </div>
    </div>
  );
};

export default TradingViewChart;
