// src/Passion.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote, Activity, Compass, Fingerprint } from 'lucide-react';
import { passionsData } from './data';

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

export default function Passion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passion = passionsData.find(p => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!passion) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Link to="/">Retour</Link></div>;

  const ease = [0.16, 1, 0.3, 1];

  return (
    <motion.div initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#0F172A' }}>
      <PageTransitions />
      <div className="tech-grid" />

      {/* NAV FLOTTANTE */}
      <div style={{ position: 'fixed', top: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 50 }}>
        <nav style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderRadius: '50px', padding: '12px 36px', display: 'flex', gap: '36px', alignItems: 'center', border: '1px solid #E2E8F0' }}>
          <Magnetic><div style={{ fontSize: '1.3rem', fontWeight: '900', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }} onClick={() => navigate('/')}>SF.</div></Magnetic>
          <Magnetic strength={0.3}>
            <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', cursor: 'pointer', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              <ArrowLeft size={18} /> Retour
            </div>
          </Magnetic>
        </nav>
      </div>

      {/* HEADER */}
      <header style={{ paddingTop: '150px', paddingBottom: '60px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#0F172A', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} style={{ marginBottom: '20px' }}>
            <span className="mono" style={{ backgroundColor: passion.color, color: '#fff', padding: '6px 12px', borderRadius: '30px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {passion.subtitle}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: '700', letterSpacing: '-2px', margin: '0 0 30px 0', lineHeight: '1.05', fontFamily: '"Space Grotesk", sans-serif' }}>
            {passion.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} style={{ fontSize: '1.4rem', color: '#94A3B8', lineHeight: '1.6', margin: '0 auto', maxWidth: '800px' }}>
            {passion.intro}
          </motion.p>
        </div>
      </header>

      {/* IMAGE HERO */}
      <div style={{ width: '100%', height: '50vh', backgroundImage: `url(${passion.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid #E2E8F0' }} />

      {/* CONTENU PRINCIPAL */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Citation */}
          <div style={{ borderLeft: `4px solid ${passion.color}`, paddingLeft: '30px', marginBottom: '80px' }}>
            <Quote size={32} color={passion.color} style={{ marginBottom: '15px' }} />
            <p style={{ fontSize: '2rem', fontWeight: '300', fontStyle: 'italic', color: '#0F172A', lineHeight: '1.4', margin: 0 }}>
              "{passion.quote}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginBottom: '80px' }}>
            {/* Genèse */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Compass color={passion.color} /> La Genèse</h3>
              <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.1rem' }}>{passion.genesis}</p>
            </div>
            {/* Méthodologie */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Activity color={passion.color} /> La Méthodologie</h3>
              <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.1rem' }}>{passion.methodology}</p>
            </div>
          </div>

          {/* Metrics Data-Viz */}
          <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '50px', borderRadius: '12px', marginBottom: '80px' }}>
            <h4 className="mono" style={{ color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px', textAlign: 'center' }}>Métriques & Optimisations</h4>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px' }}>
              {passion.metrics.map((metric, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '700', color: passion.color, fontFamily: '"Space Grotesk", sans-serif', lineHeight: 1, marginBottom: '10px' }}>
                    {metric.value}
                  </div>
                  <div className="mono" style={{ color: '#475569', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bridge : Le lien avec l'ingénierie */}
          <div style={{ backgroundColor: '#0F172A', color: '#fff', padding: '50px', borderRadius: '12px', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <Fingerprint size={48} color={passion.color} style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>L'impact sur mon profil d'ingénieur</h3>
              <p style={{ color: '#CBD5E1', lineHeight: '1.8', fontSize: '1.1rem', margin: 0 }}>
                {passion.bridge}
              </p>
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}