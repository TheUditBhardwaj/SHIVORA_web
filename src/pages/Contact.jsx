import { Phone, Mail, Clock } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
  useScrollReveal();

  return (
    <div>
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={{ background: 'rgba(16,185,129,0.2)', borderColor: 'rgba(16,185,129,0.3)', marginBottom: '1.5rem' }}>Contact</span>
          <h1>Let's Start a Conversation</h1>
          <p>Reach out for partnerships, bulk enquiries, quotes, or any other requirements.</p>
        </div>
      </div>

      <div className="container section contact-layout" style={{ paddingTop: '7rem' }}>
        {/* Info Column */}
        <div>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>We'd Love to Hear From You</h2>
          <p className="contact-intro">
            Our team is here to assist you with all your trading, distribution, and manufacturing partnership needs. 
            We typically respond within 24 business hours.
          </p>

          <div className="info-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="info-icon"><Phone size={24} /></div>
            <div className="info-content">
              <h3>Phone & WhatsApp</h3>
              <p>+91 9193831232</p>
              <p>+91 9286581969</p>
              <p>+91 7669268440</p>
            </div>
          </div>

          <div className="info-card reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="info-icon"><Mail size={24} /></div>
            <div className="info-content">
              <h3>Email</h3>
              <p>info@shivorapharma.com</p>
            </div>
          </div>

          <div className="info-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="info-icon"><Clock size={24} /></div>
            <div className="info-content">
              <h3>Business Hours</h3>
              <p>Monday – Saturday: 9:00 AM – 6:30 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact-form-section reveal-right">
          <h2>Send an Enquiry</h2>
          <p>Fill out the form and our team will get back to you promptly.</p>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
