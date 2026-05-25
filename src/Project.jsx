// src/Project.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, Code2, ExternalLink, Cpu, Target, Image, X, Maximize2, Server, Bug, CheckCircle, TerminalSquare, Download } from 'lucide-react';
import { projectsData } from './data';

// BOUTON MAGNÉTIQUE
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

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Logique pour trouver le projet actuel, le précédent et le suivant
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const project = projectsData[currentIndex];
  
  // Si le projet n'existe pas, on arrête là
  if (!project) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Link to="/">Retour</Link></div>;

  // Calcul dynamique du projet précédent et suivant (avec effet boucle)
  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;
  const prevProject = projectsData[prevIndex];
  const nextProject = projectsData[nextIndex];
  
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Remonte en haut de la page quand l'ID du projet change (quand on clique sur "Projet suivant")
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const ease = [0.16, 1, 0.3, 1];
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
  const containerStagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
  const itemStagger = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', color: '#0F172A' }}>
      <PageTransitions />
      <div className="tech-grid" style={{ opacity: 0.4 }} />

      {/* NAV */}
      <div style={{ position: 'fixed', top: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 50 }}>
        <nav style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', borderRadius: '50px', padding: '12px 36px', display: 'flex', gap: '36px', alignItems: 'center', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          <Magnetic><div style={{ fontSize: '1.3rem', fontWeight: '900', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }} onClick={() => navigate('/')}>SF.</div></Magnetic>
          <Magnetic strength={0.3}>
            <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', cursor: 'pointer', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              <ArrowLeft size={18} /> Retour
            </div>
          </Magnetic>
        </nav>
      </div>

      {/* HEADER */}
      <header style={{ paddingTop: '200px', paddingBottom: '60px', paddingLeft: '5%', paddingRight: '5%', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }}>
            <span className="mono" style={{ display: 'inline-block', backgroundColor: `${project.color}15`, color: project.color, padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', marginBottom: '30px' }}>
              // {project.subtitle}
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease }} style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: '700', letterSpacing: '-3px', margin: '0', lineHeight: '1', fontFamily: '"Space Grotesk", sans-serif' }}>
            {project.title}
          </motion.h1>
        </div>
      </header>

      {/* HERO IMAGE */}
      <section style={{ width: '100%', height: '75vh', minHeight: '500px', overflow: 'hidden', position: 'relative', marginBottom: '100px' }}>
        <motion.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }} style={{ width: '100%', height: '120%', y: yParallax, position: 'absolute', top: '-10%', left: 0 }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.9)' }} />
        </motion.div>
      </section>

      {/* CORPS DU PROJET */}
      <section style={{ paddingLeft: '5%', paddingRight: '5%', marginBottom: '120px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '80px', alignItems: 'start' }}>
          
          {/* SIDEBAR TECH */}
          <motion.div variants={containerStagger} initial="hidden" animate="visible" style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '50px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '40px', position: 'sticky', top: '140px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
            <motion.div variants={itemStagger}>
              <h4 className="mono" style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><User size={16} color={project.color} /> Rôle</h4>
              <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#0F172A' }}>{project.role}</span>
            </motion.div>
            <div style={{ height: '1px', background: 'rgba(226,232,240,0.8)' }} />
            <motion.div variants={itemStagger}>
              <h4 className="mono" style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><Calendar size={16} color={project.color} /> Chronologie</h4>
              <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#0F172A' }}>{project.date}</span>
            </motion.div>
            <div style={{ height: '1px', background: 'rgba(226,232,240,0.8)' }} />
            <motion.div variants={itemStagger}>
              <h4 className="mono" style={{ color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Code2 size={16} color={project.color} /> Stack Technique</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {project.techs.map((tech, i) => (
                  <motion.span whileHover={{ y: -3 }} key={i} className="mono" style={{ padding: '8px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* BOUTON URL */}
            {project.url && (
              <motion.div variants={itemStagger} style={{ marginTop: '10px' }}>
                <a href={project.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#0F172A', color: '#fff', padding: '18px', textDecoration: 'none', fontWeight: '600', borderRadius: '12px', fontSize: '1rem' }}>
                  Visiter le site <ExternalLink size={18} />
                </a>
              </motion.div>
            )}

            {/* BOUTON TÉLÉCHARGER CV */}
            {project.document && (
              <motion.div variants={itemStagger} style={{ marginTop: '0px' }}>
                <motion.a 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }} 
                  href={project.document.file} 
                  download 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: project.color, color: '#fff', padding: '18px', textDecoration: 'none', fontWeight: '600', borderRadius: '12px', fontSize: '1rem', boxShadow: `0 10px 30px ${project.color}40` }}
                >
                  {project.document.label} <Download size={18} />
                </motion.a>
              </motion.div>
            )}

          </motion.div>

          {/* CONTENU ULTRA-DÉTAILLÉ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingTop: '20px' }}>
            
            {/* 01. OBJECTIF */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-40px', left: '-20px', fontSize: '12rem', fontWeight: '900', color: '#F1F5F9', zIndex: 0, lineHeight: '1', userSelect: 'none' }}>01</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="mono" style={{ color: project.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><Target size={20} /> Le Contexte</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', marginBottom: '30px', color: '#0F172A' }}>L'Objectif Métier</h3>
                <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: '1.8', margin: 0, fontWeight: '300' }}>{project.description}</p>
              </div>
            </motion.div>

            {/* 02. ARCHITECTURE */}
            {project.deepDive && (
              <>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-40px', left: '-20px', fontSize: '12rem', fontWeight: '900', color: '#F1F5F9', zIndex: 0, lineHeight: '1', userSelect: 'none' }}>02</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span className="mono" style={{ color: project.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><Server size={20} /> Infrastructure</span>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', marginBottom: '30px', color: '#0F172A' }}>Choix d'Architecture</h3>
                    <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: '1.8', margin: 0, fontWeight: '300' }}>{project.deepDive.architecture}</p>
                  </div>
                </motion.div>

                {/* 03. DÉFIS TECHNIQUES */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <span className="mono" style={{ color: project.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><Bug size={20} /> Résolution de problèmes</span>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', marginBottom: '30px', color: '#0F172A' }}>Défis Techniques & Solutions</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {project.deepDive.challenges.map((challenge, i) => (
                      <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <CheckCircle size={20} color={project.color} /> {challenge.title}
                        </h4>
                        <p style={{ color: '#64748B', lineHeight: '1.7', margin: 0 }}>{challenge.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 04. EXTRAIT DE CODE STYLISÉ (VS CODE LIKE) */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                  <span className="mono" style={{ color: project.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><TerminalSquare size={20} /> Inspection</span>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', marginBottom: '30px', color: '#0F172A' }}>Analyse d'Implémentation</h3>
                  
                  <div style={{ backgroundColor: '#0F172A', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
                    <div style={{ backgroundColor: '#1E293B', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                      </div>
                      <span className="mono" style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{project.deepDive.codeSnippet.filename}</span>
                    </div>
                    <div style={{ padding: '30px', overflowX: 'auto' }}>
                      <pre style={{ margin: 0, color: '#E2E8F0', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace' }}>
                        <code>{project.deepDive.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* ===== GALERIE DE PREUVES VISUELLES ===== */}
      {project.gallery && project.gallery.length > 0 && (
        <section style={{ paddingLeft: '5%', paddingRight: '5%', paddingBottom: '120px', paddingTop: '100px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <span className="mono" style={{ color: project.color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>// Validation des acquis</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0, letterSpacing: '-1px' }}>Galerie de Preuves.</h3>
              </div>
              <p className="mono" style={{ color: '#64748B', fontSize: '0.85rem' }}>* CLIQUEZ SUR UNE IMAGE POUR AGRANDIR</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(400px, 1fr))`, gap: '40px' }}>
              {project.gallery.map((imgUrl, index) => (
                <motion.div 
                  key={index}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                  whileHover="hover"
                  onClick={() => setFullscreenImage(imgUrl)}
                  style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', cursor: 'zoom-in', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', backgroundColor: '#F1F5F9' }}
                >
                  <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
                    <motion.img src={imgUrl} alt={`Preuve technique ${index + 1}`} variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <motion.div variants={{ hidden: { opacity: 0 }, hover: { opacity: 1 } }} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: project.color, color: '#fff', padding: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Maximize2 size={24} />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== NOUVELLE SECTION : NAVIGATION INTER-PROJETS ===== */}
      <section style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', flexWrap: 'wrap' }}>
          
          {/* Bloc Projet Précédent */}
          <motion.div whileHover={{ backgroundColor: '#F1F5F9' }} style={{ flex: '1 1 50%', borderRight: '1px solid #E2E8F0', transition: 'background 0.3s' }}>
            <Link to={`/projet/${prevProject.id}`} style={{ display: 'block', padding: '60px 5%', textDecoration: 'none', color: '#0F172A', height: '100%' }}>
              <span className="mono" style={{ color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <ArrowLeft size={18} /> Projet précédent
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>{prevProject.title}</h3>
            </Link>
          </motion.div>

          {/* Bloc Projet Suivant */}
          <motion.div whileHover={{ backgroundColor: '#F1F5F9' }} style={{ flex: '1 1 50%', transition: 'background 0.3s' }}>
            <Link to={`/projet/${nextProject.id}`} style={{ display: 'block', padding: '60px 5%', textDecoration: 'none', color: '#0F172A', height: '100%', textAlign: 'right' }}>
              <span className="mono" style={{ color: '#64748B', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginBottom: '15px' }}>
                Projet suivant <ArrowRight size={18} />
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>{nextProject.title}</h3>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 5%', backgroundColor: '#0F172A', textAlign: 'center' }}>
        <Magnetic strength={0.2}>
          <button onClick={() => navigate('/')} style={{ background: '#FFFFFF', color: '#0F172A', padding: '18px 48px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'transform 0.3s' }}>
            Retour à l'accueil
          </button>
        </Magnetic>
      </footer>

      {/* MODALE PLEIN ÉCRAN */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFullscreenImage(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999999, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '2% 5%' }}>
            <div style={{ position: 'absolute', top: '40px', right: '40px', color: '#fff', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%' }}>
              <X size={32} />
            </div>
            <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} src={fullscreenImage} alt="En plein écran" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}