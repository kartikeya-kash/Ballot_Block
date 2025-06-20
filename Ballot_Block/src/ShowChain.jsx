import React, { useEffect, useState } from 'react';

const ShowChain = () => {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    fetch('https://ballot-block-blockchain-server.onrender.com/chain')
      .then(res => res.json())
      .then(data => setChain(data))
      .catch(err => console.error("Error loading chain:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🔗 Full Blockchain</h1>
      <div className="space-y-4">
        {chain.map((block, idx) => (
          <div key={idx} className="p-3 border rounded shadow">
            <p><strong>Index:</strong> {block.index}</p>
            <p><strong>Timestamp:</strong> {block.timestamp}</p>
            <p><strong>Hash:</strong> {block.hash}</p>
            <p><strong>Previous Hash:</strong> {block.previousHash}</p>
            <p><strong>Nonce:</strong> {block.nonce}</p>
            <p><strong>Data:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(block.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowChain;