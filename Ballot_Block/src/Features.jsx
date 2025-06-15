import React from "react";
import "./Features.css";
import { CheckCircle, ShieldCheck, Zap, Globe } from "lucide-react"; 

const featuresData = [
  {
    id: 1,
    title: "OTP",
    subtitle: "Verification",
    icon: <CheckCircle size={35} color="#3b82f6" />,
    details: "Before casting a vote, every voter must enter a unique One-Time Password (OTP) sent to their registered mobile number. This step confirms their identity and ensures that only the real person linked to that phone number is allowed to vote. It prevents duplicate or fake votes.",
  },
  {
    id: 2,
    title: "Immutable",
    subtitle: "Ledger",
    icon: <ShieldCheck size={35} color="#3b82f6" />,
    details: "Once a vote is submitted, it’s stored on a special kind of digital record called a blockchain. This record can’t be changed, deleted, or tampered with by anyone — not even the system creators. It guarantees that every vote is safe and forever secure.",
  },
  {
    id: 3,
    title: "Fast",
    subtitle: "Ledger Dates",
    icon: <Zap size={35} color="#3b82f6" />,
    details: "As soon as you vote, the exact date and time are saved along with it on the blockchain. This ensures all actions are instant, trackable, and no one can delay or backdate any vote. It brings speed and accuracy to the entire voting process.",
  },
  {
    id: 4,
    title: "Public",
    subtitle: "Tracking",
    icon: <Globe size={35} color="#3b82f6" />,
    details: "The full voting history is stored on a public blockchain — like a digital ledger that anyone can check. While personal details remain private, anyone can verify that votes were counted fairly, with no hidden changes. This brings full transparency and trust to the election.",
  },
];

const Features = () => {
  return (
    <section className="features-section" id="features">
      <h2>Features</h2>
      <div className="features-grid">
  {featuresData.map((feature) => (
    <div key={feature.id} className="feature-card">
      <div className="feature-icon">{feature.icon}</div>
      <div className="feature-text">
        <h3>{feature.title}</h3>
        <p>{feature.subtitle}</p>
        <div className="feature-details">
          <p>{feature.details}</p>
        </div>
      </div>
    </div>
  ))}
</div>
    </section>
  );
};

export default Features;