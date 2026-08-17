import { useState, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Terminal, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  CURRENT_FOCUS, 
  TECH_CATEGORIES, 
  PROJECTS, 
  LAB_EXPERIMENTS, 
  EDUCATION 
} from './data/portfolioData';

const GithubIcon = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'about', label: 'HAKKIMDA' },
  { id: 'focus', label: 'ODAK' },
  { id: 'projects', label: 'PROJELER' },
  { id: 'tech', label: 'TEKNOLOJİLER' },
  { id: 'education', label: 'EĞİTİM' },
  { id: 'lab', label: 'LAB' },
  { id: 'contact', label: 'İLETİŞİM' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    window.print();
  };

  return (
    <>
      {/* 1. PORTFOLYO EKRAN GÖRÜNÜMÜ */}
      <div className="no-print relative min-h-screen bg-[#0b0f17] text-[#94a3b8] font-sans antialiased selection:bg-sky-500/20 selection:text-sky-300">
        
        <div 
          className="pointer-events-none fixed inset-0 z-30 transition duration-300 hidden lg:block"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.04), transparent 80%)`
          }}
        />

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-12">
            
            {/* SOL SABİT PANEL */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                  {PERSONAL_INFO.name}
                </h1>
                
                <h2 className="mt-3 text-xs sm:text-sm font-medium tracking-tight text-slate-300 leading-snug">
                  {PERSONAL_INFO.role}
                </h2>
                
                <p className="mt-5 max-w-xs leading-relaxed text-slate-400 text-xs sm:text-sm">
                  {PERSONAL_INFO.tagline}
                </p>

                <nav className="mt-12 hidden lg:block">
                  <ul className="w-max space-y-3">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id}>
                        <a 
                          href={`#${item.id}`}
                          onClick={(e) => scrollTo(item.id, e)}
                          className={`group flex items-center py-1 transition-all duration-200 cursor-pointer ${
                            activeSection === item.id ? 'text-slate-100 font-semibold' : 'text-slate-500 hover:text-slate-200'
                          }`}
                        >
                          <span className={`mr-4 h-px transition-all duration-300 ${
                            activeSection === item.id ? 'w-16 bg-sky-400' : 'w-8 bg-slate-800 group-hover:w-12 group-hover:bg-slate-500'
                          }`} />
                          <span className="text-xs font-mono tracking-widest">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Sosyal Medya & CV Butonu */}
              <div className="mt-8 flex items-center gap-5 text-slate-400">
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-sky-400 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon size={19} />
                </a>
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-sky-400 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={19} />
                </a>
                <a 
                  href={PERSONAL_INFO.email} 
                  className="hover:text-sky-400 transition-colors"
                  title="E-Posta"
                >
                  <Mail size={19} />
                </a>
                <span className="h-4 w-px bg-slate-800" />
                <button 
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded border border-slate-800 bg-slate-900/60 hover:border-sky-400/40 hover:text-sky-400 transition-all cursor-pointer"
                  title="İsviçre Modeli CV Görüntüle / PDF Kaydet"
                >
                  CV <ArrowUpRight size={13} />
                </button>
              </div>
            </header>

            {/* SAĞ İÇERİK PANELİ */}
            <main className="pt-24 lg:w-[55%] lg:py-24 space-y-20 pb-[30vh]">
              
              {/* HAKKIMDA */}
              <section id="about" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">Hakkımda</h2>
                </div>
                <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-slate-400">
                  <p>
                    Marmara Üniversitesi Bilgisayar Programcılığı öğrencisiyim. Yazılım geliştirme süreçlerinde özellikle C# / .NET ekosistemi, ilişkisel veritabanları (MS SQL, SQLite) ve Python ile otomasyon/veri işleme alanlarına odaklanıyorum.
                  </p>
                  <p>
                    Masaüstü tarafında Entity Framework Core ve LINQ ile veritabanı mimarileri tasarlarken, Python tarafında görüntü işleme (OCR, pHash) ve API entegrasyonlarıyla çalışan güvenlik/otomasyon araçları geliştiriyorum.
                  </p>
                  <p>
                    C# backend mimarileri ve veri mühendisliği temellerinde derinleşmeye devam ediyorum.
                  </p>
                </div>
              </section>

              {/* ODAK */}
              <section id="focus" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">Odak</h2>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-medium text-slate-300">Aktif Odak</span>
                    <span className="text-[11px] font-mono text-slate-500">{CURRENT_FOCUS.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {CURRENT_FOCUS.status}
                  </p>
                </div>
              </section>

              {/* PROJELER */}
              <section id="projects" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">Projeler</h2>
                </div>
                <h3 className="hidden lg:block text-xs font-mono tracking-widest text-slate-500 mb-6 uppercase">Öne Çıkan Projeler</h3>
                
                <div className="space-y-6">
                  {PROJECTS.map((proj) => (
                    <div 
                      key={proj.id}
                      className="group rounded-xl border border-slate-800/80 bg-slate-900/20 p-5 transition-all duration-200 hover:border-slate-700/80 hover:bg-slate-900/40"
                    >
                      <span className="font-mono text-[11px] text-sky-400/80 tracking-wider block mb-1">
                        {proj.id} // {proj.category}
                      </span>

                      <h4 className="text-base font-semibold text-slate-100 group-hover:text-sky-300 transition-colors">
                        {proj.title}
                      </h4>

                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="mt-3 rounded bg-slate-950/40 p-2 border border-slate-800/60 text-[11px] font-mono text-slate-400">
                        <span className="text-slate-500">Mimari: </span>{proj.architecture}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {proj.tags.map(t => (
                          <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/30">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-4 pt-3 border-t border-slate-800/50 text-xs font-mono">
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-300 hover:text-sky-400 transition-colors"
                          >
                            <GithubIcon size={13} /> Kaynak Kodu
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-300 hover:text-sky-400 transition-colors"
                          >
                            <ExternalLink size={13} /> Canlı Ortam
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* TEKNOLOJİLER */}
              <section id="tech" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">Teknolojiler</h2>
                </div>
                <h3 className="hidden lg:block text-xs font-mono tracking-widest text-slate-500 mb-6 uppercase">Teknoloji & Yetkinlikler</h3>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  {TECH_CATEGORIES.map((cat) => (
                    <div key={cat.name} className="rounded-lg border border-slate-800/80 bg-slate-900/20 p-3.5">
                      <h4 className="text-xs font-mono text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
                        <Terminal size={12} className="text-sky-400" />
                        {cat.name}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/40 border border-slate-700/30 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* EĞİTİM */}
              <section id="education" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">Eğitim</h2>
                </div>
                <h3 className="hidden lg:block text-xs font-mono tracking-widest text-slate-500 mb-6 uppercase">Akademik Geçmiş</h3>

                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-800/80 bg-slate-900/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">{edu.school}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{edu.degree}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="font-mono text-xs text-slate-400 block">{edu.period}</span>
                        <span className="text-[11px] text-slate-500">{edu.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* LAB */}
              <section id="lab" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">Lab</h2>
                </div>
                <h3 className="hidden lg:block text-xs font-mono tracking-widest text-slate-500 mb-6 uppercase">Lab & Deneyler</h3>

                <div className="grid gap-3">
                  {LAB_EXPERIMENTS.map((lab, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-800/60 bg-slate-900/20"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-200">{lab.title}</span>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/30">{lab.tech}</span>
                        </div>
                        <p className="text-xs text-slate-400">{lab.description}</p>
                      </div>
                      <span className="font-mono text-xs text-slate-600 ml-4">{lab.date}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* İLETİŞİM */}
              <section id="contact" className="scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-[#0b0f17]/90 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-200 uppercase">İletişim</h2>
                </div>
                <h3 className="hidden lg:block text-xs font-mono tracking-widest text-slate-500 mb-6 uppercase">İletişim</h3>
                
                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 text-center space-y-3">
                  <h4 className="text-sm font-medium text-slate-200">İletişime Geçin</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Projeler veya sorularınız için doğrudan e-posta gönderebilirsiniz.
                  </p>
                  <div className="pt-2">
                    <a 
                      href={PERSONAL_INFO.email}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-200 font-mono text-xs hover:border-sky-400/50 hover:text-sky-300 transition-all"
                    >
                      <Mail size={13} /> ceyhunyagizx@gmail.com
                    </a>
                  </div>
                </div>

                <footer className="mt-12 text-center text-xs font-mono text-slate-600">
                  © 2026 {PERSONAL_INFO.name}
                </footer>
              </section>

            </main>
          </div>
        </div>
      </div>

      {/* 2. GOOGLE DOKÜMANLAR İSVİÇRE MODELİ ATS CV (Sadece Yazdır / PDF denildiğinde render edilir) */}
      <div className="print-only text-black bg-white p-6 max-w-[210mm] mx-auto font-sans">
        
        {/* ÜST BAŞLIK (İsviçre Layout) */}
        <div className="grid grid-cols-[140px_1fr] gap-6 pb-6 border-b border-black">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tight leading-tight text-black">
              Ceyhun Yağız<br />Yılmaz
            </h1>
            <p className="text-xs text-amber-700 font-medium mt-1">Yazılım Geliştirici</p>
          </div>
          <div className="text-right text-[11px] text-neutral-800 space-y-0.5">
            <p className="font-semibold text-black">Adres: İstanbul, Türkiye</p>
            <p>E-posta: ceyhunyagizx@gmail.com</p>
            <p>GitHub: github.com/ceyhunyagiz</p>
            <p>LinkedIn: linkedin.com/in/ceyhunyagizyilmaz</p>
          </div>
        </div>

        {/* BÖLÜM: YETENEKLER */}
        <div className="grid grid-cols-[140px_1fr] gap-6 py-4 border-b border-neutral-200">
          <div className="text-xs font-bold text-black uppercase tracking-wider">
            Yetenekler
          </div>
          <div className="space-y-1 text-xs text-neutral-800">
            <p><strong className="font-semibold text-black">Diller:</strong> C#, SQL (T-SQL), Python, TypeScript, JavaScript, C</p>
            <p><strong className="font-semibold text-black">Backend & DB:</strong> .NET Core, Entity Framework Core, MS SQL Server, SQLite, LINQ, REST APIs</p>
            <p><strong className="font-semibold text-black">Frontend & Araçlar:</strong> React, Tailwind CSS, Vite, Git, GitHub, Linux CLI</p>
          </div>
        </div>

        {/* BÖLÜM: DENEYİM & PROJELER */}
        <div className="grid grid-cols-[140px_1fr] gap-6 py-4 border-b border-neutral-200">
          <div className="text-xs font-bold text-black uppercase tracking-wider">
            Projeler
          </div>
          <div className="space-y-4 text-xs text-neutral-800">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-black text-xs">{proj.title}</h3>
                  <span className="text-[11px] text-neutral-500 italic">{proj.category}</span>
                </div>
                <p className="leading-relaxed text-[11px] text-neutral-700">{proj.description}</p>
                <p className="text-[11px] text-neutral-600">
                  <strong className="font-semibold text-black">Mimari / Yığın:</strong> {proj.architecture}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BÖLÜM: EĞİTİM */}
        <div className="grid grid-cols-[140px_1fr] gap-6 py-4 border-b border-neutral-200">
          <div className="text-xs font-bold text-black uppercase tracking-wider">
            Eğitim
          </div>
          <div className="space-y-3 text-xs text-neutral-800">
            {EDUCATION.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-black text-xs">{edu.school}</h3>
                  <span className="text-[11px] text-neutral-500 font-mono">{edu.period}</span>
                </div>
                <p className="text-[11px] text-neutral-700">{edu.degree} — {edu.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BÖLÜM: ÖZET */}
        <div className="grid grid-cols-[140px_1fr] gap-6 py-4">
          <div className="text-xs font-bold text-black uppercase tracking-wider">
            Özet
          </div>
          <div className="text-xs text-neutral-700 leading-relaxed">
            Marmara Üniversitesi Bilgisayar Programcılığı öğrencisi. C# / .NET ekosistemi, ilişkisel veritabanları (MS SQL, SQLite) ve Python ile otomasyon/veri işleme odaklı sistemler tasarlamaktadır. Teorik temelleri Entity Framework Core, LINQ ve görüntü işleme algoritmalarıyla çalışan pratik projelere dönüştürmektedir.
          </div>
        </div>

      </div>
    </>
  );
}