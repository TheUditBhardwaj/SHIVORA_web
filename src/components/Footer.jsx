import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <img src={logoImg} alt="SHIVORA PHARMA" className="footer-logo-img" />
            <span>SHIVORA PHARMA</span>
          </Link>
          <p className="footer-desc">
            Your trusted trading and distribution partner for Healthcare, Wellness & Nutrition Products.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Product Segments</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <Phone size={18} />
              <span>+91 9193831232 <br/> +91 9286581969 <br/> +91 7669268440</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@shivorapharma.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shivora Pharma. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
