
import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Download, 
  ExternalLink, 
  BookOpen, 
  Code2, 
  Database, 
  Network, 
  Cpu, 
  Award,
  ChevronRight,
  Menu,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Settings,
  Upload,
  ImageIcon,
  FileUp,
  Camera,
  Check,
  Globe,
  Rocket,
  ShieldCheck
} from 'lucide-react';
import { PROJECTS, SKILLS, CERTIFICATIONS, EDUCATION_DATA, CONFIG } from './constants';
import { Project, SkillCategory, Certification, Education } from './types';

// Utility to convert base64 data to Blob URL for reliable browser opening
const base64ToBlobUrl = (base64: string): string => {
  try {
    const parts = base64.split(';base64,');
    if (parts.length !== 2) return base64;
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    const blob = new Blob([uInt8Array], { type: contentType });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error("Error converting base64 to blob", e);
    return base64;
  }
};

// Types for form handling
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certs' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-effect py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tight text-blue-600">
          {CONFIG.name.split(' ').map(n => n[0]).join('')}<span className="text-slate-900">.Portfolio</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-effect absolute w-full top-full left-0 border-t py-4 px-6 flex flex-col space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)} 
              className="text-base font-medium text-slate-700"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
    {subtitle && <p className="text-slate-500 max-w-2xl mx-auto">{subtitle}</p>}
    <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
  </div>
);

