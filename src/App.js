import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 300], [0, 100]);

  // Form Status State
  const [result, setResult] = React.useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- EMAIL FUNCTION ---
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // 👇👇👇 YAHAN APNI ACCESS KEY DAAL DENA 👇👇👇
    formData.append("access_key", "014fa93a-5fe5-473e-b495-4a48b6480b28"); 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully! 🚀");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const projects = [
    {
      title: 'Premium Coffee Brand UI',
      description: 'Modern landing page with smooth animations and mobile-first design.',
      link: 'https://statuesque-pixie-756b74.netlify.app/',
      tags: ['UI/UX', 'React'],
      gradient: 'from-orange-400 via-amber-500 to-yellow-400',
      icon: '☕',
      stats: [ { label: 'Performance', value: '100%' }, { label: 'Design', value: 'Modern' } ]
    },
    {
      title: 'Secure Auth System',
      description: 'Enterprise-level authentication with JWT tokens and encryption.',
      // 👇 Broken link hata ke # lagaya hai, jab project ready ho tab asli link dalna
      link: 'https://my-project-frontend-beta.vercel.app', 
      tags: ['Security', 'Backend'],
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      icon: '🔒',
      stats: [ { label: 'Security', value: 'High' }, { label: 'Database', value: 'MongoDB' } ]
    },
    {
      title: 'Video Streaming App',
      description: 'YouTube-style platform with infinite scroll and search.',
      link: 'https://mrtechyyt.netlify.app/',
      tags: ['API', 'Performance'],
      gradient: 'from-pink-400 via-rose-500 to-red-500',
      icon: '▶️',
      stats: [ { label: 'Features', value: 'Search/Scroll' }, { label: 'API', value: 'Fast' } ]
    },
  ];

  const skills = [
    { name: 'React & Next.js', level: 95, icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
    { name: 'AI Tools (GPT-4)', level: 90, icon: '🤖', color: 'from-orange-500 to-amber-500' },
    { name: 'Node.js & Express', level: 85, icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'UI/UX Design', level: 92, icon: '🎨', color: 'from-pink-500 to-rose-500' },
    { name: 'Databases', level: 88, icon: '🗄️', color: 'from-indigo-500 to-purple-500' },
    { name: 'Optimization', level: 93, icon: '⚡', color: 'from-yellow-500 to-orange-500' }
  ];

  // REALISTIC STATS (Jhooth Hata Diya)
  const stats = [
    { number: 3, suffix: '+', label: 'Major Projects', icon: '🚀', color: 'from-cyan-500 to-blue-600' },
    { number: 100, suffix: '%', label: 'Commitment', icon: '🤝', color: 'from-orange-500 to-amber-600' },
    { number: 24, suffix: '/7', label: 'Support', icon: '⭐', color: 'from-pink-500 to-rose-600' },
    { number: 3, suffix: 'x', label: 'Faster Dev', icon: '💨', color: 'from-green-500 to-emerald-600' }
  ];

  // NOTE: Testimonials section neeche comment out kar diya hai.

  const Counter = ({ end, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    useEffect(() => {
      if (!hasAnimated) {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            setHasAnimated(true);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [end, hasAnimated]);
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-white selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
      
      {/* Background & Effects */}
      <div className="fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen transition-opacity duration-200 hidden md:block" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', left: mousePosition.x - 192, top: mousePosition.y - 192, }} />
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <motion.div className="fixed top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20" animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="fixed bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20" animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }} transition={{ duration: 12, repeat: Infinity }} />

      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Mr_Techy</h1>
          <div className="hidden md:flex gap-8">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => ( <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">{item}</a> ))}
          </div>
          <a href="#contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs md:text-sm font-bold shadow-lg hover:scale-105 transition-transform">Hire Me</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-md">
              <span className="animate-pulse text-yellow-400">⚡</span>
              <span className="text-xs md:text-sm font-bold text-cyan-400 tracking-wide">AI-POWERED FULL STACK DEV</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">Build Websites<br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-500">That Convert.</span></h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto px-4">I craft <span className="text-white font-semibold">high-performance</span> apps using <span className="text-cyan-400"> AI workflows</span> that deliver results 3x faster.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 w-full sm:w-auto px-6">
              <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all text-center">View Projects</a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 font-bold text-lg hover:bg-white/10 transition-all text-center">Let's Collaborate</a>
            </div>

            {/* Available for Work Card - REALISTIC DATA */}
            <div className="relative w-full mx-auto max-w-5xl mt-10">
               <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-cyan-500/20 blur-[60px] rounded-full opacity-40"></div>
               <div className="bg-slate-900/80 border border-cyan-500/30 p-6 md:p-10 rounded-[2rem] backdrop-blur-2xl shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
                      <div className="text-5xl md:text-6xl bg-gradient-to-br from-cyan-500 to-blue-600 w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">🚀</div>
                      <div className="text-left">
                        <h3 className="font-black text-xl md:text-3xl text-white mb-1">Available for Work</h3>
                        <div className="flex items-center gap-2">
                           <span className="relative flex h-3 w-3">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                           </span>
                           <p className="text-slate-400 text-sm">Open to new opportunities</p>
                        </div>
                      </div>
                    </div>
                    {/* Realistic Stats for New Freelancer */}
                    <div className="w-full md:w-auto grid grid-cols-2 md:flex md:gap-10 gap-4">
                      <div className="bg-slate-800/50 md:bg-transparent p-4 md:p-0 rounded-2xl text-center md:text-right border md:border-none border-white/5">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Expertise</div>
                        <div className="font-black text-xl md:text-3xl text-white">Full Stack</div>
                      </div>
                      <div className="hidden md:block w-px h-16 bg-white/10"></div>
                      <div className="bg-slate-800/50 md:bg-transparent p-4 md:p-0 rounded-2xl text-center md:text-right border md:border-none border-white/5">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Projects</div>
                        <div className="font-black text-xl md:text-3xl text-orange-400">3+</div>
                      </div>
                      <div className="hidden md:block w-px h-16 bg-white/10"></div>
                      <div className="bg-slate-800/50 md:bg-transparent p-4 md:p-0 rounded-2xl text-center md:text-right border md:border-none border-white/5 col-span-2 md:col-span-1">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Response</div>
                        <div className="font-black text-xl md:text-3xl text-cyan-400">&lt; 2h</div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 px-4 md:px-6 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <motion.div key={idx} className="text-center p-6 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-lg shadow-lg" whileHover={{ scale: 1.02, translateY: -5 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="text-3xl md:text-4xl mb-3">{stat.icon}</div>
                <div className={`text-3xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}><Counter end={stat.number} suffix={stat.suffix} /></div>
                <div className="text-slate-500 text-xs md:text-sm uppercase font-bold tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="py-24 px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Stack</span></h2>
            <p className="text-slate-400 text-lg">My arsenal for building digital products</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, idx) => (
              <motion.div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-white/5 hover:border-cyan-500/30 transition-all shadow-lg" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl p-3 bg-slate-800/80 rounded-xl">{skill.icon}</span>
                    <span className="font-bold text-xl text-white">{skill.name}</span>
                  </div>
                  <span className={`font-black text-lg ${skill.color.replace('from-', 'text-').split(' ')[0]}`}>{skill.level}%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div className={`h-full bg-gradient-to-r ${skill.color}`} initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Work</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div key={idx} className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col h-full group shadow-xl" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} whileHover={{ y: -10 }}>
                <div className={`h-56 bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="text-7xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 drop-shadow-lg">{project.icon}</div>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag, i) => ( <span key={i} className="text-xs font-bold uppercase bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white border border-white/20 shadow-sm">{tag}</span> ))}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">{project.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {project.stats.map((stat, i) => ( <div key={i} className="bg-slate-800/50 p-3 rounded-xl text-center border border-white/5"> <div className="text-xs text-slate-500 uppercase font-bold mb-1">{stat.label}</div> <div className="text-base font-black text-white">{stat.value}</div> </div> ))}
                  </div>
                  {/* Valid Link logic: Agar link # hai toh button disabled/grey, warna blue */}
                  {project.link !== '#' ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-center hover:bg-cyan-500 hover:text-white transition-all hover:shadow-lg hover:shadow-cyan-500/20">View Live Demo →</a>
                  ) : (
                      <button disabled className="block w-full py-4 rounded-xl bg-slate-800 text-slate-500 font-bold text-center cursor-not-allowed">Coming Soon</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION REMOVED (FAKE HAI ISLIYE) --- */}
      {/* Jab real reviews aayein, tab is part ko wapis add karna */}

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-900 border border-white/10 p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -mr-48 -mt-48"></div>
             <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Build Together</h2>
              <p className="text-slate-400 mb-12 text-lg">Ready to start your next project? Send me a message.</p>
              
              <form onSubmit={onSubmit} className="space-y-6 max-w-xl mx-auto">
                <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" name="name" placeholder="Name" required className="w-full p-5 bg-slate-800/80 rounded-2xl border border-slate-700 focus:border-cyan-500 outline-none transition-colors text-white placeholder-slate-500" />
                  <input type="email" name="email" placeholder="Email" required className="w-full p-5 bg-slate-800/80 rounded-2xl border border-slate-700 focus:border-cyan-500 outline-none transition-colors text-white placeholder-slate-500" />
                </div>
                <textarea name="message" placeholder="Project Details" rows="5" required className="w-full p-5 bg-slate-800/80 rounded-2xl border border-slate-700 focus:border-cyan-500 outline-none transition-colors resize-none text-white placeholder-slate-500"></textarea>
                
                <button type="submit" className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-xl shadow-xl hover:shadow-cyan-500/40 transition-all transform hover:scale-[1.02]">
                  Send Message 🚀
                </button>
                <div className="text-cyan-400 font-bold mt-4">{result}</div>
              </form>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/5 bg-slate-950 text-slate-500">
        <p className="flex items-center justify-center gap-2">© 2025 Mr_Techy. Built with <span className="text-cyan-400">React</span> & <span className="text-orange-400">AI</span>.</p>
      </footer>
    </div>
  );
}

export default App;
