import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, ChevronRight, ArrowRight, MapPin, Phone, Mail, Globe, Monitor, ShieldCheck, Cpu, Loader2 } from 'lucide-react';
import { Button } from './components/Button';
import { AIReceptionist } from './components/AIReceptionist';
import { COMPANY_NAME, SERVICES, TESTIMONIALS, OWNER_NAME, PHONE, EMAIL, LOCATION, YEARS_EXPERIENCE, LINKEDIN_URL } from './constants';
import { ServiceItem } from './types';

function App() {
  console.log("App mounting...");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [formSending, setFormSending] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormSending(true);
    
    // Use FormData to collect all form fields easily
    const formData = new FormData(formRef.current);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/allanboraine@gmail.com", {
        method: "POST",
        headers: { 
            'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        setFormSent(true);
        formRef.current.reset();
        setTimeout(() => setFormSent(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('FormSubmit Error:', error);
      alert("Something went wrong. Please try calling us directly at " + PHONE);
    } finally {
      setFormSending(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Services', 'About', 'Why Us', 'Contact'];
  // Split links for desktop symmetry
  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  return (
    <div className="font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center relative">

          {/* Desktop Left Nav */}
          <div className="hidden lg:flex items-center gap-8 w-1/3 justify-start">
            {leftLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`font-medium text-sm tracking-wide uppercase hover:text-yellow-500 transition-colors ${scrolled ? 'text-boraine-700' : 'text-white'}`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Centered Logo */}
          <a href="#" className="absolute left-1/2 top-[56%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10 w-auto text-center">
            {/* Logo Text */}
            <div className={`text-5xl lg:text-7xl font-serif font-black tracking-tighter leading-none transition-colors duration-300 ${scrolled ? 'text-boraine-900' : 'text-white'}`}>
              BOR<span className="text-yellow-500 drop-shadow-2xl">AI</span>NE
            </div>
            {/* Subtext */}
            <div className={`text-base lg:text-2xl font-sans font-black tracking-[0.5em] uppercase mt-1 transition-colors duration-300 ${scrolled ? 'text-blue-600' : 'text-blue-300'}`}>
              TECH
            </div>
          </a>

          {/* Desktop Right Nav & Portal */}
          <div className="hidden lg:flex items-center gap-8 w-1/3 justify-end">
            {rightLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`font-medium text-sm tracking-wide uppercase hover:text-yellow-500 transition-colors ${scrolled ? 'text-boraine-700' : 'text-white'}`}
              >
                {item}
              </a>
            ))}
            <Button variant={scrolled ? 'primary' : 'glass'} size="sm" onClick={() => setPortalOpen(true)}>
              Client Portal
            </Button>
          </div>

          {/* Mobile Toggle (Absolute Right) */}
          <button
            className="lg:hidden absolute right-6 text-boraine-900 z-20 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ?
              <X color={scrolled ? '#0f172a' : '#ffffff'} /> :
              <Menu color={scrolled ? '#0f172a' : '#ffffff'} />
            }
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 w-full h-screen bg-boraine-900/98 backdrop-blur-2xl p-8 flex flex-col items-center justify-center gap-8 lg:hidden animate-in fade-in zoom-in-95 duration-300 z-[60]">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>

            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-3xl font-serif font-bold text-white hover:text-yellow-500 transition-all hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full max-w-xs mt-4" variant="glass" size="lg" onClick={() => { setPortalOpen(true); setMobileMenuOpen(false); }}>Client Portal</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-28 lg:pt-20 overflow-hidden bg-boraine-900">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-boraine-900 to-slate-900 opacity-90"></div>

          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

          {/* Floating Blobs/Orbs */}
          <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
          <div className="absolute top-[30%] -right-[10%] w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[100px] animate-blob mix-blend-screen" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-boraine-700/30 rounded-full blur-[100px] animate-blob mix-blend-screen" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 text-center lg:text-left pt-10 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm animate-fade-in-up opacity-0 mx-auto lg:mx-0" style={{ animationDelay: '100ms' }}>
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Accepting New Enterprise Clients
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-sm animate-fade-in-up opacity-0" style={{ animationDelay: '300ms' }}>
              Future-Proof Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Digital Infrastructure
              </span>
            </h1>
            <p className="text-xl text-boraine-200 max-w-lg leading-relaxed animate-fade-in-up opacity-0 mx-auto lg:mx-0" style={{ animationDelay: '500ms' }}>
              Kimberley's premier ICT Support & AI Agency. We blend robust IT management with cutting-edge Artificial Intelligence to drive profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up opacity-0 justify-center lg:justify-start" style={{ animationDelay: '700ms' }}>
              <Button size="lg" className="gap-2 group">
                Book Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="lg">
                Explore Services
              </Button>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-white/10 animate-fade-in-up opacity-0" style={{ animationDelay: '900ms' }}>
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-boraine-400 text-sm">Uptime Guarantee</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-boraine-400 text-sm">Expert Support</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100+</p>
                <p className="text-boraine-400 text-sm">AI Models Deployed</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative animate-fade-in-up opacity-0" style={{ animationDelay: '1000ms' }}>
            <div className="relative z-10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
              {/* Mock UI for Tech Dashboard */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white/50 text-xs font-mono">boraine_tech_monitor.exe</div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400"><Monitor /></div>
                  <div>
                    <div className="text-sm text-white/60">Network Status</div>
                    <div className="font-semibold">Optimal - 45ms Latency</div>
                  </div>
                  <div className="ml-auto text-green-400"><CheckCircle size={18} /></div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400"><Cpu /></div>
                  <div>
                    <div className="text-sm text-white/60">AI Model Training</div>
                    <div className="font-semibold">Processing Batch #8842</div>
                  </div>
                  <div className="ml-auto text-blue-400 animate-spin"><Loader2 size={18} /></div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400"><ShieldCheck /></div>
                  <div>
                    <div className="text-sm text-white/60">Cybersecurity Threat Level</div>
                    <div className="font-semibold">Low - Shield Active</div>
                  </div>
                  <div className="ml-auto text-green-400"><CheckCircle size={18} /></div>
                </div>

                {/* Chart Mockup */}
                <div className="h-32 mt-4 flex items-end gap-2 px-2 pb-2 border-b border-l border-white/20">
                  {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"></div>
                  ))}
                </div>
                <div className="text-center text-xs text-white/40 mt-2 font-mono">Real-time System Performance</div>
              </div>
            </div>

            {/* Floating Badge */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce hover:scale-105 hover:bg-blue-50 transition-all cursor-pointer border border-gray-100"
              style={{ animationDuration: '3s' }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                <img src="https://picsum.photos/id/1005/200/200" alt="Allan Boraine" className="w-full h-full object-cover" />
              </div>
              <div className="pr-4">
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Founder & CEO</p>
                <p className="font-bold text-boraine-900">{OWNER_NAME}</p>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 bg-boraine-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3">Our Expertise</h2>
            <h3 className="text-4xl font-serif font-bold text-boraine-900 mb-6">Comprehensive Tech Ecosystems</h3>
            <p className="text-boraine-600 text-lg">
              We don't just fix computers. We build resilient digital environments that allow your business to scale using AI and modern infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2">
                <div className="w-14 h-14 bg-boraine-50 rounded-lg flex items-center justify-center text-boraine-900 mb-6 group-hover:bg-boraine-900 group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-boraine-900 mb-3">{service.title}</h4>
                <p className="text-boraine-500 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-boraine-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 group/btn"
                  onClick={() => setSelectedService(service)}
                >
                  Learn more <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Trust Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
              <img
                src="https://picsum.photos/id/60/800/1000"
                alt="Modern Office in Kimberley"
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[600px]"
              />
              <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl z-20 max-w-xs hidden md:block border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-blue-600">{YEARS_EXPERIENCE}</div>
                  <div className="text-sm font-medium text-gray-600">Years of<br />Experience</div>
                </div>
                <p className="text-gray-500 text-sm italic">"Technology is best when it brings people together."</p>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-serif font-bold text-boraine-900">
                Deep Roots in Kimberley,<br />
                World-Class Standards.
              </h2>
              <p className="text-lg text-boraine-600 leading-relaxed">
                Founded by {OWNER_NAME}, Boraine Tech emerged from a simple observation: businesses in the Northern Cape deserve the same level of technological sophistication as those in Silicon Valley.
              </p>
              <p className="text-lg text-boraine-600 leading-relaxed">
                We act as your strategic partner. Whether you need an AI receptionist to handle bookings or a complete network overhaul, we bring precision, integrity, and innovation to every project.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 font-bold text-boraine-900"><CheckCircle size={18} className="text-blue-500" /> Certified Engineers</span>
                  <p className="text-sm text-gray-500 pl-7">Microsoft & Cisco qualified staff.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 font-bold text-boraine-900"><CheckCircle size={18} className="text-blue-500" /> Local Presence</span>
                  <p className="text-sm text-gray-500 pl-7">On-site support in minutes.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 font-bold text-boraine-900"><CheckCircle size={18} className="text-blue-500" /> AI Pioneers</span>
                  <p className="text-sm text-gray-500 pl-7">First to market with GenAI tools.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 font-bold text-boraine-900"><CheckCircle size={18} className="text-blue-500" /> Data Secure</span>
                  <p className="text-sm text-gray-500 pl-7">POPIA compliant systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="why-us" className="py-24 bg-boraine-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-boraine-300">Don't just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-boraine-400">{t.role}, {t.company}</p>
                  </div>
                </div>
                <p className="text-boraine-200 italic">"{t.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-boraine-50 rounded-3xl p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-boraine-900">Ready to Upgrade?</h2>
              <p className="text-lg text-boraine-600">
                Stop letting outdated tech hold your business back. Let Boraine Tech integrate the future into your workflow today.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Phone size={20} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us (Cell)</p>
                    <p className="font-bold text-boraine-900">{PHONE}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Mail size={20} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-bold text-boraine-900">{EMAIL}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><MapPin size={20} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Visit Us</p>
                    <p className="font-bold text-boraine-900">{LOCATION}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <form ref={formRef} className="space-y-4" onSubmit={handleContactSubmit}>
                <h3 className="text-xl font-bold text-boraine-900 mb-4">Send a message</h3>

                {formSent && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm font-medium flex items-center gap-2">
                    <CheckCircle size={18} /> Message sent successfully! We'll be in touch.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="First Name" required placeholder="First Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                  <input type="text" name="Last Name" required placeholder="Last Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                </div>
                <input type="email" name="email" required placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                <input type="hidden" name="_subject" value="New Website Contact Request" />
                <input type="hidden" name="_captcha" value="false" />
                <select name="topic" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-500 bg-white">
                  <option value="">Select Service Interest</option>
                  <option value="Managed ICT">Managed ICT</option>
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Other">Other</option>
                </select>
                <textarea rows={4} name="message" required placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"></textarea>
                <Button type="submit" className="w-full" disabled={formSending}>
                  {formSending ? 'Sending...' : 'Submit Request'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              {/* Footer Logo */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="text-2xl font-serif font-black tracking-tight leading-none text-white">
                    BOR<span className="text-yellow-500">AI</span>NE
                  </div>
                  <div className="text-[12px] lg:text-sm font-sans font-black tracking-[0.3em] uppercase pl-0.5 text-blue-400 mt-1">
                    TECH
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering Kimberley's businesses with world-class technology and AI innovation.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">ICT Support</a></li>
                <li><a href="#" className="hover:text-blue-400">AI Integration</a></li>
                <li><a href="#" className="hover:text-blue-400">Cybersecurity</a></li>
                <li><a href="#" className="hover:text-blue-400">Cloud Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">About Allan Boraine</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Connect</h4>
              <div className="flex gap-4 mb-4">
                {/* Social Icons */}
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"><Globe size={16} /></div>
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"><Mail size={16} /></div>
              </div>
              <p className="text-xs text-slate-500">
                &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Client Portal Modal */}
      {portalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-boraine-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setPortalOpen(false)}
          ></div>
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-boraine-900 mb-2">Secure Client Portal</h3>
            <p className="text-boraine-600 mb-8">
              Our enterprise portal is currently undergoing a security upgrade. Existing clients can still access support via their dedicated technical channels.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3 text-left">
                <Loader2 className="text-blue-500 animate-spin" size={20} />
                <div>
                  <p className="text-sm font-bold text-boraine-900">Security Audit in Progress</p>
                  <p className="text-xs text-boraine-500">Estimating completion: 24-48 hours</p>
                </div>
              </div>
              <Button className="w-full" onClick={() => setPortalOpen(false)}>Acknowledge</Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Receptionist Widget */}
      <AIReceptionist />

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-boraine-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedService(null)}
          ></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
            <div className="sticky top-0 right-0 p-6 flex justify-end bg-white/80 backdrop-blur-md">
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-boraine-50 rounded-full text-boraine-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="px-8 pb-12">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <selectedService.icon size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-boraine-900 mb-4">{selectedService.title}</h3>
              <div className="p-1 px-3 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-8">
                Official Boraine Excellence
              </div>

              <p className="text-boraine-600 text-lg leading-relaxed mb-8">
                {selectedService.detailedDescription}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {selectedService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle className="text-blue-500 flex-shrink-0" size={18} />
                    <span className="text-boraine-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-boraine-50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-boraine-900 mb-1">Interested in this service?</h4>
                  <p className="text-sm text-boraine-600">Speak with Allan or one of our engineers.</p>
                </div>
                <Button
                  onClick={() => {
                    setSelectedService(null);
                    window.location.href = '#contact';
                  }}
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;