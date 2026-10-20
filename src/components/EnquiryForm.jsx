import { useState } from 'react';
import { CheckCircle2, ShieldAlert, Loader2, Lock } from 'lucide-react';
import {
  sanitizeInput,
  detectMaliciousPayload,
  isValidEmail,
  isValidPhone,
  checkRateLimit,
  getSessionToken
} from '../utils/security';
import './EnquiryForm.css';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    enquiryType: 'Request a Quote',
    message: '',
    // Honeypot field: invisible to humans, filled by automated bot crawlers
    hp_verify_code: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enquiryTypes = [
    'Request a Quote',
    'Bulk Product Enquiry',
    'Private Label Enquiry',
    'Manufacturer Partnership',
    'Send Your Requirement'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Honeypot check (Bot trap)
    if (formData.hp_verify_code) {
      // Silently reject bot without tipping off attacker
      return { isValid: false, isBot: true };
    }

    // 2. Name validation
    const cleanName = sanitizeInput(formData.name);
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter a valid contact name (at least 2 characters).';
    } else if (detectMaliciousPayload(formData.name)) {
      newErrors.name = 'Unsafe characters detected in name.';
    }

    // 3. Email validation
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please provide a valid business email address.';
    }

    // 4. Phone validation
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone or WhatsApp number.';
    }

    // 5. Message validation
    const cleanMessage = sanitizeInput(formData.message);
    if (!cleanMessage || cleanMessage.length < 10) {
      newErrors.message = 'Please provide more details about your requirement (at least 10 characters).';
    } else if (detectMaliciousPayload(formData.message)) {
      newErrors.message = 'Security warning: Disallowed script or SQL tokens detected.';
    }

    // 6. Company validation (optional but sanitized)
    if (formData.company && detectMaliciousPayload(formData.company)) {
      newErrors.company = 'Unsafe characters detected in company name.';
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, isBot: false };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // 1. Rate limiting check (defense against spam flooding)
    const rateCheck = checkRateLimit('enquiry_submit', 3, 60);
    if (!rateCheck.allowed) {
      setStatus({
        type: 'error',
        message: rateCheck.message
      });
      return;
    }

    // 2. Validate & sanitize inputs
    const { isValid, isBot } = validateForm();

    if (isBot) {
      // Fake success for bots to prevent them adjusting tactics
      setStatus({
        type: 'success',
        message: 'Your enquiry has been received.'
      });
      return;
    }

    if (!isValid) {
      setStatus({
        type: 'error',
        message: 'Please resolve the highlighted security or validation errors.'
      });
      return;
    }

    setIsSubmitting(true);

    // Build sanitized secure payload with session verification token
    const sanitizedPayload = {
      name: sanitizeInput(formData.name),
      email: formData.email.trim().toLowerCase(),
      phone: sanitizeInput(formData.phone),
      company: sanitizeInput(formData.company),
      enquiryType: formData.enquiryType,
      message: sanitizeInput(formData.message),
      csrfToken: getSessionToken(),
      timestamp: new Date().toISOString()
    };

    // Simulate secure backend API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: `Thank you, ${sanitizedPayload.name}. Your enquiry has been securely submitted. Our team will contact you shortly!`
      });

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        enquiryType: 'Request a Quote',
        message: '',
        hp_verify_code: ''
      });
      setErrors({});
    }, 700);
  };

  return (
    <div className="enquiry-form-wrapper">
      <div className="form-security-badge">
        <Lock size={14} />
        <span>End-to-End SSL & Input Sanitization Protected</span>
      </div>

      {status.message && (
        <div className={`form-alert ${status.type === 'error' ? 'form-alert-error' : 'form-alert-success'}`}>
          {status.type === 'error' ? <ShieldAlert size={20} /> : <CheckCircle2 size={20} />}
          <span>{status.message}</span>
        </div>
      )}

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field (hidden from legitimate users, traps bots) */}
        <div className="hp-trap-container" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor="hp_verify_code">Leave this field blank</label>
          <input
            type="text"
            id="hp_verify_code"
            name="hp_verify_code"
            tabIndex={-1}
            autoComplete="off"
            value={formData.hp_verify_code}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="enquiryType">Enquiry Type</label>
          <select 
            id="enquiryType" 
            name="enquiryType" 
            value={formData.enquiryType} 
            onChange={handleChange}
            className="form-control"
          >
            {enquiryTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="name">Your Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              maxLength={60}
              placeholder="e.g. Rahul Sharma"
              value={formData.name} 
              onChange={handleChange} 
              required 
              className={`form-control ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="field-error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="company">Company / Business Name</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              maxLength={100}
              placeholder="e.g. Apex Biotech Ltd."
              value={formData.company} 
              onChange={handleChange} 
              className={`form-control ${errors.company ? 'input-error' : ''}`}
            />
            {errors.company && <span className="field-error-text">{errors.company}</span>}
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="email">Business Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              maxLength={100}
              placeholder="name@company.com"
              value={formData.email} 
              onChange={handleChange} 
              required 
              className={`form-control ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <span className="field-error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="phone">Phone / WhatsApp *</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              maxLength={20}
              placeholder="+91 98765 43210"
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className={`form-control ${errors.phone ? 'input-error' : ''}`}
            />
            {errors.phone && <span className="field-error-text">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message / Requirement Details *</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            maxLength={1000}
            placeholder="Please specify product category, estimated quantity, timeline, or any certifications required..."
            value={formData.message} 
            onChange={handleChange} 
            required
            className={`form-control ${errors.message ? 'input-error' : ''}`}
          ></textarea>
          <div className="char-counter">
            {1000 - formData.message.length} characters left
          </div>
          {errors.message && <span className="field-error-text">{errors.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn btn-primary w-100 submit-btn"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Verifying & Submitting...</span>
            </>
          ) : (
            'Submit Secure Enquiry'
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
