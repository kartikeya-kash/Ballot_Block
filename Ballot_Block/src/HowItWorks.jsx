import React from "react";
import "./HowItWorks.css";
import { Smartphone, ScanFace, Pin, BarChart3 } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Register",
    subtitle: "with Phone",
    icon: <Smartphone size={35} color="#3b82f6" />,
  },
  {
    id: 2,
    title: "Scan",
    subtitle: "Face webcam",
    icon: <ScanFace size={35} color="#3b82f6" />,
  },
  {
    id: 3,
    title: "Cast",
    subtitle: "One-Time Vote",
    icon: <Pin size={35} color="#3b82f6" />,
  },
  {
    id: 4,
    title: "View",
    subtitle: "Immutable",
    icon: <BarChart3 size={35} color="#3b82f6" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="howitworks-section">
      <h2>How It Works</h2>
      <div className="howitworks-grid">
        {steps.map((step) => (
          <div key={step.id} className="howitworks-card">
            <div className="howitworks-icon">{step.icon}</div>
            <div className="howitworks-text">
              <h3>{step.title}</h3>
              <p>{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;