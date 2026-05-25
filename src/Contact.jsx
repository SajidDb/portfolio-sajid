// src/Contact.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Copy, CheckCircle2 } from 'lucide-react';

// ICÔNE LINKEDIN PERSONNALISÉE (Remplace celle de lucide-react qui a été supprimée)
const LinkedinIcon = ({ size = 24, color = "currentColor", style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// ==========================================
// 🧲 COMPOSANT : BOUTON MAGNÉTIQUE
// ==========================================
const Magnetic = ({ children, strength = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * strength, y: (clientY - (top + height / 2)) * strength });
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  return <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}>{children}</motion.div>;
};

// ==========================================
// 🎬 TRANSITIONS DE PAGE
// ==========================================
const PageTransitions = () => {
  const columns = 4;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'none', display: 'flex' }}>
      {[...Array(columns)].map((_, i) => (
        <motion.div key={i} initial={{ y: "0%" }} animate={{ y: "-100%" }} exit={{ y: "0%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }} style={{ height: '100%', width: `${100 / columns}%`, backgroundColor: '#0F172A' }} />
      ))}
    </div>
  );
};

export default function Contact() {
  const navigate = useNavigate();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const ease = [0.16, 1, 0.3, 1];
  const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      <PageTransitions />
      <div className="tech-grid" />

      {/* NAV FLOTTANTE */}
      <div style={{ position: 'fixed', top: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 50 }}>
        <nav style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderRadius: '50px', padding: '12px 36px', display: 'flex', gap: '36px', alignItems: 'center', border: '1px solid #E2E8F0', boxShadow: '0 4px 30px rgba(0,0,0,0.06)' }}>
          <Magnetic><div style={{ fontSize: '1.3rem', fontWeight: '900', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }} onClick={() => navigate('/')}>SF.</div></Magnetic>
          <Magnetic strength={0.3}>
            <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', cursor: 'pointer', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace' }}>
              <ArrowLeft size={18} /> Retour à l'accueil
            </div>
          </Magnetic>
        </nav>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '150px 5% 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="mono" style={{ color: '#2563EB', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>// Communication d'entreprise</span>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '700', letterSpacing: '-2px', margin: '0 0 20px 0', lineHeight: '1.1' }}>
              Où me joindre facilement ?
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Je suis activement à la recherche d'une alternance pour l'année 2026/2027. N'hésitez pas à me contacter pour échanger sur vos projets.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            {/* CARTE IDENTITÉ & LOCALISATION */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <MapPin size={32} color="#0F172A" style={{ marginBottom: '20px' }} />
              <h3 className="mono" style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Identité & Localisation</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A', margin: '0 0 10px 0' }}>Sajid Furtado De Barros</p>
              <p style={{ color: '#475569', fontSize: '1.1rem', margin: 0 }}>Amiens, Hauts-de-France</p>
            </motion.div>

            {/* CARTE TÉLÉPHONE */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Phone size={32} color="#10B981" style={{ marginBottom: '20px' }} />
                <h3 className="mono" style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Téléphone direct</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A', margin: '0 0 20px 0' }}>07 82 49 05 45</p>
              </div>
              <button onClick={() => handleCopy('0782490545', 'phone')} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: copiedPhone ? '#10B981' : '#fff', color: copiedPhone ? '#fff' : '#0F172A', border: '1px solid #E2E8F0', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s', width: 'fit-content' }}>
                {copiedPhone ? <><CheckCircle2 size={18} /> Copié !</> : <><Copy size={18} /> Copier le numéro</>}
              </button>
            </motion.div>

            {/* CARTE EMAIL */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Mail size={32} color="#2563EB" style={{ marginBottom: '20px' }} />
                <h3 className="mono" style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Adresse Email</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', margin: '0 0 20px 0', wordBreak: 'break-all' }}>sajiddebarros@gmail.com</p>
              </div>
              <button onClick={() => handleCopy('sajiddebarros@gmail.com', 'email')} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: copiedEmail ? '#2563EB' : '#fff', color: copiedEmail ? '#fff' : '#0F172A', border: '1px solid #E2E8F0', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s', width: 'fit-content' }}>
                {copiedEmail ? <><CheckCircle2 size={18} /> Copié !</> : <><Copy size={18} /> Copier l'adresse</>}
              </button>
            </motion.div>

            {/* CARTE RÉSEAUX SOCIAUX */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#0F172A', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <LinkedinIcon size={32} color="#fff" style={{ marginBottom: '20px' }} />
                <h3 className="mono" style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Réseau Professionnel</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', margin: '0 0 20px 0' }}>LinkedIn</p>
              </div>
              <a href="https://www.linkedin.com/in/sajid-furtado-de-barros-059913383/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#2563EB', color: '#fff', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'background 0.3s', width: 'fit-content' }}>
                Visiter mon profil
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}