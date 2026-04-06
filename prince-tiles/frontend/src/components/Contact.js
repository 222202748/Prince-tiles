import { useState, useRef } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', area: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const validators = {
    name:  v => v.trim().length < 2 ? 'Please enter your full name.' : '',
    phone: v => !/^[\+]?[\d\s\-]{8,15}$/.test(v.trim()) ? 'Please enter a valid phone number.' : '',
    email: v => v.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Please enter a valid email address.' : '',
  };

  const validate = () => {
    const e = {};
    Object.entries(validators).forEach(([k, fn]) => { const err = fn(form[k]); if (err) e[k] = err; });
    return e;
  };

  const handleBlur = (field) => {
    if (validators[field]) {
      const err = validators[field](form[field]);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const { name, phone, email, service, area, message } = form;
    const whatsappNumber = '917338770355';
    let msg = `Hello, I'd like to request a free quote.\n\n*Name:* ${name}\n*Phone:* ${phone}`;
    if (email)   msg += `\n*Email:* ${email}`;
    if (service) msg += `\n*Service:* ${service}`;
    if (area)    msg += `\n*Area (sq.ft):* ${area}`;
    if (message) msg += `\n*Details:* ${message}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');

    setSubmitting(true);
    setTimeout(() => setSuccess(true), 500);
    setTimeout(() => {
      setForm({ name: '', phone: '', email: '', service: '', area: '', message: '' });
      setErrors({});
      setSubmitting(false);
      setSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">Start Your <em>Project</em></h2>
          <p className="section-desc">Get a free consultation and quote within 24 hours. We serve all areas across Chennai.</p>
        </div>

        <div className="contact-inner">
          <div className="contact-info" data-reveal>
            <div className="contact-card">
              <i className="fas fa-map-marker-alt" />
              <div>
                <h4>Visit Our Showroom</h4>
                <p>Kundrathur, No 1/729, Sriperumbudur Main Road, Kalattipet, Sirukalathur, Tamil Nadu 600069</p>
                <a href="https://maps.google.com/?cid=14612575471826842402" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', marginTop: '5px', display: 'inline-block' }}>
                  Get Directions <i className="fas fa-arrow-right" />
                </a>
              </div>
            </div>
            <div className="contact-card">
              <i className="fas fa-phone-alt" />
              <div>
                <h4>Call Us Anytime</h4>
                <p><a href="tel:+917338770355">+91 73387 70355</a></p>
              </div>
            </div>
            <div className="contact-card">
              <i className="fas fa-envelope" />
              <div>
                <h4>Email Us</h4>
                <p><a href="mailto:info@princetiles.in">info@princetiles.in</a></p>
              </div>
            </div>
            <div className="contact-card">
              <i className="fas fa-clock" />
              <div>
                <h4>Working Hours</h4>
                <p>Mon – Sat: 10:00 AM – 8:00 PM</p>
                <p>Sun: 10:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap" data-reveal>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.68288!2d80.0641783!3d12.9868288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b4c7c2682cd%3A0xcaca4bf88bd33322!2sPrince%20Tiles!5e0!3m2!1sen!2sin!4v1712061600000!5m2!1sen!2sin"
              width="600" height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Prince Tiles Map"
            />
            <form className="contact-form" id="contactForm" ref={formRef} onSubmit={handleSubmit} noValidate>
              <h3>Request a Free Quote</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text" id="name" name="name" placeholder="Your full name" required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    autoComplete="name"
                    style={errors.name ? { borderColor: '#e74c3c' } : form.name ? { borderColor: 'var(--gold)' } : {}}
                  />
                  <span className="form-error" id="nameError">{errors.name || ''}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onBlur={() => handleBlur('phone')}
                    autoComplete="tel"
                    style={errors.phone ? { borderColor: '#e74c3c' } : form.phone ? { borderColor: 'var(--gold)' } : {}}
                  />
                  <span className="form-error" id="phoneError">{errors.phone || ''}</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email" id="email" name="email" placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  autoComplete="email"
                  style={errors.email ? { borderColor: '#e74c3c' } : form.email ? { borderColor: 'var(--gold)' } : {}}
                />
                <span className="form-error" id="emailError">{errors.email || ''}</span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select id="service" name="service" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service</option>
                    <option value="supply">Tile Supply</option>
                    <option value="renovation">Area Measurement</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="area">Project Area (sq.ft)</label>
                  <input
                    type="number" id="area" name="area" placeholder="e.g. 500"
                    value={form.area}
                    onChange={e => setForm({ ...form, area: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message" name="message" placeholder="Tell us about your project..." rows="4"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-submit" id="submitBtn" disabled={submitting}>
                <span id="btnText">{submitting ? 'Redirecting...' : 'Send Request'}</span>
                <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} id="btnIcon" />
              </button>
              {success && (
                <div className="form-success show" id="formSuccess">
                  <i className="fas fa-check-circle" />
                  <span>Thank you! We'll contact you within 24 hours.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
