export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  architecture: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface LabExperiment {
  title: string;
  description: string;
  tech: string;
  date: string;
}

export const PERSONAL_INFO = {
  name: "Ceyhun Yağız Yılmaz",
  role: "Computer Programming Student at Marmara University | C# / .NET, SQL & Python | Backend & Data Engineering Enthusiast",
  tagline: "C# / .NET, ilişkisel veritabanları (SQL) ve Python ile veri odaklı sistemler & güvenlik otomasyonları geliştiriyorum.",
  github: "https://github.com/ceyhunyagiz",
  linkedin: "https://www.linkedin.com/in/ceyhunyagizyilmaz/",
  email: "mailto:ceyhunyagizx@gmail.com",
  resumeUrl: "#",
};

export const CURRENT_FOCUS = {
  status: "Scam Shield mimari optimizasyonu, EF Core veritabanı desenleri ve ASP.NET Core temelleri.",
  date: "2026",
};

export const TECH_CATEGORIES = [
  {
    name: "Diller & Temeller",
    skills: ["C#", "SQL", "Python", "TypeScript", "JavaScript", "C"]
  },
  {
    name: "Backend & Veritabanı",
    skills: [".NET Core", "Entity Framework Core", "MS SQL Server", "SQLite", "LINQ"]
  },
  {
    name: "Frontend & Araçlar",
    skills: ["React", "Vite", "Tailwind CSS", "Git / GitHub", "Linux CLI"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Scam Shield Security Core",
    category: "Görüntü İşleme & Güvenlik Otomasyonu",
    description: "Geniş topluluklarda çoklu ortam (Video/GIF/Resim/QR) üzerinden gelen oltalama bağlantılarını pHash ve OCR analiziyle filtreleyen güvenlik motoru.",
    architecture: "Python, EasyOCR, pHash, OpenCV, SQLite, Discord.py",
    tags: ["Python", "OpenCV", "EasyOCR", "pHash", "SQLite"],
    githubUrl: "https://github.com/ceyhunyagiz",
    liveUrl: "https://discord.gg/gifland"
  },
  {
    id: "02",
    title: "FitTrack Management System",
    category: "Masaüstü & İlişkisel Veritabanı",
    description: "Kişiselleştirilmiş antrenman hacmi, gelişim takibi ve beslenme planlamasını yöneten masaüstü veritabanı yönetim yazılımı.",
    architecture: "C# .NET, Entity Framework Core, MS SQL Server, LINQ, Windows Forms",
    tags: ["C#", ".NET", "Entity Framework", "MS SQL Server"],
    githubUrl: "https://github.com/ceyhunyagiz"
  },
  {
    id: "03",
    title: "Media Distribution Pipeline",
    category: "Otomasyon & Asenkron Veri Dağıtımı",
    description: "Yüksek üyeli sunucularda medya akışını rate-limit sınırlarına takılmadan yöneten asenkron kuyruk ve dağıtım altyapısı.",
    architecture: "Python, Async I/O, Webhooks, REST API",
    tags: ["Python", "Async I/O", "REST API"],
    githubUrl: "https://github.com/ceyhunyagiz"
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    title: "pHash Image Comparator",
    description: "İki görsel arasındaki benzerlik skorunu ve Hamming mesafesini hesaplayan algoritmik analiz.",
    tech: "TypeScript",
    date: "2026"
  },
  {
    title: "Terminal Monitor CLI",
    description: "Sistem kaynak kullanımını konsol üzerinden izleyen mini araç.",
    tech: "Python",
    date: "2026"
  }
];

export const EDUCATION = [
  {
    school: "Marmara Üniversitesi",
    degree: "Bilgisayar Programcılığı",
    period: "2025 — Günümüz",
    location: "İstanbul, Türkiye"
  }
];