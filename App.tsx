import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  Ticket, 
  CreditCard, 
  BarChart3, 
  ChevronDown, 
  Clock, 
  Menu, 
  Star, 
  Zap,
  Globe,
  TrendingUp,
  Gift,
  Award,
  ChevronRight,
  Plus,
  Play,
  Wallet,
  Calendar,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// --- Sub-components ---

const FloatingOrbitalItem = ({ icon: Icon, delay = 0, x = 0, y = 0, label = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      x: [x - 10, x + 10, x - 5, x + 15, x - 10],
      y: [y - 15, y + 5, y - 20, y + 10, y - 15]
    }}
    transition={{ 
      opacity: { delay, duration: 1 },
      scale: { delay, duration: 1 },
      x: { repeat: Infinity, duration: 10 + Math.random() * 5, ease: "easeInOut" },
      y: { repeat: Infinity, duration: 12 + Math.random() * 5, ease: "easeInOut" }
    }}
    className="absolute z-30 pointer-events-none"
    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
  >
    <div className="glass px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center text-white">
        <Icon size={16} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 whitespace-nowrap">{label}</span>
    </div>
  </motion.div>
);

const Navbar = () => (
  <header className="fixed top-0 w-full z-[100] px-4 md:px-8 py-8 pointer-events-none">
    <nav className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto glass px-6 md:px-10 py-4 rounded-full shadow-2xl">
      <div className="flex items-center gap-3 cursor-pointer group">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,107,53,0.5)] transform -rotate-6"
        >
          <Zap size={22} className="text-white fill-white" />
        </motion.div>
        <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">RESTAFY<span className="text-[#FF6B35]">.</span></span>
      </div>
      <div className="hidden lg:flex items-center gap-10 text-[10px] font-black tracking-[0.3em] uppercase text-white/50">
        <a href="#problem" className="hover:text-white transition-colors">Réalité</a>
        <a href="#vision" className="hover:text-white transition-colors">Vision</a>
        <a href="#features" className="hover:text-white transition-colors">Solutions</a>
        <a href="#beta" className="hover:text-white transition-colors">Beta</a>
        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button 
          onClick={() => document.getElementById('apply').scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#FF6B35] text-white px-8 py-3 rounded-full text-[10px] font-black shadow-lg hover:shadow-[#FF6B35]/40 transition-all hover:scale-105 active:scale-95"
        >
          RÉSERVER (7/20)
        </button>
      </div>
      <button className="lg:hidden text-white hover:text-[#FF6B35] transition-colors"><Menu size={32} /></button>
    </nav>
  </header>
);

const SectionHeading = ({ badge, title, subtitle = "", centered = true, dark = false }) => (
  <div className={`mb-24 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#FF6B35]/20 text-[#FF6B35] font-black text-[10px] tracking-[0.5em] uppercase mb-8 ${dark ? 'glass' : 'bg-[#FF6B35]/5'}`}
    >
      <Zap size={12} className="fill-[#FF6B35]" /> {badge}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-5xl md:text-[5.5rem] font-black uppercase tracking-[-0.05em] mb-10 leading-[0.9] ${dark ? 'text-white' : 'text-[#1A1F36]'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <p className={`text-xl md:text-3xl font-medium max-w-4xl ${centered ? 'mx-auto' : ''} ${dark ? 'text-white/40' : 'text-slate-500'} tracking-tight`}>
        {subtitle}
      </p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, stat, img, dark = false }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`${dark ? 'glass border-white/5' : 'bg-gray-50 border-gray-100'} p-12 rounded-[4rem] group relative overflow-hidden border transition-all duration-500 shadow-xl`}
  >
    <div className="w-20 h-20 bg-[#FF6B35] rounded-[2rem] flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-xl shadow-[#FF6B35]/20">
      <Icon size={40} />
    </div>
    <h3 className={`text-3xl font-black uppercase tracking-tighter mb-6 ${dark ? 'text-white' : 'text-[#1A1F36]'}`}>{title}</h3>
    <div className={`text-lg font-medium mb-10 leading-relaxed ${dark ? 'text-white/40' : 'text-gray-500'} whitespace-pre-line`}>{desc}</div>
    <div className="bg-[#FF6B35]/10 text-[#FF6B35] inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black mb-12 border border-[#FF6B35]/20">
      <TrendingUp size={18} /> {stat}
    </div>
    <div className="h-80 rounded-[3rem] overflow-hidden border border-white/10 relative">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
    </div>
  </motion.div>
);

