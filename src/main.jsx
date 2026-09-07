import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, Shield,
  Terminal, Radar, Activity, LockKeyhole, Network, Bug, FileSearch,
  ChevronDown, ExternalLink, Download, Menu, X, Code2, Server,
  Database, Eye, Zap
} from "lucide-react";
import CyberBackground from "./CyberBackground";
import "./styles.css";

const profile = {
  name: "Vikas Prajapati",
  title: "Security Analyst & Researcher",
  subtitle: "Threat Monitoring & SOC Operations",
  email: "vikasprajapati9882@gmail.com",
  phone: "9892513216",
  location: "Mumbai, Maharashtra",
  linkedin: "https://linkedin.com/in/vikas-prajapati-734b15311",
  github: "https://github.com/VikasPrajapati9882",
  avatar: "/portfolio/vikas-profile.png",
};

const skills = [
  ["Python", Code2], ["Burp Suite", Bug], ["Linux & Windows", Terminal],
  ["Networking", Network], ["Threat Intelligence", Radar], ["Nmap", Eye],
  ["Wireshark", Activity], ["Log Analysis", FileSearch], ["MITRE ATT&CK", Shield],
  ["Java", Code2], ["Flutter", Zap], ["Excel", Database]
];

const projects = [
  {
    featured: true,
    number: "01",
    title: "SentinelShield",
    type: "Real-Time Security Operations Center",
    description:
      "A real-time SOC dashboard for monitoring security alerts, analyzing threats, and tracking incidents.",
    details: [
      "Threat intelligence integration",
      "Severity-based security metrics",
      "Attack visualization",
      "Role-based access",
      "Real-time alerts using WebSockets"
    ],
    tags: ["Python", "Flask", "MySQL", "Socket.IO", "Chart.js"],
    icon: Shield
  },
  {
    number: "02",
    title: "Eduguidence",
    type: "College & Course Finding App",
    description:
      "A college and course discovery application helping students find suitable colleges and courses based on their requirements.",
    details: ["User-friendly interface", "Backend services", "College information", "Course information"],
    tags: ["Flutter", "Backend", "MySQL"],
    icon: Server
  },
  {
    number: "03",
    title: "Rent My Car",
    type: "Car Rental Website",
    description:
      "A web-based car rental platform where users can browse cars, view rental details, and make rental requests.",
    details: ["Car listings", "User information", "Rental details", "Rental operations"],
    tags: ["Web", "Backend", "Database"],
    icon: Network
  }
];

const terminalLogs = [
  {
    cmd: "system.status",
    status: "● monitoring active",
    statusClass: "ok",
    subCmd: "threat_scan --live",
    subRes: "→ telemetry connected",
    alert: "0 unresolved"
  },
  {
    cmd: "snort.ids --mode alert",
    status: "● signature engine primed",
    statusClass: "ok",
    subCmd: "packet_flow --inspect",
    subRes: "→ 0 anomalous payloads",
    alert: "all clear"
  },
  {
    cmd: "mitre.eval --matrix soc",
    status: "● 14 tactics mapped",
    statusClass: "cyan",
    subCmd: "ioc_query --feed virustotal",
    subRes: "→ hash reputation clean",
    alert: "0 indicators"
  },
  {
    cmd: "syslog_daemon --stream",
    status: "● ingestion: 1,420 eps",
    statusClass: "ok",
    subCmd: "firewall.log --block",
    subRes: "→ brute force dropped",
    alert: "1 mitigated"
  }
];

