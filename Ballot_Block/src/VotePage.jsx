// all working perfectly
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const FACEPP_API = 'https://api-us.faceplusplus.com/facepp/v3/compare';
const API_KEY = 'C_fNBOehB7xKOGBp2L7Tdjroy58EzYdB';
const API_SECRET = '59I0Fr_L2YK54lSgSD1GXpdi3NOM8QSn';

function VotePage() {
  const [electionData, setElectionData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [liveFace, setLiveFace] = useState(null);
  const [stage, setStage] = useState('checkAuth');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        alert('🔐 Please log in to vote');
        navigate('/login');
        return;
      }

      const reg = localStorage.getItem('registeredFace');
      if (!reg) {
        alert('📸 Please register your face first');
        navigate('/register-face');
        return;
      }

      fetch('https://ballot-block.onrender.com/api/candidates')
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      alert('Failed to load election data');
      navigate('/');
      return;
    }

    const electionObj = { candidates: data.candidates };
    localStorage.setItem('electionData', JSON.stringify(electionObj));
    setElectionData(electionObj);
    setStage('getLive');
  })
  .catch(err => {
    alert('Error fetching election data');
    navigate('/');
  });

      setStage('getLive');
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLiveUpload = e => setLiveFace(e.target.files[0]);

  const verifyFace = async () => {
    if (!liveFace) return alert('Upload your face picture');
    
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = async () => {
      const regFace = localStorage.getItem('registeredFace');
      const blob = await (await fetch(reader.result)).blob();

      const form = new FormData();
      form.append('api_key', API_KEY);
      form.append('api_secret', API_SECRET);
      form.append('image_file1', dataURItoBlob(regFace));
      form.append('image_file2', blob);

      try {
        const res = await fetch(FACEPP_API, { method: 'POST', body: form });
        const json = await res.json();

        const conf = json.confidence;
        if (conf > 70) {
          alert(`✅ Face matched (${conf.toFixed(2)}%)`);
          setStage('voting');
        } else {
          alert(`❌ Face mismatch (${conf.toFixed(2)}%)`);
          setStage('getLive');
        }
      } catch (err) {
        alert('⚠️ Error verifying face: ' + err.message);
        setStage('getLive');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(liveFace);
  };

const handleVote = async () => {
  if (!selectedCandidate) return alert('Select a candidate');

  const user = firebase.auth().currentUser;
  if (!user || !user.phoneNumber) {
    alert("User not logged in or phone number missing.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('https://ballot-block-blockchain-server.onrender.com/voted-data', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: user.phoneNumber,
        votedFor: selectedCandidate
      })
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || '❌ Vote failed');
      navigate('/chain');
    } else {
      alert('✅ Vote recorded on the blockchain');
       navigate('/chain');
    }
  } catch (err) {
    alert('⚠️ Error submitting vote: ' + err.message);
  } finally {
    setIsLoading(false);
  }
};

  function dataURItoBlob(dataURI) {
    const [meta, data] = dataURI.split(',');
    const byteString = atob(data);
    const mime = meta.match(/:(.*?);/)[1];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2a3c57 100%)',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    },
    stars: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(2px 2px at 20px 30px, #4a90e2, transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(74, 144, 226, 0.8), transparent),
        radial-gradient(1px 1px at 90px 40px, #4a90e2, transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(74, 144, 226, 0.6), transparent),
        radial-gradient(2px 2px at 160px 30px, #4a90e2, transparent),
        radial-gradient(1px 1px at 200px 90px, rgba(74, 144, 226, 0.7), transparent),
        radial-gradient(2px 2px at 240px 50px, #4a90e2, transparent),
        radial-gradient(1px 1px at 280px 20px, rgba(74, 144, 226, 0.5), transparent),
        radial-gradient(1px 1px at 320px 100px, #4a90e2, transparent),
        radial-gradient(2px 2px at 360px 60px, rgba(74, 144, 226, 0.8), transparent)
      `,
      backgroundSize: '400px 150px',
      animation: 'twinkle 8s ease-in-out infinite alternate',
      zIndex: 1
    },
    content: {
      background: 'rgba(15, 20, 25, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(74, 144, 226, 0.2)',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '16px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#94a3b8',
      marginBottom: '32px',
      lineHeight: '1.6'
    },
    lockIcon: {
      fontSize: '4rem',
      color: '#4a90e2',
      marginBottom: '24px',
      display: 'block'
    },
    button: {
      background: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: '140px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    buttonHover: {
      background: '#357abd',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
    },
    secondaryButton: {
      background: 'rgba(74, 144, 226, 0.1)',
      color: '#4a90e2',
      border: '1px solid rgba(74, 144, 226, 0.3)'
    },
    fileUpload: {
      display: 'none'
    },
    fileUploadLabel: {
      display: 'block',
      background: 'rgba(74, 144, 226, 0.1)',
      border: '2px dashed rgba(74, 144, 226, 0.3)',
      borderRadius: '12px',
      padding: '40px 20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '24px'
    },
    fileUploadLabelHover: {
      background: 'rgba(74, 144, 226, 0.15)',
      borderColor: 'rgba(74, 144, 226, 0.5)'
    },
    candidateContainer: {
      textAlign: 'left',
      marginBottom: '32px'
    },
    candidateOption: {
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(74, 144, 226, 0.05)',
      border: '1px solid rgba(74, 144, 226, 0.2)',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white'
    },
    candidateOptionHover: {
      background: 'rgba(74, 144, 226, 0.1)',
      borderColor: 'rgba(74, 144, 226, 0.4)'
    },
    candidateOptionSelected: {
      background: 'rgba(74, 144, 226, 0.2)',
      borderColor: '#4a90e2'
    },
    radioInput: {
      marginRight: '12px',
      transform: 'scale(1.2)'
    },
    loadingSpinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  const keyframes = `
    @keyframes twinkle {
      0% { opacity: 0.3; }
      50% { opacity: 0.8; }
      100% { opacity: 0.3; }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  if (stage === 'checkAuth') {
    return (
      <>
        <style>{keyframes}</style>
        <div style={styles.container}>
          <div style={styles.stars}></div>
          <div style={styles.content}>
            <span style={styles.lockIcon}>🔐</span>
            <h1 style={styles.title}>BallotBlock</h1>
            <p style={styles.subtitle}>Authenticating your session...</p>
            <p style={{color: '#64748b', fontSize: '0.875rem'}}>Please wait while we verify your credentials</p>
          </div>
        </div>
      </>
    );
  }

  if (stage === 'getLive') {
    return (
      <>
        <style>{keyframes}</style>
        <div style={styles.container}>
          <div style={styles.stars}></div>
          <div style={styles.content}>
            <span style={styles.lockIcon}>📸</span>
            <h1 style={styles.title}>Face Verification</h1>
            <p style={styles.subtitle}>
              Upload a live photo for biometric verification to proceed with voting
            </p>
            
            <label 
              style={styles.fileUploadLabel} 
              htmlFor="faceUpload"
              onMouseEnter={(e) => Object.assign(e.target.style, styles.fileUploadLabelHover)}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.fileUploadLabel)}
            >
              <input
                id="faceUpload"
                type="file"
                accept="image/*"
                onChange={handleLiveUpload}
                style={styles.fileUpload}
              />
              <div style={{fontSize: '2.5rem', marginBottom: '12px'}}>📷</div>
              <div style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '4px', color: 'white'}}>
                {liveFace ? liveFace.name : 'Click to upload your photo'}
              </div>
              <div style={{fontSize: '0.875rem', color: '#94a3b8'}}>
                Supported formats: JPG, PNG, WebP
              </div>
            </label>

            <button
              style={{
                ...styles.button,
                ...(isLoading && styles.buttonDisabled)
              }}
              onClick={verifyFace}
              disabled={isLoading}
              onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, {...styles.button, ...styles.buttonHover})}
              onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, styles.button)}
            >
              {isLoading && <div style={styles.loadingSpinner}></div>}
              {isLoading ? 'Verifying...' : 'Verify Face'}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (stage === 'voting') {
    return (
      <>
        <style>{keyframes}</style>
        <div style={styles.container}>
          <div style={styles.stars}></div>
          <div style={styles.content}>
            <span style={styles.lockIcon}>🗳️</span>
            <h1 style={styles.title}>Cast Your Vote</h1>
            <p style={styles.subtitle}>
              Select your preferred candidate and submit your vote securely
            </p>

            <div style={styles.candidateContainer}>
              {electionData.candidates.map((candidate, idx) => (
                <label
                  key={idx}
                  style={{
                    ...styles.candidateOption,
                    ...(selectedCandidate === candidate.name && styles.candidateOptionSelected)
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCandidate !== candidate.name) {
                      Object.assign(e.currentTarget.style, {...styles.candidateOption, ...styles.candidateOptionHover});
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCandidate !== candidate.name) {
                      Object.assign(e.currentTarget.style, styles.candidateOption);
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="vote"
                    value={candidate.name}
                    onChange={e => setSelectedCandidate(e.target.value)}
                    style={styles.radioInput}
                  />
                  <div>
                    <div style={{fontWeight: '600', marginBottom: '2px', fontSize: '1.125rem'}}>
                      {candidate.name}
                    </div>
                    <div style={{fontSize: '0.875rem', color: '#94a3b8'}}>
                      {candidate.party}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              style={{
                ...styles.button,
                ...(isLoading && styles.buttonDisabled)
              }}
              onClick={handleVote}
              disabled={isLoading}
              onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, {...styles.button, ...styles.buttonHover})}
              onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, styles.button)}
            >
              {isLoading && <div style={styles.loadingSpinner}></div>}
              {isLoading ? 'Submitting...' : 'Submit Vote'}
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default VotePage;
