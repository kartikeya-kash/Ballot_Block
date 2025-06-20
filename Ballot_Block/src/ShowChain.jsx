import React, { useEffect, useState } from 'react';

const ShowChain = () => {
  const [chain, setChain] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    // Fetch blockchain
    fetch('https://ballot-block-blockchain-server.onrender.com/chain')
      .then(res => res.json())
      .then(data => setChain(data))
      .catch(err => console.error("Error loading chain:", err));

    // Fetch vote results
    fetch('https://ballot-block-blockchain-server.onrender.com/results')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Error loading results:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🗳️ Blockchain Voting Results</h1>

      <div className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">📊 Vote Count</h2>
        {Object.keys(results).length === 0 ? (
          <p>No votes recorded yet.</p>
        ) : (
          <ul className="space-y-2">
            {Object.entries(results).map(([candidate, count]) => (
              <li key={candidate} className="flex justify-between border-b pb-1">
                <span className="font-medium">{candidate}</span>
                <span className="text-blue-600 font-bold">{count} vote{count > 1 ? 's' : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold mb-2">🔗 Full Blockchain</h2>
        {chain.map((block, idx) => (
          <div key={idx} className="p-4 border rounded shadow bg-gray-50">
            <p><strong>Index:</strong> {block.index}</p>
            <p><strong>Timestamp:</strong> {block.timestamp}</p>
            <p><strong>Hash:</strong> <span className="break-all">{block.hash}</span></p>
            <p><strong>Previous Hash:</strong> <span className="break-all">{block.previousHash}</span></p>
            <p><strong>Nonce:</strong> {block.nonce}</p>
            <p><strong>Data:</strong></p>
            <pre className="bg-white p-2 rounded text-sm overflow-auto">{JSON.stringify(block.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowChain;