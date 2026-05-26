// src/Home.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Code2, Database, Layout, Mail, Terminal, ChevronDown, PenTool, Box, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData, passionsData } from './data';

// ==========================================
// 🧲 COMPOSANT : BOUTON MAGNÉTIQUE
// ==========================================
const Magnetic = ({ children, strength = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMouse} 
      onMouseLeave={reset} 
      animate={{ x: position.x, y: position.y }} 
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 📸 COMPOSANT : PHOTO INTERACTIVE
// ==========================================
const InteractivePhoto = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate('/profil')} 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
      style={{ perspective: 1200, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: 'clamp(280px, 35vw, 450px)', aspectRatio: '3/4', cursor: 'pointer' }}
    >
      <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />

      <motion.div style={{ width: '100%', height: '100%', rotateX, rotateY, transformStyle: "preserve-3d", zIndex: 1 }}>
        <motion.div 
          whileHover={{ scale: 0.96 }} 
          style={{ width: '100%', height: '100%', borderRadius: '180px', overflow: 'hidden', border: '8px solid #ffffff', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', position: 'relative', transform: 'translateZ(30px)', backgroundColor: '#e5e7eb' }}
        >
          <motion.img 
            src="/sajid.jpg" 
            alt="Sajid Furtado de Barros" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(10%) contrast(1.1)' }} 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 50%)', pointerEvents: 'none' }} />
          
          <div style={{ position: 'absolute', bottom: '30px', left: '0', width: '100%', textAlign: 'center', zIndex: 10 }}>
            <span className="mono" style={{ backgroundColor: '#2563EB', color: '#fff', padding: '8px 16px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px' }}>
              CLIQUEZ POUR VOIR LE PROFIL
            </span>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, -12, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', right: '-15%', transform: 'translateZ(60px)', background: '#fff', padding: '14px 24px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(0,0,0,0.03)' }}
        >
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 12px rgba(34,197,94,0.6)' }} />
          <span style={{ fontWeight: 800, fontSize: '0.9rem', fontFamily: '"Space Grotesk", sans-serif', color: '#0F172A' }}>Alternance 2026</span>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 12, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '20%', left: '-15%', transform: 'translateZ(80px)', background: '#0F172A', color: '#fff', padding: '12px 24px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
        >
          <span style={{ fontWeight: 700, fontSize: '0.8rem', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '1px' }}>{'< FULLSTACK />'}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 🎬 PRELOADER "VAULT SPLIT"
// ==========================================
const Preloader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [scramble, setScramble] = useState('SYS.INIT');
  const [visibleLogs, setVisibleLogs] = useState([]);

  const systemLogs = [
    "INIT KERNEL_SAJID_F...",
    "MOUNTING REACT/NEXT.JS VDOM...",
    "CONNECTING ORACLE_DB / NOSQL...",
    "SECURING STRIPE_API GATEWAY...",
    "LOADING MODULE: BLENDER_3D_MESH...",
    "LOADING MODULE: AERONAUTICS_BIA...",
    "CALIBRATING ENDURANCE_METRICS...",
    "SYSTEM_READY: MIAGE_TARGET_LOCKED"
  ];

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const scrambleInterval = setInterval(() => {
      if (phase === 'loading') {
        let str = "";
        for(let i=0; i<8; i++) str += chars.charAt(Math.floor(Math.random() * chars.length));
        setScramble(str);
      } else {
        setScramble('ACCESS_GRANTED');
      }
    }, 50);
    return () => clearInterval(scrambleInterval);
  }, [phase]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() > 0.7 ? 0 : Math.floor(Math.random() * 8) + 1; 
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setVisibleLogs(systemLogs);
        clearInterval(interval);
        
        setPhase('line'); 
        setTimeout(() => setPhase('opening'), 700); 
        setTimeout(() => setLoading(false), 1800); 
      } else {
        setProgress(current);
        const logsToShow = Math.floor((current / 100) * systemLogs.length);
        setVisibleLogs(systemLogs.slice(0, logsToShow + 1));
      }
    }, 80);
    return () => clearInterval(interval);
  }, [setLoading]);

  const CenterContent = () => (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5, pointerEvents: 'none' }} />
      <motion.div animate={{ y: ['0vh', '100vh'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '10vh', background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.05), transparent)', pointerEvents: 'none' }} />

      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="mono" style={{ color: '#2563EB', fontSize: '1.2rem', letterSpacing: '6px', marginBottom: '10px' }}>{scramble}</div>
            <div style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: '700', color: '#fff', lineHeight: 1, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-4px' }}>
              {progress}<span style={{ color: '#2563EB' }}>%</span>
            </div>
            <div className="mono" style={{ height: '60px', overflow: 'hidden', marginTop: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
              {visibleLogs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: i === visibleLogs.length - 1 ? 1 : 0.4, y: 0 }} style={{ color: i === visibleLogs.length - 1 ? '#10B981' : '#64748B', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {">"} {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mono" style={{ position: 'absolute', top: '30px', left: '30px', color: '#64748B', fontSize: '0.75rem', letterSpacing: '2px' }}>
        LAT: 49.8941° N<br/>LON: 2.2958° E<br/>(AMIENS_SERVER)
      </div>
      <div className="mono" style={{ position: 'absolute', bottom: '30px', right: '30px', color: '#64748B', fontSize: '0.75rem', letterSpacing: '2px', textAlign: 'right' }}>
        ROLE: FULLSTACK / AMOA<br/>STATUS: {progress === 100 ? 'ONLINE' : 'BOOTING'}
      </div>
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}>
      <motion.div initial={{ y: 0 }} animate={{ y: phase === 'opening' ? '-100%' : 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '50vh', backgroundColor: '#0F172A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}><CenterContent /></div>
      </motion.div>
      <motion.div initial={{ y: 0 }} animate={{ y: phase === 'opening' ? '100%' : 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw', height: '50vh', backgroundColor: '#0F172A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0 }}><CenterContent /></div>
      </motion.div>
      <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: phase === 'line' ? 1 : phase === 'opening' ? 1 : 0, opacity: phase === 'line' ? 1 : phase === 'opening' ? 0 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} style={{ position: 'absolute', top: '50%', left: 0, width: '100vw', height: '2px', backgroundColor: '#2563EB', boxShadow: '0 0 20px #2563EB', transform: 'translateY(-50%)', zIndex: 10 }} />
    </div>
  );
};

// ==========================================
// 🎬 TRANSITIONS DE PAGE
// ==========================================
const transitionSettings = { duration: 0.9, ease: [0.76, 0, 0.24, 1] };
const PageTransitions = () => (
  <>
    <motion.div initial={{ y: "0%" }} animate={{ y: "-100%" }} exit={{ y: "-100%" }} transition={transitionSettings}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#2563EB', zIndex: 999999, pointerEvents: 'none' }} />
    <motion.div initial={{ y: "100%" }} animate={{ y: "100%" }} exit={{ y: "0%" }} transition={transitionSettings}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#0A0A0A', zIndex: 999999, pointerEvents: 'none' }} />
  </>
);

// ==========================================
// ✨ REVEAL TEXT AU SCROLL
// ==========================================
const RevealText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 50%"] });
  const words = text.split(" ");
  return (
    <p ref={containerRef} style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)', lineHeight: '1.3', fontWeight: '700', margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: '"Space Grotesk", sans-serif' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["#94A3B8", "#0F172A"]);
        return <motion.span key={i} style={{ opacity, color }}>{word}</motion.span>;
      })}
    </p>
  );
};

// ==========================================
// 🃏 CARTE PROJET AVEC PARALLAXE
// ==========================================
const ProjectCard = ({ project, onClick, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', backgroundColor: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', overflow: 'hidden' }}
    >
      <div style={{ overflow: 'hidden', borderRight: '1px solid #E2E8F0', position: 'relative', minHeight: '300px' }}>
        <motion.div 
          style={{ position: 'absolute', inset: -20, backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center', y: yParallax }} 
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: hovered ? '#F8FAFC' : '#fff', transition: 'background-color 0.3s ease' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', margin: 0 }}>{project.title}</h3>
            <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowUpRight size={28} color={hovered ? "#2563EB" : "#94A3B8"} />
            </motion.div>
          </div>
          <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '40px' }}>{project.description}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {project.techs.map(tech => (
            <span key={tech} className="mono" style={{ padding: '6px 12px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#475569' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 🌍 LA PAGE D'ACCUEIL PRINCIPALE
// ==========================================
export default function Home() {
  const navigate = useNavigate();
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('preloaderSeen');
  });

  const handleLoadingComplete = (state) => {
    if (!state) {
      sessionStorage.setItem('preloaderSeen', 'true');
    }
    setLoading(state);
  };

  const ease = [0.16, 1, 0.3, 1];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('sajiddebarros@gmail.com');
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 3000);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('0782490545');
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 3000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader setLoading={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ position: 'relative' }}>
          <PageTransitions />
          <div className="tech-grid" />

          {/* NAVIGATION MINIMALISTE */}
          <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '30px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
            <Magnetic>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
                <Terminal size={20} color="#2563EB" />
                <span className="mono" style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0F172A' }}>SAJID.F</span>
              </div>
            </Magnetic>
            <div className="nav-links" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              <Magnetic><a href="#expertise" className="mono" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Expertise</a></Magnetic>
              <Magnetic><a href="#projets" className="mono" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Projets</a></Magnetic>
              <Magnetic><a href="#passions" className="mono" style={{ color: '#64748B', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Passions</a></Magnetic>
              <Magnetic>
                <div onClick={() => navigate('/contact')} style={{ backgroundColor: '#0F172A', color: '#fff', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', transition: 'background 0.3s' }}>
                  Me Contacter
                </div>
              </Magnetic>
            </div>
          </nav>

          {/* ===== HERO SECTION ===== */}
          <section style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '100px', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ padding: '0 5%', width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
              
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '100px', marginBottom: '40px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%' }} />
                  <span className="mono" style={{ fontSize: '0.75rem', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase' }}>Recherche Alternance 2026</span>
                </motion.div>

                <div style={{ overflow: 'hidden' }}>
                  <motion.h1 initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease, delay: 0.1 }} style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: '700', lineHeight: '1.05', letterSpacing: '-2px', color: '#0F172A', margin: '0 0 20px 0' }}>
                    Votre futur alternant <span style={{ color: '#2563EB' }}>SI</span>.
                  </motion.h1>
                </div>

                {/* ===== CITATION ===== */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} style={{ borderLeft: '3px solid #2563EB', paddingLeft: '20px', marginBottom: '40px' }}>
                  <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#475569', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                    "La perfection est atteinte, non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il n'y a plus rien à retirer."
                  </p>
                  <span className="mono" style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '600' }}>— Antoine de Saint-Exupéry</span>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} style={{ fontSize: '1.25rem', color: '#475569', lineHeight: '1.6', maxWidth: '500px', marginBottom: '50px', fontWeight: '300' }}>
                  Étudiant en B.U.T. Informatique à Amiens et micro-entrepreneur. Je cultive un profil hybride pour devenir <strong style={{ color: '#0F172A', fontWeight: '500' }}>Consultant SI</strong> ou Data Analyst.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ display: 'flex', gap: '20px' }}>
                  <Magnetic strength={0.2}>
                    <a href="#projets" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#2563EB', color: '#fff', padding: '16px 32px', textDecoration: 'none', borderRadius: '4px', fontWeight: '500', transition: 'background 0.3s' }}>
                      Explorer les projets <ArrowRight size={18} />
                    </a>
                  </Magnetic>
                </motion.div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InteractivePhoto />
              </div>

            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span className="mono" style={{ fontSize: '0.65rem', letterSpacing: '3px', color: '#94A3B8', textTransform: 'uppercase' }}>Scroll</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ChevronDown size={18} color="#94A3B8" />
              </motion.div>
            </motion.div>
          </section>

          {/* ===== VISION ===== */}
          <section id="vision" style={{ padding: '180px 5%', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '60px' }}>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#2563EB' }} />
              <span className="mono" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2563EB', letterSpacing: '3px', textTransform: 'uppercase' }}>Ma Vision</span>
            </motion.div>
            <RevealText text="Transformer des idées brutes en lancements opérationnels. Ma vision repose sur une double culture : la performance technique du développement et la réalité de l'entrepreneuriat. En route vers un Master MIAGE, je forge mon expertise pour devenir Consultant SI." />
          </section>

          {/* ===== EXPERTISE (ALIGNEMENT PN B.U.T INFORMATIQUE) ===== */}
          <section id="expertise" style={{ padding: '120px 5%', borderTop: '1px solid #E2E8F0', position: 'relative', zIndex: 1, backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '20px' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', letterSpacing: '-1.5px' }}>Domaines<br/>d'Intervention.</h2>
                <p className="mono" style={{ color: '#64748B', maxWidth: '350px', fontSize: '0.85rem' }}>// COMPÉTENCES ALIGNÉES SUR LE PROGRAMME NATIONAL DU B.U.T INFORMATIQUE.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { 
                    pn: "PN : RÉALISER & OPTIMISER",
                    icon: <Code2 size={24}/>, 
                    title: "Développement Web & Logiciel", 
                    desc: "Développement d'applications informatiques (Réaliser) de A à Z et amélioration de leurs performances algorithmiques et d'intégration (Optimiser).", 
                    tech: "Javascript, Java, PHP, CSS, API Stripe" 
                  },
                  { 
                    pn: "PN : ADMINISTRER & GÉRER",
                    icon: <Database size={24}/>, 
                    title: "Architecture de Données", 
                    desc: "Déploiement de systèmes communicants (Administrer) et modélisation, sécurisation et administration des bases de l'information (Gérer).", 
                    tech: "SQL, PL/SQL, NoSQL" 
                  },
                  { 
                    pn: "PN : CONDUIRE & COLLABORER",
                    icon: <Layout size={24}/>, 
                    title: "Chefferie de Projet & IA", 
                    desc: "Pilotage intégral des cycles de vie des projets (Conduire) et structuration du travail au sein d'une équipe pluridisciplinaire (Collaborer).", 
                    tech: "Figma, Canva, Agent IA, Entrepreneuriat" 
                  }
                ].map((item, index) => (
                  <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '40px', padding: '50px 0', borderTop: '1px solid #E2E8F0', borderBottom: index === 2 ? '1px solid #E2E8F0' : 'none' }}>
                    <div style={{ color: '#2563EB', marginTop: '5px' }}>{item.icon}</div>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', alignItems: 'start' }}>
                      <div>
                        <div className="mono" style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px' }}>
                          {item.pn}
                        </div>
                        <h3 style={{ fontSize: '1.6rem', fontWeight: '600', margin: 0 }}>{item.title}</h3>
                      </div>
                      <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                      <div className="mono" style={{ color: '#94A3B8', fontSize: '0.8rem', textAlign: 'right' }}>{item.tech}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== PROJETS ===== */}
          <section id="projets" style={{ padding: '120px 5%', backgroundColor: '#F8FAFC', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ marginBottom: '80px' }}>
                <span className="mono" style={{ color: '#2563EB', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>02 — Réalisations</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', letterSpacing: '-1.5px' }}>Expériences</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {projectsData.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} onClick={() => navigate(`/projet/${project.id}`)} />
                ))}
              </div>
            </div>
          </section>

          {/* ===== ARCHITECTURE DE PENSÉE ===== */}
          <section id="storytelling" style={{ padding: '120px 5%', backgroundColor: '#0F172A', color: '#fff', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px', alignItems: 'center' }}>
                
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <PenTool size={40} color="#2563EB" style={{ marginBottom: '30px' }} />
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '700', letterSpacing: '-1px', lineHeight: '1.1', marginBottom: '30px', fontFamily: '"Space Grotesk", sans-serif' }}>
                    La rigueur de l'écrivain est celle de l'ingénieur.
                  </h2>
                  <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: '1.7', margin: 0 }}>
                    Mes projets de rédaction (Thrillers psychologiques et Dark Fantasy) ne relèvent pas du hasard créatif. Ils exigent une cartographie précise et une logique structurelle stricte. L'architecture d'un univers littéraire s'apparente directement à celle d'un Système d'Information complexe.
                  </p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '30px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <span className="mono" style={{ color: '#2563EB', fontSize: '0.85rem', letterSpacing: '1px' }}>01 / WORLDBUILDING LITTÉRAIRE</span>
                    </div>
                    <p style={{ color: '#CBD5E1', margin: 0, lineHeight: '1.6' }}>
                      Structurer un univers narratif, définir ses règles politiques et cartographier les failles psychologiques des personnages pour créer un récit dense et sans incohérence.
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box size={24} color="#475569" />
                  </div>

                  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '30px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <span className="mono" style={{ color: '#10B981', fontSize: '0.85rem', letterSpacing: '1px' }}>02 / ARCHITECTURE S.I.</span>
                    </div>
                    <p style={{ color: '#CBD5E1', margin: 0, lineHeight: '1.6' }}>
                      Modéliser une base de données, définir la logique métier stricte et anticiper les failles du parcours utilisateur pour concevoir un système logiciel robuste et tolérant aux pannes.
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ===== PASSIONS ===== */}
          <section id="passions" style={{ padding: '120px 5%', position: 'relative', zIndex: 1, backgroundColor: '#fff', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ marginBottom: '80px' }}>
                <span className="mono" style={{ color: '#2563EB', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>03 — Au-delà de l'écran</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', letterSpacing: '-1.5px' }}>Mes passions</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', backgroundColor: '#E2E8F0', border: '1px solid #E2E8F0' }}>
                {passionsData.map((passion) => (
                  <motion.div 
                    key={passion.id} 
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    onClick={() => navigate(`/passion/${passion.id}`)}
                    style={{ backgroundColor: '#fff', padding: '40px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    whileHover={{ backgroundColor: '#F8FAFC' }}
                  >
                    <div className="mono" style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
                      {passion.subtitle}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '20px', color: '#0F172A' }}>{passion.title}</h3>
                    <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: '1.6', flexGrow: 1, margin: 0 }}>
                      {passion.intro}
                    </p>
                    <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: '500', fontSize: '0.9rem' }}>
                      Lire l'analyse <ArrowRight size={16} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== FOOTER CONTACT ===== */}
          <footer id="contact" style={{ backgroundColor: '#0F172A', color: '#fff', padding: '120px 5% 60px', position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '60px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ maxWidth: '600px' }}>
                <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '700', letterSpacing: '-2px', marginBottom: '30px', lineHeight: '1' }}>
                  Démarrons une discussion.
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}>
                  Actuellement à la recherche d'une opportunité d'alternance pour mettre mon expertise technique au service de vos défis d'ingénierie et de conseil.
                </p>
                <Magnetic strength={0.3}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button onClick={handleCopyEmail} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: isEmailCopied ? '#10B981' : '#fff', color: '#0F172A', padding: '16px 32px', border: 'none', cursor: 'pointer', fontWeight: '600', borderRadius: '4px', transition: 'background 0.3s' }}>
                      <Mail size={18} /> {isEmailCopied ? "Email Copié !" : "sajiddebarros@gmail.com"}
                    </button>
                    <button onClick={handleCopyPhone} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: isPhoneCopied ? '#10B981' : '#fff', color: '#0F172A', padding: '16px 32px', border: 'none', cursor: 'pointer', fontWeight: '600', borderRadius: '4px', transition: 'background 0.3s' }}>
                      <Phone size={18} /> {isPhoneCopied ? "Numéro Copié !" : "07 82 49 05 45"}
                    </button>
                  </div>
                </Magnetic>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                  <h4 className="mono" style={{ color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Réseau Professionnel</h4>
                  <Magnetic strength={0.2}>
                    <a href="https://www.linkedin.com/in/sajid-furtado-de-barros-059913383/" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      LinkedIn <ArrowUpRight size={20} color="#2563EB" />
                    </a>
                  </Magnetic>
                </div>
                <div>
                  <h4 className="mono" style={{ color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Localisation</h4>
                  <p style={{ color: '#F1F5F9', fontSize: '1.2rem', margin: 0 }}>IUT Amiens, Hauts-de-France</p>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '1400px', margin: '80px auto 0', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <span style={{ fontWeight: '700', fontSize: '1.2rem', fontFamily: '"Space Grotesk", sans-serif' }}>SF.</span>
              <span className="mono" style={{ fontSize: '0.75rem', color: '#64748B' }}>© 2026 SAJID FURTADO DE BARROS</span>
            </div>
          </footer>

        </motion.div>
      )}
    </>
  );
}