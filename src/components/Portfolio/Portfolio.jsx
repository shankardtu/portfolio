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
  const titles = useMemo(() => ["System Architect", "Scale Engineer", "Cloud Infrastructure Lead", "Distributed Systems Expert"], []);
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
      const sections = ['home', 'about', 'skills', 'design', 'experience', 'education', 'contact'];
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
            {['home', 'about', 'skills', 'design', 'experience', 'education', 'contact'].map((section) => (
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
              {['home', 'about', 'skills', 'design', 'experience', 'education', 'contact'].map((section) => (
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
                  Software Engineer (4.5 Yrs+) with expertise in <span className="accent-text">distributed data pipelines</span>,
                  <span className="accent-text"> cloud-native systems</span>, and
                  <span className="accent-text"> automation workflows at scale</span>.
                </p>
                <div className="experience-chips">
                  <div className="experience-chip">
                    <Star className="chip-icon" size={16} />
                    <span>Amazon</span>
                  </div>
                  <div className="experience-chip">
                    <Star className="chip-icon" size={16} />
                    <span>Cisco</span>
                  </div>
                  <div className="experience-chip">
                    <Zap className="chip-icon" size={16} />
                    <span>Publicis Sapient</span>
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
                <div className="impact-showcase">
                  <div className="architecture-diagram">
                    <div className="arch-node arch-node-left">
                      <div className="node-label">High-Throughput</div>
                      <div className="node-sublabel">600 GB/day</div>
                    </div>
                    <div className="arch-connector arch-connector-top"></div>
                    <div className="arch-node arch-node-center">
                      <div className="node-label">Intelligent</div>
                      <div className="node-sublabel">50% MTTR ↓</div>
                    </div>
                    <div className="arch-connector arch-connector-bottom"></div>
                    <div className="arch-node arch-node-right">
                      <div className="node-label">Secure at Scale</div>
                      <div className="node-sublabel">40M+ Users</div>
                    </div>
                  </div>
                  <div className="expertise-layers">
                    <div className="layer layer-1">Process Massive Data</div>
                    <div className="layer layer-2">Automate Intelligence</div>
                    <div className="layer layer-3">Protect at Scale</div>
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

        {/* Achievements Section */}
        <section id="achievements" className="achievements-section">
          <div className="container">
            <div className="achievements-grid">
              <div className="achievement-item">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-metric">3rd Place</div>
                <div className="achievement-label">Cisco Global Hackathon 2025</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">⚡</div>
                <div className="achievement-metric">600 GB/day</div>
                <div className="achievement-label">Data Pipeline Throughput</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">📊</div>
                <div className="achievement-metric">150M+</div>
                <div className="achievement-label">Devices at Scale</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">🔒</div>
                <div className="achievement-metric">40M+</div>
                <div className="achievement-label">Secure Users Protected</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">⏱️</div>
                <div className="achievement-metric">50% ↓</div>
                <div className="achievement-label">MTTR Reduction via AI-RCA</div>
              </div>
              <div className="achievement-item">
                <div className="achievement-icon">💰</div>
                <div className="achievement-metric">$2K/month</div>
                <div className="achievement-label">Cloud Cost Optimization</div>
              </div>
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
                  <span className="emphasis">Software Engineer (4.5 Yrs+)</span> specializing in building <span className="emphasis">distributed data pipelines</span>, <span className="emphasis">cloud-native systems</span>, and <span className="emphasis">automation workflows at scale</span>. Led ingestion platforms processing <span className="emphasis">600 GB/day</span> from <span className="emphasis">100K+ endpoints</span>, dashboards for <span className="emphasis">150M+ devices</span>, and secure access systems for <span className="emphasis">40M+ users</span>.
                </div>
                <div className="about-cards">
                  <div className={`about-card glassy ${animated['about-content'] ? 'animated' : ''}`} style={{transitionDelay: '100ms'}}>
                    <Code className="card-icon" size={40} />
                    <div className="card-glow"></div>
                    <h3 className="card-title">Data at Scale</h3>
                    <p className="card-description">Built <span className="emphasis">600 GB/day ingestion pipelines</span> from <span className="emphasis">100K+ endpoints</span> with real-time processing and anomaly detection.</p>
                  </div>
                  <div className={`about-card glassy ${animated['about-content'] ? 'animated' : ''}`} style={{transitionDelay: '200ms'}}>
                    <Server className="card-icon" size={40} />
                    <div className="card-glow"></div>
                    <h3 className="card-title">Systems & Infrastructure</h3>
                    <p className="card-description">Architected <span className="emphasis">kernel-level tracing with eBPF</span>, event-driven workflows with <span className="emphasis">AWS Step Functions</span>, and secure identity systems.</p>
                  </div>
                  <div className={`about-card glassy ${animated['about-content'] ? 'animated' : ''}`} style={{transitionDelay: '300ms'}}>
                    <Terminal className="card-icon" size={40} />
                    <div className="card-glow"></div>
                    <h3 className="card-title">AI-Powered RCA</h3>
                    <p className="card-description">Built intelligent platform analyzing <span className="emphasis">logs & code changes</span> in real-time, <span className="emphasis">cutting MTTR by 50%</span>.</p>
                  </div>
                </div>
                <div className="code-snippet-container">
                  <pre className="code-snippet">
                    <code>
                      <span className="code-comment">{'// A glimpse of who I am'}</span><br />
                      <span className="code-keyword">const</span> <span className="code-function">lokesh</span> = {"{"}
                      <br />
                      {"  "}<span className="code-property">expertise</span>: <span className="code-string">"Distributed Pipelines, Cloud-Native Systems, eBPF"</span>,<br />
                      {"  "}<span className="code-property">focus</span>: [<span className="code-string">"AWS Step Functions"</span>, <span className="code-string">"Event-Driven"</span>, <span className="code-string">"AI-RCA"</span>],<br />
                      {"  "}<span className="code-property">experience</span>: <span className="code-number">4.5</span> <span className="code-comment">{'// years scaling production systems'}</span><br />
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
                      'AWS Lambda', 'API Gateway', 'S3', 'DynamoDB', 'Athena', 'Glue', 'EC2', 'Step Functions',
                      'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Kafka'
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
                    'Distributed Pipelines', 'Event-Driven Architecture', 'AWS Cloud', 'eBPF/Kernel',
                    'OAuth 2.1', 'OIDC', 'SCIM', 'JWT', 'Token Exchange', 'Security/Identity',
                    'Kafka', 'DynamoDB', 'System Design', 'Microservices', 'Linux Networking'
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

        {/* System Design & Architecture Section */}
        <section id="design" className="design-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">System Design & Architecture</h2>
              <div className="section-subtitle">HLD, LLD & DSA Expertise</div>
            </div>
          </div>
          <div className="container">
            <div id="design-content" className="design-content animate-on-scroll">
              <div className="design-grid">
                <div className={`design-card glassy ${animated['design-content'] ? 'animated' : ''}`} style={{transitionDelay: '100ms'}}>
                  <div className="card-glow"></div>
                  <div className="design-header">
                    <div className="design-badge-large hld">HLD</div>
                    <h3>High-Level Design</h3>
                  </div>
                  <div className="design-examples">
                    <p className="design-label">Architectural Patterns:</p>
                    <ul className="example-list">
                      <li><span className="emphasis">Event-Driven Architecture</span> – AWS Step Functions, S3 triggers, async workflows</li>
                      <li><span className="emphasis">Distributed Pipelines</span> – 600 GB/day ingestion, multi-stage processing</li>
                      <li><span className="emphasis">Microservices</span> – Decoupled services, fault isolation, scaling</li>
                      <li><span className="emphasis">API Gateway Patterns</span> – Rate limiting, auth, request routing (40M+ users)</li>
                    </ul>
                  </div>
                </div>

                <div className={`design-card glassy ${animated['design-content'] ? 'animated' : ''}`} style={{transitionDelay: '200ms'}}>
                  <div className="card-glow"></div>
                  <div className="design-header">
                    <div className="design-badge-large lld">LLD</div>
                    <h3>Low-Level Design</h3>
                  </div>
                  <div className="design-examples">
                    <p className="design-label">Implementation Details:</p>
                    <ul className="example-list">
                      <li><span className="emphasis">eBPF/Kernel Programming</span> – Ring buffers, cgroups, syscall tracing (&lt;2% overhead)</li>
                      <li><span className="emphasis">API Design</span> – REST/GraphQL, OpenAPI, &lt;60ms P99 latency</li>
                      <li><span className="emphasis">Database Optimization</span> – Query design, indexing, saved $2K/month costs</li>
                      <li><span className="emphasis">State Management</span> – JWT/OAuth 2.1, token exchange, identity delegation</li>
                    </ul>
                  </div>
                </div>

                <div className={`design-card glassy ${animated['design-content'] ? 'animated' : ''}`} style={{transitionDelay: '300ms'}}>
                  <div className="card-glow"></div>
                  <div className="design-header">
                    <div className="design-badge-large dsa">DSA</div>
                    <h3>Data Structures & Algorithms</h3>
                  </div>
                  <div className="design-examples">
                    <p className="design-label">Optimization & Problem Solving:</p>
                    <ul className="example-list">
                      <li><span className="emphasis">Test Automation Framework</span> – 7 days → 5 hrs (parallelization, scheduling algorithms)</li>
                      <li><span className="emphasis">Anomaly Detection</span> – Structured data processing, 35% faster triage</li>
                      <li><span className="emphasis">RCA Analysis</span> – Graph traversal, log aggregation, root cause trees</li>
                      <li><span className="emphasis">ETL Pipelines</span> – Data transformation, 99% quality, handling 100K+ endpoints</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`design-matrix glassy ${animated['design-content'] ? 'animated' : ''}`} style={{transitionDelay: '400ms'}}>
                <h3 className="matrix-title">Design Expertise Matrix</h3>
                <div className="matrix-grid">
                  <div className="matrix-cell">
                    <div className="matrix-label">Scale & Performance</div>
                    <div className="matrix-scope">600 GB/day pipelines • 150M+ devices • 40M+ users • &lt;60ms P99</div>
                  </div>
                  <div className="matrix-cell">
                    <div className="matrix-label">Distributed Systems</div>
                    <div className="matrix-scope">Event-driven workflows • Microservices • Async processing • Fault tolerance</div>
                  </div>
                  <div className="matrix-cell">
                    <div className="matrix-label">Security & Identity</div>
                    <div className="matrix-scope">OAuth 2.1 • OIDC • Token Exchange • SCIM • JWT • SSO</div>
                  </div>
                  <div className="matrix-cell">
                    <div className="matrix-label">Systems & Optimization</div>
                    <div className="matrix-scope">eBPF/Kernel • Linux Networking • Query Optimization • Algorithm Design</div>
                  </div>
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
                {/* Amazon */}
                <div className={`timeline-item ${animated['experience-content'] ? 'animated' : ''}`} style={{transitionDelay: '100ms'}}>
                  <div className="timeline-connector"></div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-header">
                    <h3 className="company-name">Amazon</h3>
                    <p className="date">Oct 2025 - Present</p>
                  </div>
                  <p className="job-title">SDE - II</p>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Event-Driven Workflow Automation</h4>
                    <div className="design-badges">
                      <span className="design-badge hld">HLD</span>
                      <span className="design-badge arch">Architecture</span>
                    </div>
                    <ul className="project-details">
                      <li>Designed event-driven job orchestration via <span className="emphasis">AWS Step Functions</span> and <span className="emphasis">S3 triggers</span>.</li>
                      <li>Cut <span className="emphasis">1–2 hrs/week</span> of manual effort with reliable, hands-free execution.</li>
                      <li>Orchestrated <span className="emphasis">multi-job workflows</span> with <span className="emphasis">audit trails, retry logic, and parallelism</span>.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Oncall Assistant – AI-Powered Root Cause Analysis Platform</h4>
                    <div className="design-badges">
                      <span className="design-badge hld">HLD</span>
                      <span className="design-badge lld">LLD</span>
                      <span className="design-badge arch">System Design</span>
                    </div>
                    <ul className="project-details">
                      <li>Built intelligent <span className="emphasis">RCA platform</span> analyzing <span className="emphasis">logs, traces, and code changes</span> in real-time.</li>
                      <li><span className="emphasis">Cut MTTR by 30–50%</span>, saving <span className="emphasis">5–7 hrs/week</span> and improving incident investigation quality.</li>
                      <li>Automated <span className="emphasis">RCA report generation</span> with actionable root causes and fix suggestions.</li>
                    </ul>
                  </div>
                </div>
                
                {/* Cisco */}
                <div className={`timeline-item ${animated['experience-content'] ? 'animated' : ''}`} style={{transitionDelay: '200ms'}}>
                  <div className="timeline-connector"></div>
                  <div className="timeline-marker"></div>
                  <div className="timeline-header">
                    <h3 className="company-name">Cisco</h3>
                    <p className="date">July 2022 - Oct 2025</p>
                  </div>
                  <p className="job-title">Software Engineer - II & III</p>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Cross-App Access Platform (Duo + Resource Providers PoC)</h4>
                    <div className="design-badges">
                      <span className="design-badge hld">HLD</span>
                      <span className="design-badge lld">LLD</span>
                      <span className="design-badge sec">Security</span>
                    </div>
                    <ul className="project-details">
                      <li>Designed <span className="emphasis">PoC enabling SSO</span> with <span className="emphasis">token exchange</span> for cross-platform access via Duo.</li>
                      <li>Built service validating tokens and issuing delegated credentials using identity standards.</li>
                      <li>Centralized authorization via <span className="emphasis">AWS Lambda</span>, improving security for <span className="emphasis">40M+ daily users</span>.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Kernel‑Level Network Activity Logging & Tracing</h4>
                    <p className="project-details-note">3rd place – Cisco Global Hackathon 2025</p>
                    <div className="design-badges">
                      <span className="design-badge lld">LLD</span>
                      <span className="design-badge dsa">DSA</span>
                      <span className="design-badge sys">Systems</span>
                    </div>
                    <ul className="project-details">
                      <li>Modified <span className="emphasis">AOSP kernel</span> using <span className="emphasis">C/eBPF</span> to trace packets with <span className="emphasis">&lt;2% CPU overhead</span>.</li>
                      <li>Reduced debug effort by <span className="emphasis">40%</span> with real-time telemetry streamed from userspace.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Security Module for Anomaly and Threat Detection</h4>
                    <div className="design-badges">
                      <span className="design-badge hld">HLD</span>
                      <span className="design-badge dsa">DSA</span>
                      <span className="design-badge arch">Pipeline</span>
                    </div>
                    <ul className="project-details">
                      <li>Built <span className="emphasis">serverless ingestion pipeline</span> processing <span className="emphasis">600 GB/day</span> from <span className="emphasis">100K endpoints</span>.</li>
                      <li>Improved <span className="emphasis">triage speed by 35%</span> through structured anomaly detection data.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Advanced Telemetry Dashboard</h4>
                    <div className="design-badges">
                      <span className="design-badge hld">HLD</span>
                      <span className="design-badge lld">LLD</span>
                      <span className="design-badge dsa">Optimization</span>
                    </div>
                    <ul className="project-details">
                      <li>Delivered <span className="emphasis">REST APIs</span> and <span className="emphasis">serverless backend</span> powering dashboards for <span className="emphasis">150M+ devices</span>.</li>
                      <li>Reduced <span className="emphasis">cloud storage costs by $2K/month</span> with optimized data query design.</li>
                    </ul>
                  </div>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Distributed Test ‑ Automation Framework</h4>
                    <div className="design-badges">
                      <span className="design-badge dsa">DSA</span>
                      <span className="design-badge hld">HLD</span>
                      <span className="design-badge arch">Framework</span>
                    </div>
                    <ul className="project-details">
                      <li>Cut <span className="emphasis">regression test time from 7 days to 5 hrs</span> with <span className="emphasis">PyTest + AWS-based automation</span>.</li>
                      <li>Boosted <span className="emphasis">ETL data quality to 99%</span> and <span className="emphasis">reduced release defects by 25%</span>.</li>
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
                    <h4 className="project-title">Trading Platform & Flask APIs</h4>
                    <div className="design-badges">
                      <span className="design-badge lld">LLD</span>
                      <span className="design-badge dsa">DSA</span>
                      <span className="design-badge perf">Performance</span>
                    </div>
                    <ul className="project-details">
                      <li>Built <span className="emphasis">Flask APIs with &lt;60 ms P99 latency</span>, supporting <span className="emphasis">10K+ concurrent trading users</span>.</li>
                      <li>Designed <span className="emphasis">UI and invoicing flows</span> that <span className="emphasis">increased mobile conversion by 12%</span>.</li>
                    </ul>
                  </div>
                </div>
                
                {/* Samsung */}
                <div className={`timeline-item ${animated['experience-content'] ? 'animated' : ''}`} style={{transitionDelay: '400ms'}}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-header">
                    <h3 className="company-name">Samsung Digital Academy</h3>
                    <p className="date">April 2020 - July 2020</p>
                  </div>
                  <p className="job-title">Research Intern</p>
                  
                  <div className="project-card glassy">
                    <div className="card-glow"></div>
                    <h4 className="project-title">Cryptographic Algorithms & Secure Data Transmission Research</h4>
                    <div className="design-badges">
                      <span className="design-badge lld">LLD</span>
                      <span className="design-badge dsa">DSA</span>
                      <span className="design-badge perf">Performance</span>
                    </div>
                    <ul className="project-details">
                      <li>Developed and benchmarked <span className="emphasis">cryptographic algorithms</span> using <span className="emphasis">C and OpenSSL</span>, optimizing for embedded systems.</li>
                      <li>Researched <span className="emphasis">scalable approaches</span> to secure data transmission with performance analysis on resource-constrained devices.</li>
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
                  <p className="coursework-label">Key Coursework:</p>
                  <div className="coursework-tags">
                    <span>Data Structures</span>
                    <span>Algorithms</span>
                    <span>OS & Networking</span>
                    <span>Databases</span>
                    <span>System Design</span>
                    <span>Distributed Computing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="section-header">
            <div className="section-title-container">
              <h2 className="section-title">Let's Work Together</h2>
              <div className="section-subtitle">Build infrastructure that scales</div>
            </div>
          </div>
          <div className="container">
            <div id="contact-content" className="contact-content animate-on-scroll">
              <div className="contact-layout-two-col">
                {/* Left Column - Contact Methods */}
                <div className={`contact-col left-col ${animated['contact-content'] ? 'animated' : ''}`} style={{transitionDelay: '100ms'}}>
                  <h3 className="col-section-title">Connect</h3>
                  <div className="contact-list">
                    <a href="mailto:shankardtu21@gmail.com" className="contact-item">
                      <div className="contact-item-icon">
                        <Mail size={24} />
                      </div>
                      <div className="contact-item-content">
                        <span className="contact-item-label">Email</span>
                        <span className="contact-item-value">shankardtu21@gmail.com</span>
                      </div>
                    </a>
                    <a href="https://linkedin.com/in/shankardtu21" target="_blank" rel="noopener noreferrer" className="contact-item">
                      <div className="contact-item-icon">
                        <Linkedin size={24} />
                      </div>
                      <div className="contact-item-content">
                        <span className="contact-item-label">LinkedIn</span>
                        <span className="contact-item-value">shankardtu21</span>
                      </div>
                    </a>
                    <a href="https://github.com/shankardtu" target="_blank" rel="noopener noreferrer" className="contact-item">
                      <div className="contact-item-icon">
                        <Github size={24} />
                      </div>
                      <div className="contact-item-content">
                        <span className="contact-item-label">GitHub</span>
                        <span className="contact-item-value">shankardtu</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right Column - CTA + Info */}
                <div className={`contact-col right-col ${animated['contact-content'] ? 'animated' : ''}`} style={{transitionDelay: '200ms'}}>
                  {/* CTA Section */}
                  <div className="cta-section">
                    <p className="cta-message">Let's talk about building next-generation infrastructure</p>
                    <a href="mailto:shankardtu21@gmail.com" className="cta-button primary magnetic" data-magnetic>
                      Start a Conversation
                    </a>
                  </div>

                  {/* Availability */}
                  <div className="availability-info">
                    <div className="availability-label">
                      <span className="status-dot"></span>
                      <span>Actively exploring</span>
                    </div>
                    <div className="availability-locations">Remote • India • Relocation Open</div>
                  </div>
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
