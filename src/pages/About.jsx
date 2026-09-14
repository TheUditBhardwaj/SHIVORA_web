import { useEffect } from 'react';
import { Target, Lightbulb, Users, Star, TrendingUp } from 'lucide-react';
import aboutImg from '../assets/about_wellness.jpg';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  useScrollReveal();

  const values = [
    { icon: <Star size={24} />, title: "Reliability", desc: "We deliver on our commitments — every time." },
    { icon: <TrendingUp size={24} />, title: "Growth", desc: "We build partnerships that scale with your business." },
    { icon: <Users size={24} />, title: "Collaboration", desc: "We work closely with manufacturers and buyers alike." },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={{ background: 'rgba(16,185,129,0.2)', borderColor: 'rgba(16,185,129,0.3)', marginBottom: '1.5rem' }}>About Us</span>
          <h1>Built on Trust &<br />Quality Partnerships</h1>
          <p>Learn how SHIVORA PHARMA bridges manufacturers and buyers across India's healthcare landscape.</p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="section" style={{ paddingTop: '7rem' }}>
        <div className="container">
          <div className="about-layout">
            <div className="about-img-col reveal-left">
              <div className="about-img-frame">
                <img src={aboutImg} alt="Modern Wellness Laboratory" />
                <div className="about-img-tag">
                  <div className="badge-dot"></div>
                  Quality Research & Sourcing
                </div>
              </div>
            </div>
            <div className="about-text-col reveal-right">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Your Trusted Trading Partner in Healthcare</h2>
              <div className="divider"></div>
              <p className="about-lead">
                We are a trading and sourcing company engaged in healthcare, Ayurvedic, veterinary, food supplement and nutraceutical product segments.
              </p>
              <p className="about-body">
                Our objective is to connect dependable manufacturing capabilities with growing market requirements through efficient sourcing, commercial partnerships and reliable supply. We strive to be the bridge between high-quality production and the healthcare needs of diverse populations.
              </p>
              <p className="about-body">
                We believe that access to quality healthcare products starts with a trustworthy supply chain — and that's exactly what we build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Mission & Vision</h2>
          </div>
          <div className="mv-grid">
            <div className="mv-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="mv-icon mission-icon"><Target size={36} /></div>
              <h3>Our Mission</h3>
              <p>To provide customers with dependable sourcing solutions while creating sustainable business opportunities for manufacturers and distribution partners.</p>
            </div>
            <div className="mv-card reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="mv-icon vision-icon"><Lightbulb size={36} /></div>
              <h3>Our Vision</h3>
              <p>To build a trusted and professionally managed trading network across healthcare, nutrition and wellness categories — becoming India's most reliable B2B trading partner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label accent">Core Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
