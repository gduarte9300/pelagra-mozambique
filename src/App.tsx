/**
 * PELAGRA Moçambique — Landing Page v2
 * Melhorias: Sobre, Portfólio, Impacto, formulário funcional,
 * WhatsApp flutuante, animações scroll-triggered, SEO, fonts.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout, Map, Users, FlaskConical, Handshake, Mail,
  MapPin, Phone, ChevronRight, Menu, X, Leaf, Globe,
  CloudSun, Award, TrendingUp, Target, BookOpen,
  Building2, Tractor, Bird, TreePine, ArrowUpRight,
  CheckCircle2, MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Scroll-reveal hook ──────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated counter ───────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Section wrapper with reveal ───────────────────────── */
function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Comunidade', href: '#community' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md shadow-green-50' : 'bg-transparent'
    } border-b ${scrolled ? 'border-green-100' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <Leaf className="text-[#76b82a] w-8 h-8 rotate-12 group-hover:rotate-6 transition-transform" />
              <Globe className="text-[#003366] w-5 h-5 absolute -bottom-1 -right-1" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-[#003366]"
                style={{ fontFamily: 'Sora, sans-serif' }}>PELAGRA</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#76b82a] mt-0.5">MOÇAMBIQUE</span>
            </div>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a key={l.name} href={l.href}
                className="text-sm font-semibold text-gray-600 hover:text-[#76b82a] transition-colors relative group">
                {l.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#76b82a] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#contact"
              className="bg-[#003366] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#76b82a] transition-all duration-300 shadow-lg">
              Fale Connosco
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-green-100 overflow-hidden shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <a key={l.name} href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#76b82a] hover:bg-green-50 rounded-xl transition-colors">
                  {l.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}
                className="block mt-2 px-4 py-3 bg-[#003366] text-white rounded-xl text-center font-bold">
                Fale Connosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f9f7f2]">
      {/* Background dot grid */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(#003366 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#76b82a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#003366]/5 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#76b82a]/10 text-[#5a8f1e] text-sm font-semibold mb-6 border border-[#76b82a]/20">
              <Leaf className="w-4 h-4" />
              Inovação Agrícola em Moçambique
            </div>
            <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-gray-900 leading-[1.08] mb-6 tracking-tight"
              style={{ fontFamily: 'Sora, sans-serif' }}>
              Semeando o{' '}
              <span className="text-[#76b82a] relative">
                Futuro
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 220 10" fill="none">
                  <path d="M2 7 Q55 1 110 6 Q165 11 218 5" stroke="#76b82a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
                </svg>
              </span>{' '}
              da Agricultura
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              Combinamos tradição agro-pecuária com tecnologia para impulsionar a produtividade
              e a resiliência climática das comunidades de Tete e além.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services"
                className="bg-[#003366] text-white px-8 py-4 rounded-full text-base font-bold hover:bg-[#76b82a] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-blue-100/50">
                Os Nossos Serviços <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#portfolio"
                className="bg-white text-[#003366] border-2 border-[#003366] px-8 py-4 rounded-full text-base font-bold hover:border-[#76b82a] hover:text-[#76b82a] transition-all duration-300 flex items-center justify-center gap-2">
                Ver Portfólio
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-gray-200">
              {[
                { n: '5+', label: 'Anos de Experiência' },
                { n: '13', label: 'Distritos Cobertos' },
                { n: '40+', label: 'Projectos Realizados' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-[#003366]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.n}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image + card */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
                alt="Paisagem agrícola em Moçambique"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/50 via-transparent to-transparent" />
              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <div className="text-xs text-gray-500 font-medium">Localização</div>
                  <div className="text-sm font-bold text-[#003366]">Moatize, Tete — Moçambique</div>
                </div>
                <div className="bg-[#76b82a] text-white px-3 py-1.5 rounded-xl text-xs font-bold">
                  EST. 2019
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-green-50 max-w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Map className="text-[#003366] w-5 h-5" />
                </div>
                <span className="font-bold text-gray-900 text-sm">Geoprocessamento</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Análise geoespacial aplicada ao agronegócio.</p>
            </motion.div>

            {/* Second floating card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-[#003366] p-4 rounded-2xl shadow-xl max-w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <Award className="text-[#76b82a] w-4 h-4" />
                <span className="font-bold text-white text-xs">Certificado</span>
              </div>
              <p className="text-[#76b82a] text-xs font-semibold">Eng. Agro-Pecuário</p>
              <p className="text-white/60 text-[10px]">UniZambeze 2021</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════ */
function About() {
  const values = [
    { icon: Target, title: 'Missão', text: 'Transformar recursos agro-pecuários em negócios viáveis e sustentáveis que melhorem a vida das comunidades rurais de Moçambique.' },
    { icon: Globe, title: 'Visão', text: 'Ser a referência de excelência em consultoria agro-empresarial em Tete e contribuir para a segurança alimentar nacional.' },
    { icon: Leaf, title: 'Valores', text: 'Rigor técnico, compromisso comunitário, sustentabilidade ambiental, inovação e integridade em cada projecto.' },
  ];

  const pillars = [
    'Licenciatura em Eng. Agro-Pecuária (UniZambeze)',
    'Supervisão de Mecanização Agrícola — PROMAG/AVZ',
    'Assessoria Empresarial a PME — COrE-Tete / IPEME',
    'Projectos avícolas e hortícolas no distrito de Moatize',
    'Parceiro da Agência do Zambeze (AdZ)',
  ];

  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — image stack */}
          <Reveal>
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=900"
                  alt="Técnico agrícola em campo"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/30 to-transparent" />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#76b82a] text-white p-6 rounded-2xl shadow-xl text-center">
                <div className="text-4xl font-black" style={{ fontFamily: 'Sora, sans-serif' }}>5+</div>
                <div className="text-sm font-semibold opacity-90 mt-0.5">Anos de<br />Experiência</div>
              </div>

              {/* Small decorative box */}
              <div className="absolute -top-5 -left-5 bg-white border border-green-100 p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#76b82a] animate-pulse" />
                  <span className="text-xs font-bold text-gray-700">Activo em Tete desde 2019</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — copy */}
          <div>
            <Reveal delay={0.1}>
              <div className="section-rule" />
              <p className="text-sm font-bold tracking-widest text-[#76b82a] uppercase mb-3">Sobre Nós</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                style={{ fontFamily: 'Sora, sans-serif' }}>
                Raízes em Tete,<br />Olhos no Futuro
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A <strong>PELAGRA Moçambique</strong> nasceu da necessidade de unir o conhecimento técnico
                agro-pecuário ao mundo dos negócios. Baseados em Moatize, Tete, operamos na intersecção
                da produção agrícola, da consultoria empresarial e da tecnologia geoespacial.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Com formação em Engenharia Agro-Pecuária e experiência directa em mecanização agrícola,
                extensão rural e assessoria a PME através do IPEME/COrE-Tete, trazemos rigor técnico
                e conhecimento do terreno a cada projecto.
              </p>
            </Reveal>

            {/* Pillars list */}
            <Reveal delay={0.2}>
              <div className="space-y-3 mb-10">
                {pillars.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#76b82a] flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Values cards */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-4">
                {values.map((v, i) => (
                  <div key={i} className="bg-[#f9f7f2] p-4 rounded-2xl border border-gray-100 hover:border-[#76b82a]/30 transition-colors">
                    <v.icon className="w-6 h-6 text-[#76b82a] mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{v.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════════ */
function Services() {
  const services = [
    {
      icon: Sprout,
      title: 'Produção Agro-pecuária',
      desc: 'Produção e comercialização de produtos de alta qualidade — avicultura, horticultura e culturas de rendimento com foco na sustentabilidade.',
      features: ['Frango de corte (ciclos 42 dias)', 'Horticultura irrigada', 'Culturas de rendimento'],
      color: 'bg-green-50 text-[#76b82a]',
      accent: 'border-[#76b82a]',
    },
    {
      icon: BookOpen,
      title: 'Consultoria Agro-Empresarial',
      desc: 'Elaboração de Planos de Negócio, estudos de viabilidade e candidaturas a financiamento junto de BNI, GAPI e outros fundos.',
      features: ['Planos de Negócio', 'Candidaturas BNI / GAPI', 'Diagnóstico empresarial'],
      color: 'bg-blue-50 text-[#003366]',
      accent: 'border-[#003366]',
    },
    {
      icon: Map,
      title: 'Geoprocessamento & SIG',
      desc: 'Mapeamento e análise de áreas agrícolas com tecnologias geoespaciais para apoio à tomada de decisão e gestão territorial.',
      features: ['Mapeamento de parcelas', 'Análise de aptidão agrícola', 'Inventários de recursos'],
      color: 'bg-purple-50 text-purple-600',
      accent: 'border-purple-400',
    },
    {
      icon: FlaskConical,
      title: 'Ensaios Científicos',
      desc: 'Condução de ensaios técnico-científicos para validação de variedades, práticas agronômicas e tecnologias adaptadas ao contexto local.',
      features: ['Ensaios de variedades', 'Validação de tecnologias', 'Relatórios técnicos'],
      color: 'bg-orange-50 text-orange-600',
      accent: 'border-orange-400',
    },
    {
      icon: Tractor,
      title: 'Mecanização Agrícola',
      desc: 'Consultoria para implementação de Parques de Máquinas, gestão de frotas agrícolas e planificação de campanhas de mecanização.',
      features: ['Planos de Parque de Máquinas', 'Gestão de frotas', 'Formação de operadores'],
      color: 'bg-yellow-50 text-yellow-700',
      accent: 'border-yellow-400',
    },
    {
      icon: CloudSun,
      title: 'Resiliência Climática',
      desc: 'Programas de adaptação às mudanças climáticas com práticas de agricultura de conservação e gestão sustentável de recursos hídricos.',
      features: ['Agric. de conservação', 'Gestão hídrica', 'Irrigação de baixo custo'],
      color: 'bg-teal-50 text-teal-600',
      accent: 'border-teal-400',
    },
  ];

  return (
    <section id="services" className="py-28 bg-[#f9f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <div className="section-rule mx-auto" />
          <p className="text-sm font-bold tracking-widest text-[#76b82a] uppercase mb-3">O Que Fazemos</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Áreas de Actuação
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluções integradas que abrangem desde a produção directa até à consultoria tecnológica avançada.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`bg-white p-7 rounded-3xl shadow-sm border-b-4 ${s.accent} hover:shadow-xl transition-all h-full flex flex-col`}>
                <div className={`${s.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#76b82a] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO
═══════════════════════════════════════════════════════════ */
type PortfolioItem = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  color: string;
  year: string;
  result: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    category: 'Produção Animal',
    title: 'Projecto AVIPRO — Avicultura em Moatize',
    description: 'Desenvolvimento de Nota Conceptual e Plano de Investimento para produção de frango de corte em escala (1.000 a 20.000 pintos/lote), com análise de viabilidade técnico-económica e projecção de 4 lotes escalonados.',
    tags: ['Avicultura', 'Plano de Negócio', 'Agência do Zambeze'],
    icon: Bird,
    color: 'bg-yellow-50 border-yellow-200',
    year: '2025',
    result: '20.000 pintos/lote — 4 ciclos anuais',
  },
  {
    category: 'Mecanização Agrícola',
    title: 'Inventário de Tractores — Tete (13 Distritos)',
    description: 'Levantamento e mapeamento do parque de máquinas agrícolas nos 13 distritos de Tete. Produção de dashboard interactivo com estado operacional, distribuição geográfica e indicadores de influência política para apoio a decisão.',
    tags: ['SIG', 'Dashboard', 'Mecanização', 'PROMAG'],
    icon: Tractor,
    color: 'bg-orange-50 border-orange-200',
    year: '2024',
    result: '13 distritos mapeados — Tete',
  },
  {
    category: 'Consultoria Empresarial',
    title: 'Parque de Máquinas Agrícolas — AdZ',
    description: 'Elaboração do Plano de Negócio para criação de um Parque de Máquinas Agrícolas no âmbito da Agência do Zambeze (AdZ), cobrindo dimensionamento, modelo de aluguer por campanha, gestão financeira e projecções a 5 anos.',
    tags: ['Plano de Negócio', 'AdZ', 'Mecanização'],
    icon: Building2,
    color: 'bg-blue-50 border-blue-200',
    year: '2025–2026',
    result: 'Em implementação — AdZ Tete',
  },
  {
    category: 'Monitoria & Avaliação',
    title: 'Relatórios COrE-Tete — Conecta-Negócios',
    description: 'Produção de relatórios mensais e semestrais de monitoria do projecto Conecta-Negócios (IPEME/COrE-Tete), cobrindo casos de sucesso NIS, mobilização SheTrades e assistência técnica a PME na Província de Tete.',
    tags: ['M&A', 'PME', 'IPEME', 'SheTrades'],
    icon: TrendingUp,
    color: 'bg-green-50 border-green-200',
    year: '2025–2026',
    result: '50+ PME acompanhadas',
  },
  {
    category: 'Investigação Aplicada',
    title: 'Ensaios Agronómicos — IMECTEC',
    description: 'Coordenação do Departamento de Investigação, Inovação e Extensão do IMECTEC, supervisionando ensaios técnicos de campo, produção científica e actividades de extensão rural em Tete e Manica.',
    tags: ['Investigação', 'Extensão Rural', 'IMECTEC'],
    icon: FlaskConical,
    color: 'bg-purple-50 border-purple-200',
    year: '2024–2025',
    result: 'Coord. Dep. Investigação',
  },
  {
    category: 'Resiliência Climática',
    title: 'Análise CGRNs — Coutada 14',
    description: 'Revisão científica de manuscrito académico sobre Comunidades de Gestão de Recursos Naturais (CGRNs) na Coutada 14, com tracked changes e comentários XML para publicação em revista científica indexada.',
    tags: ['CGRN', 'Revisão Científica', 'Biodiversidade'],
    icon: TreePine,
    color: 'bg-teal-50 border-teal-200',
    year: '2025',
    result: 'Manuscrito em revisão',
  },
];

function Portfolio() {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <div className="section-rule mx-auto" />
          <p className="text-sm font-bold tracking-widest text-[#76b82a] uppercase mb-3">O Nosso Trabalho</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Portfólio de Projectos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma selecção de projectos realizados em Tete e outras províncias de Moçambique.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setActive(item)}
                className={`${item.color} border rounded-3xl p-6 cursor-pointer hover:shadow-lg transition-all h-full flex flex-col group`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/70 p-2.5 rounded-xl">
                    <item.icon className="w-6 h-6 text-[#003366]" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    {item.year}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#76b82a] transition-colors" />
                  </div>
                </div>

                <div className="text-[10px] font-bold tracking-widest text-[#76b82a] uppercase mb-2">
                  {item.category}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((t, j) => (
                    <span key={j} className="text-[10px] font-semibold bg-white/70 text-gray-600 px-2.5 py-1 rounded-full border border-white/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-bold text-[#003366] flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#76b82a]" />
                  {item.result}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <a href="#contact"
            className="inline-flex items-center gap-2 bg-[#003366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#76b82a] transition-all duration-300 shadow-lg">
            Discutir um Projecto <ChevronRight className="w-5 h-5" />
          </a>
        </Reveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setActive(null)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`${active.color} border rounded-3xl p-8 max-w-lg w-full shadow-2xl`}>
              <div className="flex items-start justify-between mb-5">
                <div className="bg-white/70 p-3 rounded-xl">
                  <active.icon className="w-8 h-8 text-[#003366]" />
                </div>
                <button onClick={() => setActive(null)} className="text-gray-400 hover:text-gray-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs font-bold tracking-widest text-[#76b82a] uppercase mb-2">{active.category} · {active.year}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{active.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-5">{active.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {active.tags.map((t, i) => (
                  <span key={i} className="text-xs font-semibold bg-white/70 text-gray-700 px-3 py-1 rounded-full border border-white/80">{t}</span>
                ))}
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <div className="text-xs text-gray-500 font-medium mb-0.5">Resultado</div>
                <div className="font-bold text-[#003366]">{active.result}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   IMPACT NUMBERS
═══════════════════════════════════════════════════════════ */
function Impact() {
  const stats = [
    { value: 13, suffix: '', label: 'Distritos Cobertos', sub: 'Província de Tete' },
    { value: 40, suffix: '+', label: 'Projectos Realizados', sub: 'Agro, TIC e Empresarial' },
    { value: 50, suffix: '+', label: 'PME Apoiadas', sub: 'Via COrE-Tete / IPEME' },
    { value: 5,  suffix: '+', label: 'Anos de Experiência', sub: 'Em campo e consultoria' },
  ];

  return (
    <section className="py-20 bg-[#003366] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#76b82a 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-5xl lg:text-6xl font-black text-[#76b82a] mb-2"
                style={{ fontFamily: 'Sora, sans-serif' }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white font-bold text-lg mb-1">{s.label}</div>
              <div className="text-blue-200 text-sm">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMMUNITY
═══════════════════════════════════════════════════════════ */
function Community() {
  const pillars = [
    { icon: Handshake, title: 'Parcerias Estratégicas', desc: 'Colaboração com AdZ, IPEME, MINAG e parceiros internacionais.' },
    { icon: Sprout, title: 'Tecnologia Rural', desc: 'Levar inovação digital e geoespacial às comunidades rurais.' },
    { icon: Users, title: 'Capacitação Local', desc: 'Formação de técnicos e agricultores para autonomia produtiva.' },
    { icon: TreePine, title: 'Sustentabilidade', desc: 'Práticas que preservam o ambiente e garantem resiliência futura.' },
  ];

  return (
    <section id="community" className="py-28 bg-[#f9f7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#003366] rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
              alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(#76b82a 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 p-10 lg:p-20">
            <Reveal>
              <div className="flex items-center gap-2 text-[#76b82a] font-semibold mb-6">
                <Users className="w-5 h-5" />
                <span>Impacto Social</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-xl"
                style={{ fontFamily: 'Sora, sans-serif' }}>
                Compromisso com a Comunidade e o Meio Ambiente
              </h2>
              <p className="text-blue-100 text-lg mb-12 leading-relaxed max-w-2xl">
                Através da nossa vertente social, implementamos programas de apoio às comunidades rurais,
                promovendo práticas agrícolas sustentáveis. Acreditamos que o crescimento económico deve
                caminhar lado a lado com o desenvolvimento social e a preservação ambiental.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors">
                    <div className="bg-[#76b82a]/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                      <p.icon className="text-[#76b82a] w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{p.title}</h4>
                    <p className="text-blue-100 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const contacts = [
    { icon: MapPin, label: 'Localização', value: 'Bairro 25 de Setembro, Unidade 5, Moatize, Tete' },
    { icon: Phone, label: 'Telefone / WhatsApp', value: '+258 83 102 5003' },
    { icon: Mail, label: 'Email', value: 'geraldoflx@pelagramz.com' },
    { icon: Globe, label: 'Website', value: 'www.pelagramz.com' },
  ];

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <div className="section-rule mx-auto" />
          <p className="text-sm font-bold tracking-widest text-[#76b82a] uppercase mb-3">Fale Connosco</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Vamos Colaborar
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Tem um projecto agrícola, precisa de um Plano de Negócio ou quer saber mais sobre os nossos serviços?
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <Reveal>
            <div className="space-y-6 mb-10">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="bg-green-50 p-4 rounded-2xl flex-shrink-0">
                    <c.icon className="text-[#76b82a] w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{c.label}</div>
                    <div className="text-gray-800 font-semibold">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/258831025003?text=Olá%20PELAGRA%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#1aad52] transition-all shadow-lg shadow-green-200">
              <MessageCircle className="w-6 h-6" />
              Enviar mensagem no WhatsApp
            </a>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <div className="bg-[#f9f7f2] p-8 lg:p-10 rounded-[2rem] border border-gray-100">
              {status === 'sent' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-[#76b82a] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Mensagem Enviada!
                  </h3>
                  <p className="text-gray-600">Iremos responder em breve. Obrigado pelo contacto.</p>
                  <button onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-[#76b82a] font-semibold underline underline-offset-2">
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Web3Forms access key — substitua pelo seu */}
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
                  <input type="hidden" name="subject" value="Novo contacto — PELAGRA Moçambique" />
                  <input type="hidden" name="from_name" value="PELAGRA Website" />
                  <input type="checkbox" name="botcheck" className="hidden" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nome *</label>
                      <input required name="name" type="text" placeholder="O seu nome completo"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#76b82a] focus:border-transparent outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email *</label>
                      <input required name="email" type="email" placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#76b82a] focus:border-transparent outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Telefone</label>
                    <input name="phone" type="tel" placeholder="+258 8X XXX XXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#76b82a] focus:border-transparent outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Serviço de Interesse</label>
                    <select name="service"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#76b82a] focus:border-transparent outline-none transition-all text-sm text-gray-700">
                      <option value="">Seleccione um serviço...</option>
                      <option>Consultoria Agro-Empresarial / Plano de Negócio</option>
                      <option>Produção Agro-pecuária</option>
                      <option>Geoprocessamento & SIG</option>
                      <option>Ensaios Científicos</option>
                      <option>Mecanização Agrícola</option>
                      <option>Resiliência Climática</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Mensagem *</label>
                    <textarea required name="message" rows={4} placeholder="Descreva brevemente o seu projecto ou questão..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#76b82a] focus:border-transparent outline-none transition-all text-sm resize-none" />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-sm">Ocorreu um erro. Por favor tente novamente ou contacte via WhatsApp.</p>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold hover:bg-[#76b82a] transition-all duration-300 shadow-lg disabled:opacity-60 flex items-center justify-center gap-2">
                    {status === 'sending' ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> A enviar...</>
                    ) : (
                      <>Enviar Mensagem <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  const links = {
    'Empresa': ['Sobre Nós', 'Serviços', 'Portfólio', 'Contacto'],
    'Serviços': ['Consultoria Agro-Empresarial', 'Geoprocessamento', 'Ensaios Científicos', 'Mecanização'],
    'Contacto': ['Moatize, Tete — Moçambique', '+258 83 102 5003', 'geraldoflx@pelagramz.com'],
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <Leaf className="text-[#76b82a] w-7 h-7 rotate-12" />
                <Globe className="text-[#003366] w-4 h-4 absolute -bottom-0.5 -right-0.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter text-white" style={{ fontFamily: 'Sora, sans-serif' }}>PELAGRA</span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#76b82a]">MOÇAMBIQUE</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Soluções integradas de consultoria agro-empresarial e inovação agrícola em Moçambique.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Facebook', 'Instagram'].map(s => (
                <a key={s} href="#" className="bg-gray-800 hover:bg-[#76b82a] text-gray-400 hover:text-white w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-5 text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm hover:text-[#76b82a] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {new Date().getFullYear()} PELAGRA Moçambique, LDA. Todos os direitos reservados.</p>
          <p className="text-xs text-gray-600">Desenvolvido com ❤️ em Moatize, Tete — Moçambique</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
═══════════════════════════════════════════════════════════ */
function WhatsAppButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          href="https://wa.me/258831025003?text=Olá%20PELAGRA%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl whatsapp-btn hover:scale-110 transition-transform"
          title="Fale connosco no WhatsApp">
          <MessageCircle className="w-7 h-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Impact />
        <Community />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
