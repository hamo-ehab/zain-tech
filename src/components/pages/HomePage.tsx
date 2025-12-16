// HPI 1.6-G
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Cpu, 
  Terminal, 
  Code, 
  Globe, 
  ChevronRight, 
  Layers, 
  Database, 
  Lock 
} from 'lucide-react';
import { Image } from '@/components/ui/image';

// --- Utility Components ---

const AnimatedReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${className || ''}`}
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const NeonButton: React.FC<{ to: string; variant?: 'cyan' | 'green'; children: React.ReactNode }> = ({ to, variant = 'cyan', children }) => {
  const colorClass = variant === 'cyan' ? 'text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10' : 'text-neon-green border-neon-green hover:bg-neon-green/10';
  const shadowClass = variant === 'cyan' ? 'hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]' : 'hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]';
  
  return (
    <Link 
      to={to} 
      className={`relative group overflow-hidden px-8 py-4 border ${colorClass} ${shadowClass} transition-all duration-300 font-heading font-bold uppercase tracking-wider inline-flex items-center gap-2`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-${variant === 'cyan' ? 'neon-cyan' : 'neon-green'}/10`} />
    </Link>
  );
};

const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-cyan opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-green opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">{text}</span>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Mouse tracking for hero effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen overflow-clip selection:bg-neon-cyan selection:text-black font-paragraph">
      
      {/* --- HERO SECTION --- */}
      <section 
        className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden border-b border-white/10"
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 z-0 perspective-1000">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--x)_var(--y),rgba(0,255,255,0.15),transparent_80%)]"
            style={{
              // @ts-ignore
              '--x': useMotionTemplate`${mouseX}px`,
              // @ts-ignore
              '--y': useMotionTemplate`${mouseY}px`,
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-px w-12 bg-neon-cyan" />
              <span className="text-neon-cyan font-mono text-sm tracking-[0.2em] uppercase">Welcome To</span>
            </motion.div>

            <motion.h1 
              className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-white mb-8"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ZAIN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">TECH</span>
            </motion.h1>

            <motion.p 
              className="font-paragraph text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed border-l-2 border-neon-green/50 pl-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Architecting the digital future. We empower enterprises with brutalist efficiency, cutting-edge LMS platforms, and secure, scalable technology solutions.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <NeonButton to="/services" variant="cyan">
                Initialize Protocol <ArrowRight className="w-5 h-5" />
              </NeonButton>
              <NeonButton to="/academy" variant="green">
                Access Academy <Terminal className="w-5 h-5" />
              </NeonButton>
            </motion.div>
          </div>

          {/* Hero Visual - Abstract 3D Representation */}
          <div className="lg:col-span-4 relative hidden lg:block h-[600px]">
            <motion.div 
              style={{ y }}
              className="absolute inset-0 border border-white/10 bg-white/5 backdrop-blur-sm p-2"
            >
             <img
  src="/zain-logo.png" 
  alt="Zain Tech Logo" 
  className="w-full h-full object-contain transition-all duration-700" 
/>
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
        </motion.div>
      </section>

      {/* --- MARQUEE TICKER --- */}
      <div className="w-full bg-neon-cyan/5 border-y border-neon-cyan/20 overflow-hidden py-4">
        <motion.div 
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-neon-cyan/60 font-mono text-sm uppercase tracking-widest">
              <Zap className="w-4 h-4" /> Innovate <span className="w-1 h-1 bg-neon-cyan rounded-full" /> 
              <Shield className="w-4 h-4" /> Secure <span className="w-1 h-1 bg-neon-cyan rounded-full" /> 
              <Cpu className="w-4 h-4" /> Execute
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES GRID (The Matrix) --- */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto relative">
        <div className="absolute left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
        <div className="absolute right-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

        <div className="mb-24 md:pl-12">
          <AnimatedReveal>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">
              CORE <span className="text-neon-green">MODULES</span>
            </h2>
            <p className="text-white/60 max-w-xl text-lg">
              Deploying enterprise-grade infrastructure for the modern web.
            </p>
          </AnimatedReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            {
              icon: Zap,
              title: 'High-Velocity Tech',
              desc: 'Leverage the latest innovations to stay ahead in the digital landscape.',
              id: '01'
            },
            {
              icon: Shield,
              title: 'Military-Grade Security',
              desc: 'Enterprise-grade security ensuring your data and operations are protected.',
              id: '02'
            },
            {
              icon: Cpu,
              title: 'Advanced Learning',
              desc: 'Comprehensive LMS platform with interactive courses and real-time tracking.',
              id: '03'
            },
            {
              icon: Layers,
              title: 'Scalable Architecture',
              desc: 'Systems designed to grow with your business without performance degradation.',
              id: '04'
            },
            {
              icon: Database,
              title: 'Data Integrity',
              desc: 'Robust data management protocols ensuring zero loss and high availability.',
              id: '05'
            },
            {
              icon: Lock,
              title: 'Access Control',
              desc: 'Granular permission systems for secure administrative management.',
              id: '06'
            }
          ].map((feature, idx) => (
            <div key={idx} className="group relative bg-black p-12 hover:bg-white/5 transition-colors duration-500 overflow-hidden">
              <div className="absolute top-4 right-4 text-white/20 font-mono text-xs">SYS_MOD_{feature.id}</div>
              
              <div className="mb-8 relative">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-neon-cyan group-hover:text-neon-green transition-colors duration-300" />
                </div>
                <div className="absolute -inset-2 border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="font-heading text-2xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                <GlitchText text={feature.title} />
              </h3>
              <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {feature.desc}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-neon-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </section>

      {/* --- SPLIT SECTION (Vision) --- */}
      <section className="relative py-32 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Sticky Content */}
            <div className="relative">
              <div className="sticky top-32">
                <AnimatedReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    <span className="text-neon-green font-mono text-sm tracking-widest uppercase">Our Vision</span>
                  </div>
                  
                  <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-12 leading-tight">
                    EMPOWERING <br />
                    THE <span className="text-neon-cyan italic">NEXT GEN</span>
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6 group">
                      <div className="w-px h-auto bg-white/20 group-hover:bg-neon-cyan transition-colors duration-300" />
                      <div>
                        <h4 className="text-white font-heading text-xl mb-2">Strategic Innovation</h4>
                        <p className="text-white/60">We don't just build software; we engineer digital ecosystems that drive business evolution.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group">
                      <div className="w-px h-auto bg-white/20 group-hover:bg-neon-cyan transition-colors duration-300" />
                      <div>
                        <h4 className="text-white font-heading text-xl mb-2">Knowledge Transfer</h4>
                        <p className="text-white/60">Through our Academy, we democratize access to elite technical education.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <Link to="/about" className="text-white hover:text-neon-cyan transition-colors duration-300 inline-flex items-center gap-2 border-b border-white/20 hover:border-neon-cyan pb-1">
                      Read Full Manifesto <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </AnimatedReveal>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative h-[800px] w-full">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-[100px] opacity-20" />
              
              <div className="relative h-full w-full grid grid-cols-2 gap-4">
                <motion.div 
                  className="mt-24 space-y-4"
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-[60%] w-full relative overflow-hidden border border-white/10 group">
                    <Image 
                      src="https://static.wixstatic.com/media/9e0878_8e438bd835f24dfd9247e6d2b1ad4fd8~mv2.png?originWidth=576&originHeight=384"
                      alt="Team collaborating in futuristic office"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white font-mono text-xs">IMG_REF_01</div>
                  </div>
                  <div className="h-[30%] w-full bg-white/5 border border-white/10 p-6 flex flex-col justify-between group hover:border-neon-cyan/50 transition-colors">
                    <Code className="w-8 h-8 text-white/40 group-hover:text-neon-cyan transition-colors" />
                    <div className="text-white/40 font-mono text-xs">CODE_BASE_ALPHA</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="h-[30%] w-full bg-neon-cyan/5 border border-neon-cyan/20 p-6 flex flex-col justify-between group hover:bg-neon-cyan/10 transition-colors">
                    <Globe className="w-8 h-8 text-neon-cyan" />
                    <div className="text-neon-cyan font-mono text-xs">GLOBAL_CONNECT</div>
                  </div>
                  <div className="h-[60%] w-full relative overflow-hidden border border-white/10 group">
                    <Image 
                      src="https://static.wixstatic.com/media/9e0878_c7f4d149e322450fb044673a43eca177~mv2.png?originWidth=576&originHeight=384"
                      alt="Server room data visualization"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white font-mono text-xs">IMG_REF_02</div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ACADEMY TEASER (Dark Mode) --- */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 p-12 md:p-24 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-xs font-mono uppercase tracking-wider w-fit mb-8">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                Now Enrolling
              </div>
              
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-8">
                MASTER THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-500">DIGITAL CRAFT</span>
              </h2>
              
              <p className="text-white/70 text-lg mb-12 max-w-xl">
                Join the Zain Tech Academy. Access premium courses, real-world projects, and expert mentorship. Unlock your potential in software engineering, cybersecurity, and data science.
              </p>

              <div className="flex flex-wrap gap-6">
                <NeonButton to="/academy" variant="green">
                  Start Learning
                </NeonButton>
                <Link 
                  to="/register" 
                  className="px-8 py-4 text-white border border-white/20 hover:bg-white/5 transition-all duration-300 font-heading font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-full border-l border-white/10">
              <Image 
                src="https://static.wixstatic.com/media/9e0878_951163f626434b1e8fb2fab421df5b17~mv2.png?originWidth=384&originHeight=448"
                alt="Student working on code"
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shine_4s_linear_infinite]" />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                <div className="bg-black/80 backdrop-blur-md border border-neon-green/30 p-4">
                  <div className="text-2xl font-bold text-white font-heading">50+</div>
                  <div className="text-xs text-neon-green font-mono uppercase">Courses</div>
                </div>
                <div className="bg-black/80 backdrop-blur-md border border-neon-green/30 p-4">
                  <div className="text-2xl font-bold text-white font-heading">10k+</div>
                  <div className="text-xs text-neon-green font-mono uppercase">Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 md:px-12 border-t border-white/10 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedReveal>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8">
              READY TO <span className="text-neon-cyan">TRANSFORM?</span>
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
              Whether you need enterprise solutions or advanced training, Zain Tech is your gateway to the future.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <NeonButton to="/contact" variant="cyan">
                Initiate Contact
              </NeonButton>
              <div className="text-white/40 font-mono text-sm">
                OR CALL: <span className="text-white hover:text-neon-cyan transition-colors cursor-pointer">+201148352628</span>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      {/* --- DECORATIVE FOOTER LINE --- */}
      <div className="h-2 w-full bg-gradient-to-r from-neon-cyan via-black to-neon-green" />
    </div>
  );
}