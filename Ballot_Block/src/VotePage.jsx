import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function VotePage() {
  const [electionData, setElectionData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Auth guard
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        alert("Please log in to vote.");
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    const data = localStorage.getItem("electionData");
    if (data) {
      setElectionData(JSON.parse(data));
    }
  }, [navigate]);

  const handleVote = () => {
    if (!selectedCandidate) {
      alert("Please select a candidate to vote.");
      return;
    }

    const voteRecord = localStorage.getItem("voteCast");
    if (voteRecord) {
      alert("You've already voted.");
      return;
    }

    localStorage.setItem("voteCast", selectedCandidate);
    alert("✅ Vote submitted successfully!");
  };

  if (loading || !electionData) return <p>Loading...</p>;

  return (
    <div style={{ color: "white", background: "black", padding: "20px" }}>
      <h1>🗳️ Cast Your Vote</h1>
      {electionData.candidates.map((c, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`cand-${index}`}
            name="vote"
            value={c.name}
            onChange={(e) => setSelectedCandidate(e.target.value)}
          />
          <label htmlFor={`cand-${index}`}>{c.name} ({c.party})</label>
        </div>
      ))}
      <br />
      <button onClick={handleVote}>✅ Submit Vote</button>
    </div>
  );
}

export default VotePage;