import CodeWindow from "./CodeWindow";
import TitleBar from "./TitleBar";
import SkillsRadar from "./SkillsRadar";
import StatCard from "./StatCard";
import ChatBot from "./ChatBot";
import { useTypewriter } from "./useTypeWriter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaCode, FaFileAlt, FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import "./App.css";

function App() 
{
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const typeWriterText = useTypewriter([
    "Computer Engineering Student",
    "Junior Developer",
    "AI And Machine Learning Enthusiast",
    "Technology Lover"
  ]);

  const projects = [
    {
      id: 1,
      title: "Stock Price Prediction / Fin-TAP",
      category: "Python & Machine Learning",
      description: "Developed a machine learning-based application that predicts stock prices using time-series data.",
      tech: ["Python", "Machine Learning", "Data Science"],
      color: "from-blue-500 to-cyan-500",
      image: "/p1.jpg", 
      link: "https://github.com/BaranSafa/Fin-TAP" 
    },
    {
      id: 2,
      title: "Brain Tumor MRI Recognition System",
      category: "Python & Deep Learning",
      description: "Brain Tumor Recognition System With MRI Pictures Using CNN and pre-trained Xception keras model to detect tumor types.",
      tech: ["Python", "Deep Learning", "Keras"],
      color: "from-purple-500 to-pink-500",
      image: "/p2.jpg",
      link: "https://github.com/BaranSafa/BrainTumorMRI"
    },
    {
      id: 3,
      title: "Dynamic Blog Website",
      category: "Web Development",
      description: "Built a dynamic blog system with CRUD infrastructure where users can add and delete posts.",
      tech: ["PHP", "SQL", "HTML/CSS"],
      color: "from-emerald-500 to-green-500",
      image: "/p3.jpg",
      link: "https://github.com/BaranSafa/BlogSite"
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      category: "Web Development",
      description: "A responsive personal portfolio website to showcase projects and skills.",
      tech: ["Tauri", "CSS", "JavaScript"],
      color: "from-emerald-500 to-green-500",
      image: "/p4.jpg",
      link: "https://github.com/BaranSafa/PersonalPortfolio"
    },
  ];

  const pageVariants = 
  {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

  return (
    <div className="main-container">

      <TitleBar />
      
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      {/* SIDEBAR */}
      <nav className="glass-sidebar">
        <div className="profile-section">
          <div className="profile-img-wrapper">
            <img src="/profile.jpg" alt="Profile" className="profile-img" />
          </div>
          <h3>Baran Safa Taşkın</h3>
          <p>Computer Engineering Student</p> 
        </div>

        <ul className="nav-menu">
          {[
            { id: "home", icon: <FaHome />, label: "Home" },
            { id: "projects", icon: <FaCode />, label: "Projects" },
            { id: "about", icon: <FaUser />, label: "About" },
            { id: "contact", icon: <FaFileAlt />, label: "Resume" },
          ].map((item) => (
            <li 
              key={item.id} 
              className={activeTab === item.id ? "active" : ""}
              onClick={() => { setActiveTab(item.id); setSelectedProject(null); }}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="social-links">

          <a href="https://github.com/BaranSafa" target="_blank" rel="noreferrer" title="GitHub Profilim">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/baransafataskin/" target="_blank" rel="noreferrer" title="LinkedIn Profilim">
            <FaLinkedin />
          </a>
          <a href="mailto:baransafataskin@gmail.com" title="Bana Mail At">
            <FaEnvelope />
          </a>

        </div>
        
      </nav>

      <main className="content-area">

        <AnimatePresence mode="wait">
        
        {/* HOME */}
        {activeTab === "home" && (
              <motion.div
                className="page-content home-layout"
              >
                <h1 className="hero-title">
                  Hi, I'm <span className="gradient-text">Baran</span>.
                </h1>
                
                {/* DYNAMIC TEXT */}
                <h2 className="typewriter-container">
                  I am a <span className="typewriter-text">{typeWriterText}</span>
                  <span className="cursor">|</span>
                </h2>

                <p className="hero-desc">
                  Creating value through code using <strong>Modern Web Technologies</strong> and <strong>Artificial Intelligence</strong>.
                </p>

                {/* STATIC COUNTERS */}
                <div className="stats-container">
                  <StatCard target={4} label="Years Exp." suffix="+" />
                  <StatCard target={10} label="Projects" suffix="+" />
                  <StatCard target={100} label="Motivation" suffix="%" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <CodeWindow />
                </div>

            <div className="cta-group">
              <button className="btn-primary" onClick={() => setActiveTab('projects')}>View My Work</button>
              <button className="btn-secondary" onClick={() => setActiveTab('contact')}>Contact Me</button>
            </div>
          </motion.div>
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <motion.div 
            key="projects" 
            initial="initial" animate="in" exit="out" 
            variants={pageVariants} transition={pageTransition}
            className="page-content"
          >
            <h2 className="page-title">Selected Works</h2>
            
            {!selectedProject ? (
              <div className="projects-grid">
                {projects.map((p) => (
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    key={p.id} 
                    className="project-card"
                    onClick={() => setSelectedProject(p)}
                  >
                  <div className="card-image-thumb" style={{backgroundImage: `url(${p.image})`}}></div>
                  <div className="card-content">
                    <span className="category-tag">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tech-row">
                      {p.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="project-detail-view">
                <button onClick={() => setSelectedProject(null)} className="back-link">← Back to Projects</button>
                <div className="detail-image-container">
                  <img src={selectedProject.image} alt={selectedProject.title} className="detail-image" />
                  <div className={`detail-overlay ${selectedProject.color}`}></div>
                </div>
                <div className="detail-header">
                  <h1 className="detail-title">{selectedProject.title}</h1>
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" className="visit-btn">
                    <FaExternalLinkAlt /> View Code
                  </a>
                </div>
                <p className="detail-desc">{selectedProject.description}</p>
                <div className="detail-techs">
                  <h3>Tech Stack:</h3>
                  <div className="tech-list">
                      {selectedProject.tech.map(t => <span className="tech-pill" key={t}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ABOUT */}

        {activeTab === "about" && (
          <motion.div 
            key="about" 
            initial="initial" animate="in" exit="out" 
            variants={pageVariants} transition={pageTransition}
            className="page-content"
          >
            <h2 className="page-title">About Me</h2>
            
            <div className="about-grid">
              
              {/* BIOGRAPHY */}
              <div className="glass-card bio-card">
                <h3>Who am I?</h3>
                <p>
                  I am a 4th-year <strong>Computer Engineering</strong> student at Istanbul Topkapı University with a full scholarship.
                </p>
                <p>
                  My journey is driven by a curiosity for how systems work. From building simple desktop apps to researching complex 
                  <strong> Deep Learning</strong> models, I love turning concepts into working code.
                </p>
              </div>

              {/* HOBBIES */}
              <div className="glass-card interest-card">
                <h3>Interests</h3>
                <div className="interest-icons">
                  <div className="interest-item">
                    <span>✈️</span>
                    <small>Traveling</small>
                  </div>
                  <div className="interest-item">
                    <span>🏋🏻‍♂️</span>
                    <small>Sports</small>
                  </div>
                  <div className="interest-item">
                    <span>🏃‍♂️</span>
                    <small>Running</small>
                  </div>
                </div>
              </div>

              {/* GOALSENTENCE */}
              <div className="glass-card goal-card">
                <p>
                  "Programming isn’t about what you know; it’s about what you can figure out.."
                </p>
              </div>

              {/* SOFT SKILLS */}
              <div className="glass-card skills-card">
                <h3>Soft Skills</h3>
                <ul className="soft-skills-list">
                  <li>⚡ Fast Learner</li>
                  <li>🤝 Teamwork</li>
                  <li>🧠 Analytical Thinking</li>
                  <li>⏳ Time Management</li>
                </ul>
              </div>
            </div>

            {/* SKILL PROFICIENCY ANALYSIS */}
            <div className="glass-card" style={{ marginTop: '40px', paddingBottom: '0' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--accent)' }}>
                Skill Proficiency Analysis
              </h3>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                A visualization of my technical strengths focused on AI and Web Development.
              </p>
              <SkillsRadar />
            </div>
          </motion.div>
        )}

        {/* RESUME */}
        {activeTab === "contact" && (
          <motion.div 
            key="contact" 
            initial="initial" animate="in" exit="out" 
            variants={pageVariants} transition={pageTransition}
            className="page-content"
          >
            <h2 className="page-title">Resume & Contact</h2>
            
            <div className="resume-grid">
              
              {/* EDUCATION */}
              <div className="glass-card">
                <h3 style={{color: 'var(--accent)'}}>Education</h3>
                <div className="timeline-item">
                  <span className="year">2022 - 2026</span>
                  <h4>Istanbul Topkapı University</h4>
                  <p>Computer Engineering (English)</p>
                  <small style={{color: '#aaa'}}>Full Scholarship</small>
                </div>
                <div className="timeline-item" style={{marginTop: '20px'}}>
                  <span className="year">2018 - 2022</span>
                  <h4>Umraniye Center Anatolian Highschool</h4>
                </div>
              </div>
              
              {/* EXPERIENCE */}
              <div className="glass-card">
                <h3 style={{color: 'var(--accent)'}}>Experience</h3>
                <div className="timeline-item">
                  <span className="year">2021 - 2025</span>
                  <h4>Accounting Office - Office Staff</h4>
                  <p>Invoice data entry, document tracking, and client file organization.</p>
                </div>
              </div>
            </div>
            
            {/* CONTACT INFO */}
            <div className="contact-area glass-card">
              <h3>Contact Me</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaEnvelope style={{color: 'var(--accent)'}} />
                    <span>baransafataskin@gmail.com</span> 
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaMapMarkerAlt style={{color: 'var(--accent)'}} />
                    <span>Umraniye / İstanbul</span> 
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaPhone style={{color: 'var(--accent)'}} />
                    <span>+90 552 258 64 36</span> 
                  </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
      </main>
      <ChatBot />
    </div>
  );
}

export default App;