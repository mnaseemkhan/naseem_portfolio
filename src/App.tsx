import { useEffect, useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMail, 
  FiMoon, 
  FiSun, 
  FiExternalLink, 
  FiSmartphone, 
  FiCode, 
  FiServer,
  FiArrowRight,
  FiDownload,
  FiUser,
  FiPlay,
  FiLayout,
  FiDatabase,
  FiCpu,
  FiGlobe,
  FiShield,
  FiActivity
} from 'react-icons/fi'
import { 
  SiApple, 
  SiFlutter, 
  SiDart, 
  SiLaravel, 
  SiFirebase, 
  SiAndroid, 
  SiMysql, 
  SiPostman, 
  SiGithub, 
  SiFigma, 
  SiGooglemaps,
  SiReact,
  SiTailwindcss,
  SiGit
} from 'react-icons/si'
import localProjects from './projects.json'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="relative group text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors px-2 py-1"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
  </a>
)

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="project-card group reveal-card"
    >
      <div className="project-header" style={{ 
        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#432800' : '#0B0F1A'} 0%, #111827 100%)` 
      }}>
        <div className="absolute top-6 left-6 z-20">
          <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[#00FFA3] text-xs font-bold border border-white/5">
            {project.category}
          </span>
        </div>
        <img 
          src={project.icon} 
          alt={project.title} 
          className="project-icon"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://play-lh.googleusercontent.com/8Ybg9GSDD2Gvibfy16MndTqqp7nt9irpBQpVkcOOJN997T3Z9D4LcOrW0te2GDpA7c0=w480-h960-rw'
          }}
        />
      </div>
      
      <div className="p-8 flex flex-col flex-grow bg-white dark:bg-[#0B0F1A]">
        <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-bold border border-indigo-500/20">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          {project.playStore && project.playStore !== "#" && (
            <a href={project.playStore} target="_blank" rel="noreferrer" className="btn-store text-[#009461] dark:text-[#00FFA3] border-[#009461]/20 dark:border-[#00FFA3]/20 hover:bg-[#00FFA3]/5">
              <FiPlay className="w-4 h-4 fill-current" /> Play Store
            </a>
          )}
          {project.appStore && project.appStore !== "#" && (
            <a href={project.appStore} target="_blank" rel="noreferrer" className="btn-store text-slate-900 dark:text-white border-slate-900/20 dark:border-white/20 hover:bg-slate-900/5 dark:hover:bg-white/5">
              <SiApple className="w-4 h-4" /> App Store
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function App() {
  const [isDark, setIsDark] = useState<boolean>(true)
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const username = 'mnaseemkhan'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  const skills = [
    { name: 'Flutter', category: 'Mobile', icon: <SiFlutter className="text-[#02569B]" /> },
    { name: 'Dart', category: 'Language', icon: <SiDart className="text-[#0175C2]" /> },
    { name: 'Laravel', category: 'Backend', icon: <SiLaravel className="text-[#FF2D20]" /> },
    { name: 'Firebase', category: 'Platform', icon: <SiFirebase className="text-[#FFCA28]" /> },
    { name: 'Android', category: 'Platform', icon: <SiAndroid className="text-[#3DDC84]" /> },
    { name: 'iOS', category: 'Platform', icon: <SiApple className="text-slate-900 dark:text-white" /> },
    { name: 'MySQL', category: 'Database', icon: <SiMysql className="text-[#4479A1]" /> },
    { name: 'Git', category: 'Version Control', icon: <SiGit className="text-[#F05032]" /> },
    { name: 'Figma', category: 'Design', icon: <SiFigma className="text-[#F24E1E]" /> },
    { name: 'Postman', category: 'Testing', icon: <SiPostman className="text-[#FF6C37]" /> },
    { name: 'Google Maps', category: 'API', icon: <SiGooglemaps className="text-[#4285F4]" /> },
    { name: 'React', category: 'Web', icon: <SiReact className="text-[#61DAFB]" /> }
  ]

  const experiences = [
    {
      title: 'Mobile Application Developer',
      company: 'Codergize',
      location: 'Pakistan',
      period: 'Feb 2025 – Present',
      desc: 'Leading Flutter development for multiple high-traffic applications, focusing on scalable architecture and performance optimization.',
      tags: ['Flutter', 'Clean Architecture', 'API Integration', 'Payment Methods']
    },
    {
      title: 'Flutter Developer',
      company: 'Universal Link Technologies',
      location: 'Pakistan',
      period: 'Apr 2024 – Feb 2025',
      desc: 'Developed complex cross-platform apps for international clients, ensuring high performance and pixel-perfect UIs.',
      tags: ['Flutter', 'Firebase', 'State Management', 'REST API', ]
    },
    {
      title: 'Mobile App Developer',
      company: 'Skyline Coders',
      location: 'Pakistan',
      period: 'Nov 2023 – Mar 2024',
      desc: 'Contributed to the development of several mobile projects, implementing key features and improving app stability.',
      tags: ['Flutter', 'Dart', 'UI/UX', 'Firebase', 'GetX']
    },
    {
      title: 'Intern Flutter Developer',
      company: 'Micro Programmers',
      location: 'Pakistan',
      period: '2022',
      desc: 'Hands-on experience in building Flutter applications and understanding the mobile development lifecycle.',
      tags: ['Flutter', 'Learning', 'Development']
    }
  ]

  const services = [
    { title: 'Flutter App Development', icon: '📱', desc: 'Cross-platform apps for Android & iOS from a single codebase. Clean UI, smooth animations, and production-ready architecture with BLoC, Riverpod, or GetX.' },
    { title: 'Backend & API Development', icon: '⚙️', desc: 'Scalable REST APIs with PHP Laravel. MySQL integration, authentication (JWT/OAuth), real-time features with WebSockets, and cloud deployment.' },
    { title: 'Firebase Integration', icon: '🔥', desc: 'Full Firebase setup: Firestore, Auth, Cloud Functions, Push Notifications (FCM), Analytics, Remote Config, and Crashlytics for robust app infrastructure.' },
    { title: 'App Store Deployment', icon: '🏪', desc: 'Complete Play Store & App Store submission process. Store listing optimization, screenshots, metadata, signing configuration, and review compliance.' },
    { title: 'Payment Integration', icon: '💳', desc: 'Stripe, PayPal, and in-app purchases. Secure payment flows, subscription management, order tracking, and receipt generation for e-commerce and booking apps.' },
    { title: 'App Maintenance & Upgrades', icon: '🛠️', desc: 'Bug fixes, performance optimization, Flutter version upgrades, new feature development, and ongoing technical support for existing mobile applications.' }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Spotlight Effect */}
      <div className="spotlight" />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-500/10 dark:bg-purple-500/10 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-pink-500/10 dark:bg-pink-500/10 blur-[110px] animate-blob animation-delay-4000" />
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <nav className={`mx-auto max-w-5xl glass rounded-2xl px-6 py-2 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-lg bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-white/20' : 'border-transparent shadow-none'}`}>
            <a href="#hero" className="text-xl font-bold tracking-tight text-gradient">
              Naseem Khan.
            </a>
            <div className="hidden lg:flex items-center gap-8">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDark(!isDark)} 
                className="p-2.5 rounded-xl glass-card hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-indigo-500"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              <a 
                href="#contact" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 text-sm"
              >
                Hire Me
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 lg:gap-24 items-center">
            {/* Hero Left: Image & Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto lg:mx-0"
            >
              <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
                <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-8 border-white/10 shadow-2xl z-10">
                  <img 
                    src={`https://github.com/${username}.png`} 
                    alt="Naseem Khan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Badges around image with floating animation */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="stat-badge top-10 -right-10 md:-right-20 bg-indigo-600 text-white border-indigo-400/30"
                >
                  <span className="text-xl">🏆</span>
                  <p className="text-xs font-bold uppercase tracking-wider">Senior Developer</p>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="stat-badge bottom-20 -left-10 md:-left-20"
                >
                  <p className="text-3xl font-black text-gradient">30+</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Apps Shipped</p>
                </motion.div>

                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="stat-badge bottom-[-20px] left-20 bg-[#00FFA3]/10 border-[#00FFA3]/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <p className="text-sm font-bold text-[#00FFA3]">Pakistan</p>
                  </div>
                </motion.div>

                {/* <motion.div 
                  animate={{ x: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                  className="stat-badge top-[40%] -right-[60px] md:-right-[80px]"
                >
                  <p className="text-2xl font-black text-indigo-500">100K+</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">App Downloads</p>
                </motion.div> */}
              </div>
            </motion.div>

            {/* Hero Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-500/30 text-indigo-500 dark:text-indigo-400 text-sm font-bold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Available for new opportunities
              </div>

              <p className="text-xl md:text-2xl font-medium text-slate-500 mb-2">Hi, I'm</p>
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                <span className="text-slate-900 dark:text-white">Naseem</span> <br />
                <span className="text-gradient">Khan</span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-500 mb-8">
                Mobile App Developer & Full-Stack Developer
              </h2>

              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                4+ years crafting high-performance Flutter apps for Android & iOS. 
                50+ apps shipped across Pakistan, UK, Lebanon, UAE & beyond — 
                I turn complex ideas into elegant, scalable, production-ready mobile experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-12 max-w-xl mx-auto lg:mx-0 text-left">
                {[
                  'Flutter & Dart Expert', 'Laravel & REST APIs',
                  'Firebase Integration', 'Clean Architecture (MVVM)',
                  'Android & iOS Deployment', 'UI/UX Focused',
                  'State Management (BLoC)', 'Payment Integrations'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a 
                  href="#projects" 
                  className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/25 active:scale-95"
                >
                  Featured Projects <FiArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#contact" 
                  className="flex items-center gap-3 glass-card hover:bg-slate-100 dark:hover:bg-white/5 px-10 py-5 rounded-2xl font-bold transition-all active:scale-95"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Expert Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Providing end-to-end mobile and full-stack solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="service-card reveal-card"
              >
                <div className="text-5xl mb-8">{service.icon}</div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Skills & Tech</h2>
            <div className="w-24 h-2 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="skill-card reveal-card"
              >
                <div className="text-5xl mb-6">{skill.icon}</div>
                <h4 className="text-lg font-black mb-1">{skill.name}</h4>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-6">Featured Work</h2>
              <p className="text-slate-500 max-w-xl text-lg">
                High-performance mobile applications that solve complex problems.
              </p>
            </div>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              className="group flex items-center gap-3 text-indigo-500 font-black text-xl hover:gap-5 transition-all"
            >
              View More on GitHub <FiArrowRight />
            </a>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {localProjects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">The Journey</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              My professional path through leading tech companies.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative pl-12 md:pl-0">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-indigo-500/20 -translate-x-1/2" />
            
            <div className="space-y-16">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 flex flex-col items-center md:items-stretch">
                    <div className="exp-card w-full group hover:border-indigo-500/30 transition-all reveal-card">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h3 className="text-2xl font-black">{exp.title}</h3>
                        <span className="px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-bold">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-indigo-500 font-bold text-lg mb-4">{exp.company} — {exp.location}</p>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-lg italic">
                        "{exp.desc}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-lg glass-card text-xs font-bold text-slate-600 dark:text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="timeline-dot" />
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
                Let's Build <br /> <span className="text-gradient">the Future</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl mb-12 leading-relaxed">
                Ready to take your project to the next level? Get in touch and let's discuss 
                how I can help you achieve your goals.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center text-indigo-500 text-3xl">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Email</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">naseem236991@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center text-[#00FFA3] text-3xl">
                    <FiSmartphone />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">+92 334 6370552</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex gap-6">
                {[
                  { icon: <FiGithub />, url: `https://github.com/${username}` },
                  { icon: <FiLinkedin />, url: '#' },
                  { icon: <FiTwitter />, url: '#' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.url} 
                    className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all text-2xl"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-[3.5rem] border-slate-200 dark:border-white/10 reveal-card"
            >
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase ml-4">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="form-input" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase ml-4">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="form-input" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase ml-4">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Project Inquiry" 
                    className="form-input" 
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 uppercase ml-4">Message</label>
                  <textarea 
                    placeholder="Tell me about your project..." 
                    className="form-input h-48 resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 ${
                    isSuccess 
                    ? 'bg-[#00FFA3] text-slate-900 shadow-[#00FFA3]/20' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : isSuccess ? (
                    <>
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
                      Proposal Sent!
                    </>
                  ) : (
                    'Send Proposal'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-slate-500 font-bold mb-4 uppercase tracking-[0.3em] text-sm">Portfolio {new Date().getFullYear()}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Naseem Khan</p>
          <div className="flex justify-center gap-8 mb-12">
            <a href="#about" className="text-slate-500 hover:text-indigo-500 transition-all font-bold">About</a>
            <a href="#projects" className="text-slate-500 hover:text-indigo-500 transition-all font-bold">Projects</a>
            <a href="#contact" className="text-slate-500 hover:text-indigo-500 transition-all font-bold">Contact</a>
          </div>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Designed and built with passion using React, Tailwind & Framer Motion. 
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
