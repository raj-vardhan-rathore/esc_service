import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const photos = {
  hero: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1800&q=90',
  pool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85',
  room: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85',
  massage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=85',
  model1: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85',
  model2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
  model3: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85',
};

const treatments = [
  { name: 'Signature Balinese Massage', detail: 'A flowing full-body ritual to release tension and restore balance.', time: '60 / 90 min', price: '₱1,800', tag: 'MOST LOVED' },
  { name: 'Aromatherapy Escape', detail: 'A calming massage with a bespoke blend of essential oils.', time: '60 min', price: '₱2,000', tag: 'RELAX' },
  { name: 'Tropical Body Polish', detail: 'A gentle exfoliating ritual for soft, luminous skin.', time: '45 min', price: '₱1,500', tag: 'RENEW' },
  { name: 'Warm Stone Therapy', detail: 'Heated stones and slow massage techniques melt away tension.', time: '90 min', price: '₱2,800', tag: 'SIGNATURE' },
];

const therapists = [
  { name: 'Isabella', role: 'Senior Wellness Therapist', years: '7 years experience', image: photos.model1, specialty: 'Balinese · Aromatherapy' },
  { name: 'Amara', role: 'Wellness Therapist', years: '5 years experience', image: photos.model2, specialty: 'Relaxation · Body Polish' },
  { name: 'Sofia', role: 'Senior Wellness Therapist', years: '8 years experience', image: photos.model3, specialty: 'Deep Tissue · Hot Stone' },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useReveal();
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: treatments[0].name, date: '', time: '11:00 AM' });

  const openBooking = () => { setBooking(true); setSent(false); };
  const closeBooking = () => setBooking(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return <div className="site">
    <div className="announcement">A LITTLE SPACE TO BREATHE · MANILA, PHILIPPINES</div>
    <header className="header">
      <a className="brand" href="#top"><span className="brand-mark">S</span><span>SOLARA<small>SPA & WELLNESS</small></span></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? '×' : '☰'}</button>
      <nav className={menu ? 'nav open' : 'nav'}>
        <a href="#experience" onClick={() => setMenu(false)}>Experience</a>
        <a href="#treatments" onClick={() => setMenu(false)}>Treatments</a>
        <a href="#therapists" onClick={() => setMenu(false)}>Our therapists</a>
        <a href="#contact" onClick={() => setMenu(false)}>Find us</a>
        <button className="nav-book" onClick={openBooking}>Book a visit <span>↗</span></button>
      </nav>
    </header>

    <main id="top">
      <section className="hero">
        <img className="hero-image" src={photos.hero} alt="Tropical luxury resort pool" />
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="eyebrow light">THE ART OF SLOWING DOWN</p>
          <h1>Come back<br/><em>to yourself.</em></h1>
          <p className="hero-copy">A private sanctuary for stillness, beauty and renewal. Let the outside world wait a little longer.</p>
          <button className="gold-button" onClick={openBooking}>Discover your escape <span>↗</span></button>
        </div>
        <div className="hero-bottom"><span>01 — 04</span><span>SCROLL TO UNWIND ↓</span><span>EST. 2024</span></div>
        <div className="hero-note">YOUR MOMENT<br/>BEGINS HERE</div>
      </section>

      <section className="intro section" id="experience">
        <div className="intro-left reveal"><p className="eyebrow">A SENSE OF SERENITY</p><h2>More than a treatment.<br/><em>A feeling that stays.</em></h2></div>
        <div className="intro-right reveal"><p>Thoughtfully curated rituals, soothing spaces and attentive hands. At Solara, every detail is designed to help you pause, reset and feel beautifully restored.</p><a className="text-link" href="#treatments">EXPLORE THE EXPERIENCE <span>↗</span></a></div>
      </section>

      <section className="feature">
        <div className="feature-photo reveal"><img src={photos.room} alt="Peaceful spa interior" /></div>
        <div className="feature-copy reveal"><p className="eyebrow">THE SOLARA RITUAL</p><h2>Leave the noise.<br/><em>Find your quiet.</em></h2><p>From the first breath to the final touch, our rituals invite you to settle into the present. Natural textures, gentle aromas and expert care make space for deep relaxation.</p><button className="outline-button" onClick={openBooking}>Plan your visit <span>↗</span></button></div>
      </section>

      <section className="treatments section" id="treatments">
        <div className="section-heading reveal"><div><p className="eyebrow">MADE FOR YOUR MOMENT</p><h2>Rituals & <em>treatments</em></h2></div><p>Choose a moment that feels right.<br/>Stay a little longer if you wish.</p></div>
        <div className="treatment-list">
          {treatments.map((t, i) => <article className="treatment-row reveal" key={t.name}>
            <span className="treatment-number">0{i+1}</span><div className="treatment-info"><span className="tag">{t.tag}</span><h3>{t.name}</h3><p>{t.detail}</p></div><span className="treatment-time">{t.time}</span><strong className="price">{t.price}</strong><button className="round-arrow" onClick={() => { setForm({...form, service:t.name}); openBooking(); }}>↗</button>
          </article>)}
        </div>
        <p className="price-note">Prices are sample demo rates in Philippine pesos (PHP). Final rates and services should be confirmed by the spa.</p>
      </section>

      <section className="therapists section" id="therapists">
        <div className="section-heading reveal"><div><p className="eyebrow">CARING HANDS, THOUGHTFUL HEARTS</p><h2>Meet your <em>therapists</em></h2></div><p>Skilled professionals dedicated<br/>to your comfort and wellbeing.</p></div>
        <div className="therapist-grid">
          {therapists.map((person, i) => <article className="therapist-card reveal" key={person.name}>
            <div className="therapist-image"><img src={person.image} alt={`${person.name}, wellness therapist`} /><span className="image-index">0{i+1}</span></div>
            <div className="therapist-meta"><div><h3>{person.name}</h3><p>{person.role}</p></div><button className="round-arrow" onClick={openBooking}>↗</button></div>
            <div className="therapist-specialty">{person.specialty} <span>·</span> {person.years}</div>
          </article>)}
        </div>
        <p className="price-note">Demo profile images and names. Replace with approved photographs, real staff details and written model releases before publishing.</p>
      </section>

      <section className="quote-band">
        <img src={photos.pool} alt="Tropical pool surrounded by greenery" />
        <div className="quote-overlay"></div><div className="quote-content reveal"><p className="eyebrow light">A MOMENT JUST FOR YOU</p><h2>Let calm find<br/><em>its way in.</em></h2><button className="gold-button" onClick={openBooking}>Reserve your ritual <span>↗</span></button></div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-main reveal"><p className="eyebrow">YOUR SANCTUARY AWAITS</p><h2>Make room for<br/><em>feeling good.</em></h2><button className="gold-button dark" onClick={openBooking}>Book an appointment <span>↗</span></button></div>
        <div className="contact-details reveal"><div><span className="eyebrow">VISIT</span><p>Manila, Philippines<br/>Exact address coming soon</p></div><div><span className="eyebrow">HOURS</span><p>Daily · 10:00 AM – 10:00 PM</p></div><div><span className="eyebrow">GET IN TOUCH</span><p>hello@solaraspademo.com<br/>+63 900 000 0000</p></div></div>
      </section>
    </main>

    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">S</span><span>SOLARA<small>SPA & WELLNESS</small></span></a><span>© 2026 SOLARA SPA. DEMO CONCEPT.</span><a href="#top">BACK TO TOP ↑</a></footer>
    <button className="mobile-book" onClick={openBooking}>BOOK YOUR ESCAPE <span>↗</span></button>

    {booking && <div className="modal-backdrop" onMouseDown={e => { if(e.target === e.currentTarget) closeBooking(); }}>
      <div className="booking-modal">
        <button className="modal-close" onClick={closeBooking}>×</button>
        {!sent ? <><p className="eyebrow">YOUR TIME, YOUR RITUAL</p><h2>Request a <em>booking.</em></h2><p className="modal-sub">Send an appointment request and our team will confirm availability.</p>
          <form onSubmit={submit}>
            <label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name"/></label>
            <label>Mobile number<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+63"/></label>
            <label>Choose a treatment<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>{treatments.map(t=><option key={t.name}>{t.name}</option>)}</select></label>
            <div className="form-split"><label>Preferred date<input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Preferred time<select value={form.time} onChange={e=>setForm({...form,time:e.target.value})}>{['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'].map(t=><option key={t}>{t}</option>)}</select></label></div>
            <button className="gold-button dark full" type="submit">Send booking request ↗</button>
          </form><p className="form-note">Demo form only — connect a booking backend or WhatsApp API before going live.</p>
        </> : <div className="success"><div className="success-mark">✓</div><h2>Thank you, <em>{form.name}.</em></h2><p>Your demo request for <strong>{form.service}</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong> has been recorded in this preview.</p><button className="gold-button dark" onClick={closeBooking}>Close</button></div>}
      </div>
    </div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);