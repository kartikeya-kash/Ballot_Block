import React, { useEffect, useState } from 'react';
// all done project completed
const ShowChain = () => {
  const [chain, setChain] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch('https://ballot-block-blockchain-server.onrender.com/chain')
      .then(res => res.json())
      .then(data => setChain(data))
      .catch(err => console.error("Error loading chain:", err));

    fetch('https://ballot-block-blockchain-server.onrender.com/results')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Error loading results:", err));
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
            40%, 43% { transform: translate3d(0, -15px, 0); }
            70% { transform: translate3d(0, -7px, 0); }
            90% { transform: translate3d(0, -2px, 0); }
          }
          @media (max-width: 768px) {
            .container { padding: 1rem !important; }
            .title { font-size: 2.5rem !important; }
            .section-title { font-size: 1.75rem !important; flex-direction: column !important; text-align: center !important; gap: 0.5rem !important; }
          }
        `}
      </style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.6
      }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeInUp 0.8s ease-out' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            color: 'white',
            margin: 0,
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            <span style={{ display: 'inline-block', marginRight: '1rem', animation: 'bounce 2s infinite' }}>🗳️</span>
            Blockchain Voting Dashboard
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 300,
            marginTop: '1rem'
          }}>
            Transparent, Secure, Immutable Voting Results
          </p>
        </header>

        {/* 🟩 Vote Count Section */}
        <section style={{ marginBottom: '4rem', animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 600,
            color: 'white',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            📊 Live Vote Count
          </h2>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {Object.keys(results).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>📭</span>
                <p style={{ fontSize: '1.5rem', fontWeight: 500 }}>No votes recorded yet</p>
                <small style={{ fontSize: '1rem', color: '#9ca3af' }}>Votes will appear here as they are cast</small>
              </div>
            ) : (
              Object.entries(results).map(([candidate, count]) => (
                <div key={candidate} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem 2rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '15px',
                  borderLeft: '5px solid #3b82f6',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1e293b' }}>{candidate}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#3b82f6' }}>{count}</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', textTransform: 'uppercase' }}>vote{count > 1 ? 's' : ''}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Blockchain Section */}
        <section>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 600,
            color: 'white',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            🔗 Blockchain Explorer
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 300,
            marginBottom: '2rem'
          }}>
            Complete transaction history and block verification
          </p>

          {chain.map((block, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              marginBottom: '2rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>Block #{block.index}</div>
                <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{new Date(block.timestamp).toLocaleString()}</div>
              </div>

              <div style={{ padding: '2rem', display: 'grid', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase' }}>Current Hash</label>
                  <code style={{
                    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                    color: '#166534',
                    border: '2px solid #22c55e',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    wordBreak: 'break-all'
                  }}>{block.hash}</code>
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase' }}>Previous Hash</label>
                  <code style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    color: '#92400e',
                    border: '2px solid #f59e0b',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    wordBreak: 'break-all'
                  }}>{block.previousHash}</code>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <label style={{ fontSize: '1rem', fontWeight: 600, color: '#374151' }}>Proof of Work (Nonce)</label>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#7c3aed',
                    background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    border: '2px solid #a855f7'
                  }}>{block.nonce}</span>
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase' }}>Transaction Data</label>
                  <pre style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    color: '#e2e8f0',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    border: '2px solid #475569'
                  }}>{JSON.stringify(block.data, null, 2)}</pre>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default ShowChain;