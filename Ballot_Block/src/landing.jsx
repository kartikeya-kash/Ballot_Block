//vercel deployment error resolve
import React, { useEffect, useState, useRef } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import Features from "./Features";
import HowItWorks from './HowItWorks';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Landing = () => {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js";
    script.async = true;
    script.onload = () => {
      tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        detectRetina: true,
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          size: { value: 2 },
          color: { value: "#5c8df6" },
          links: {
            enable: true,
            color: "#5c8df6",
            opacity: 0.15,
            width: 1,
          },
          move: { enable: true, speed: 0.3 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          modes: { repulse: { distance: 80, duration: 0.4 } },
        },
        background: { color: "transparent" },
      });
    };
    document.body.appendChild(script);

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await fetch("https://ballot-block.onrender.com/api/get-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: firebaseUser.phoneNumber }),
          });

          const result = await response.json();
          if (result.success) {
            setUser({ ...firebaseUser, ...result.user });
          } else {
            console.error(result.message);
            setUser(firebaseUser); 
          }
        } catch (error) {
          console.error("❌ Failed to fetch user data:", error);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
    });

    // Hide dropdown on outside click
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut(getAuth());
    setUser(null);
  };

  return (
    <div>
      <div id="tsparticles"></div>

      <div className="hero-section">
        <nav className="navbar">
          <div className="logo">
            <img src="/logo.svg" alt="logo" className="logo-icon" />
            <span>BallotBlock</span>
          </div>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#howitworks">How It Works</a></li>
            <li><a href="https://github.com/kartikeya-kash/Ballot_Block" target="_blank" rel="noopener noreferrer">Github</a></li>

            {user ? (
              <li className="me-wrapper" ref={dropdownRef}>
                <button onClick={() => setShowProfile(!showProfile)} className="me-btn">
                  👤
                </button>
                {showProfile && (
                  <div className="me-dropdown">
                    <p style={{ backgroundColor: "black", padding: "4px 8px", borderRadius: "6px" }}>
                      <strong>Phone:</strong> {user.phoneNumber}
                    </p>
                    <p><strong>Voter ID:</strong> {user.voternumber || "Not Assigned"}</p>
                    <p><strong>Voted:</strong> {user.hasVoted ? "Yes" : "No"}</p>
                    <p><strong>Stored Blocks:</strong> {JSON.parse(localStorage.getItem("blockchain"))?.length || 0}</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            ) : (
              <li><Link to="/login" className="nav-btn">Login/Register</Link></li>
            )}
          </ul>
        </nav>

        <header className="hero-content">
          <h1>BallotBlock</h1>
          <div className="lock-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#3b82f6" viewBox="0 0 24 24">
              <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm-3 5h12v9H6v-9z" />
            </svg>
          </div>
          <p>
            One person. One vote. Verified by face. <br />
            Secured by OTP. Forever tamper-proof.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Start Voting</button>
            <button className="secondary-btn">View Docs</button>
            <button className="secondary-btn">Watch Demo</button>
          </div>
        </header>
      </div>

      <div style={{ marginTop: "70px" }}>
        <Features />
      </div>
      <div style={{ marginTop: "-40px" }}>
        <HowItWorks />
      </div>
    </div>
  );
};

export default Landing;