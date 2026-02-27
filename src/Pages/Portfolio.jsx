import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Contact from "../Component/Contact";

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 88 },
    { name: "JavaScript (ES6+)", level: 92 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Redux Toolkit", level: 85 },
  ],
  Backend: [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 88 },
    { name: "REST API", level: 92 },
    { name: "GraphQL", level: 78 },
    { name: "JWT / Auth", level: 85 },
  ],
  Database: [
    { name: "MongoDB", level: 90 },
    { name: "Mongoose", level: 88 },
    { name: "Firebase", level: 80 },
    { name: "PostgreSQL", level: 72 },
    { name: "Redis", level: 68 },
  ],
  DevOps: [
    { name: "Git & GitHub", level: 93 },
    { name: "Docker", level: 75 },
    { name: "AWS (EC2/S3)", level: 70 },
    { name: "Vercel / Netlify", level: 90 },
    { name: "CI/CD", level: 72 },
  ],
};

const PROJECTS = [
  {
    title: "Company Template - HTML + Bootstrap Project ",
    desc: "Full-stack e-commerce app with real-time cart, Stripe payments, admin dashboard, JWT auth, and product filtering.",
    tech: ["HTML", "CSS.js", "Bootstrap", "Javascript"],
    color: "#00F5A0",
    link: "https://riya-bootstrap-template-1.netlify.app/",
    github: "#",
    emoji: "📈",
  },
  {
    title: "Interior Designer Template - HTML + Bootstrap Project",
    desc: "Developer-focused social platform with posts, real-time chat via Socket.io, GitHub profile integration, and notifications.",
    tech: ["HTML", "CSS.js", "Bootstrap", "Javascript"],
    color: "#00D9F5",
    link: "https://interior-design-template-2.netlify.app/",
    github: "#",
    emoji: "🔗",
  },
  {
    title: "FashonStore - Ecommerce Project",
    desc: "Trello-like drag-and-drop task manager with team collaboration, file uploads, role-based access, and activity logs.",
    tech: ["React.js", "Tailwind", "Node.js", "MongoDB", "Express"],
    color: "#F5A623",
    link: "https://fashionstore-mern.vercel.app/",
    github: "https://github.com/riya2704-coder/fashionstore-mern.git",
    emoji: "🛒",
  },
  {
    title: "Live Ecommerce Project - Nidhivan ",
    desc: "Healthcare appointment platform with doctor profiles, real-time slot management, notifications, and Razorpay integration.",
    tech: ["React.js", "Tailwind", "Node.js", "MongoDB", "Express"],
    color: "#FF6B9D",
    link: "https://nidhivan-mern.vercel.app/",
    github: "https://github.com/riya2704-coder/Nidhivan-mern.git",
    emoji: "🏥",
  }
];



