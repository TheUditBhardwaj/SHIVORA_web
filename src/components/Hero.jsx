import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImg from '../assets/hero_pharma.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Animated Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="container hero-inner">

        {/* Left: Text */}
        <div className="hero-text">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Trusted Healthcare Trading Partner</span>
          </div>

          <h1 className="hero-title">
            Bridging Quality
            <span className="hero-title-accent"> Healthcare</span>
            <br />with Global Markets
          </h1>

          <p className="hero-subtitle">
            We connect manufacturers with institutional buyers across Pharma, Ayurveda, 
            Veterinary, Food & Nutraceutical segments — reliably, efficiently, and at scale.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary" id="hero-cta-primary">
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <Link to="/products" className="btn btn-secondary" id="hero-cta-secondary">
              Explore Products
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-num">5+</span>
              <span className="trust-label">Segments Served</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-num">Pan India</span>
              <span className="trust-label">Distribution Network</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-num">B2B</span>
              <span className="trust-label">Focused Trading</span>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hero-visual">
          <div className="hero-img-frame">
            <img src={heroImg} alt="Premium healthcare wellness products" className="hero-img" />

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