const AccordionItem = ({ question, answer }) => (
  <details className="group glass rounded-[2.5rem] overflow-hidden border border-white/5 mb-6">
    <summary className="p-8 md:p-10 flex items-center justify-between cursor-pointer list-none text-xl md:text-2xl font-black uppercase tracking-tight hover:text-[#FF6B35] transition-colors">
      <span className="max-w-[80%]">{question}</span>
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform group-open:rotate-180 group-open:bg-[#FF6B35] group-open:border-[#FF6B35]">
        <Plus size={20} className="text-white" />
      </div>
    </summary>
    <div className="px-8 md:px-10 pb-8 md:pb-10 text-white/40 font-medium text-lg md:text-xl leading-relaxed whitespace-pre-line border-t border-white/5 pt-6">
      {answer}
    </div>
  </details>
);

// --- The "Spacecraft" Transition Component ---

const SpacecraftPortal = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const z1 = useTransform(scrollYProgress, [0, 1], [0, 2800]);
  const z2 = useTransform(scrollYProgress, [0, 1], [-800, 3800]);
  const z3 = useTransform(scrollYProgress, [0, 1], [-1500, 4800]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <div id="vision" ref={containerRef} className="h-[400vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-view">
        <motion.div style={{ opacity, translateZ: z1 }} className="absolute text-center select-none pointer-events-none opacity-5">
          <h2 className="text-[20vw] font-black uppercase text-white/5 tracking-tighter italic">ENGINEERING</h2>
        </motion.div>

        <motion.div style={{ opacity, translateZ: z3 }} className="absolute w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 glass rounded-[4rem] rotate-12 flex items-center justify-center opacity-10">
            <Zap size={80} className="text-[#FF6B35]" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 glass rounded-[5rem] -rotate-12 flex items-center justify-center opacity-5">
            <Globe size={100} className="text-blue-500" />
          </div>
          <div className="absolute top-1/2 left-1/3 text-[12rem] font-black text-white/5">FAST</div>
        </motion.div>

        <motion.div style={{ opacity, scale, translateZ: z2 }} className="absolute max-w-6xl px-10 text-center flex flex-col items-center gap-12 preserve-3d">
          <div className="bg-[#FF6B35] text-white px-10 py-4 rounded-full font-black text-sm tracking-[0.5em] uppercase shadow-[0_20px_40px_rgba(255,107,53,0.4)]">
            DÉBLOQUEZ LA VITESSE
          </div>
          <h3 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-glow">
            UNE PUISSANCE<br /><span className="text-[#FF6B35]">INDÉCENTE.</span>
          </h3>
          <p className="text-2xl md:text-3xl text-white/40 font-medium max-w-3xl mx-auto leading-relaxed">
            De la commande au paiement, chaque interaction est optimisée par une ingénierie conçue pour l'excellence opérationnelle béninoise.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [placesLeft] = useState(7);
  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 32, s: 18 });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <Navbar />

      {/* Sticky Top Urgency Bar */}
      <div className="fixed top-0 w-full z-[110] bg-[#FF6B35] text-white py-3 px-4 text-center text-xs font-black uppercase tracking-widest shadow-2xl overflow-hidden">
        <motion.div 
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ⏰ Plus que 7 places disponibles • 13 restaurants déjà inscrits sur 20
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-8 overflow-hidden grid-bg">
        <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-[#FF6B35]/10 rounded-full blur-[250px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[200px]" />
        
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full mb-12 text-[#FF6B35] font-black text-[11px] tracking-[0.5em] uppercase">
              🔥 LANCEMENT BETA EXCLUSIVE - SEULEMENT 20 RESTAURANTS
            </div>
            <h1 className="text-[10vw] lg:text-[11vw] font-black leading-[0.75] tracking-tighter uppercase mb-16 italic">
              VOTRE<br /><span className="text-[#FF6B35] text-glow">EMPIRE.</span>
            </h1>
            <p className="text-3xl lg:text-4xl text-white/40 mb-16 max-w-2xl font-medium leading-[1.1]">
              Votre restaurant mérite mieux qu'un simple compte Facebook. Rejoignez les 20 pionniers du Bénin. 🇧🇯
            </p>
            
            <div className="flex flex-wrap gap-8 mb-20">
              <button 
                onClick={() => document.getElementById('apply').scrollIntoView({ behavior: 'smooth' })}
                className="px-16 py-10 bg-[#FF6B35] text-white rounded-[2.5rem] font-black text-3xl shadow-[0_30px_70px_rgba(255,107,53,0.4)] hover:scale-105 transition-all flex items-center gap-6 group"
              >
                RÉSERVER MA PLACE <ChevronRight size={40} className="group-hover:translate-x-3 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-white/40 text-sm font-black uppercase tracking-[0.2em]">
              <div className="flex items-center gap-4 border-l-4 border-[#00D9A5] pl-6 h-12 hover:text-white transition-colors">✓ 100% GRATUIT BETA</div>
              <div className="flex items-center gap-4 border-l-4 border-[#00D9A5] pl-6 h-12 hover:text-white transition-colors">✓ FORMATION COMPLÈTE</div>
              <div className="flex items-center gap-4 border-l-4 border-[#00D9A5] pl-6 h-12 hover:text-white transition-colors">✓ SUPPORT WHATSAPP 7j/7</div>
              <div className="flex items-center gap-4 border-l-4 border-[#00D9A5] pl-6 h-12 hover:text-white transition-colors">✓ EN LIGNE EN -48h</div>
            </div>

            <div className="mt-20 p-8 glass rounded-[3rem] border border-white/10 max-w-sm">
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">FERMETURE DÉFINITIVE DANS :</div>
               <div className="text-4xl font-black font-mono tracking-tighter text-[#FF6B35]">
                 {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
               </div>
            </div>
          </motion.div>

          {/* EMPIRE VISUALIZATION SECTION WITH FLOATING ELEMENTS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Background circular glow */}
            <div className="absolute w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-[100px] animate-pulse" />
            
            {/* Floating items circulating around the phone */}
            <FloatingOrbitalItem icon={ShoppingBag} label="Commande #428" x={-220} y={-180} delay={0.2} />
            <FloatingOrbitalItem icon={Wallet} label="+15,000 FCFA MOMO" x={240} y={-140} delay={0.4} />
            <FloatingOrbitalItem icon={Ticket} label="Ticket VIP Vendu" x={-260} y={100} delay={0.6} />
            <FloatingOrbitalItem icon={BarChart3} label="CA +25% Aujourd'hui" x={200} y={160} delay={0.8} />
            <FloatingOrbitalItem icon={Calendar} label="Nouvel Event" x={0} y={-260} delay={1} />
            <FloatingOrbitalItem icon={Layers} label="Menu Sync OK" x={0} y={260} delay={1.2} />

            <div className="relative aspect-[4/5] w-[350px] rounded-[6rem] overflow-hidden border-[20px] border-white/5 shadow-[0_100px_150px_-50px_rgba(0,0,0,0.8)] group perspective-view z-10">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[6000ms]" alt="High-end Food" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
              
              <motion.div 
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-16 left-16 right-16 glass p-12 rounded-[3.5rem] border border-white/10 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-[#00D9A5] rounded-full animate-pulse shadow-[0_0_20px_#00D9A5]" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/40">SYSTÈME ACTIF</span>
                  </div>
                  <span className="font-black text-2xl text-[#FF6B35]">MOMO PAY</span>
                </div>
                <h4 className="text-5xl font-black uppercase tracking-tighter mb-4">GRILLADES PRESTIGE</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={22} className="text-[#FF6B35] fill-[#FF6B35]" />)}
                </div>
              </motion.div>
            </div>
            
            <div className="absolute -top-10 -right-10 bg-[#FF6B35] w-40 h-40 rounded-full flex flex-col items-center justify-center -rotate-12 shadow-3xl border-[10px] border-[#050505] z-20">
              <span className="text-5xl font-black italic">7/20</span>
              <span className="text-[10px] font-black uppercase tracking-tight opacity-80 text-center">PLACES<br/>LIBRES</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION SECTION */}
      <section id="problem" className="py-40 px-8 bg-white text-[#1A1F36] rounded-t-[6rem]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Le Constat"
            title="Pourquoi 70% des restaurants perdent de l'argent"
            subtitle="La dure réalité : Votre concurrent avec une stratégie digitale gagne 3x plus que vous. Voici comment on change la donne."
          />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* OLD WORLD */}
            <div className="bg-gray-100 p-12 md:p-20 rounded-[5rem] border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-6 mb-16">
                   <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 shadow-lg shadow-red-100"><XCircle size={40} /></div>
                   <h3 className="text-2xl md:text-3xl font-black text-gray-400 uppercase tracking-tighter">VOTRE QUOTIDIEN AUJOURD'HUI</h3>
                </div>
                <ul className="space-y-8">
                  {[
                    "Clients qui appellent mais tombent sur occupé",
                    "Zéro visibilité sur Google - vous êtes invisible",
                    "Paiements Mobile Money impossibles en ligne",
                    "Aucun système de fidélité pour faire revenir les gens",
                    "Commandes perdues ou erreurs de transmission",
                    "Événements gérés à la main, billetterie chaotique"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-6 text-gray-400 font-bold text-lg md:text-xl line-through decoration-gray-300 decoration-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full shrink-0 mt-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-16 p-10 bg-red-50 rounded-4xl text-red-500 font-black uppercase text-sm tracking-widest text-center border-2 border-red-100">
                VERDICT : PERTES MASSIVES DE CHIFFRE D'AFFAIRES
              </div>
            </div>

            {/* NEW WORLD */}
            <div className="bg-[#1A1F36] p-12 md:p-20 rounded-[5rem] text-white flex flex-col justify-between shadow-[0_50px_100px_rgba(26,31,54,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/15 rounded-full blur-[120px]" />
              <div>
                <div className="flex items-center gap-6 mb-16">
                   <div className="w-16 h-16 bg-[#FF6B35]/20 rounded-2xl flex items-center justify-center text-[#FF6B35] shadow-lg shadow-[#FF6B35]/20"><CheckCircle2 size={40} /></div>
                   <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">VOTRE NOUVELLE RÉALITÉ</h3>
                </div>
                <ul className="space-y-8">
                  {[
                    "Commandes automatiques 24h/24 (+300% revenus)",
                    "Première page Google garantie localement",
                    "Paiements MoMo, Moov, Celtiis intégrés à 100%",
                    "Système de récompenses automatique (Fidélité)",
                    "Vente de tickets QR pour vos concerts & soirées",
                    "Analytics complets : vous savez enfin qui mange quoi"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-6 font-black text-xl md:text-2xl">
                      <div className="w-4 h-4 bg-[#00D9A5] rounded-full shrink-0 mt-3 shadow-[0_0_15px_#00D9A5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-16 p-10 bg-[#00D9A5]/10 rounded-4xl text-[#00D9A5] font-black uppercase text-sm tracking-widest text-center border-2 border-[#00D9A5]/20">
                VERDICT : DOMINATION TOTALE DU MARCHÉ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE IMPACT ZOOM MOMENT */}
      <SpacecraftPortal />

      {/* KILLER FEATURES */}
      <section id="features" className="py-40 px-8 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Ecosystème"
            title="Tout ce dont votre restaurant a besoin"
            subtitle="On a pensé à TOUT. Pour que vous puissiez vous concentrer sur votre cuisine."
            dark
          />

          <div className="grid md:grid-cols-2 gap-12">
            <FeatureCard 
              icon={Smartphone}
              title="Commandes 24h/24"
              desc={`Imaginez : Il est 2h du matin. Un client a une envie folle de votre poulet braisé. Il commande, paie par MoMo.\n\nVous recevez la notification. Vous livrez. Vous encaissez.`}
              stat="+300% COMMANDES"
              img="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1000&q=80"
              dark
            />
            <FeatureCard 
              icon={Ticket}
              title="Soirées & Billets"
              desc={`Soirée grillades ? Concert live ? Dégustation ? Créez l'événement en 5 minutes. Restafy s'occupe de TOUT : vente des billets, codes QR, paiements.`}
              stat="CASH EVENT"
              img="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80"
              dark
            />
            <FeatureCard 
              icon={CreditCard}
              title="Paiements Béninois"
              desc={`MoMo Pay, Moov Money, Celtiis, MTN Money, Cash. Vos clients paient comme ils veulent. Vous recevez l'argent immédiatement.`}
              stat="0% COMMISSION"
              img="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80"
              dark
            />
            <FeatureCard 
              icon={BarChart3}
              title="Analytics"
              desc={`Quel plat se vend le plus ? Qui sont vos meilleurs clients ? Dashboard ultra-simple qui répond à TOUTES ces questions. En temps réel.`}
              stat="+45% RENTABILITÉ"
              img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
              dark
            />
          </div>
        </div>
      </section>

      {/* PRIVILEGES & BETA */}
      <section id="beta" className="py-40 px-8 bg-white text-[#1A1F36]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="L'Offre"
            title="Pourquoi rejoindre maintenant ?"
            subtitle="Valeur totale du pack : 250,000 FCFA. Coût pour vous : 0 FCFA."
          />

          <div className="grid lg:grid-cols-3 gap-10 mb-24">
            {[
              { icon: Gift, title: "100% GRATUIT", desc: "Pas de frais d'installation. Pas d'abonnement. 0% de commission sur vos ventes pendant toute la beta (6 mois min).", value: "200,000 FCFA" },
              { icon: Zap, title: "ACCÈS PRIORITAIRE", desc: "Vous testez les nouvelles fonctions avant tout le monde. Vous influencez ce qu'on construit selon VOS besoins.", value: "INESTIMABLE" },
              { icon: Award, title: "FORMATION VIP", desc: "Session live pour configurer votre compte. Support WhatsApp dédié avec réponse en moins de 2h.", value: "50,000 FCFA" }
            ].map((adv, i) => (
              <div key={i} className="bg-gray-50 p-16 rounded-[4.5rem] border border-gray-100 flex flex-col items-center text-center h-full hover:bg-gray-100 transition-colors">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#FF6B35] shadow-xl mb-12 border border-gray-100">
                   <adv.icon size={48} />
                </div>
                <h4 className="text-3xl font-black mb-6 uppercase tracking-tight">{adv.title}</h4>
                <p className="text-gray-500 font-medium mb-12 text-lg leading-relaxed flex-grow">{adv.desc}</p>
                <div className="bg-[#FF6B35] text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#FF6B35]/20">
                  Valeur : {adv.value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1A1F36] text-white p-12 md:p-20 rounded-[5rem] relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#FF6B35]/15 rounded-full blur-[150px]" />
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black mb-16 uppercase tracking-tight leading-tight">VOS BONUS EXCLUSIFS :</h3>
              <div className="grid md:grid-cols-2 gap-y-12 gap-x-24">
                {[
                  "Commission 0% sur TOUTES vos ventes (Bénéfice Net)",
                  "Intégration personnalisée de votre menu complet",
                  "Session photo professionnelle de vos plats offerte",
                  "Tarif préférentiel À VIE après la phase beta",
                  "Badge 'Restaurant Pionnier' certifié",
                  "Accès prioritaire aux nouvelles fonctionnalités"
                ].map((bonus, i) => (
                  <div key={i} className="flex items-center gap-8 text-xl md:text-2xl font-black group cursor-default">
                    <div className="w-10 h-10 bg-[#00D9A5] rounded-xl flex items-center justify-center text-[#1A1F36] transition-transform group-hover:scale-125 group-hover:rotate-12">
                       <CheckCircle2 size={24} />
                    </div>
                    {bonus}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-40 px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Succès" title="Ce qu'ils disent de nous" subtitle="Les plus rapides dominent déjà leur secteur au Bénin." />
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { author: "Jean-Marc D.", res: "Le Petit Gourmet, Cotonou", content: "Je pensais que c'était trop beau pour être vrai. J'ai lancé Restafy un lundi. Le samedi, j'avais déjà reçu 47 commandes en ligne. Mon CA a TRIPLÉ en 2 semaines." },
              { author: "Aminata K.", res: "Chez Maman, Porto-Novo", content: "Avant Restafy, je galerais à vendre 20 places d'événement. Avec la billetterie intégrée, j'organise un événement chaque semaine et je vends 150 tickets QR à chaque fois." },
              { author: "Patrick M.", res: "La Terrasse, Parakou", content: "Enfin une solution pensée pour NOUS. Pas besoin de compte bancaire compliqué. MoMo Pay marche parfaitement. Mon équipe a tout compris en 10 minutes." }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -15 }}
                className="bg-white p-12 md:p-16 rounded-[4.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden"
              >
                <div className="flex gap-2 text-[#FF6B35] mb-12">
                  {[1,2,3,4,5].map(s => <Star key={s} size={22} fill="currentColor" />)}
                </div>
                <p className="text-xl italic font-bold text-gray-700 leading-[1.4] mb-12">"{t.content}"</p>
                <div className="flex items-center gap-6 pt-8 border-t border-gray-50">
                  <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center text-[#FF6B35] font-black text-2xl uppercase">{t.author[0]}</div>
                  <div>
                    <h5 className="font-black text-xl">{t.author}</h5>
                    <p className="text-sm font-black text-[#FF6B35] uppercase tracking-widest">{t.res}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-40 px-8 bg-[#1A1F36] text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="Etape par etape" title="Comment rejoindre la beta ?" subtitle="C'est ultra simple. 48h chrono pour décoller." dark />

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: "01", title: "Candidature", desc: "2 minutes pour remplir le formulaire. On veut juste connaître votre ambition et votre motivation." },
              { step: "02", title: "Validation", desc: "On examine votre candidature (max 2h). Si c'est bon, on vous contacte sur WhatsApp pour configurer." },
              { step: "03", title: "Lancement", desc: "Votre restaurant est en ligne en 48h. Profil, menu, paiements... Tout est prêt pour vendre." }
            ].map((p, i) => (
              <div key={i} className="glass p-12 rounded-[4rem] border border-white/5 flex flex-col h-full relative group hover:bg-white/5 transition-colors">
                <div className="text-7xl font-black text-white/5 mb-8 group-hover:text-[#FF6B35]/20 transition-colors">{p.step}</div>
                <h4 className="text-3xl font-black uppercase mb-6">{p.title}</h4>
                <p className="text-white/40 font-medium text-lg leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-40 px-8 bg-[#050505] relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading badge="Support" title="Des Questions ?" subtitle="Tout ce qu'il faut savoir avant de décoller." dark />
          <AccordionItem question="C'est vraiment 100% gratuit ?" answer={`OUI. Pas de frais cachés. Pas de commission. Pendant toute la phase beta (6 mois min), vous utilisez Restafy sans payer un centime.\n\nAprès la beta, vous profitez d'un tarif préférentiel à vie garanti.`} />
          <AccordionItem question="Combien de temps pour être en ligne ?" answer="48h maximum. Lundi vous postulez, mercredi votre menu est en ligne et vous recevez vos premières commandes." />
          <AccordionItem question="Je ne suis pas très tech, c'est compliqué ?" answer="NON. Si vous savez utiliser WhatsApp, vous savez utiliser Restafy. En plus, on vous former personnellement." />
          <AccordionItem question="Ça marche vraiment au Bénin avec notre connexion ?" answer="OUI. Tout est optimisé pour l'Afrique. Plateforme ultra-légère qui fonctionne même avec une connexion moyenne." />
        </div>
      </section>

      {/* FINAL MASSIVE CTA */}
      <section id="apply" className="py-52 px-8 bg-[#FF6B35] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[80rem] h-full bg-white/5 -skew-x-12 translate-x-1/2" />
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-4 bg-black/20 px-10 py-4 rounded-full mb-16 font-black text-sm uppercase tracking-[0.5em] border border-white/20"
          >
            ⚠️ IL NE RESTE QUE 7 PLACES SUR 20
          </motion.div>
          
          <h2 className="text-[10vw] lg:text-[14vw] font-black uppercase leading-[0.75] tracking-tighter mb-20 select-none">
            DÉCOUVREZ<br />L'EXCELLENCE.
          </h2>
          
          <div className="max-w-4xl mx-auto text-left space-y-24">
             <div className="text-3xl md:text-5xl font-black leading-tight border-l-[12px] border-white pl-12 py-4">
                Dans 6 mois, vous allez soit :<br/>
                <span className="opacity-40">1. Regretter de ne pas avoir saisi cette chance</span><br/>
                <span className="text-white">2. Remercier d'avoir eu le courage de dire OUI</span>
             </div>

             <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white text-[#050505] p-12 md:p-24 rounded-[6rem] shadow-[0_80px_160px_rgba(0,0,0,0.4)] relative"
            >
              {formSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-32 h-32 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_30px_60px_rgba(255,107,53,0.3)]">
                    <CheckCircle2 size={72} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">CANDIDATURE REÇUE !</h3>
                  <p className="text-gray-500 font-bold text-xl">Notre équipe vous contacte sur WhatsApp dans moins de 2h.</p>
                </div>
              ) : (
                <>
                  <div className="mb-16">
                    <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Candidature Beta Restafy</h3>
                    <p className="text-gray-500 font-medium text-xl">Remplissez ce formulaire en 2 minutes. On vous contacte dans les 2h.</p>
                  </div>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const nom = formData.get('manager');
                      const restaurant = formData.get('restaurant');
                      const motivation = formData.get('motivation') as string;

                      if (motivation.length < 150) {
                        alert("Votre motivation doit faire au moins 150 caractères pour être validée.");
                        return;
                      }

                      const message = encodeURIComponent(
                        `Bonjour l'équipe Restafy ! 👋\n\nJe suis ${nom} de ${restaurant}.\n\nJe viens de soumettre ma candidature pour la beta exclusive. J'aimerais discuter de cette opportunité et commencer au plus vite ! 🚀`
                      );
                      
                      setFormSubmitted(true);
                      setTimeout(() => window.location.href = `https://wa.me/2290193527256?text=${message}`, 2000);
                    }}
                    className="space-y-12"
                  >
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 ml-2">Nom du restaurant *</label>
                        <input required name="restaurant" type="text" placeholder="EX: RESTAURANT LE GOURMET" className="w-full bg-gray-50 border-4 border-transparent focus:border-[#FF6B35] p-8 rounded-3xl outline-none font-black text-2xl transition-all uppercase" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 ml-2">Votre Nom Complet *</label>
                        <input required name="manager" type="text" placeholder="NOM ET PRÉNOMS" className="w-full bg-gray-50 border-4 border-transparent focus:border-[#FF6B35] p-8 rounded-3xl outline-none font-black text-2xl transition-all uppercase" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 ml-2">WhatsApp (+229) *</label>
                        <input required name="phone" type="tel" placeholder="+229 01..." className="w-full bg-gray-50 border-4 border-transparent focus:border-[#FF6B35] p-8 rounded-3xl outline-none font-black text-2xl transition-all" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 ml-2">Type de Cuisine *</label>
                        <select required name="cuisine" className="w-full bg-gray-50 border-4 border-transparent focus:border-[#FF6B35] p-8 rounded-3xl outline-none font-black text-2xl transition-all appearance-none cursor-pointer">
                          <option>AFRICAINE</option>
                          <option>FAST-FOOD</option>
                          <option>EUROPÉENNE</option>
                          <option>FUSION / AUTRE</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 ml-2">Pourquoi rejoindre Restafy ? (min. 150 char) *</label>
                      <textarea 
                        required 
                        name="motivation" 
                        minLength={150} 
                        placeholder="VOTRE MOTIVATION ICI..." 
                        className="w-full bg-gray-50 border-4 border-transparent focus:border-[#FF6B35] p-8 rounded-3xl outline-none font-black text-2xl transition-all h-64 resize-none"
                      />
                    </div>
                    
                    <button type="submit" className="w-full bg-[#FF6B35] text-white py-12 rounded-[3.5rem] font-black text-3xl uppercase tracking-[0.1em] shadow-[0_40px_80px_rgba(255,107,53,0.3)] hover:scale-[1.02] transition-all">
                      🚀 ENVOYER MA CANDIDATURE
                    </button>
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-300">✓ TRANSMISSION SÉCURISÉE • RÉPONSE EN 2H</p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-40 px-8 bg-[#050505] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 border-b border-white/5 pb-32">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-xl flex items-center justify-center shadow-xl"><Zap size={26} /></div>
                <span className="text-3xl font-black tracking-tighter uppercase">RESTAFY<span className="text-[#FF6B35]">.</span></span>
              </div>
              <p className="text-white/20 text-2xl font-medium max-w-sm leading-relaxed mb-12 italic">
                La plateforme qui transforme les restaurants béninois en empires numériques.
              </p>
              <div className="flex gap-8">
                 <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 hover:text-[#FF6B35] cursor-pointer transition-colors"><Globe size={20} /></div>
                 <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 hover:text-[#FF6B35] cursor-pointer transition-colors"><Star size={20} /></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12">CANAUX DIRECTS</h5>
              <div className="space-y-6">
                <p className="text-lg font-black text-white/60 hover:text-white transition-colors cursor-pointer">📧 contact@restafy.shop</p>
                <p className="text-3xl font-black text-[#FF6B35] text-glow hover:scale-105 transition-transform cursor-pointer">+229 01 93 52 72 56</p>
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12">MISSION</h5>
              <p className="text-white/40 font-medium leading-relaxed">
                Conçue au Bénin. Pour le Bénin. Par des Béninois qui connaissent VOS défis quotidiens.
              </p>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
           <p>© 2026 RESTAFY CORE. FAIT par <a href="https://afro-site.vercel.app">afrosite</a></p>

            <div className="flex gap-12">
              <span className="hover:text-white transition-colors cursor-pointer">TERMINAL</span>
              <span className="hover:text-white transition-colors cursor-pointer">POLITIQUE</span>
              <span className="hover:text-white transition-colors cursor-pointer">MODÈLES</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
