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

      const data = localStorage.getItem('electionData');
      if (!data) {
        alert('Election data missing');
        navigate('/');
        return;
      }

      setElectionData(JSON.parse(data));
      setStage('getLive');
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLiveUpload = e => setLiveFace(e.target.files[0]);

  const verifyFace = async () => {
    if (!liveFace) return alert('Upload your face picture');

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
      }
    };
    reader.readAsDataURL(liveFace);
  };

  const handleVote = () => {
    if (!selectedCandidate) return alert('Select a candidate');
    if (localStorage.getItem('voteCast')) return alert("You've already voted");
    localStorage.setItem('voteCast', selectedCandidate);
    alert('✅ Vote recorded');
    navigate('/');
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

  if (stage === 'checkAuth') return <p style={{ color: 'white', backgroundColor: 'black', padding: '20px' }}>Checking authentication...</p>;

  if (stage === 'getLive') {
    return (
      <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <h1>📸 Upload Live Photo for Verification</h1>
        <input type="file" accept="image/*" onChange={handleLiveUpload} />
        <br /><br />
        <button onClick={verifyFace}>Verify Face</button>
      </div>
    );
  }

  if (stage === 'voting') {
    return (
      <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
        <h1>🗳️ Cast Your Vote</h1>
        {electionData.candidates.map((c, idx) => (
          <div key={idx}>
            <label>
              <input
                type="radio"
                name="vote"
                value={c.name}
                onChange={e => setSelectedCandidate(e.target.value)}
              />
              {c.name} ({c.party})
            </label>
          </div>
        ))}
        <br />
        <button onClick={handleVote}>Submit Vote</button>
      </div>
    );
  }

  return null;
}

export default VotePage;