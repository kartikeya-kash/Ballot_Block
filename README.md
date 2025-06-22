# 🔐 BallotBlock

> _Secure • Decentralized • Face-Verified Voting_

BallotBlock is a next-gen, decentralized, blockchain-powered digital voting platform designed to revolutionize how democratic voting systems work. It uses real-time face verification, peer-to-peer blockchain syncing, and transparent vote logging to create a **tamper-proof and trustless digital voting system**.

---

## 🏅 Badges

![MIT License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/built%20with-React-blue)
![Firebase](https://img.shields.io/badge/backend-Firebase-orange)
![Gun.js](https://img.shields.io/badge/p2p-Gun.js-lightgrey)
![Face++](https://img.shields.io/badge/face--auth-Face++-purple)
![Status](https://img.shields.io/badge/status-Prototype-brightgreen)

---

## 📌 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [⚠️ The Problem](#️-the-problem)
- [🌍 The Impact](#-the-impact)
- [✅ Key Objectives](#-key-objectives)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔁 Workflow](#-workflow)
- [🚀 Features](#-features)
- [📸 Face Verification Flow](#-face-verification-flow)
- [🌐 Blockchain Workflow](#-blockchain-workflow)
- [🛠️ Installation](#️-installation)
- [📂 Project Structure](#-project-structure)
- [💡 Future Improvements](#-future-improvements)
- [🧠 Lessons Learned](#-lessons-learned)
- [📊 The Impact](#-the-impact)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🎯 Project Overview

BallotBlock offers a secure and decentralized alternative to traditional voting systems, integrating:

- 📲 Phone-based authentication (Firebase OTP)
- 🧑‍💼 Facial recognition for identity verification
- ⛓ Blockchain for immutable vote storage
- 🔁 Peer-to-peer syncing via Gun.js

Every vote is cryptographically linked and validated, visible to every peer but impossible to tamper with.

---

## ⚠️ The Problem

Traditional or electronic voting systems face challenges like:

- 🗳 Voter impersonation and fraud
- 🧑‍💻 Centralized control leading to bias
- ❌ Lack of transparency in vote counting
- 🔓 Data manipulation or tampering
- ⚙️ Infrastructure cost and physical presence

---

## 🌍 The Impact

BallotBlock aims to:

- 🌐 Empower **remote voters** (migrants, elderly, disabled)
- 🛡 Protect **electoral integrity** with immutability
- 💬 Build **trust** through transparency
- 🔄 Reduce **dependency** on physical setups
- 🧠 Spark innovation in **e-governance and civic tech**
- 💻 Enable students & developers to **learn real blockchain concepts**

By integrating face authentication and decentralized syncing, BallotBlock reimagines how **fair, secure, and accessible elections** should be in the digital age.

---

## ✅ Key Objectives

- ✅ Verify users with **face recognition**
- ✅ Allow **one vote per unique identity**
- ✅ Prevent vote modification/tampering
- ✅ Share blockchain **P2P** with **no central authority**
- ✅ Backup data to cloud (Firebase) if needed

---

## ⚙️ Tech Stack

| Tech             | Role                                |
|------------------|-------------------------------------|
| React.js         | Frontend UI                         |
| Tailwind CSS     | UI styling                          |
| Firebase         | OTP login + optional data storage   |
| Gun.js           | Peer-to-peer blockchain syncing     |
| Face++ API       | Live face recognition               |
| Vite             | Fast build system                   |
| JavaScript       | App logic + API integrations        |

---

## 🔁 Workflow

<pre><code>```mermaid
graph TD
A[Phone OTP Login] --> B[Register Face via Upload]
B --> C[Click 'Vote']
C --> D[Live Face Captured]
D --> E[Compare with Registered Face (Face API)]
E --> F{Match > 70%?}
F -->|Yes| G[Vote Added to Blockchain]
F -->|No| H[Error: Face Mismatch]
G --> I[Block Synced via Gun.js to Peers]
```</code></pre>


---

## 🚀 Features

- 🔐 Secure Phone Login (Firebase)
- 🧑‍🎤 Facial Registration and Live Verification
- ⛓ Immutable Blockchain Vote Logging
- 🔄 Gun.js P2P Data Sharing (no server required)
- 👤 Personalized Dashboard (‘Me’ Section)
- 📋 View Blockchain Chain and Vote Status
- 📤 Firebase backup (optional fallback)

---

## 📸 Face Verification Flow

1. User logs in via phone OTP.
2. Uploads a face image (saved locally or to DB).
3. During voting, live image is taken via webcam.
4. Both faces are sent to **Face++ API**.
5. If similarity score > 70%, vote proceeds.

---

## 🌐 Blockchain Workflow

1. Each vote creates a new **block**.
2. Block contains:
   - Voter ID (anonymized)
   - Vote choice
   - Timestamp
   - Hash of previous block
3. Blocks are **chained and verified**.
4. Entire chain is synced via Gun.js to all peers.
5. Peers can validate chain integrity independently.

---

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/ballotblock.git
cd ballotblock

# Install dependencies
npm install

# Create .env with your Firebase + Face++ keys
touch .env

# Start the dev server
npm run dev
```

---

## 📂 Project Structure

```
ballotblock/
├── public/                # Static files
├── src/
│   ├── components/        # React components (Login, RegisterFace, Vote, etc.)
│   ├── firebase.js        # Firebase config
│   ├── gun/               # Gun.js instance & logic
│   ├── App.jsx
│   ├── index.jsx
├── .env                   # API keys
├── package.json
└── README.md
```

---

## 💡 Future Improvements

- [ ] Voter ID card scanner as an extra verification step
- [ ] Fully decentralized offline P2P mesh voting
- [ ] PDF vote receipt generation
- [ ] Admin analytics dashboard
- [ ] Encrypted facial image storage or disposal policy

---

## 🧠 Lessons Learned

- The need for decentralized systems in civic applications.
- Building a blockchain system from scratch.
- Challenges of syncing state across browsers.
- Integrating client-side camera APIs and biometrics.
- Managing real-world authentication systems.

---

## 📊 The Impact

| Metric                          | Potential Outcome                 |
|---------------------------------|-----------------------------------|
| Voter Fraud                     | 🚫 Reduced                        |
| Transparency                    | ✅ Increased                      |
| Accessibility                   | 🌍 Global voting possible         |
| Cost (infra/personnel)          | ⬇️ Decreased                     |
| Trust in democratic process     | 💬 Significantly improved         |
| Learning for developers         | 🧠 Hands-on Blockchain & P2P      |

---

## 🤝 Contributing

We welcome contributions to improve BallotBlock!

```bash
# Fork → Code → PR
git checkout -b feature/your-feature
git commit -m "Add amazing feature"
git push origin feature/your-feature
```

Open a pull request and let's build secure voting together!

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute with credit.

---

## 👨‍💻 Author

**Kartikeya Sharma**  
📍 B.Tech Computer Engineering, NMIMS Navi Mumbai  
🌐 [LinkedIn](https://linkedin.com/in/your-link) | 💬 [GitHub](https://github.com/your-username)

> “Secure voting is the backbone of true democracy. BallotBlock aims to make it fair, global, and future-ready.”
