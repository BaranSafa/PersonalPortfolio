import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaUser, FaCode, FaEnvelope, FaGithub, FaLinkedin,
  FaExternalLinkAlt, FaMapMarkerAlt, FaPhone, FaBrain,
  FaDatabase, FaStar, FaChevronDown, FaArrowRight,
  FaGraduationCap, FaBriefcase, FaBook, FaClock, FaTag
} from "react-icons/fa";
import {
  SiPython, SiReact, SiJavascript, SiHtml5,
  SiMysql, SiGit, SiDotnet, SiTensorflow, SiPhp, SiMongodb
} from "react-icons/si";
import CodeWindow from "./CodeWindow";
import TitleBar from "./TitleBar";
import SkillsRadar from "./SkillsRadar";
import StatCard from "./StatCard";
import ChatBot from "./ChatBot";
import IntroAnimation from "./IntroAnimation";
import GitHubContributions from "./GitHubContributions";
import { useTypewriter } from "./useTypeWriter";
import "./App.css";

const blogPosts = [
  {
    id: 1,
    title: "Stock Price Prediction with LSTM Networks",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    tags: ["Python", "LSTM", "Deep Learning"],
    summary: "How I built Fin-TAP — a time-series forecasting system that predicts stock prices using LSTM networks and historical market data.",
    content: [
      { type: "p", text: "Predicting stock prices is one of the classic challenges in financial machine learning. When I started working on Fin-TAP, my goal was simple: build a system that could look at historical price data and give a reasonable short-term forecast." },
      { type: "h3", text: "Why LSTM?" },
      { type: "p", text: "Traditional models like ARIMA assume linear relationships in time-series data. Stock prices are anything but linear — they're noisy, non-stationary, and influenced by external factors. LSTM (Long Short-Term Memory) networks handle this naturally because they maintain a 'memory' of past states through their gating mechanism." },
      { type: "h3", text: "Architecture" },
      { type: "p", text: "The model takes a 60-day sliding window of closing prices as input. I stacked two LSTM layers (128 units each) with dropout regularization, followed by a dense output layer. The key insight was normalizing data per-stock using MinMaxScaler rather than globally — this prevented the model from treating a $5 stock the same as a $500 one." },
      { type: "h3", text: "Results & Lessons" },
      { type: "p", text: "On the test set, the model achieved a RMSE of around 2–4% for established stocks like AAPL. Volatile small-caps were harder to predict, as expected. The biggest lesson: feature engineering matters more than model complexity. Adding RSI and MACD indicators improved accuracy more than doubling the LSTM depth." },
    ],
  },
  {
    id: 2,
    title: "Brain Tumor Detection: CNN vs Transfer Learning",
    date: "Feb 20, 2025",
    readTime: "6 min read",
    tags: ["Python", "CNN", "Keras", "Medical AI"],
    summary: "Building a MRI brain tumor classifier — why I chose the Xception architecture over training a CNN from scratch, and what the results revealed.",
    content: [
      { type: "p", text: "Medical image classification is one of the most impactful applications of deep learning. In this project, I tackled the problem of classifying brain MRI scans into four categories: glioma, meningioma, pituitary tumor, and no tumor." },
      { type: "h3", text: "The Data Challenge" },
      { type: "p", text: "The dataset contained around 7,000 MRI images. While that sounds large, it's tiny by deep learning standards. Training a CNN from scratch with this little data leads to overfitting almost immediately — validation accuracy would plateau at ~70% while training accuracy hit 99%." },
      { type: "h3", text: "Why Xception?" },
      { type: "p", text: "Xception is a depthwise separable convolution network pre-trained on ImageNet. Despite being trained on natural photos (not MRIs), the low-level feature detectors — edges, textures, gradients — transfer surprisingly well to medical imaging. I froze the base model's weights and only trained the classification head on my data." },
      { type: "h3", text: "Training Strategy" },
      { type: "p", text: "After the initial head training converged, I unfroze the top 20% of the base model layers for fine-tuning with a very low learning rate (1e-5). This two-phase approach is standard transfer learning practice. Data augmentation (rotations, flips, zoom) was critical since MRI scans come in varied orientations." },
      { type: "h3", text: "Final Accuracy" },
      { type: "p", text: "The fine-tuned Xception model achieved 95.8% test accuracy across all four classes, with glioma being the hardest to distinguish from meningioma. This highlights a broader truth: even with limited data, transfer learning from a strong pretrained model dramatically outperforms training from scratch." },
    ],
  },
  {
    id: 3,
    title: "Building Desktop Apps with React + Tauri",
    date: "Mar 28, 2025",
    readTime: "4 min read",
    tags: ["React", "Tauri", "Rust", "Desktop"],
    summary: "Why I chose Tauri over Electron for my portfolio app, how the setup works, and what I'd do differently next time.",
    content: [
      { type: "p", text: "When I decided to build my portfolio as a desktop application (not just a website), I had two main options: Electron and Tauri. I chose Tauri — here's why, and what I learned." },
      { type: "h3", text: "Electron vs Tauri" },
      { type: "p", text: "Electron bundles an entire Chromium browser and Node.js runtime into every app. A minimal Electron app is 80–150MB. Tauri uses the OS's native WebView (Edge on Windows, WebKit on macOS/Linux) and a small Rust backend. My portfolio build is under 5MB — a 30x size difference." },
      { type: "h3", text: "The Rust Backend" },
      { type: "p", text: "Tauri's backend is written in Rust, which communicates with the React frontend via a message-passing API. For a simple portfolio, I barely needed the backend at all — just window management (decorations: false for the custom titlebar, transparent background). But knowing I could add native OS capabilities later is reassuring." },
      { type: "h3", text: "Custom Titlebar" },
      { type: "p", text: "Since I disabled the native window decorations, I had to build my own titlebar with minimize/maximize/close buttons. Tauri exposes window control commands as JS/TS APIs. The tricky part was the drag region — Tauri uses a `data-tauri-drag-region` attribute to mark draggable elements, which is clean to implement." },
      { type: "h3", text: "What I'd Do Differently" },
      { type: "p", text: "I'd set up the Tauri CLI configuration earlier in development. I spent time adjusting Vite's build settings to work with Tauri's asset loading. Also: test on macOS earlier — the WebKit renderer handles some CSS (especially backdrop-filter) differently than Chromium on Windows." },
    ],
  },
];

