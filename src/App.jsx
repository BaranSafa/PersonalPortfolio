import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaUser, FaCode, FaEnvelope, FaGithub, FaLinkedin,
  FaExternalLinkAlt, FaMapMarkerAlt, FaPhone, FaBrain,
  FaDatabase, FaStar, FaChevronDown, FaArrowRight,
  FaGraduationCap, FaBriefcase
} from "react-icons/fa";
import {
  SiPython, SiReact, SiJavascript, SiHtml5,
  SiMysql, SiGit, SiDotnet, SiTensorflow, SiPhp, SiMongodb
} from "react-icons/si";
import CodeWindow from "./CodeWindow";
import TitleBar from "./TitleBar";
import SkillsRadar from "./SkillsRadar";
import ParticlesBackground from "./ParticlesBackground";
import StatCard from "./StatCard";
import ChatBot from "./ChatBot";
import { useTypewriter } from "./useTypeWriter";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  const typeWriterText = useTypewriter([
    "Computer Engineering Student",
    "Junior Developer",
    "AI & ML Enthusiast",
    "Open Source Contributor"
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: <FaBrain />,
      color: "#a855f7",
      glow: "rgba(168,85,247,0.25)",
      skills: [
        { name: "Python",       icon: <SiPython />,     level: 90, color: "#3776AB" },
        { name: "TensorFlow",   icon: <SiTensorflow />, level: 75, color: "#FF6F00" },
        { name: "Keras / CNN",  icon: <FaBrain />,      level: 80, color: "#D00000" },
        { name: "Scikit-Learn", icon: <FaBrain />,      level: 80, color: "#F7931E" },
      ],
    },
    {
      title: "Web Development",
      icon: <FaCode />,
      color: "#38bdf8",
      glow: "rgba(56,189,248,0.25)",
      skills: [
        { name: "React",       icon: <SiReact />,      level: 80, color: "#61DAFB" },
        { name: "JavaScript",  icon: <SiJavascript />, level: 75, color: "#F7DF1E" },
        { name: "HTML / CSS",  icon: <SiHtml5 />,      level: 85, color: "#E34F26" },
        { name: "PHP",         icon: <SiPhp />,        level: 65, color: "#8892be" },
      ],
    },
    {
      title: "Databases & Tools",
      icon: <FaDatabase />,
      color: "#10b981",
      glow: "rgba(16,185,129,0.25)",
      skills: [
        { name: "MySQL",     icon: <SiMysql />,   level: 75, color: "#4479A1" },
        { name: "MongoDB",   icon: <SiMongodb />, level: 60, color: "#47A248" },
        { name: "Git",       icon: <SiGit />,     level: 80, color: "#F05032" },
        { name: "C# / .NET", icon: <SiDotnet />,  level: 70, color: "#512BD4" },
      ],
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Stock Price Prediction / Fin-TAP",
      category: "AI & ML",
      description: "ML-based app that predicts stock prices using time-series data and LSTM networks.",
      longDesc:
        "Developed a machine learning-based application that predicts stock prices using time-series data. The system processes historical market data and applies advanced deep learning techniques — including LSTM networks — to generate accurate short-term forecasts.",
      tech: ["Python", "LSTM", "Pandas", "Scikit-Learn"],
      gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      image: "/p1.jpg",
      link: "https://github.com/BaranSafa/Fin-TAP",
    },
    {
      id: 2,
      title: "Brain Tumor MRI Recognition",
      category: "AI & ML",
      description: "CNN-based deep learning system to detect brain tumor types from MRI scans.",
      longDesc:
        "Brain Tumor Recognition System using MRI images powered by CNN and a pre-trained Xception Keras model. Achieves high accuracy in classifying four tumor categories: glioma, meningioma, pituitary, and no tumor.",
      tech: ["Python", "Keras", "CNN", "Xception"],
      gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
      image: "/p2.jpg",
      link: "https://github.com/BaranSafa/BrainTumorMRI",
    },
    {
      id: 3,
      title: "Dynamic Blog Website",
      category: "Web Dev",
      description: "Full-stack blog system with CRUD operations built with PHP and MySQL.",
      longDesc:
        "Built a dynamic blog system with complete CRUD infrastructure where users can create, read, update, and delete posts. Features user authentication, responsive design, and a clean admin panel.",
      tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
      gradient: "linear-gradient(135deg, #10b981, #22c55e)",
      image: "/p3.jpg",
      link: "https://github.com/BaranSafa/BlogSite",
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      category: "Web Dev",
      description: "This portfolio — React + Tauri app with AI chatbot, skill radar, and smooth animations.",
      longDesc:
        "A modern personal portfolio website and desktop app built with React and Tauri. Features interactive animations via Framer Motion, a radar chart for skills visualization, an AI assistant chatbot, and particle effects.",
      tech: ["React", "Tauri", "Framer Motion", "Recharts"],
      gradient: "linear-gradient(135deg, #f97316, #f59e0b)",
      image: "/p4.jpg",
      link: "https://github.com/BaranSafa/PersonalPortfolio",
    },
  ];

  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((p) => p.category === projectFilter);

  const pageVariants = {
    initial: { opacity: 0, y: 24 },
    in:      { opacity: 1, y: 0  },
    out:     { opacity: 0, y: -24 },
  };
  const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

  const navItems = [
    { id: "home",     icon: <FaHome />,       label: "Home"     },
    { id: "skills",   icon: <FaCode />,        label: "Skills"   },
    { id: "projects", icon: <FaBriefcase />,   label: "Projects" },
    { id: "about",    icon: <FaUser />,        label: "About"    },
    { id: "contact",  icon: <FaEnvelope />,    label: "Contact"  },
  ];

  const handleNav = (id) => { setActiveTab(id); setSelectedProject(null); };

  return (
    <div className="main-container">
      <div
        className="cursor-glow"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      />

      <TitleBar />

      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <ParticlesBackground />

      {/* ── SIDEBAR ── */}
      <nav className="glass-sidebar">
        <div className="profile-section">
          <div className="profile-img-wrapper">
            <img src="/profile.jpg" alt="Profile" className="profile-img" />
          </div>
          <h3>Baran Safa Taşkın</h3>
          <p>Computer Engineering Student</p>
          <div className="status-badge">
            <span className="status-dot" />
            Available for Work
          </div>
        </div>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={activeTab === item.id ? "active" : ""}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="social-links">
          <a href="https://github.com/BaranSafa" target="_blank" rel="noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/baransafataskin/" target="_blank" rel="noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:baransafataskin@gmail.com" title="Email">
            <FaEnvelope />
          </a>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <main className="content-area">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              className="page-content home-layout"
            >
              <div className="hero-badge">
                <FaStar />
                <span>Open to Opportunities</span>
              </div>

              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Baran</span>.
              </h1>

              <h2 className="typewriter-container">
                I'm a&nbsp;<span className="typewriter-text">{typeWriterText}</span>
                <span className="cursor">|</span>
              </h2>

              <p className="hero-desc">
                Turning ideas into reality with <strong>Modern Web Technologies</strong> and{" "}
                <strong>Artificial Intelligence</strong>. Based in İstanbul, Turkey.
              </p>

              <div className="stats-container">
                <StatCard target={4}   label="Years Exp." suffix="+" />
                <StatCard target={10}  label="Projects"   suffix="+" />
                <StatCard target={100} label="Motivation" suffix="%" />
              </div>

              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <CodeWindow />
              </div>

              <div className="cta-group">
                <button className="btn-primary" onClick={() => handleNav("projects")}>
                  View My Work <FaArrowRight style={{ marginLeft: 8 }} />
                </button>
                <button className="btn-secondary" onClick={() => handleNav("contact")}>
                  Contact Me
                </button>
              </div>

              <div className="scroll-indicator">
                <FaChevronDown />
              </div>
            </motion.div>
          )}

          {/* SKILLS */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              className="page-content"
            >
              <h2 className="page-title">
                Tech Stack &amp; <span className="gradient-text">Expertise</span>
              </h2>
              <p className="page-subtitle">
                Technologies I work with across AI, web, and systems development.
              </p>

              <div className="skill-categories">
                {skillCategories.map((cat, ci) => (
                  <motion.div
                    key={cat.title}
                    className="skill-category-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.1 }}
                    style={{ "--cat-color": cat.color, "--cat-glow": cat.glow }}
                  >
                    <div className="cat-header">
                      <span className="cat-icon" style={{ color: cat.color }}>{cat.icon}</span>
                      <h3>{cat.title}</h3>
                    </div>
                    <div className="skill-list">
                      {cat.skills.map((skill, si) => (
                        <div key={skill.name} className="skill-item">
                          <div className="skill-info">
                            <span className="skill-tech-icon" style={{ color: skill.color }}>
                              {skill.icon}
                            </span>
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-percent">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <motion.div
                              className="skill-fill"
                              style={{ background: cat.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                delay: ci * 0.1 + si * 0.06 + 0.3,
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="glass-card radar-section">
                <h3 className="section-heading">Skill Proficiency Analysis</h3>
                <p className="section-subtext">Visual overview of my core competency areas.</p>
                <SkillsRadar />
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
              {!selectedProject ? (
                <>
                  <h2 className="page-title">
                    Selected <span className="gradient-text">Works</span>
                  </h2>

                  <div className="filter-bar">
                    {["all", "AI & ML", "Web Dev"].map((f) => (
                      <button
                        key={f}
                        className={`filter-btn ${projectFilter === f ? "active" : ""}`}
                        onClick={() => setProjectFilter(f)}
                      >
                        {f === "all" ? "All Projects" : f}
                      </button>
                    ))}
                  </div>

                  <motion.div className="projects-grid" layout>
                    <AnimatePresence>
                      {filteredProjects.map((p) => (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="project-card"
                          onClick={() => setSelectedProject(p)}
                        >
                          <div
                            className="card-image-thumb"
                            style={{ backgroundImage: `url(${p.image})` }}
                          >
                            <div
                              className="card-overlay"
                              style={{ background: p.gradient }}
                            />
                            <span className="card-category">{p.category}</span>
                          </div>
                          <div className="card-content">
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                            <div className="tech-row">
                              {p.tech.map((t) => <span key={t}>{t}</span>)}
                            </div>
                            <div className="card-footer">
                              <span className="view-details">
                                View Details <FaArrowRight />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="project-detail-view"
                >
                  <button onClick={() => setSelectedProject(null)} className="back-link">
                    ← Back to Projects
                  </button>

                  <div className="detail-image-container">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="detail-image"
                    />
                    <div
                      className="detail-gradient-bar"
                      style={{ background: selectedProject.gradient }}
                    />
                  </div>

                  <div className="detail-header">
                    <div>
                      <span className="detail-category">{selectedProject.category}</span>
                      <h1 className="detail-title">{selectedProject.title}</h1>
                    </div>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="visit-btn"
                    >
                      <FaGithub /> View on GitHub
                    </a>
                  </div>

                  <p className="detail-desc">{selectedProject.longDesc}</p>

                  <div className="detail-techs">
                    <h3>Tech Stack</h3>
                    <div className="tech-list">
                      {selectedProject.tech.map((t) => (
                        <span className="tech-pill" key={t}>{t}</span>
                      ))}
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
              <h2 className="page-title">
                About <span className="gradient-text">Me</span>
              </h2>

              <div className="about-top">
                <div className="glass-card bio-card">
                  <h3>Who am I?</h3>
                  <p>
                    I'm a 4th-year <strong>Computer Engineering</strong> student at Istanbul Topkapı
                    University with a full scholarship. Passionate about building intelligent systems
                    and elegant web experiences.
                  </p>
                  <p>
                    My journey spans from building <strong>deep learning</strong> models for medical
                    imaging to crafting modern web applications. I love turning complex problems into
                    clean, working code.
                  </p>
                  <blockquote className="bio-quote">
                    "Programming isn't about what you know; it's about what you can figure out."
                  </blockquote>
                </div>

                <div className="about-right">
                  <div className="glass-card interest-card">
                    <h3>Interests</h3>
                    <div className="interest-icons">
                      {[
                        { e: "✈️", l: "Traveling" },
                        { e: "🏋🏻‍♂️", l: "Fitness"   },
                        { e: "🏃‍♂️", l: "Running"   },
                        { e: "📚", l: "Learning"  },
                      ].map((i) => (
                        <div className="interest-item" key={i.l}>
                          <span>{i.e}</span>
                          <small>{i.l}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card skills-card">
                    <h3>Soft Skills</h3>
                    <ul className="soft-skills-list">
                      {[
                        "⚡ Fast Learner",
                        "🤝 Team Player",
                        "🧠 Analytical Thinking",
                        "⏳ Time Management",
                        "🎯 Problem Solver",
                      ].map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card timeline-card">
                <div className="timeline-section">
                  <h3 className="timeline-heading">
                    <FaGraduationCap /> Education
                  </h3>
                  <div className="timeline">
                    <div className="timeline-item">
                      <span className="year">2022 – 2026</span>
                      <h4>Istanbul Topkapı University</h4>
                      <p>Computer Engineering (English) · Full Scholarship</p>
                    </div>
                    <div className="timeline-item">
                      <span className="year">2018 – 2022</span>
                      <h4>Ümraniye Center Anatolian High School</h4>
                      <p>Science track</p>
                    </div>
                  </div>
                </div>

                <div className="timeline-divider" />

                <div className="timeline-section">
                  <h3 className="timeline-heading">
                    <FaBriefcase /> Experience
                  </h3>
                  <div className="timeline">
                    <div className="timeline-item">
                      <span className="year">2021 – 2025</span>
                      <h4>Accounting Office – Office Staff</h4>
                      <p>Invoice data entry, document tracking, and client file organization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              className="page-content"
            >
              <h2 className="page-title">
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <p className="page-subtitle">
                Have a project in mind or want to collaborate? Let's talk.
              </p>

              <div className="contact-grid">
                <div className="glass-card contact-info-card">
                  <h3>Contact Info</h3>
                  <div className="contact-info-list">
                    <a href="mailto:baransafataskin@gmail.com" className="contact-info-item">
                      <div className="contact-icon-wrap blue">
                        <FaEnvelope />
                      </div>
                      <div>
                        <small>Email</small>
                        <p>baransafataskin@gmail.com</p>
                      </div>
                    </a>
                    <div className="contact-info-item">
                      <div className="contact-icon-wrap purple">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <small>Location</small>
                        <p>Ümraniye / İstanbul, Turkey</p>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-icon-wrap green">
                        <FaPhone />
                      </div>
                      <div>
                        <small>Phone</small>
                        <p>+90 552 258 64 36</p>
                      </div>
                    </div>
                  </div>

                  <div className="contact-socials">
                    <a
                      href="https://github.com/BaranSafa"
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill"
                    >
                      <FaGithub /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/baransafataskin/"
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill linkedin"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                  </div>
                </div>

                <div className="glass-card contact-form-card">
                  <h3>Send a Message</h3>
                  <form
                    className="contact-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const data = new FormData(e.target);
                      const subject = encodeURIComponent(
                        `Portfolio Contact: ${data.get("subject")}`
                      );
                      const body = encodeURIComponent(
                        `Name: ${data.get("name")}\n\n${data.get("message")}`
                      );
                      window.location.href =
                        `mailto:baransafataskin@gmail.com?subject=${subject}&body=${body}`;
                    }}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" placeholder="John Doe" required />
                      </div>
                      <div className="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" placeholder="Project Inquiry" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project or idea..."
                        rows={5}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary send-btn">
                      Send Message <FaArrowRight />
                    </button>
                  </form>
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
