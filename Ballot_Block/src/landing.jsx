import React, { useEffect } from "react";
import "./Landing.css";

const Landing = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js";
    script.async = true;
    script.onload = () => {
      tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        detectRetina: true,
        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          size: { value: 2 },
          color: { value: "#5c8df6" },
          links: {
            enable: true,
            color: "#5c8df6",
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.3,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        background: { color: "transparent" },
      });
    };
    document.body.appendChild(script);
  }, []);

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
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Demo</a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Github</a></li>
            <li><button className="nav-btn"><a href="">Login/Register</a></button></li>
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
    </div>
  );
};

export default Landing;