function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("introSeen"));
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeBlogPost, setActiveBlogPost] = useState(null);
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
      color: "#2F2FE4",
      glow: "rgba(47,47,228,0.25)",
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
      gradient: "linear-gradient(135deg, #162E93, #2F2FE4)",
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
      gradient: "linear-gradient(135deg, #1A1953, #2F2FE4)",
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
      gradient: "linear-gradient(135deg, #162E93, #1A1953)",
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
      gradient: "linear-gradient(135deg, #2F2FE4, #162E93)",
      image: "/p4.jpg",
      link: "https://github.com/BaranSafa/PersonalPortfolio",
    },
  ];

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
    { id: "blog",     icon: <FaBook />,        label: "Blog"     },
    { id: "contact",  icon: <FaEnvelope />,    label: "Contact"  },
  ];

  const handleNav = (id) => { setActiveTab(id); setSelectedProject(null); setActiveBlogPost(null); };
  const handleIntroComplete = () => { sessionStorage.setItem("introSeen", "1"); setShowIntro(false); };

  if (showIntro) return <IntroAnimation onComplete={handleIntroComplete} />;

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

                  <motion.div className="projects-grid" layout>
                    <AnimatePresence>
                      {projects.map((p) => (
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

              <div className="glass-card github-card">
                <h3 className="timeline-heading"><FaGithub /> GitHub Contributions</h3>
                <GitHubContributions username="BaranSafa" />
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

          {/* BLOG */}
          {activeTab === "blog" && (
            <motion.div
              key="blog"
              initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition}
              className="page-content"
            >
              {!activeBlogPost ? (
                <>
                  <h2 className="page-title">
                    Tech <span className="gradient-text">Blog</span>
                  </h2>
                  <p className="page-subtitle">
                    Notes on AI, deep learning, and web development from my projects.
                  </p>
                  <div className="blog-list">
                    {blogPosts.map((post, i) => (
                      <motion.div
                        key={post.id}
                        className="blog-card glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setActiveBlogPost(post)}
                      >
                        <div className="blog-card-meta">
                          <span className="blog-date"><FaClock /> {post.date}</span>
                          <span className="blog-read">{post.readTime}</span>
                        </div>
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-summary">{post.summary}</p>
                        <div className="blog-tags">
                          {post.tags.map(t => (
                            <span key={t} className="blog-tag"><FaTag /> {t}</span>
                          ))}
                        </div>
                        <div className="blog-card-footer">
                          <span className="view-details">Read Article <FaArrowRight /></span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="blog-post-view"
                >
                  <button className="back-link" onClick={() => setActiveBlogPost(null)}>
                    ← Back to Blog
                  </button>
                  <div className="blog-post-meta">
                    <span className="blog-date"><FaClock /> {activeBlogPost.date}</span>
                    <span className="blog-read">{activeBlogPost.readTime}</span>
                  </div>
                  <h1 className="blog-post-title">{activeBlogPost.title}</h1>
                  <div className="blog-tags" style={{ marginBottom: "32px" }}>
                    {activeBlogPost.tags.map(t => (
                      <span key={t} className="blog-tag"><FaTag /> {t}</span>
                    ))}
                  </div>
                  <div className="blog-post-body glass-card">
                    {activeBlogPost.content.map((block, i) =>
                      block.type === "h3"
                        ? <h3 key={i} className="blog-body-h3">{block.text}</h3>
                        : <p key={i} className="blog-body-p">{block.text}</p>
                    )}
                  </div>
                </motion.div>
              )}
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