const CustomizerPanel = ({ onUpdate, hasResume }: { onUpdate: (key: string, value: string) => void, hasResume: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeployGuide, setShowDeployGuide] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'resume') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpdate(type === 'photo' ? 'profileImage' : 'resumeUrl', result);
        localStorage.setItem(`custom_${type}`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group relative"
      >
        {isOpen ? <X size={24} /> : <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />}
        {!hasResume && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] flex items-center justify-center font-bold">!</span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 glass-effect p-6 rounded-3xl shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900">Portfolio Hub</h3>
            <button 
              onClick={() => setShowDeployGuide(true)}
              className="text-blue-600 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest hover:underline"
            >
              <Rocket size={12} /> Go Live
            </button>
          </div>
          
          <p className="text-xs text-slate-500 mb-6">Manage your assets and prepare for deployment.</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-2 block">Your Photo</label>
              <button 
                onClick={() => photoInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-medium"
              >
                <Upload size={18} /> Choose Image
              </button>
              <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'photo')} />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-2 block flex justify-between items-center">
                Your Resume (PDF)
                {hasResume && <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1"><Check size={10} /> Linked</span>}
              </label>
              <button 
                onClick={() => resumeInputRef.current?.click()}
                className={`w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed rounded-xl text-sm font-medium transition-all ${hasResume ? 'border-green-200 text-green-700 bg-green-50/50' : 'border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'}`}
              >
                <FileUp size={18} /> {hasResume ? 'Change Resume' : 'Select PDF'}
              </button>
              <input ref={resumeInputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
            </div>

            <button 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full text-xs text-red-500 font-bold hover:underline mt-4 text-center"
            >
              Reset to Original
            </button>
          </div>
        </div>
      )}

      {showDeployGuide && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
            <button onClick={() => setShowDeployGuide(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
            <div className="p-10">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Go Live?</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Hosting your portfolio is easy and free. Follow these steps to deploy to Vercel or Netlify.</p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Download Assets</h4>
                    <p className="text-xs text-slate-400 mt-1">Make sure you have your custom resume and photo uploaded here first.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Sync to GitHub</h4>
                    <p className="text-xs text-slate-400 mt-1">Create a new repository and push this source code to it.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Connect Vercel</h4>
                    <p className="text-xs text-slate-400 mt-1">Visit vercel.com, click "Add New Project," and select your GitHub repo.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={20} />
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Code is optimized for production</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // Asset State
  const [assets, setAssets] = useState({
    profileImage: CONFIG.profileImage,
    resumeUrl: CONFIG.resumeUrl
  });

  // Load custom assets from local storage
  useEffect(() => {
    const customPhoto = localStorage.getItem('custom_photo');
    const customResume = localStorage.getItem('custom_resume');
    if (customPhoto || customResume) {
      setAssets({
        profileImage: customPhoto || CONFIG.profileImage,
        resumeUrl: customResume || CONFIG.resumeUrl
      });
    }
  }, []);

  const handleAssetUpdate = (key: string, value: string) => {
    setAssets(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'resume') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleAssetUpdate(type === 'photo' ? 'profileImage' : 'resumeUrl', result);
        localStorage.setItem(`custom_${type}`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form State
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const viewResume = () => {
    if (assets.resumeUrl === "#") {
      resumeInputRef.current?.click();
      return;
    }
    const blobUrl = base64ToBlobUrl(assets.resumeUrl);
    window.open(blobUrl, '_blank');
  };

  const downloadResume = () => {
    if (assets.resumeUrl === "#") {
      resumeInputRef.current?.click();
      return;
    }
    const blobUrl = base64ToBlobUrl(assets.resumeUrl);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Resume_${CONFIG.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasCustomResume = assets.resumeUrl !== "#";

  return (
    <div className="min-h-screen">
      <Navbar />
      <CustomizerPanel onUpdate={handleAssetUpdate} hasResume={hasCustomResume} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50/50 rounded-bl-[100px] hidden lg:block"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider mb-6">
                Available for Summer 2025 Internships
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight">
                Computer Science <br />
                <span className="gradient-text">Engineering Student</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Hi, I'm {CONFIG.name.split(' ')[0]}. A problem solver and aspiring software engineer focused on building efficient, scalable, and user-centric digital experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={viewResume} 
                className={`px-8 py-4 font-semibold rounded-lg transition-all shadow-lg flex items-center gap-2 group relative overflow-hidden ${hasCustomResume ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                {hasCustomResume ? <FileText size={20} /> : <FileUp size={20} />}
                {hasCustomResume ? 'View Resume' : 'Upload Resume'}
                {hasCustomResume && <span className="absolute top-0 right-0 w-8 h-8 bg-white/10 rotate-45 transform translate-x-4 -translate-y-4 group-hover:translate-x-3 transition-transform"></span>}
              </button>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-semibold rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                Contact Me
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 text-slate-400">
              <a href={CONFIG.github} target="_blank" className="hover:text-blue-600 transition-colors"><Github size={24} /></a>
              <a href={CONFIG.linkedin} target="_blank" className="hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
              <a href={`mailto:${CONFIG.email}`} className="hover:text-blue-600 transition-colors"><Mail size={24} /></a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group/photo">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-2xl -z-10 animate-pulse"></div>
              <div className="w-64 h-80 md:w-80 md:h-[420px] rounded-[40px] overflow-hidden border-4 border-white shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 relative bg-slate-100">
                <img 
                  src={assets.profileImage} 
                  alt="Professional Portrait" 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => photoInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <Camera size={32} className="mb-2" />
                  <span className="text-sm font-bold uppercase tracking-wider">Update Photo</span>
                </button>
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'photo')} />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-none">3rd Year Student</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">CSE Graduate '27</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Bridging Complexity with Clarity</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                As a 3rd-year Computer Science Engineering student at Navkis College of Engineering, I am passionate about the intersection of high-performance backend systems and clean architectural patterns. 
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                My journey in CS is driven by a strong foundation in Data Structures and Algorithms, combined with a pragmatic "build-to-learn" mindset. I thrive on solving complex problems that require both creative thinking and rigorous technical precision.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-blue-600 text-2xl">{PROJECTS.length}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Core Projects</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-blue-600 text-2xl">100+</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">LeetCode Progress</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-slate-100 rounded-[32px] flex items-center justify-center p-8 group hover:bg-blue-50 transition-colors">
                  <Code2 className="text-blue-600 w-12 h-12 group-hover:scale-110 transition-transform" />
                </div>
                <div className="h-64 bg-slate-900 rounded-[32px] flex flex-col justify-end p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                  <Database className="mb-4 w-10 h-10 text-blue-400 opacity-60" />
                  <p className="font-bold text-lg relative z-10">Scalable Databases</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-64 bg-blue-600 rounded-[32px] flex flex-col justify-end p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                  <Network className="mb-4 w-10 h-10 text-white opacity-60" />
                  <p className="font-bold text-lg relative z-10">System Design</p>
                </div>
                <div className="h-48 bg-slate-100 rounded-[32px] flex items-center justify-center p-8 group hover:bg-slate-200 transition-colors">
                  <Cpu className="text-slate-900 w-12 h-12 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Technical Proficiency" 
            subtitle="Categorized toolkit reflecting a deep dive into core Computer Science domains and modern industry-standard technologies."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((cat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Engineering Case Studies" 
            subtitle="Explore how I solve real-world problems through structural thinking and technical implementation."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="group flex flex-col h-full bg-white border border-slate-100 rounded-[32px] overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500">
                <div className="h-56 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={project.image || `https://picsum.photos/seed/${project.title}/800/600`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-widest border border-slate-200">
                    Engineering Case
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <div className="space-y-4 text-sm mb-8 flex-grow">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">The Challenge</span>
                      <p className="text-slate-600 leading-relaxed line-clamp-2">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">My Solution</span>
                      <p className="text-slate-700 leading-relaxed font-medium">{project.solution}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-slate-50 mt-auto flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-600/70 uppercase tracking-widest">Efficiency Focus</span>
                    <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-all"><ExternalLink size={16} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certs" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle 
            title="Industry Validation" 
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all flex items-start gap-5 group">
                <div className="bg-blue-600/10 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white text-blue-400 transition-colors">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 leading-tight">{cert.name}</h4>
                  <p className="text-sm text-slate-400">{cert.org}</p>
                  <p className="text-[10px] text-blue-400 mt-3 font-bold uppercase tracking-widest">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Timeline Section */}
      <section id="education" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Academic Foundation" />
          <div className="space-y-12">
            {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className="relative pl-10 border-l-2 border-slate-100 pb-2 last:border-0">
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0 border-4 border-white shadow-sm"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{edu.degree}</h3>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">{edu.period}</span>
                </div>
                <p className="text-lg text-slate-500 font-medium">{edu.institution}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-widest">{edu.status}</span>
                  {edu.score && <span className="text-xs text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-widest">{edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-[80px]"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Your Team</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            I am actively seeking internship opportunities where I can apply my skills in high-stakes environments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {hasCustomResume ? (
              <>
                <button 
                  onClick={downloadResume}
                  className="px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                >
                  <Download size={22} /> Download My Resume
                </button>
                <button 
                  onClick={viewResume}
                  className="px-10 py-5 bg-blue-500 text-white border border-blue-400/30 font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95"
                >
                  <BookOpen size={22} /> View Online
                </button>
                <button 
                  onClick={() => resumeInputRef.current?.click()}
                  className="px-10 py-5 bg-blue-900 text-white border border-blue-400/30 font-bold rounded-2xl hover:bg-blue-800 transition-all flex items-center gap-3 active:scale-95"
                >
                  <FileUp size={22} /> Update PDF
                </button>
              </>
            ) : (
              <button 
                onClick={() => resumeInputRef.current?.click()}
                className="px-12 py-6 bg-white text-slate-900 font-extrabold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-4 shadow-2xl active:scale-95 transform hover:-translate-y-1"
              >
                <FileUp size={28} /> Upload Your Resume (PDF)
              </button>
            )}
            <input ref={resumeInputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'resume')} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Let's Connect</h2>
                <p className="text-lg text-slate-500 leading-relaxed">
                  I'm currently looking for new opportunities and collaborations. My inbox is always open—whether for an internship offer or just a technical discussion.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px] mb-1">Email</p>
                    <p className="font-bold text-slate-900 truncate max-w-[200px] md:max-w-none">{CONFIG.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px] mb-1">Call Me</p>
                    <a href={`tel:${CONFIG.phone}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors">{CONFIG.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Linkedin size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px] mb-1">Professional</p>
                    <a href={CONFIG.linkedin} target="_blank" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">LinkedIn Profile</a>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Github size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[2px] mb-1">Source Code</p>
                    <a href={CONFIG.github} target="_blank" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">GitHub Repository</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-blue-900/5">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={56} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Message Received!</h3>
                  <p className="text-slate-500 max-w-xs leading-relaxed">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name" 
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-slate-100'}`} 
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 uppercase">
                          <AlertCircle size={10} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your Email" 
                        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-100'}`} 
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 uppercase">
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                    <input 
                      id="subject"
                      name="subject"
                      type="text" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Opportunity Details" 
                      className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all ${errors.subject ? 'border-red-500 bg-red-50/30' : 'border-slate-100'}`} 
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 uppercase">
                        <AlertCircle size={10} /> {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4} 
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="I'd like to discuss an opportunity..." 
                      className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all resize-none ${errors.message ? 'border-red-500 bg-red-50/30' : 'border-slate-100'}`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1 uppercase">
                        <AlertCircle size={10} /> {errors.message}
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:bg-slate-400 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} /> Processing...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-100 text-center bg-white">
        <p className="text-sm font-bold text-slate-900 tracking-tight">
          &copy; {new Date().getFullYear()} {CONFIG.name}
        </p>
        <p className="text-[9px] mt-3 uppercase tracking-[3px] font-bold text-slate-400">
          3rd Year CSE Undergraduate Portfolio
        </p>
      </footer>
    </div>
  );
};

export default App;
