import React, { useState, useEffect } from 'react';

const CoinGeckoGainers = () => {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percentage_change_in_24h&per_page=5&page=1&sparkline=false');
        const data = await response.json();
        setGainers(data);
      } catch (error) {
        console.error('Error fetching top gainers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGainers();
  }, []);

  if (loading) return <div className="card">Loading top gainers...</div>;

  return (
    <div className="card">
      <h3 style={{ color: 'var(--accent-color)', marginTop: 0 }}>TOP GAINERS (24H)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {gainers.map(coin => (
          <li key={coin.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
            <span>{coin.name} <small style={{ color: '#888' }}>({coin.symbol.toUpperCase()})</small></span>
            <span style={{ color: 'var(--accent-color)' }}>+{coin.percentage_change_24h?.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinGeckoGainers;
