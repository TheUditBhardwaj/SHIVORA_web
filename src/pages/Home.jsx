import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Leaf, Stethoscope, Droplet, Activity,
  ArrowRight, CheckCircle2, Zap, Globe, Users, Award
} from 'lucide-react';
import Hero from '../components/Hero';
import networkImg from '../assets/global_network.jpg';
import qualityImg from '../assets/quality_assurance.jpg';
import partnerImg from '../assets/partnership_handshake.jpg';
import useScrollReveal from '../hooks/useScrollReveal';
import './Home.css';

const Home = () => {
  useScrollReveal();

  const segments = [
    { title: "Allopathic", icon: <Stethoscope size={32} />, desc: "Diverse range of quality-focused allopathic healthcare products — tablets, capsules, syrups, injections & more.", color: "blue" },
    { title: "Ayurvedic & Herbal", icon: <Leaf size={32} />, desc: "Traditional wellness formulations, churnas, herbal extracts, and proprietary Ayurvedic products.", color: "green" },
    { title: "Veterinary", icon: <ShieldCheck size={32} />, desc: "Animal healthcare — veterinary bolus, injections, powders, oral liquids & feed supplements.", color: "purple" },
    { title: "Food & Natural", icon: <Droplet size={32} />, desc: "Food-grade powders, plant-based ingredients, health mixes, superfoods & natural extracts.", color: "gold" },
    { title: "Nutraceuticals", icon: <Activity size={32} />, desc: "Vitamins, minerals, protein supplements, botanicals & general wellness nutrition products.", color: "teal" },
  ];

  const stats = [
    { num: "5+", label: "Product Segments", icon: <Zap size={24} /> },
    { num: "Pan India", label: "Distribution Reach", icon: <Globe size={24} /> },
    { num: "B2B", label: "Focused Trading Model", icon: <Users size={24} /> },
    { num: "100%", label: "Quality Commitment", icon: <Award size={24} /> },
  ];

  const steps = [
    { step: "01", title: "Share Your Requirement", desc: "Tell us what you need — product type, quantity, target market, and timeline." },
    { step: "02", title: "We Source & Match", desc: "We identify verified manufacturers and match your requirements with optimal supply." },
    { step: "03", title: "Quote & Agreement", desc: "Receive competitive pricing and transparent commercial terms." },
    { step: "04", title: "Reliable Delivery", desc: "We manage logistics and ensure timely, quality-compliant delivery to your location." },
  ];

  const markets = [
    "Pharmaceutical & Healthcare Businesses",
    "Ayurvedic & Herbal Product Companies",
    "Veterinary & Animal Health Suppliers",
    "Food & Nutrition Manufacturers",
    "Nutraceutical & Wellness Brands",
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* ── Stats Strip ────────────────────────────────── */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Segments ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Our Product Segments</h2>
            <p className="section-subtitle">
              Comprehensive healthcare and wellness trading solutions across five major categories.
            </p>
          </div>
          <div className="segments-grid">
            {segments.map((seg, i) => (
              <div className={`seg-card reveal seg-card--${seg.color}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="seg-icon">{seg.icon}</div>
                <h3>{seg.title}</h3>
                <p>{seg.desc}</p>
                <Link to="/products" className="seg-link">
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────── */}
      <section className="section how-section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label accent">Our Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              A simple, transparent, four-step process to get you from requirement to delivery.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Strip ──────────────────────────────── */}
      <section className="section quality-section">
        <div className="container">
          <div className="quality-grid">
            <div className="quality-img-col reveal-left">
              <div className="quality-img-frame">
                <img src={qualityImg} alt="Quality assurance" />
              </div>
            </div>
            <div className="quality-text-col reveal-right">
              <span className="section-label">Quality & Compliance</span>
              <h2 className="section-title">Sourcing You Can Trust</h2>
              <p className="section-subtitle" style={{ maxWidth: '100%' }}>
                We partner only with verified manufacturers who adhere to GMP standards and regulatory requirements. 
                Every product we source goes through thorough qualification to meet quality benchmarks.
              </p>
              <ul className="quality-checks">
                {["GMP-compliant manufacturer network", "Regulatory documentation support", "Batch traceability & quality records", "Consistent supply with no compromises"].map((c, i) => (
                  <li key={i}><CheckCircle2 size={20} /><span>{c}</span></li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Enquire Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Markets ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="markets-grid">
            <div className="markets-img-col reveal-left">
              <div className="markets-img-frame">
                <img src={networkImg} alt="Global Distribution Network" />
                <div className="markets-img-overlay">
                  <span>Pan India Distribution</span>
                </div>
              </div>
            </div>
            <div className="markets-text-col reveal-right">
              <span className="section-label">Who We Serve</span>
              <h2 className="section-title">Markets We Serve</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                We work with businesses of all scales — from emerging startups to established institutional buyers — across diverse healthcare and wellness markets.
              </p>
              <ul className="markets-list">
                {markets.map((m, i) => (
                  <li key={i} className="markets-item reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                    <CheckCircle2 size={20} className="markets-icon" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2.5rem' }}>
                Partner With Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="section cta-section reveal">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <div className="cta-glow"></div>
              <span className="section-label" style={{ marginBottom: '1.5rem' }}>Ready to Start?</span>
              <h2 className="cta-title">Let's Build a Partnership That Grows</h2>
              <p className="cta-sub">
                Whether you need a product quote, manufacturing partnership, or bulk enquiry — 
                our team is ready to help you within 24 hours.
              </p>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary" id="cta-banner-btn">
                  Send an Enquiry <ArrowRight size={18} />
                </Link>
                <Link to="/products" className="btn btn-secondary cta-secondary">
                  Browse Products
                </Link>
              </div>
            </div>
            <div className="cta-img reveal-right">
              <img src={partnerImg} alt="Business partnership" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
