/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sprout, 
  Map, 
  Users, 
  FlaskConical, 
  Handshake, 
  Mail, 
  MapPin, 
  Phone, 
  ChevronRight,
  Menu,
  X,
  Leaf,
  Globe,
  CloudSun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Comunidade', href: '#community' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="relative">
                <Leaf className="text-[#76b82a] w-8 h-8 rotate-12" />
                <Globe className="text-[#003366] w-5 h-5 absolute -bottom-1 -right-1" />
              </div>
              <div className="ml-3 flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tighter text-[#003366]">PELAGRA</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#76b82a] mt-0.5">MOÇAMBIQUE</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-[#76b82a] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#003366] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#002244] transition-all shadow-lg shadow-blue-100">
              Fale Connosco
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-green-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#76b82a] text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              <span>Inovação Agrícola em Moçambique</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Semeando o <span className="text-green-600">Futuro</span> da Agricultura
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A PELAGRA Moçambique combina tradição agro-pecuária com tecnologia de ponta para impulsionar a produtividade e a resiliência climática em nossas comunidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#003366] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#002244] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100">
                Nossos Serviços <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#76b82a] border-2 border-[#76b82a] px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                Saiba Mais
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Agricultural Landscape" 
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-green-50 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Globe className="text-[#003366] w-5 h-5" />
                </div>
                <span className="font-bold text-gray-900">Geoprocessamento</span>
              </div>
              <p className="text-sm text-gray-500">Tecnologia aplicada ao mapeamento e análise rural.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Produção Agro-pecuária",
      desc: "Produção e comercialização de produtos de alta qualidade, focados na sustentabilidade.",
      icon: Sprout,
      color: "bg-green-50 text-[#76b82a]"
    },
    {
      title: "Consultoria & Geoprocessamento",
      desc: "Serviços especializados em áreas agrícolas com aplicação de tecnologias geoespaciais.",
      icon: Map,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Ensaios Científicos",
      desc: "Condução de ensaios técnico-científicos para validação de novas práticas e tecnologias.",
      icon: FlaskConical,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Resiliência Climática",
      desc: "Programas focados em agricultura resiliente às mudanças climáticas e apoio comunitário.",
      icon: CloudSun,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossas Áreas de Actuação</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos soluções integradas que abrangem desde a produção direta até a consultoria tecnológica avançada.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className={`${s.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Community = () => {
  return (
    <section id="community" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#003366] rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" 
              alt="Community" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 p-12 lg:p-20 lg:w-2/3">
            <div className="flex items-center gap-2 text-[#76b82a] font-semibold mb-6">
              <Users className="w-5 h-5" />
              <span>Impacto Social</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Compromisso com a Comunidade e o Meio Ambiente
            </h2>
            <p className="text-blue-50 text-lg mb-10 leading-relaxed">
              Através da nossa vertente de ONG, implementamos programas de apoio às comunidades locais, promovendo práticas agrícolas sustentáveis e resilientes. Acreditamos que o crescimento económico deve caminhar lado a lado com o desenvolvimento social.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/50 p-2 rounded-lg">
                  <Handshake className="text-[#76b82a] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Parcerias Estratégicas</h4>
                  <p className="text-blue-100 text-sm">Colaboração com parceiros nacionais e internacionais.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-900/50 p-2 rounded-lg">
                  <Sprout className="text-[#76b82a] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Tecnologia Rural</h4>
                  <p className="text-blue-100 text-sm">Investimento em pesquisa e novas tecnologias agrícolas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Entre em Contacto</h2>
            <p className="text-lg text-gray-600 mb-10">
              Estamos prontos para colaborar em projectos de inovação agrícola e consultoria técnica.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-green-100 p-4 rounded-2xl">
                  <MapPin className="text-[#76b82a] w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Localização</h4>
                  <p className="text-gray-600">Bairro 25 de Setembro, Unidade 5, Moatize, Tete, Moçambique</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-green-100 p-4 rounded-2xl">
                  <Phone className="text-[#76b82a] w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Telefone</h4>
                  <p className="text-gray-600">+258 83 102 5003</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-green-100 p-4 rounded-2xl">
                  <Mail className="text-[#76b82a] w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600">geraldoflx@pelagramz.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 lg:p-12 rounded-[2rem] border border-gray-100">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nome</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Assunto</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Como podemos ajudar?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mensagem</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Sua mensagem..."></textarea>
              </div>
              <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="relative">
                <Leaf className="text-[#76b82a] w-6 h-6 rotate-12" />
                <Globe className="text-[#003366] w-4 h-4 absolute -bottom-0.5 -right-0.5" />
              </div>
              <div className="ml-2 flex flex-col leading-none">
                <span className="text-lg font-black tracking-tighter text-white">PELAGRA</span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-[#76b82a]">MOÇAMBIQUE</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} PELAGRA Moçambique, LDA. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#76b82a] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#76b82a] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#76b82a] transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Community />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
