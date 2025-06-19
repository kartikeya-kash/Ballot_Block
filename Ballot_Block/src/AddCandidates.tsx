import React, { useState } from "react";

function AddCandidates() {
  const [candidates, setCandidates] = useState([{ name: "", party: "" }]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddCandidate = () => {
    setCandidates([...candidates, { name: "", party: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...candidates];
    updated[index][field] = value;
    setCandidates(updated);
  };

  const handleRemoveCandidate = (index: number) => {
    if (candidates.length > 1) {
      const updated = candidates.filter((_, i) => i !== index);
      setCandidates(updated);
    }
  };

const handleSubmit = async () => {
  if (!startTime || !endTime || candidates.length === 0) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await fetch("https://ballot-block.onrender.com/setup-election", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ candidates }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Election data saved to database!");
    } else {
      alert(`❌ Failed: ${data.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("❌ Error saving election data.");
  }
};
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      maxWidth: "800px",
      margin: "0 auto",
      background: "rgba(30, 30, 46, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
      border: "1px solid rgba(75, 85, 99, 0.3)",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "40px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "10px",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    subtitle: {
      color: "#94a3b8",
      fontSize: "1.1rem",
      fontWeight: "400",
    },
    sectionTitle: {
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#e2e8f0",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    candidateContainer: {
      marginBottom: "30px",
    },
    candidateRow: {
      display: "flex",
      gap: "15px",
      marginBottom: "15px",
      alignItems: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #1e293b, #334155)",
      borderRadius: "16px",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    candidateRowHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(96, 165, 250, 0.15)",
      border: "2px solid rgba(96, 165, 250, 0.3)",
    },
    input: {
      flex: "1",
      padding: "15px 20px",
      fontSize: "16px",
      border: "2px solid #374151",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      background: "#1f2937",
      color: "#e5e7eb",
    },
    inputFocus: {
      borderColor: "#60a5fa",
      boxShadow: "0 0 0 3px rgba(96, 165, 250, 0.1)",
      transform: "scale(1.02)",
    },
    removeButton: {
      padding: "12px",
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "18px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
      minWidth: "48px",
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    removeButtonHover: {
      transform: "scale(1.1) rotate(90deg)",
      boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)",
    },
    addButton: {
      padding: "15px 30px",
      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "0 auto",
    },
    addButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
    },
    timingSection: {
      marginTop: "40px",
      padding: "30px",
      background: "linear-gradient(135deg, #7c2d12, #9a3412)",
      borderRadius: "16px",
      border: "2px solid rgba(194, 65, 12, 0.3)",
    },
    timeInputContainer: {
      marginBottom: "25px",
    },
    label: {
      display: "block",
      fontSize: "16px",
      fontWeight: "600",
      color: "#fed7aa",
      marginBottom: "10px",
      alignItems: "center",
      gap: "8px",
    },
    timeInput: {
      width: "100%",
      padding: "15px 20px",
      fontSize: "16px",
      border: "2px solid rgba(194, 65, 12, 0.4)",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      background: "rgba(30, 30, 46, 0.8)",
      color: "#fed7aa",
    },
    timeInputFocus: {
      borderColor: "#fb923c",
      boxShadow: "0 0 0 3px rgba(251, 146, 60, 0.2)",
      transform: "scale(1.02)",
    },
    submitButton: {
      marginTop: "40px",
      width: "100%",
      padding: "20px",
      background: "linear-gradient(135deg, #059669, #047857)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "700",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 20px rgba(5, 150, 105, 0.4)",
      textTransform: "uppercase" as const,
      letterSpacing: "1px",
    },
    submitButtonHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 10px 30px rgba(5, 150, 105, 0.6)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🗳️ Election Setup</h1>
          <p style={styles.subtitle}>Configure your democratic process with elegance</p>
        </div>

        <div style={styles.candidateContainer}>
          <h2 style={styles.sectionTitle}>
            👥 Candidates & Parties
          </h2>
          
          {candidates.map((candidate, index) => (
            <div 
              key={index} 
              style={styles.candidateRow}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                Object.assign(target.style, styles.candidateRowHover);
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                Object.assign(target.style, styles.candidateRow);
              }}
            >
              <input
                type="text"
                placeholder="✨ Candidate Name"
                style={styles.input}
                value={candidate.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  Object.assign(target.style, styles.inputFocus);
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  Object.assign(target.style, styles.input);
                }}
              />
              <input
                type="text"
                placeholder="🏛️ Political Party"
                style={styles.input}
                value={candidate.party}
                onChange={(e) => handleChange(index, "party", e.target.value)}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  Object.assign(target.style, styles.inputFocus);
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  Object.assign(target.style, styles.input);
                }}
              />
              {candidates.length > 1 && (
                <button
                  onClick={() => handleRemoveCandidate(index)}
                  style={styles.removeButton}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    Object.assign(target.style, styles.removeButtonHover);
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    Object.assign(target.style, styles.removeButton);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleAddCandidate}
            style={styles.addButton}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              Object.assign(target.style, styles.addButtonHover);
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              Object.assign(target.style, styles.addButton);
            }}
          >
            <span>➕</span> Add Another Candidate
          </button>
        </div>

        <div style={styles.timingSection}>
          <h2 style={styles.sectionTitle}>
            ⏰ Election Timeline
          </h2>
          
          <div style={styles.timeInputContainer}>
            <label style={styles.label}>
              🚀 Voting Starts
            </label>
            <input
              type="datetime-local"
              style={styles.timeInput}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                Object.assign(target.style, styles.timeInputFocus);
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                Object.assign(target.style, styles.timeInput);
              }}
            />
          </div>

          <div style={styles.timeInputContainer}>
            <label style={styles.label}>
              🏁 Voting Ends
            </label>
            <input
              type="datetime-local"
              style={styles.timeInput}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                Object.assign(target.style, styles.timeInputFocus);
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                Object.assign(target.style, styles.timeInput);
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          style={styles.submitButton}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            Object.assign(target.style, styles.submitButtonHover);
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            Object.assign(target.style, styles.submitButton);
          }}
        >
          ✅ Launch Election
        </button>
      </div>
    </div>
  );
}

export default AddCandidates;