const sectors = [
  { id: "home", label: "01 HOME" },
  { id: "about", label: "02 ABOUT" },
  { id: "skills", label: "03 SKILLS" },
  { id: "projects", label: "04 PROJECTS" },
  { id: "lab", label: "05 LAB" },
  { id: "contact", label: "06 CONTACT" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [termIdx, setTermIdx] = useState(0);

  // Active scroll section and scroll progress tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const ids = ["home", "about", "skills", "projects", "lab", "contact"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 180) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Terminal simulated live stream
  useEffect(() => {
    const interval = setInterval(() => {
      setTermIdx((prev) => (prev + 1) % terminalLogs.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Re-triggerable scroll reveal observer (animates every time you scroll into view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          } else {
            // Re-trigger animation every time user scrolls away and back!
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10px 0px -10px 0px" }
    );

    const elements = document.querySelectorAll(
      ".reveal-fade, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .section-label"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentLog = terminalLogs[termIdx];

  return (
    <div className="app">
      {/* Scroll Progress Bar at the Top */}
      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Cyber Sector Navigation HUD */}
      <aside className="cyber-hud" aria-label="Sector Navigation">
        {sectors.map((s) => (
          <button
            key={s.id}
            className={`cyber-hud-btn ${active === s.id ? "active" : ""}`}
            onClick={() => go(s.id)}
            aria-label={`Go to ${s.label}`}
          >
            <span>{s.label}</span>
            <div className="hud-dot" />
          </button>
        ))}
      </aside>

      <CyberBackground />
      <div className="grid-bg" />
      <div className="noise" />

      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <button className="brand" onClick={() => go("home")} aria-label="Go home">
          <span className="brand-mark"><Shield size={22} /></span>
          <span>VP<span className="accent">.</span></span>
        </button>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {["home", "about", "skills", "projects", "lab", "contact"].map((item) => (
            <button key={item} className={active === item ? "active" : ""} onClick={() => go(item)}>
              {item}
            </button>
          ))}
          <a className="nav-resume" href="/Vikas_Prajapati_Resume.pdf" download>
            <Download size={17} /> Resume
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          {/* Left Side: "I am Security Analyst and Researcher" on top + Hero Content */}
          <div className="hero-content-side reveal-slide-left">
            <div className="hero-role-pill">
              <span className="pulse" />
              <span className="hero-role-text">I am Security Analyst and Researcher</span>
            </div>

            <h1 className="hero-title">
              Securing systems.<br />
              <span>Analyzing threats.</span>
            </h1>

            <p className="hero-sub">
              I’m <strong>Vikas Prajapati</strong>, a dedicated cybersecurity analyst and researcher focused on
              security operations, threat monitoring, log telemetry, and vulnerability assessment.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => go("projects")}>
                Explore Projects <ArrowUpRight size={20} />
              </button>
              <button className="ghost-btn" onClick={() => go("contact")}>
                Let’s Connect
              </button>
              <a className="ghost-btn resume-btn" href="/Vikas_Prajapati_Resume.pdf" download>
                <Download size={17} /> Resume
              </a>
            </div>

            <div className="social-row">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={19} /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} /> LinkedIn</a>
              <a href={`mailto:${profile.email}`}><Mail size={19} /> Email</a>
            </div>

            <div className="terminal-card hero-terminal">
              <div className="terminal-top">
                <span /><span /><span />
                <b>security_monitor.sh</b>
                <span className="terminal-badge">● LIVE TELEMETRY</span>
              </div>
              <div className="terminal-body">
                <p><i>$</i> {currentLog.cmd}</p>
                <p className={currentLog.statusClass}>{currentLog.status}</p>
                <p><i>$</i> {currentLog.subCmd}</p>
                <p className="cyan">{currentLog.subRes}</p>
                <p className="muted">
                  → alerts: <strong>{currentLog.alert}</strong>
                  <span className="terminal-cursor" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Vikas's Image in Cyber Profile Card */}
          <div className="hero-profile-side reveal-slide-right">
            <div className="profile-frame-wrapper">
              <div className="profile-orbital orbital-outer" />
              <div className="profile-orbital orbital-inner" />

              <div className="profile-card">
                <div className="cyber-corner corner-tl" />
                <div className="cyber-corner corner-tr" />
                <div className="cyber-corner corner-bl" />
                <div className="cyber-corner corner-br" />

                <div className="profile-card-header">
                  <div className="profile-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="profile-id-code">AGENT // VP-01</span>
                  <span className="profile-clearance">SOC LEVEL 1</span>
                </div>

                <div className="profile-img-box">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="profile-img"
                  />
                  <div className="profile-scanline" />
                  <div className="profile-vignette" />
                </div>

                <div className="profile-meta-bar">
                  <div className="profile-status">
                    <span className="pulse" />
                    <span className="status-text">DEFENSE ACTIVE</span>
                  </div>
                  <div className="profile-role-mini">ANALYST &amp; RESEARCHER</div>
                </div>
              </div>

              <div className="float-badge badge-top-right">
                <Shield size={16} />
                <span>SECURITY ANALYST</span>
              </div>
              <div className="float-badge badge-bottom-left">
                <Radar size={16} />
                <span>THREAT RESEARCH</span>
              </div>
            </div>
          </div>

          <button className="scroll-cue" onClick={() => go("about")} aria-label="Scroll to explore">
            <span>SCROLL TO EXPLORE</span><ChevronDown size={22} />
          </button>
        </section>

        <section id="about" className="section content-section">
          <div className="section-inner">
            <SectionLabel number="01" title="About Me" />
            <div className="about-grid reveal-scale">
              <div>
                <h2>Curious by nature.<br /><span>Security-minded by choice.</span></h2>
                <p className="large-copy">
                  I’m a BCA graduate with a strong foundation in application development and
                  hands-on experience building security-focused projects. I enjoy solving security
                  challenges, investigating suspicious activity, and continuously learning new
                  security concepts.
                </p>
              </div>
              <div className="info-panel">
                <div className="panel-title"><span className="live-dot" /> CURRENT FOCUS</div>
                <div className="focus-list">
                  <Focus icon={Shield} title="Security Operations" text="Monitoring, alert analysis & incident tracking" />
                  <Focus icon={Radar} title="Threat Intelligence" text="Investigating suspicious indicators & malicious IPs" />
                  <Focus icon={LockKeyhole} title="Application Security" text="Understanding vulnerabilities & secure design principles" />
                  <Focus icon="◇" title="Continuous Learning" text="Building practical cybersecurity skills & lab exercises" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section content-section">
          <div className="section-inner">
            <SectionLabel number="02" title="Skills & Toolkit" />
            <div className="skills-head reveal-slide-left">
              <h2>The tools I use to <span>think like an analyst.</span></h2>
              <p>A practical toolkit spanning security operations, networking, analysis, and application development.</p>
            </div>
            <div className="skill-grid">
              {skills.map(([name, Icon], idx) => (
                <div className={`skill-card reveal-fade delay-${idx + 1}`} key={name}>
                  <span className="skill-icon">{typeof Icon === "string" ? Icon : <Icon size={24} />}</span>
                  <span>{name}</span>
                  <span className="skill-arrow">↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section content-section projects-section">
          <div className="section-inner">
            <SectionLabel number="03" title="Selected Projects" />
            <div className="projects-intro reveal-slide-left">
              <h2>Built to solve <span>real problems.</span></h2>
              <p>Projects that combine modern development experience with an active cybersecurity operations mindset.</p>
            </div>

            <div className="featured-project reveal-scale">
              <div className="project-visual">
                <div className="soc-window">
                  <div className="soc-top">
                    <div><span /><span /><span /></div>
                    <small>SENTINELSHIELD / SOC</small>
                    <em>● LIVE</em>
                  </div>
                  <div className="soc-body">
                    <div className="soc-stats">
                      <MiniStat value="24" label="ALERTS" />
                      <MiniStat value="08" label="HIGH RISK" />
                      <MiniStat value="97%" label="UPTIME" />
                    </div>
                    <div className="chart">
                      <div className="chart-lines"><i /><i /><i /><i /></div>
                      <svg viewBox="0 0 420 130" preserveAspectRatio="none">
                        <polyline points="0,104 38,98 76,104 110,72 150,82 190,42 230,60 270,25 310,51 350,20 420,34" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="110" cy="72" r="4" fill="var(--accent)" className="chart-dot" />
                        <circle cx="190" cy="42" r="4" fill="var(--cyan)" className="chart-dot" />
                        <circle cx="270" cy="25" r="4" fill="var(--accent)" className="chart-dot" />
                        <circle cx="350" cy="20" r="4" fill="#ff7d7d" className="chart-dot" />
                      </svg>
                    </div>
                    <div className="alert-lines">
                      <AlertRow severity="HIGH" text="Possible Brute Force Attack" ip="185.22.xx.xx" />
                      <AlertRow severity="MED" text="Suspicious IP Detected" ip="103.71.xx.xx" />
                      <AlertRow severity="LOW" text="Normal Login Attempt" ip="192.168.xx.xx" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-copy">
                <span className="project-number">01 / FEATURED</span>
                <h3>SentinelShield</h3>
                <p className="project-type">REAL-TIME SECURITY OPERATIONS CENTER</p>
                <p>{projects[0].description}</p>
                <ul>{projects[0].details.map((x) => <li key={x}><span>+</span>{x}</li>)}</ul>
                <div className="tags">{projects[0].tags.map((t) => <span key={t}>{t}</span>)}</div>
                <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
                  View on GitHub <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="project-cards">
              {projects.slice(1).map((p, idx) => (
                <ProjectCard key={p.title} project={p} delayIndex={idx + 1} />
              ))}
            </div>
          </div>
        </section>

        <section id="lab" className="section content-section lab-section">
          <div className="section-inner">
            <SectionLabel number="04" title="Security Lab" />
            <div className="lab-grid reveal-scale">
              <div className="lab-copy">
                <h2>Learn it.<br /><span>Test it. Understand it.</span></h2>
                <p>
                  My cybersecurity learning is centered around practical investigation and
                  understanding how attacks and defenses work together.
                </p>
                <div className="lab-terminal">
                  <div className="terminal-top"><span /><span /><span /><b>lab_activity.log</b></div>
                  <div className="terminal-body">
                    <p><i>01</i> nmap → network enumeration & service discovery</p>
                    <p><i>02</i> wireshark → packet analysis & protocol dissection</p>
                    <p><i>03</i> burp suite → web application security testing</p>
                    <p><i>04</i> threat intel → indicator investigation & hash checks</p>
                    <p><i>05</i> mitre attack → tactic & technique mapping</p>
                  </div>
                </div>
              </div>
              <div className="lab-cards">
                <LabCard icon={Network} title="Network Analysis" text="Networking fundamentals, Nmap scanning and Wireshark packet analysis." delayIndex={1} />
                <LabCard icon={Bug} title="Web Security" text="Exploring application vulnerabilities and security testing with Burp Suite." delayIndex={2} />
                <LabCard icon={Radar} title="Threat Intelligence" text="Using threat intelligence concepts to investigate suspicious indicators." delayIndex={3} />
                <LabCard icon={FileSearch} title="Log Analysis" text="Reading security events and looking for patterns that may indicate attacks." delayIndex={4} />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-glow" />
          <SectionLabel number="05" title="Contact" />
          <div className="contact-content reveal-scale">
            <p className="eyebrow">HAVE A ROLE, PROJECT OR OPPORTUNITY?</p>
            <h2>Let’s build something<br /><span>more secure.</span></h2>
            <p className="contact-copy">
              I’m interested in entry-level cybersecurity and SOC opportunities where I can
              learn, contribute, and grow.
            </p>
            <a className="primary-btn big" href={`mailto:${profile.email}`}>
              Start a Conversation <ArrowUpRight size={20} />
            </a>
            <div className="contact-details">
              <a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
              <a href={`tel:${profile.phone}`}><Phone size={18} /> {profile.phone}</a>
              <span><MapPin size={18} /> {profile.location}</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div><span className="brand-mark small"><Shield size={16} /></span> VIKAS PRAJAPATI</div>
        <span>© 2026 · CYBERSECURITY PORTFOLIO</span>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ number, title }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      {title.toUpperCase()}
    </div>
  );
}
function Focus({ icon: Icon, title, text }) {
  return (
    <div className="focus-item">
      {typeof Icon === "string" ? (
        <span className="focus-icon">{Icon}</span>
      ) : (
        <Icon className="focus-icon" size={24} />
      )}
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}
function MiniStat({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}
function AlertRow({ severity, text, ip }) {
  return (
    <div className="alert-row">
      <span className={`severity ${severity.toLowerCase()}`}>{severity}</span>
      <span>{text}</span>
      <code>{ip}</code>
    </div>
  );
}
function ProjectCard({ project, delayIndex = 0 }) {
  const Icon = project.icon;
  return (
    <article className={`project-card reveal-fade delay-${delayIndex}`}>
      <div className="project-card-icon"><Icon size={26} /></div>
      <span className="project-number">{project.number}</span>
      <h3>{project.title}</h3>
      <p className="project-type">{project.type}</p>
      <p>{project.description}</p>
      <div className="card-details">{project.details.slice(0, 3).map((x) => <span key={x}>• {x}</span>)}</div>
      <div className="tags">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
    </article>
  );
}
function LabCard({ icon: Icon, title, text, delayIndex = 0 }) {
  return (
    <div className={`lab-card reveal-fade delay-${delayIndex}`}>
      <div className="lab-icon"><Icon size={25} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="lab-corner">↗</span>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
