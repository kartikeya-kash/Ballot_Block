//all deployed test done
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "./Landing.css";

const firebaseConfig = {
  apiKey: "AIzaSyDXM-gjrHwRlsWn-sah7b9HnoaWykzVG6k",
  authDomain: "ballotblock-58a0d.firebaseapp.com",
  projectId: "ballotblock-58a0d",
  storageBucket: "ballotblock-58a0d.appspot.com",
  messagingSenderId: "812475033391",
  appId: "1:812475033391:web:c9310541aa19a046ce23da",
  measurementId: "G-K8K79L79T6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const recaptchaRef = useRef(null);
  const confirmationResultRef = useRef(null);
  const nameRegex = /^[A-Za-z]+$/;
  const phoneRegex = /^\+91[0-9]{10}$/;

  const validatedata = (usrname, pn) => {
    if (!nameRegex.test(usrname)) {
      window.alert("❌ Invalid username: only letters are allowed.");
      return false;
    }
    if (!phoneRegex.test(pn)) {
      window.alert("❌ Invalid phone number: must start with +91 and be followed by 10 digits.");
      return false;
    }
    return true;
  };

  const storeData = async (e) => {
    e.preventDefault();
    let usrname = document.getElementById('usrname').value;
    let pn = document.getElementById('phonenumber').value;
    if (validatedata(usrname, pn)) {
      const userData = { name: usrname, phone: pn };
      try {
        const response = await fetch("https://ballot-block.onrender.com/api/store-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (result.success) {
          alert(` "${usrname}" registered successfully!! Please login`);
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaRef.current, {
        size: 'normal', callback: () => {},
      });
      window.recaptchaVerifier.render();
    }
  }, []);

  const sendOTP = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        confirmationResultRef.current = confirmationResult;
        setShowOtp(true);
      })
      .catch((error) => {
        alert("Phone number not register, please signup");
        console.error("Error sending OTP:", error);
      });
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    confirmationResultRef.current.confirm(otp)
      .then(() => alert("✅ Phone number verified successfully!"))
      .catch(() => alert("❌ OTP verification failed. Please try again."));
  };

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
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        background: { color: "transparent" },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <StyledWrapper>
      <div id="tsparticles"></div>

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
          <li><button className="nav-btn">Login/Register</button></li>
        </ul>
      </nav>

      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider" />
            <span className="card-side" />
            <div className="flip-card__inner">
              {/* Login Form */}
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form">
                  <input
                    className="flip-card__input"
                    name="phoneno"
                    placeholder="Phone Number: +91..."
                    type="text"
                    id='phonenumberlogin'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div ref={recaptchaRef} style={{ marginBottom: '10px' }} />
                  {!showOtp && (
                    <button className="flip-card__btn" onClick={sendOTP}  style={{ marginTop: '-17px' }}>Send OTP</button>
                  )}
                  {showOtp && (
                    <>
                      <input
                        className="flip-card__input"
                        placeholder="Enter OTP"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                     style={{ marginTop: '-17px' }} />
                      <button className="flip-card__btn" onClick={verifyOTP} style={{ marginTop: '-5px' }}>Verify OTP</button>
                    </>
                  )}
                </form>
              </div>

              {/* Signup Form (Just UI placeholder for now) */}
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form">
                  <input className="flip-card__input" placeholder="Name" type="text"  id='usrname'/>
                  <input className="flip-card__input" placeholder="Phone Number: +91..." type="text" id="phonenumber" />
                  <button className="flip-card__btn" type="button" onClick={storeData}>Sign up</button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: column;
  align-items: center;

  #tsparticles {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(135deg, #050b1b, #030814, #051028, #030b1b, #031432);
    background-size: 400% 400%;
    animation: gradientMove 15s ease infinite;
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .navbar {
  position: absolute;
  top: 20px;
  right: 20px;
  left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.03);
  padding: 16px 32px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 2;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.4rem;
  gap: 10px;
  color: white;
}

.logo-icon {
  width: 24px;
  height: 24px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1.05rem;
}


.nav-btn {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 20px;
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

  .wrapper {
      z-index: 1;
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center; 
  align-items: center;     
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
--bg-color: #fff; 
    --bg-color-alt: #666;
    --main-color: #323232;
      /* display: flex; */
      /* flex-direction: column; */
      /* align-items: center; */
  }
  /* switch card */
  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Log in';
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: 'Sign up';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color );
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  /* card */ 

  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
      /* width: 100%;
      height: 100%; */
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:active, .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
  .p-conf, .n-conf {
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
  }

  .p-conf {
    color: green;
    border: 2px solid green;
    background-color: rgba(0, 255, 0, 0.2);
  }

  .n-conf {
    color: red;
    border: 2px solid red;
    background-color: rgba(255, 0, 0, 0.2);
  }`;

export default Login;
