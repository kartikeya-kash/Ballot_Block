
import React, { useState } from "react";

function AddCandidates() {
  const [candidates, setCandidates] = useState([{ name: "", party: "" }]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddCandidate = () => {
    setCandidates([...candidates, { name: "", party: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...candidates];
    updated[index][field] = value;
    setCandidates(updated);
  };

  const handleSubmit = () => {
    if (!startTime || !endTime || candidates.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    const electionData = {
      candidates,
      startTime,
      endTime,
    };

    localStorage.setItem("electionData", JSON.stringify(electionData));
    alert("Election data saved successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", color: "#fff", backgroundColor: "#111", borderRadius: "10px", marginTop: "50px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>🗳️ Set Up Election</h1>

      {candidates.map((candidate, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Candidate Name"
            style={{ flex: 1, padding: "10px", backgroundColor: "#333", color: "#fff", border: "1px solid #444", borderRadius: "5px" }}
            value={candidate.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Party"
            style={{ flex: 1, padding: "10px", backgroundColor: "#333", color: "#fff", border: "1px solid #444", borderRadius: "5px" }}
            value={candidate.party}
            onChange={(e) => handleChange(index, "party", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleAddCandidate}
        style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        ➕ Add Candidate
      </button>

      <div style={{ marginTop: "30px" }}>
        <label>🕓 Voting Start Time:</label>
        <input
          type="datetime-local"
          style={{ width: "100%", padding: "10px", backgroundColor: "#333", color: "#fff", border: "1px solid #444", borderRadius: "5px", marginTop: "5px" }}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label style={{ marginTop: "20px", display: "block" }}>🕕 Voting End Time:</label>
        <input
          type="datetime-local"
          style={{ width: "100%", padding: "10px", backgroundColor: "#333", color: "#fff", border: "1px solid #444", borderRadius: "5px", marginTop: "5px" }}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{ marginTop: "30px", width: "100%", padding: "15px", backgroundColor: "#28a745", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        ✅ Save Election Details
      </button>
    </div>
  );
}

export default AddCandidates;