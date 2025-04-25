import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Menu, X, Code, Server, Terminal, Database, Star, Zap, Award } from 'lucide-react';
import './styles/index.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animated, setAnimated] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [typing, setTyping] = useState(true);
  const [typeIndex, setTypeIndex] = useState(0);
  const titles = useMemo(() => ["Software Engineer", "C/C++ Developer", "Cloud Architect", "eBPF Specialist"], []);
  const [typeText, setTypeText] = useState("");
  
  // Mouse cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    if (cursorRef.current && cursorDotRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
      cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
  }, [mousePosition]);
  
  // Typing effect
  useEffect(() => {
    const currentTitle = titles[typeIndex];
    
    if (typing) {
      if (typeText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setTypeText(currentTitle.substring(0, typeText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setTyping(false);
        const timeout = setTimeout(() => {
          setTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typeText.length > 0) {
        const timeout = setTimeout(() => {
          setTypeText(typeText.substring(0, typeText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTyping(true);
        setTypeIndex((typeIndex + 1) % titles.length);
      }
    }
  }, [typeText, typing, typeIndex, titles]);

  // Scroll and animation effects
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 50);
      
      // Detect which section is in view
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });

      // Check for elements to animate
      document.querySelectorAll('.animate-on-scroll').forEach(elem => {
        const rect = elem.getBoundingClientRect();
        const id = elem.id;
        if (rect.top <= window.innerHeight * 0.85 && !animated[id]) {
          setAnimated(prev => ({ ...prev, [id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>
      
      {/* Background Effects */}
      <div className="background-effects">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>
        <div className="noise-overlay"></div>
        <div className="grid-overlay"></div>
      </div>
      
      {/* Navigation */}
      <nav className={`main-navigation ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo">
            <div className="logo-glitch" data-text="LS">LS</div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {['home', 'about', 'skills', 'experience', 'education', 'contact'].map((section) => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-item magnetic ${activeSection === section ? 'active' : ''}`}
                data-magnetic
              >
                <span className="nav-item-text">{section}</span>
                {activeSection === section && <span className="nav-item-indicator"></span>}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-items">
              {['home', 'about', 'skills', 'experience', 'education', 'contact'].map((section) => (
                <button 
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-item ${activeSection === section ? 'active' : ''}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="main-title">
                  <span className="first-name">Lokesh</span>
                  <span className="last-name">Shankar</span>
                </h1>
                <div className="title-container">
                  <h2 className="subtitle">
                    <span className="typed-text">{typeText}</span>
                    <span className="cursor-blink">|</span>
                  </h2>
                </div>
                <p className="hero-description">
                  A tech enthusiast with a passion for <span className="accent-text">high-performance systems</span>,
                  <span className="accent-text"> cloud architecture</span>, and
                  <span className="accent-text"> cutting-edge solutions</span>.
                </p>
                <div className="experience-chips">
                  <div className="experience-chip">
                    <Star className="chip-icon" size={16} />
                    <span>Cisco</span>
                  </div>
                  <div className="experience-chip">
                    <Zap className="chip-icon" size={16} />
                    <span>Publicis Sapient</span>
                  </div>
                  <div className="experience-chip">
                    <Award className="chip-icon" size={16} />
                    <span>Samsung</span>
                  </div>
                </div>
                <div className="hero-actions">
                  <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}} 
                    className="primary-button magnetic" data-magnetic>
                    <span>Contact Me</span>
                    <div className="button-effects"></div>
                  </a>
                  <a href="#experience" onClick={(e) => {e.preventDefault(); scrollToSection('experience');}}
                    className="secondary-button magnetic" data-magnetic>
                    <span>View Experience</span>
                  </a>
                </div>
              </div>
              <div className="hero-visual">
                <div className="profile-visual">
                  <div className="profile-frame">
                    <div className="profile-avatar">
                      <span>LS</span>
                    </div>
                    <div className="profile-frame-effects"></div>
                  </div>
                  <div className="tech-stack-orbit">
                    <div className="orbit-item orbit-item-1">C++</div>
                    <div className="orbit-item orbit-item-2">AWS</div>
                    <div className="orbit-item orbit-item-3">React</div>
                    <div className="orbit-item orbit-item-4">eBPF</div>
                    <div className="orbit-item orbit-item-5">Python</div>
                    <div className="orbit-item orbit-item-6">Linux</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-indicator">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <div className="scroll-text">Scroll Down</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">About Me</h2>
              <div className="section-subtitle">Who I Am</div>
            </div>
          </div>
          <div className="container">
            <div className="about-content">
              <div id="about-content" className="animate-on-scroll">
                <div className="about-summary">
                  <span className="emphasis">Software Engineer (4 yrs)</span> who sweats the bits and the business value.
                </div>
                <div className="about-cards">
                  <div className={`about-card glassy ${animated['about-content'] ? 'animated' : ''}`} style={{transitionDelay: '100ms'}}>
                    <Code className="card-icon" size={40} />
                    <div className="card-glow"></div>
                    <h3 className="card-title">Kernel Development</h3>
                    <p className="card-description">Embedded <span className="emphasis">eBPF packet tracing</span> into <span className="emphasis">AOSP kernels</span> and streamed telemetry for <span className="emphasis">150M</span> endpoints.</p>
                  </div>
                  <div className={`about-card glassy ${animated['about-content'] ? 'animated' : ''}`} style={{transitionDelay: '200ms'}}>
                    <Server className="card-icon" size={40} />
                    <div className="card-glow"></div>
                    <h3 className="card-title">Optimized Services</h3>
                    <p className="card-description">Designed Python/React services loading in <span className="emphasis">&lt; 80 ms</span> and slashed release cycles from <span className="emphasis">7 days to 5 hours</span>.</p>
                  </div>
                  <div className={`about-card glassy ${animated['about-content'] ? 'animated' : ''}`} style={{transitionDelay: '300ms'}}>
                    <Terminal className="card-icon" size={40} />
                    <div className="card-glow"></div>
                    <h3 className="card-title">Innovation</h3>
                    <p className="card-description"><span className="emphasis">3rd‑place winner</span>, Cisco Global Hackathon 2024; <span className="emphasis">open‑source contributor</span> with production-ready solutions.</p>
                  </div>
                </div>
                <div className="code-snippet-container">
                  <pre className="code-snippet">
                    <code>
                      <span className="code-comment">{'// A glimpse of who I am'}</span><br />
                      <span className="code-keyword">const</span> <span className="code-function">lokesh</span> = {"{"}
                      <br />
                      {"  "}<span className="code-property">passion</span>: <span className="code-string">"Building high-performance systems that scale"</span>,<br />
                      {"  "}<span className="code-property">strengths</span>: [<span className="code-string">"Problem Solving"</span>, <span className="code-string">"System Architecture"</span>, <span className="code-string">"Performance Optimization"</span>],<br />
                      {"  "}<span className="code-property">experience</span>: <span className="code-number">4</span> <span className="code-comment">{'// years and counting'}</span><br />
                      {"}"};
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">Core Skills</h2>
              <div className="section-subtitle">Technical Expertise</div>
            </div>
          </div>
          <div className="container">
            <div id="skills-content" className="skills-content animate-on-scroll">
              <div className="skills-grid">
                <div className={`skills-card glassy ${animated['skills-content'] ? 'animated' : ''} slide-right`}>
                  <h3 className="skills-card-title">
                    <Code size={24} className="icon" /> Languages & Frameworks
                  </h3>
                  <div className="card-glow"></div>
                  <div className="skill-bars">
                    <div className="skill-bar">
                      <div className="skill-header">
                        <span className="skill-name">Python</span>
                        <span className="skill-level">Advanced</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress skill-progress-1" style={{width: '95%'}}></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-header">
                        <span className="skill-name">C/C++</span>
                        <span className="skill-level">Advanced</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress skill-progress-2" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-header">
                        <span className="skill-name">Java</span>
                        <span className="skill-level">Proficient</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress skill-progress-3" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-header">
                        <span className="skill-name">React</span>
                        <span className="skill-level">Proficient</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress skill-progress-4" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-header">
                        <span className="skill-name">Flask</span>
                        <span className="skill-level">Advanced</span>
                      </div>
                      <div className="skill-progress-bg">
                        <div className="skill-progress skill-progress-5" style={{width: '90%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`skills-card glassy ${animated['skills-content'] ? 'animated' : ''} slide-left`}>
                  <h3 className="skills-card-title">
                    <Server size={24} className="icon" /> Cloud & Systems
                  </h3>
                  <div className="card-glow"></div>
                  <div className="cloud-skills">
                    {[
                      'AWS Lambda', 'API Gateway', 'S3', 'EC2', 'DynamoDB', 'Jenkins', 
                      'Docker', 'Linux Networking', 'eBPF', 'CI/CD', 'Datadog', 'Git'
                    ].map((skill, index) => (
                      <div key={index} className="cloud-skill">
                        <div className="skill-dot"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`strengths-card glassy ${animated['skills-content'] ? 'animated' : ''} slide-up`} style={{transitionDelay: '200ms'}}>
                <h3 className="skills-card-title">
                  <Database size={24} className="icon" /> Professional Strengths
                </h3>
                <div className="card-glow"></div>
                <div className="strength-tags">
                  {[
                    'System Optimization', 'Performance Tuning', 'Security', 'Data Analytics',
                    'APIs', 'Microservices', 'Cloud Infrastructure', 'Distributed Systems',
                    'Team Leadership', 'Automation', 'Problem Solving', 'Kernel Development'
                  ].map((skill, index) => (
                    <span key={index} className="strength-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">Experience</h2>
              <div className="section-subtitle">Professional Journey</div>
            </div>
          </div>
          <div className="container">
            <div id="experience-content" className="experience-content animate-on-scroll">
              {/* Timeline */}
              <div className="timeline">
                {/* Cisco */}
                <div className={`timeline-item ${animated['experience-content'] ? 'animated' : ''}`} style={{transitionDelay: '100ms'}}>
                  <div className="timeline-connector"></div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-header">
                    <h3 className="company-name">Cisco</h3>
                    <p className="date">July 2022 - Present</p>
                  </div>
                  <p className="job-title">Software Engineer - II</p>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Kernel‑Level Network Activity Logging & Tracing</h4>
                    <p className="project-subtitle">3rd place – Cisco Global Hackathon 2025</p>
                    <ul className="project-details">
                      <li>Modified the <span className="emphasis">Linux kernel</span> (C/C++, eBPF) for AOSP to trace packets, enabling real‑time capture with &lt; 2% CPU overhead.</li>
                      <li>Utilised <span className="emphasis">sk_filter, cgroups and a Ring Buffer</span> to stream metadata to userspace, cutting field‑issue debug time by 40%.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Security Module for Anomaly and Threat Detection</h4>
                    <ul className="project-details">
                      <li>Co‑designed a data‑collection pipeline <span className="emphasis">(Python, AWS Lambda, DynamoDB)</span> that ingests 600 GB logs per day from 100 K endpoints, reducing incident triage time by 35%.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Development of an Advanced Telemetry Dashboard</h4>
                    <ul className="project-details">
                      <li>Authored <span className="emphasis">REST APIs (Flask + Athena)</span> to fetch telemetry in &lt; 80 ms, and wired a serverless flow with API Gateway, Lambda, S3 and CloudWatch, saving $2 K/month in storage.</li>
                      <li>Built a live <span className="emphasis">ReactJS dashboard</span> that surfaces the health of 150 M AnyConnect devices, boosting NOC productivity by 20%.</li>
                    </ul>
                  </div>
                </div>
                
                {/* Publicis Sapient */}
                <div className={`timeline-item ${animated['experience-content'] ? 'animated' : ''}`} style={{transitionDelay: '300ms'}}>
                  <div className="timeline-connector"></div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-header">
                    <h3 className="company-name">Publicis Sapient</h3>
                    <p className="date">June 2021 - July 2022</p>
                  </div>
                  <p className="job-title">Software Development Engineer</p>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Hotel Booking Service Platform</h4>
                    <ul className="project-details">
                      <li>Designed a responsive booking UI and invoice <span className="emphasis">micro‑service</span>, increasing mobile conversion 12%.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Stock Exchange Platform Development</h4>
                    <ul className="project-details">
                      <li>Wrote core trading <span className="emphasis">APIs (Flask, AWS Lambda, DynamoDB)</span> with P99 latency &lt; 60 ms, sustaining 10 K concurrent trades.</li>
                      <li>Added unit tests to raise code coverage to 85%, cutting production bugs 10%.</li>
                    </ul>
                  </div>
                </div>
                
                {/* Samsung */}
                <div className={`timeline-item ${animated['experience-content'] ? 'animated' : ''}`} style={{transitionDelay: '500ms'}}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-header">
                    <h3 className="company-name">Samsung Digital Academy</h3>
                    <p className="date">April 2020 - July 2020</p>
                  </div>
                  <p className="job-title">Research Intern</p>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <ul className="project-details">
                      <li>Contributed to a project focusing on scalable security solutions using <span className="emphasis">C and OpenSSL</span>.</li>
                      <li>Conducted research on <span className="emphasis">cryptographic algorithms</span> and secure communication system designs.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="education-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">Education</h2>
              <div className="section-subtitle">Academic Background</div>
            </div>
          </div>
          <div className="container">
            <div id="education-content" className="education-content animate-on-scroll">
              <div className={`education-card glassy ${animated['education-content'] ? 'animated' : ''}`}>
                <div className="card-glow"></div>
                <div className="education-header">
                  <div>
                    <h3 className="university-name">Delhi Technological University</h3>
                    <p className="university-former">Formerly Delhi College of Engineering (DCE)</p>
                    <p className="degree">B.Tech in Information Technology</p>
                  </div>
                  <div className="education-year">
                    <p>2021</p>
                  </div>
                </div>
                <div className="education-details">
                  <p>Notable coursework in data structures, algorithms, computer networks, operating systems, and database management.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">Get In Touch</h2>
              <div className="section-subtitle">Let's Connect</div>
            </div>
          </div>
          <div className="container">
            <div id="contact-content" className="contact-content animate-on-scroll">
              <div className="contact-grid">
                <div className={`contact-info ${animated['contact-content'] ? 'animated' : ''} slide-right`}>
                  <h3 className="contact-subtitle">Contact Information</h3>
                  <div className="contact-methods">
                    <a href="mailto:shankardtu21@gmail.com" className="contact-method glassy magnetic" data-magnetic>
                      <div className="card-glow"></div>
                      <div className="contact-icon-container">
                        <Mail className="contact-icon" size={20} />
                      </div>
                      <div className="contact-details">
                        <p className="contact-type">Email</p>
                        <p className="contact-value">shankardtu21@gmail.com</p>
                      </div>
                    </a>
                    
                    <a href="tel:+917291871525" className="contact-method glassy magnetic" data-magnetic>
                      <div className="card-glow"></div>
                      <div className="contact-icon-container">
                        <Phone className="contact-icon" size={20} />
                      </div>
                      <div className="contact-details">
                        <p className="contact-type">Phone</p>
                        <p className="contact-value">+91 72918 71525</p>
                      </div>
                    </a>
                    
                    <a href="https://linkedin.com/in/shankardtu21" target="_blank" rel="noopener noreferrer" 
                      className="contact-method glassy magnetic" data-magnetic>
                      <div className="card-glow"></div>
                      <div className="contact-icon-container">
                        <Linkedin className="contact-icon" size={20} />
                      </div>
                      <div className="contact-details">
                        <p className="contact-type">LinkedIn</p>
                        <p className="contact-value">@shankardtu21</p>
                      </div>
                      <ExternalLink size={16} className="external-link-icon" />
                    </a>
                  </div>
                </div>
                
                <div className={`contact-card ${animated['contact-content'] ? 'animated' : ''} slide-left`} style={{transitionDelay: '200ms'}}>
                  <div className="contact-card-background"></div>
                  <h3 className="contact-card-title">Let's Connect</h3>
                  <p className="contact-card-description">
                    Whether you have a project in mind, job opportunity, or just want to say hello, I'd love to hear from you.
                  </p>
                  
                  <div className="availability-list">
                    <div className="availability-item">
                      <div className="availability-indicator"></div>
                      <p>Open to remote opportunities</p>
                    </div>
                    <div className="availability-item">
                      <div className="availability-indicator"></div>
                      <p>Available for consulting</p>
                    </div>
                    <div className="availability-item">
                      <div className="availability-indicator"></div>
                      <p>Interested in collaborative projects</p>
                    </div>
                  </div>
                  
                  <a href="https://github.com/shankardtu" target="_blank" rel="noopener noreferrer" 
                    className="github-link magnetic" data-magnetic>
                    <Github size={18} />
                    <span>Check out my GitHub</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                <div className="logo-glitch" data-text="LS">LS</div>
              </div>
              <p className="footer-description">Software Engineer specializing in high-performance systems, cloud infrastructure, and innovative solutions.</p>
              <div className="footer-social">
                <a href="mailto:shankardtu21@gmail.com" className="footer-social-link magnetic" data-magnetic>
                  <Mail size={20} />
                </a>
                <a href="https://linkedin.com/in/shankardtu21" target="_blank" rel="noopener noreferrer" className="footer-social-link magnetic" data-magnetic>
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/shankardtu" target="_blank" rel="noopener noreferrer" className="footer-social-link magnetic" data-magnetic>
                  <Github size={20} />
                </a>
              </div>
            </div>
            <div className="footer-copyright">
              <p>© {new Date().getFullYear()} Lokesh Shankar. All rights reserved.</p>
            </div>
          </div>
          
          {/* Animated footer pattern */}
          <div className="footer-pattern">
            <svg width="100%" height="100" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 L0,120 L1200,120 L1200,0 Q600,120 0,0" className="footer-wave"></path>
            </svg>
          </div>
        </footer>
      </div>
      
      {/* Custom magnetic button effect */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Magnetic effect for buttons and interactive elements
          document.addEventListener('DOMContentLoaded', function() {
            const magneticItems = document.querySelectorAll('[data-magnetic]');
            
            magneticItems.forEach(item => {
              item.addEventListener('mousemove', function(e) {
                const position = item.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                item.style.transform = 'translate(' + x * 0.3 + 'px, ' + y * 0.3 + 'px)';
              });
              
              item.addEventListener('mouseout', function() {
                item.style.transform = 'translate(0px, 0px)';
              });
            });
          });
        `
      }} />
    </div>
  );
};

export default Portfolio;