// ── UTILITY ───────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="mb-5"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-gray-300">{name}</span>
        <span className="text-sm font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="relative group rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "#0f1117", border: `1px solid ${project.color}22` }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: `0 24px 48px ${project.color}22` }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}15, transparent 70%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
      />
      <div className="p-6">
        <div className="text-4xl mb-4">{project.emoji}</div>
        <h3 className="text-lg font-bold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-md font-medium"
              style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              {t}
            </span>
          ))}
        </div>
        <motion.div className="flex gap-3" animate={{ opacity: hovered ? 1 : 0.6 }}>
          <a
            href={project.link}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: project.color, color: "#000" }}
          >
            <span>Live Demo</span>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </a>
          <a
            href={project.github}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all hover:bg-white/5"
            style={{ borderColor: `${project.color}40`, color: project.color }}
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(scrollYProgress, [0, 0.05], ["rgba(5,6,15,0)", "rgba(5,6,15,0.95)"]);

  const roles = ["Full Stack Developer", "MERN Stack Expert", "React Specialist", "Node.js Developer", "MongoDB Engineer"];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2500);
    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("yourname@email.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "#05060f", fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05060f; }
        ::-webkit-scrollbar-thumb { background: #00F5A0; border-radius: 2px; }
        html { scroll-behavior: smooth; }
        .glow-green { text-shadow: 0 0 40px #00F5A088; }
        .section-pad { padding: 100px 0; }
        .grid-bg {
          background-image: linear-gradient(rgba(0,245,160,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,245,160,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #00F5A0, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #00D9F5, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)" }} />
      </div>

      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "left", background: "linear-gradient(90deg, #00F5A0, #00D9F5)" }}
      />

      {/* ── NAVBAR ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-6 backdrop-blur-xl border-b border-white/5"
        style={{ background: headerBg }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl tracking-tight"
          >
            <span className="text-white">dev</span>
            <span style={{ color: "#00F5A0" }}>{"<Riya />"}</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActiveNav(link)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: activeNav === link ? "#00F5A0" : "#9ca3af" }}
                whileHover={{ color: "#00F5A0" }}
              >
                {link}
                {activeNav === link && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(0,245,160,0.08)", border: "1px solid rgba(0,245,160,0.2)" }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px #00F5A044" }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block px-5 py-2 text-sm font-semibold rounded-lg text-black"
            style={{ background: "linear-gradient(135deg, #00F5A0, #00D9F5)" }}
          >
            Hire Me
          </motion.a>

          <motion.button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#00F5A0" }}
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>
              }
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 py-3"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium"
                  style={{ color: "#9ca3af" }}
                >
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO ── */}
      <section id="home" className="min-h-screen flex items-center pt-16 section-pad relative z-10">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
                style={{ background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.25)", color: "#00F5A0" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Freelance &amp; Full-time
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-6xl font-extrabold leading-tight mb-4"
              >
                Hi, I'm{" "}
                <span className="glow-green" style={{ color: "#00F5A0" }}>Riya</span>
                <br />
                <span className="text-white">Shinde</span>
              </motion.h1>

              <div className="h-10 mb-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roleIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-semibold"
                    style={{ color: "#00D9F5" }}
                  >
                    {roles[roleIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg"
              >
                I craft end-to-end web applications with React, Node.js, Express &amp; MongoDB.
                From pixel-perfect UIs to robust backends — I turn ideas into scalable, real-world products.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 32px #00F5A044" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-semibold text-black text-sm"
                  style={{ background: "linear-gradient(135deg, #00F5A0, #00D9F5)" }}
                >
                  View My Work →
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                  style={{ borderColor: "rgba(0,245,160,0.3)", color: "#00F5A0" }}
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-8"
              >
                {[["Fresher", "Years Exp."], ["10+", "Projects"], ["100%", "Dedication"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-extrabold" style={{ color: "#00F5A0" }}>{n}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Profile Photo Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center md:justify-end relative"
            >
              {/* Outer rotating dashed ring */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full"
                  style={{ border: "2px dashed rgba(0,245,160,0.2)" }} />
              </motion.div>

              {/* Inner rotating ring */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-[290px] h-[290px] md:w-[340px] md:h-[340px] rounded-full"
                  style={{ border: "1px solid rgba(0,217,245,0.12)" }} />
              </motion.div>

              {/* ─────────────────────────────────────────────────────────
                  PROFILE PHOTO CONTAINER
                  Yahan apni photo lagani hai. Do tarike hain:

                  TARIKA 1 (Recommended): 
                  Neeche ke placeholder div ko hata do aur
                  apni img tag uncomment karo:
                  <img src="apni-photo.jpg" alt="Your Name" className="w-full h-full object-cover" />

                  TARIKA 2:
                  src mein online photo URL daal sakte ho:
                  <img src="https://example.com/photo.jpg" ... />
              ───────────────────────────────────────────────────────── */}
              <motion.div
                className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(0,245,160,0.06), rgba(0,217,245,0.06))",
                  border: "3px solid rgba(0,245,160,0.3)",
                  boxShadow: "0 0 60px rgba(0,245,160,0.10), inset 0 0 40px rgba(0,245,160,0.04)",
                }}
                whileHover={{ boxShadow: "0 0 80px rgba(0,245,160,0.22), inset 0 0 40px rgba(0,245,160,0.08)" }}
                transition={{ duration: 0.4 }}
              >
                
                  <img src="/Images/profile.jpeg" alt="Riya Shinde" className="w-full h-full object-cover" />
                

               

                {/* Glowing orbital dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#00F5A0" : "#00D9F5",
                      top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
                      left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                      boxShadow: `0 0 8px ${i % 2 === 0 ? "#00F5A0" : "#00D9F5"}`,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  />
                ))}
              </motion.div>

              {/* Floating tech badges */}
              {[
                { label: "React", icon: "⚛️", x: "-16%", y: "10%" },
                { label: "Node.js", icon: "🟢", x: "90%", y: "15%" },
                { label: "MongoDB", icon: "🍃", x: "-18%", y: "72%" },
                { label: "Express", icon: "🚂", x: "86%", y: "68%" },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                  style={{
                    left: b.x, top: b.y,
                    background: "rgba(10,12,20,0.92)",
                    border: "1px solid rgba(0,245,160,0.2)",
                    backdropFilter: "blur(12px)",
                    whiteSpace: "nowrap",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.12, borderColor: "rgba(0,245,160,0.5)", y: -2 }}
                >
                  <span>{b.icon}</span>
                  <span style={{ color: "#00F5A0" }}>{b.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-gray-600 tracking-widest">SCROLL</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(0,245,160,0.6), transparent)" }} />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#00F5A0" }}>About Me</span>
              <h2 className="text-4xl font-extrabold text-white mt-2">Who I Am</h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #00F5A0, #00D9F5)" }} />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-14 items-center">
              <motion.div variants={fadeUp} custom={1}>
                <p className="text-gray-400 leading-relaxed mb-5 text-base">
                  I'm a passionate <span style={{ color: "#00F5A0" }} className="font-semibold">MERN Stack Developer</span> with
                  hands-on experience building scalable, performant web applications.
                </p>
                <p className="text-gray-400 leading-relaxed mb-5 text-base">
                  My expertise spans the entire JavaScript ecosystem — crafting responsive UIs with React, architecting RESTful &amp; GraphQL APIs with Node/Express,
                  and designing efficient MongoDB schemas for data-intensive applications.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8 text-base">
                  When I'm not coding, I contribute to open-source, write technical blogs, and explore new technologies to stay at the cutting edge.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[["Name", "Riya Shinde"], ["Location", "Panvel, India"], ["Experience", "Fresher"], ["Availability", "Open to Work"]].map(([k, v]) => (
                    <div key={k} className="p-3 rounded-xl" style={{ background: "rgba(0,245,160,0.04)", border: "1px solid rgba(0,245,160,0.1)" }}>
                      <div className="text-xs text-gray-500 mb-0.5">{k}</div>
                      <div className="text-sm font-semibold text-white">{v}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={2} className="space-y-3">
                {[
                  { icon: "🎯", title: "Problem Solver", desc: "I approach every challenge analytically, breaking down complexity into manageable, elegant solutions." },
                  { icon: "🚀", title: "Performance Obsessed", desc: "Every millisecond matters. I optimize for speed, efficiency, and scalability from day one." },
                  { icon: "🤝", title: "Team Player", desc: "Agile methodologies, code reviews, and clear communication are central to my development process." },
                  { icon: "📚", title: "Lifelong Learner", desc: "Technology evolves fast. I invest in continuous learning to deliver modern, future-proof solutions." },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                    whileHover={{ background: "rgba(0,245,160,0.04)", borderColor: "rgba(0,245,160,0.2)", x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad relative z-10" style={{ background: "rgba(0,245,160,0.015)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#00F5A0" }}>My Skills</span>
              <h2 className="text-4xl font-extrabold text-white mt-2">Tech Arsenal</h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #00F5A0, #00D9F5)" }} />
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="flex flex-wrap justify-center gap-2 mb-10">
              {Object.keys(SKILLS).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={activeSkillTab === tab
                    ? { background: "linear-gradient(135deg, #00F5A0, #00D9F5)", color: "#000" }
                    : { background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {tab}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div>
                  {SKILLS[activeSkillTab].slice(0, 3).map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} color="#00F5A0" delay={i} />
                  ))}
                </div>
                <div>
                  {SKILLS[activeSkillTab].slice(3).map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} color="#00D9F5" delay={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div variants={fadeUp} custom={4} className="mt-14">
              <p className="text-center text-xs font-semibold tracking-wider text-gray-500 mb-5 uppercase">Also Familiar With</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["TypeScript", "Python", "Figma", "Postman", "Nginx", "Linux", "Stripe", "Socket.io", "Webpack", "Jest", "Swagger"].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg cursor-default"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280" }}
                    whileHover={{ background: "rgba(0,245,160,0.08)", borderColor: "rgba(0,245,160,0.25)", color: "#00F5A0", scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#00F5A0" }}>Portfolio</span>
              <h2 className="text-4xl font-extrabold text-white mt-2">Featured Projects</h2>
              <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #00F5A0, #00D9F5)" }} />
              <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">
                Production-grade applications built with the MERN stack, showcasing real-world problem solving.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* -----Contact----- */}
      <Contact/>
      

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold text-lg">
            <span className="text-white">dev</span>
            <span style={{ color: "#00F5A0" }}>{"<Riya />"}</span>
          </div>
          <p className="text-xs text-gray-600">
            © 2024 Riya Shinde · Built with React + Framer Motion ❤️
          </p>
          <div className="flex gap-4">
            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
              <motion.a key={s} href="#" className="text-xs font-medium" style={{ color: "#4b5563" }} whileHover={{ color: "#00F5A0" }}>
                {s}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}