import { useState } from 'react';
import './EnquiryForm.css';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    enquiryType: 'Request a Quote',
    message: ''
  });

  const enquiryTypes = [
    'Request a Quote',
    'Bulk Product Enquiry',
    'Private Label Enquiry',
    'Manufacturer Partnership',
    'Send Your Requirement'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    alert('Thank you for your enquiry. We will get back to you shortly!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      enquiryType: 'Request a Quote',
      message: ''
    });
  };

  return (
    <div className="enquiry-form-wrapper">
      <form className="enquiry-form" onSubmit={handleSubmit}>
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
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="company">Company</label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              className="form-control"
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="phone">Phone / WhatsApp</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message / Requirement Details</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            required
            className="form-control"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100 submit-btn">
          Submit Enquiry
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
