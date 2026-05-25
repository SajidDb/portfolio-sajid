// src/Profil.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Target, Shield, Zap, AlertTriangle, 
  UserCheck, MessageSquareQuote, CheckCircle2, 
  Briefcase, GraduationCap, Award, Plane, BookOpen, 
  BadgeCheck, HeartHandshake, Languages, Download,
  GitMerge, Users, Lightbulb
} from 'lucide-react';

// ==========================================
// 🧲 COMPOSANT : BOUTON MAGNÉTIQUE
// ==========================================
const Magnetic = ({ children, strength = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({ 
      x: (clientX - (left + width / 2)) * strength, 
      y: (clientY - (top + height / 2)) * strength 
    });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div 
      ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} 
      animate={{ x: position.x, y: position.y }} 
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 🎬 TRANSITIONS DE PAGE
// ==========================================
const PageTransitions = () => {
  const columns = 4;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'none', display: 'flex' }}>
      {[...Array(columns)].map((_, i) => (
        <motion.div 
          key={i} initial={{ y: "0%" }} animate={{ y: "-100%" }} exit={{ y: "0%" }} 
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }} 
          style={{ height: '100%', width: `${100 / columns}%`, backgroundColor: '#0F172A' }} 
        />
      ))}
    </div>
  );
};

export default function Profil() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const ease = [0.16, 1, 0.3, 1];

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
  };

  return (
    <motion.div initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#0F172A' }}>
      <PageTransitions />
      <div className="tech-grid" />

      {/* NAV FLOTTANTE */}
      <div style={{ position: 'fixed', top: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 50 }}>
        <nav style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderRadius: '50px', padding: '12px 36px', display: 'flex', gap: '36px', alignItems: 'center', border: '1px solid #E2E8F0', boxShadow: '0 4px 30px rgba(0,0,0,0.06)' }}>
          <Magnetic><div style={{ fontSize: '1.3rem', fontWeight: '900', cursor: 'pointer', fontFamily: '"Space Grotesk", sans-serif' }} onClick={() => navigate('/')}>SF.</div></Magnetic>
          <Magnetic strength={0.3}>
            <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', cursor: 'pointer', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', fontFamily: '"JetBrains Mono", monospace' }}>
              <ArrowLeft size={18} /> Retour
            </div>
          </Magnetic>
        </nav>
      </div>

      {/* ===== HEADER : IDENTITÉ & OBJECTIF ===== */}
      <header style={{ paddingTop: '180px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} style={{ marginBottom: '20px' }}>
              <span className="mono" style={{ color: '#2563EB', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                // Profil Académique & Professionnel
              </span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '700', letterSpacing: '-1.5px', margin: '0 0 30px 0', lineHeight: '1.1' }}>
              Sajid Furtado <br/>De Barros.
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} style={{ fontSize: '1.25rem', color: '#475569', lineHeight: '1.6', fontWeight: '300', margin: '0 0 40px 0' }}>
              Actuellement en 2ème année de <b>BUT Informatique à l'IUT d'Amiens</b>. Je construis mon parcours autour de la double compétence technique et gestionnaire, avec l'ambition de devenir Consultant en Systèmes d'Information via un <b>Master MIAGE</b>.
            </motion.p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}>
                <GraduationCap size={20} color="#2563EB" />
                <span className="mono" style={{ fontSize: '0.85rem', fontWeight: '600' }}>BUT 2 INFORMATIQUE</span>
              </div>
              <Magnetic strength={0.2}>
                <a href="/CV_Sajid.pdf" download style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.3s' }}>
                  <Download size={20} />
                  <span className="mono" style={{ fontSize: '0.85rem', fontWeight: '700' }}>TÉLÉCHARGER MON CV</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease }} style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', border: '1px solid #E2E8F0', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
              <img src="/sajid.jpg" alt="Sajid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '12px 24px', borderRadius: '30px', border: '1px solid #fff' }}>
                <span className="mono" style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F172A', letterSpacing: '1px' }}>FUTURE ARCHITECT SI</span>
              </div>
            </div>
          </motion.div>

        </div>
      </header>

      {/* ===== TIMELINE : FORMATIONS & DIPLÔMES ===== */}
      <section style={{ padding: '100px 5%', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', margin: '0 0 15px 0' }}>Formations & Diplômes.</h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Mon parcours académique.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '39px', top: '20px', bottom: '20px', width: '2px', backgroundColor: '#E2E8F0', zIndex: 0 }} />

            {/* BUT Informatique */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '4px solid #F8FAFC' }}>
                <GraduationCap size={30} color="#fff" />
              </div>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1 }}>
                <span className="mono" style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', display: 'block' }}>2024 - 2027 (En cours)</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 10px 0' }}>B.U.T Informatique</h3>
                <p style={{ color: '#475569', margin: 0, lineHeight: '1.6' }}>IUT d'Amiens (Université de Picardie Jules Verne). <br/>Développement complet, administration de bases de données, gestion de projet Agile et architecture réseau.</p>
              </div>
            </motion.div>

            {/* Baccalauréat */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '4px solid #F8FAFC' }}>
                <BookOpen size={30} color="#fff" />
              </div>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1 }}>
                <span className="mono" style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', display: 'block' }}>2022 - 2024</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 10px 0' }}>Baccalauréat Général</h3>
                <p style={{ color: '#475569', margin: 0, lineHeight: '1.6' }}>Lycée Madeleine Michelis. Spécialités : <b>Mathématiques</b> et <b>Numérique et Sciences Informatiques (NSI)</b>. Options : Mathématiques expertes & EPS.</p>
              </div>
            </motion.div>

            {/* BIA */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '4px solid #F8FAFC' }}>
                <Plane size={30} color="#fff" />
              </div>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0', flex: 1 }}>
                <span className="mono" style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px', display: 'block' }}>2021</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 10px 0' }}>B.I.A (Brevet d'Initiation Aéronautique)</h3>
                <p style={{ color: '#475569', margin: 0, lineHeight: '1.6' }}>Lycée Madeleine Michelis. Validation de compétences techniques rigoureuses : mécanique des fluides, réglementation aérienne et anticipation des risques.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS & ENGAGEMENTS ===== */}
      <section style={{ padding: '100px 5%', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', margin: '0 0 15px 0' }}>Compétences Annexes & Engagements.</h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: '600px' }}>Mon apprentissage continu, mon engagement associatif et mes atouts linguistiques.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <BadgeCheck size={32} color="#2563EB" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>Formations en ligne</h3>
              <ul style={{ color: '#475569', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                <li><b>Introduction to Modern AI</b> (Coursera)</li>
                <li><b>Introduction to Cybersecurity</b> (Cisco Networking Academy)</li>
                <li><b>Google Data Studio</b></li>
                <li>Marketing organique & Création de site web WordPress</li>
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <HeartHandshake size={32} color="#10B981" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Bénévolat Associatif</h3>
              <p style={{ color: '#2563EB', fontWeight: '600', marginBottom: '10px', margin: 0 }}>Association AMCC (2023 - 2024)</p>
              <p style={{ color: '#475569', lineHeight: '1.6', marginTop: '10px' }}>
                Conception et dispense de cours de langue et de culture arabe à de jeunes enfants. Organisation de jeux éducatifs, développant ma pédagogie.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#F8FAFC', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <Languages size={32} color="#F59E0B" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px' }}>Langues</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#0F172A', fontWeight: '600' }}>Anglais</span>
                  <span className="mono" style={{ backgroundColor: '#E2E8F0', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>Niveau B1 (En cours)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#0F172A', fontWeight: '600' }}>Allemand</span>
                  <span className="mono" style={{ backgroundColor: '#E2E8F0', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>Niveau B1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#0F172A', fontWeight: '600' }}>Arabe</span>
                  <span className="mono" style={{ backgroundColor: '#E2E8F0', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>Niveau A2</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== VALEURS & PERSONNALITÉ ===== */}
      <section style={{ padding: '100px 5%', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', margin: '0 0 15px 0' }}>Valeurs & Personnalité.</h2>
            <p style={{ color: '#64748B', fontSize: '1.1rem', maxWidth: '600px' }}>L'équilibre entre la rigueur de l'ingénierie et la créativité narrative.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <Shield size={32} color="#2563EB" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Rigueur Analytique</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>Chaque ligne de code et chaque brique d'architecture doit avoir sa raison d'être. Je ne laisse rien au hasard.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <Zap size={32} color="#10B981" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Autonomie Technique</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>Capacité à s'auto-former sur des technologies complexes (Stripe, Next.js) pour répondre à un besoin précis.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <Briefcase size={32} color="#F59E0B" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Esprit Intrapreneur</h3>
              <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>Au-delà du code, je m'intéresse au positionnement stratégique et à la viabilité des solutions créées.</p>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ backgroundColor: '#0F172A', color: '#fff', padding: '50px', borderRadius: '24px', display: 'flex', gap: '40px', alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)', zIndex: 0 }} />
            <AlertTriangle size={48} color="#F43F5E" style={{ flexShrink: 0, position: 'relative', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '15px', color: '#F43F5E' }}>Ma Faiblesse</h3>
              <p style={{ color: '#CBD5E1', lineHeight: '1.8', fontSize: '1.15rem', margin: 0, fontWeight: '300' }}>
                Je suis parfois (beaucoup) trop prudent. Avant de déployer une fonctionnalité ou de modifier une architecture, mon cerveau génère automatiquement tous les pires scénarios possibles. Je suis le genre de développeur qui vérifie trois fois si la base de données est bien celle de "test" avant de la purger. Ça me fait parfois perdre un peu de temps au démarrage, mais l'avantage, c'est que quand j'appuie sur "Valider", je dors sur mes deux oreilles.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== COMPÉTENCES PN ===== */}
      <section style={{ padding: '120px 5%', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <span className="mono" style={{ color: '#2563EB', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '15px' }}>Exigences Académiques</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '700', letterSpacing: '-1.5px' }}>Compétences du B.U.T.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px' }}>
            {[
              { title: "RÉALISER", desc: "Développement d'applications complexes de A à Z (ex: MyPlumOr en React/Next.js)." },
              { title: "OPTIMISER", desc: "Amélioration des performances algorithmiques et de la structure des données." },
              { title: "ADMINISTRER", desc: "Installation et configuration de systèmes communicants et sécurisés." },
              { title: "GÉRER", desc: "Modélisation et administration de bases de données (SQL, NoSQL, Oracle)." },
              { title: "CONDUIRE", desc: "Pilotage de projets informatiques, de l'expression du besoin au déploiement." },
              { title: "COLLABORER", desc: "Travail en équipe pluridisciplinaire via les méthodes Agiles (Scrum)." }
            ].map((skill, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '30px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#fff', borderRadius: '8px' }}>
                <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <h4 className="mono" style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px', color: '#0F172A' }}>{skill.title}</h4>
                  <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RÉFLEXION SUR LES ACQUIS (REFAITE ET STYLISÉE) ===== */}
      <section style={{ padding: '120px 5%', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* HEADER SECTION RÉFLEXION */}
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <Award size={48} color="#2563EB" style={{ margin: '0 auto 30px' }} />
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', letterSpacing: '-1.5px', marginBottom: '20px' }}>
              Réflexion sur mes acquis.
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
              Analyse critique de mon évolution durant le B.U.T Informatique et justification de mes choix professionnels.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            
            {/* 01 : L'AUTONOMIE (Image à droite) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
              <div style={{ order: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <span className="mono" style={{ fontSize: '3rem', fontWeight: '900', color: '#E2E8F0', lineHeight: 1 }}>01</span>
                  <div style={{ height: '2px', width: '40px', backgroundColor: '#2563EB' }} />
                  <span className="mono" style={{ color: '#2563EB', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Le "Comment"</span>
                </div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>L'autonomie technique</h3>
                <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: '1.7' }}>
                  La création de <b>MyPlumOr</b> a été mon plus grand défi d'apprentissage. J'ai dû sortir du cadre scolaire pour explorer des problématiques réelles de production : intégration de <b>Stripe Connect</b> pour les flux financiers et gestion de l'état global en Next.js. Cette expérience m'a appris à naviguer dans des documentations techniques denses et à résoudre des erreurs critiques en autonomie, renforçant ma capacité à <i>Réaliser</i> et <i>Administrer</i> des solutions viables.
                </p>
              </div>
              <div style={{ order: 2, borderRadius: '24px', overflow: 'hidden', height: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                {/* Remplace cette URL par une capture de ton code ou de MyPlumOr plus tard */}
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000" alt="Code Autonomie" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>

            {/* 02 : LA VISION AMOA (Image à gauche) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
              <div style={{ order: 1, borderRadius: '24px', overflow: 'hidden', height: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                {/* Remplace cette URL par une image stratégique/schéma */}
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000" alt="Stratégie AMOA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ order: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <span className="mono" style={{ fontSize: '3rem', fontWeight: '900', color: '#E2E8F0', lineHeight: 1 }}>02</span>
                  <div style={{ height: '2px', width: '40px', backgroundColor: '#F59E0B' }} />
                  <span className="mono" style={{ color: '#F59E0B', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Le "Pourquoi"</span>
                </div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>La vision AMOA</h3>
                <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: '1.7' }}>
                  Au fil de mes Situations d'Apprentissage et d'Évaluation (SAÉ), j'ai réalisé que le code pur n'est qu'un moyen. Ce qui me stimule réellement, c'est la <b>Conduite de projet</b> et l'alignement entre technique et stratégie (<i>Optimiser</i>). Ce constat est à l'origine de mon choix pour la filière <b>MIAGE</b> : je souhaite être le pont entre les besoins métiers d'une organisation et les solutions logicielles déployées.
                </p>
              </div>
            </motion.div>

            {/* 03 : INTELLIGENCE COLLECTIVE (Image à droite) */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
              <div style={{ order: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <span className="mono" style={{ fontSize: '3rem', fontWeight: '900', color: '#E2E8F0', lineHeight: 1 }}>03</span>
                  <div style={{ height: '2px', width: '40px', backgroundColor: '#10B981' }} />
                  <span className="mono" style={{ color: '#10B981', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Le Groupe</span>
                </div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px', letterSpacing: '-1px' }}>L'Intelligence Collective</h3>
                <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: '1.7' }}>
                  Le passage du travail individuel à la <b>Collaboration</b> au sein d'équipes de 5-6 personnes a été une étape clé. Apprendre à structurer une répartition des tâches, à vulgariser des concepts techniques pour des interlocuteurs moins experts et à accepter la critique constructive a transformé ma façon de concevoir un système d'information.
                </p>
              </div>
              <div style={{ order: 2, borderRadius: '24px', overflow: 'hidden', height: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                {/* Remplace cette URL par une photo d'équipe ou collaboration */}
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000" alt="Equipe Projet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>

          </div>

          {/* LE BILAN GLOBAL (BLOC STYLISÉ EN BAS) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} style={{ marginTop: '100px', backgroundColor: '#0F172A', borderRadius: '30px', padding: '60px', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)', zIndex: 0 }} />
            
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '50%', zIndex: 1 }}>
              <Lightbulb size={48} color="#2563EB" />
            </div>

            <div style={{ flex: 1, minWidth: '300px', zIndex: 1 }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '15px' }}>Bilan global : De Technicien à Stratège.</h3>
              <p style={{ color: '#CBD5E1', fontSize: '1.2rem', lineHeight: '1.7', margin: 0 }}>
                Ces deux années de B.U.T m'ont profondément transformé. Je ne vois plus une application web comme un simple ensemble de fichiers techniques, mais comme un produit qui doit répondre à un <b>besoin utilisateur</b> et à une <b>logique économique</b>. Ma plus grande force aujourd'hui est d'avoir "mis les mains dans le code" pour être d'autant plus pertinent et réaliste demain dans le conseil, l'architecture et la gestion de projet.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ===== RÉFÉRENCES (TESTIMONIALS) ===== */}
      <section style={{ padding: '120px 5%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <MessageSquareQuote size={48} color="#2563EB" style={{ margin: '0 auto 30px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px' }}>Référence Professionnelle.</h2>
          </div>
          
          <div style={{ backgroundColor: '#F8FAFC', padding: '50px', borderRadius: '16px', border: '1px solid #E2E8F0', position: 'relative' }}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#475569', lineHeight: '1.7', marginBottom: '40px', textAlign: 'center' }}>
              "Sajid a fait preuve d'une grande rigueur lors de son passage chez nous. Il a su s'approprier les contraintes de notre métier pour proposer des solutions techniques efficaces."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={28} color="#fff" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Tuteur de Stage</h4>
                <span className="mono" style={{ fontSize: '0.9rem', color: '#64748B' }}>Gérance Allo Pizza Amiens</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p className="mono" style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              * CONTACT DIRECT DISPONIBLE SUR DEMANDE
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER SIMPLE RETOUR */}
      <footer style={{ padding: '60px 5%', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
        <Magnetic strength={0.2}>
          <button onClick={() => navigate('/')} style={{ background: '#0F172A', color: '#fff', padding: '16px 40px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            REVENIR À L'ACCUEIL
          </button>
        </Magnetic>
      </footer>

    </motion.div>
  );
}