import { Menu, Sun, Moon } from 'lucide-react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue, useMotionTemplate, useMotionValueEvent } from 'motion/react';
import Lenis from '@studio-freight/lenis';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const TOTAL_FRAMES = 240;

// Preload all frames
function useFrameImages() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `/animation-frames/ezgif-frame-${padded}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages(imgs);
          setLoaded(true);
        }
      };
      imgs.push(img);
    }
  }, []);

  return { images, loaded };
}

// Scroll-driven typing text component
function ScrollTypingText({ text, progress }: { text: string, progress: MotionValue<number> }) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // Initial sync
    setCharCount(Math.round(progress.get() * text.length));

    // Subscribe to changes
    return progress.on("change", (latest) => {
      setCharCount(Math.round(latest * text.length));
    });
  }, [progress, text]);

  return (
    <>
      <span>{text.slice(0, charCount)}</span>
      <span className="opacity-0">{text.slice(charCount)}</span>
    </>
  );
}

// Canvas-based scroll animation component with background removal
function ScrollAnimation({ scrollContainerRef, onOpacityChange, isDark }: { scrollContainerRef: React.RefObject<HTMLDivElement | null>, onOpacityChange?: (opacity: number) => void, isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, loaded } = useFrameImages();
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[frameIndex]) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = images[frameIndex];
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dynamic scale & position based on scroll progress
    const progress = frameIndex / (TOTAL_FRAMES - 1);

    // Hero (start): scale 1.2, shifted left
    // About (end): scale 0.9, more centered
    const startScale = 1.2;
    const endScale = 0.9;
    const scale = startScale + (endScale - startScale) * progress;

    // Horizontal offset: start shifted left (negative = left), end centered
    const startOffsetXPercent = -0.15; // 15% to the left
    const endOffsetXPercent = 0;
    const offsetXPercent = startOffsetXPercent + (endOffsetXPercent - startOffsetXPercent) * progress;

    // Crop edges from the source image to remove dark borders/artifacts
    const cropX = 15;
    const cropY = 15;
    const sourceWidth = img.width - cropX * 2;
    const sourceHeight = img.height - cropY * 2;

    // Calculate dimensions maintaining aspect ratio of the cropped image
    const imgAspect = sourceWidth / sourceHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let baseWidth, baseHeight;

    if (canvasAspect > imgAspect) {
      baseHeight = canvasHeight;
      baseWidth = baseHeight * imgAspect;
    } else {
      baseWidth = canvasWidth;
      baseHeight = baseWidth / imgAspect;
    }

    const drawWidth = baseWidth * scale;
    const drawHeight = baseHeight * scale;
    const offsetX = (canvasWidth - drawWidth) / 2 + (canvasWidth * offsetXPercent);
    const offsetY = (canvasHeight - drawHeight) / 2;

    ctx.drawImage(
      img,
      cropX, cropY, sourceWidth, sourceHeight, // Source bounds
      offsetX, offsetY, drawWidth, drawHeight  // Destination bounds
    );

    if (isDark) {
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const data = imageData.data;
      const hardThreshold = 190;
      const softThreshold = 160;

      const imgCenterX = offsetX + drawWidth / 2;
      const imgCenterY = offsetY + drawHeight / 2;
      const halfWidth = drawWidth / 2;
      const halfHeight = drawHeight / 2;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = r * 0.299 + g * 0.587 + b * 0.114;

        if (brightness > hardThreshold) {
          data[i + 3] = 0;
        } else if (brightness > softThreshold) {
          const alpha = Math.round(((hardThreshold - brightness) / (hardThreshold - softThreshold)) * 255);
          data[i + 3] = Math.min(data[i + 3], alpha);
        }

        // Spatial masking
        if (data[i + 3] > 0) {
          const x = (i / 4) % canvasWidth;
          const y = Math.floor((i / 4) / canvasWidth);

          const absX = Math.abs(x - imgCenterX) / halfWidth;
          const absY = Math.abs(y - imgCenterY) / halfHeight;

          let maskX = 1;
          if (absX > 0.6) maskX = 1 - (absX - 0.6) / 0.3;
          if (maskX < 0) maskX = 0;

          let maskY = 1;
          if (absY > 0.75) maskY = 1 - (absY - 0.75) / 0.2;
          if (maskY < 0) maskY = 0;

          data[i + 3] = Math.round(data[i + 3] * maskX * maskY);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }
  }, [images, isDark]);

  useEffect(() => {
    if (!loaded || !scrollContainerRef.current) return;

    // Render current frame immediately (to handle theme switches without resetting to frame 0)
    renderFrame(currentFrameRef.current);

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Get the hero section and about section positions
        const heroSection = container.querySelector('[data-section="hero"]') as HTMLElement;
        const aboutSection = container.querySelector('[data-section="about"]') as HTMLElement;

        if (!heroSection || !aboutSection) return;

        const heroTop = heroSection.offsetTop;
        // Animation ends when the About section is fully in view
        const aboutTop = aboutSection.offsetTop;
        const animationEnd = aboutTop;
        const animationRange = animationEnd - heroTop;

        const scrollY = window.scrollY;
        const progress = Math.max(0, Math.min(1, scrollY / animationRange));

        // Calculate opacity — fade out after about section
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const fadeStart = aboutTop + aboutSection.offsetHeight * 0.5;
        const fadeEnd = aboutBottom;
        let opacity = 1;
        if (scrollY > fadeStart) {
          opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
        }
        if (onOpacityChange) onOpacityChange(opacity);

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, images, renderFrame, scrollContainerRef, onOpacityChange]);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      if (loaded) {
        renderFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, renderFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}

const translations = {
  id: {
    nav: { works: 'Karya', about: 'Tentang', services: 'Layanan', contact: 'Kontak' },
    hero: {
      title1: 'RAHMAT',
      title2: 'RAIHAN',
      title3: 'BAIHAQI',
      descLeft1: 'Terkadang langkah paling',
      descLeft2: 'berani yang bisa diambil adalah —',
      descLeftBold: 'mulai berkarya',
      btn: 'Lihat Portofolio',
      descRight1: 'Lulusan Teknik Informatika',
      descRight2: 'mengabdi sebagai PNS.',
      descRight3: 'Fokus pada inovasi',
      descRight4: 'layanan masyarakat.'
    },
    about: {
      label: 'Profil',
      title1: 'Tentang',
      title2: 'Saya',
      p1: 'Halo, saya Rahmat Raihan Baihaqi. Sebagai lulusan Teknik Informatika yang kini mengabdi di BKPSDM Kabupaten Mempawah, saya memiliki dedikasi tinggi dalam mendigitalisasi proses kerja.',
      p2: 'Meski menyebut diri sebagai warga sipil biasa, saya sangat antusias memecahkan masalah melalui barisan kode menggunakan Laravel, ReactJs, NextJS, NodeJS, PHP, TypeScript, dan PostgreSQL.',
      exp: 'Tahun Pengalaman',
      proj: 'Proyek Selesai'
    },
    portfolio: {
      label: 'Portofolio',
      title1: 'Projek',
      title2: 'Saya',
      projLabel: 'Proyek',
      t1: 'Go-SPO RS Rubini', t2: 'Portal Bidang BKPSDM', t3: 'Rekap SPL PT BAI',
      desc1: 'Aplikasi sistem untuk merekap Standar Prosedur Operasional (SPO) di RS Rubini Kabupaten Mempawah.',
      desc2: 'Sistem Informasi bidang Diklat, Pengembangan Pegawai, dan Disiplin di BKPSDM Kabupaten Mempawah.',
      desc3: 'Aplikasi berbasis web untuk merekap Surat Perintah Lembur (SPL) Operator di PT. Borneo Alumina Indonesia.',
      link1: 'https://go-spo-rs-rubini.vercel.app/',
      link2: 'https://sibidangc.vercel.app/',
      link3: 'https://sploperator.vercel.app/',
      btn: 'Kunjungi Situs'
    },
    contact: {
      label: 'Kontak',
      title1: 'Kontak',
      title2: 'Saya',
      desc: 'Layanan yang saya sediakan meliputi: Web Development, Aplikasi Android, Google Apps Script (GAS), Web Design, serta Fotografi & Videografi. Mari berkolaborasi!',
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp / Telepon',
      btn: 'Kirim Pesan',
      placeholderLocation: '[ Ruang Foto ]',
    },
    footer: {
      connect: 'Terhubung',
      rights: 'Hak Cipta Dilindungi'
    }
  },
  en: {
    nav: { works: 'Works', about: 'About', services: 'Services', contact: 'Contact' },
    hero: {
      title1: 'RAHMAT',
      title2: 'RAIHAN',
      title3: 'BAIHAQI',
      descLeft1: 'Sometimes the boldest',
      descLeft2: 'step you can take is —',
      descLeftBold: 'start creating',
      btn: 'View Portfolio',
      descRight1: 'Informatics Engineering',
      descRight2: 'graduate, serving as a',
      descRight3: 'Civil Servant. Focused',
      descRight4: 'on public innovation.'
    },
    about: {
      label: 'Profile',
      title1: 'About',
      title2: 'Me',
      p1: 'Hello, I am Rahmat Raihan Baihaqi. As an Informatics Engineering graduate currently serving at BKPSDM Mempawah Regency, I am highly dedicated to digitizing work processes.',
      p2: 'Though I call myself an ordinary citizen, I am very passionate about solving problems through code using Laravel, ReactJs, NextJS, NodeJS, PHP, TypeScript, and PostgreSQL.',
      exp: 'Years Experience',
      proj: 'Projects Done'
    },
    portfolio: {
      label: 'Portfolio',
      title1: 'My',
      title2: 'Projects',
      projLabel: 'Project',
      t1: 'Go-SPO RS Rubini', t2: 'Portal Bidang BKPSDM', t3: 'Rekap SPL PT BAI',
      desc1: 'A system application for recording Standard Operating Procedures (SPO) at RS Rubini, Mempawah Regency.',
      desc2: 'Information System for Training, Employee Development, and Discipline at BKPSDM Mempawah Regency.',
      desc3: 'A web-based application to record Overtime Orders (SPL) for Operators at PT. Borneo Alumina Indonesia.',
      link1: 'https://go-spo-rs-rubini.vercel.app/',
      link2: 'https://sibidangc.vercel.app/',
      link3: 'https://sploperator.vercel.app/',
      btn: 'Visit Site'
    },
    contact: {
      label: 'Contact',
      title1: 'My',
      title2: 'Contact',
      desc: 'Services I provide include: Web Development, Android Apps, Google Apps Script (GAS), Web Design, and Photography & Videography. Let\'s collaborate!',
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp / Phone',
      btn: 'Send Message',
      placeholderLocation: '[ Photo Space ]',
    },
    footer: {
      connect: 'Connect',
      rights: 'All Rights Reserved'
    }
  }
};

type Language = 'id' | 'en';

function ProjectCard({ item, index, progress, t, isDark, borderLightClass, borderClass, borderFaintClass, textWhiteBlack, textMuted }: any) {
  // Use a spring to make the scroll tracking buttery smooth
  const smoothProgress = useSpring(progress as MotionValue<number>, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Stacking logic based on the image: 
  // Card 1 (Purple) is top, Card 2 (Pink) middle, Card 3 (Yellow) bottom.
  const zIndex = 30 - index * 10;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Final spread positions: fully side-by-side on desktop, vertical deck on mobile
  const targetRotations = isMobile ? [-4, 0, 4] : [-8, 0, 8];
  const targetX = isMobile ? [0, 0, 0] : [-400, 0, 400];
  const targetY = isMobile ? [-120, 0, 120] : [0, 0, 0];

  // Scroll mapping: 
  // 0 to 0.2: Cards stay clustered in the center
  // 0.2 to 1: Cards fan out into the 3D spread continuously
  const rotate = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, targetRotations[index]]);
  const x = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, targetX[index]]);
  const y = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, targetY[index]]);

  // Scale is handled purely by hover now, so we remove the scroll-bound scale.

  // Revert to the elegant glassmorphism theme of the user's web design
  const cardColor = `${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`;

  // Use the native text color variables based on dark/light mode
  const textColor = textWhiteBlack;
  const textMutedColor = textMuted;

  return (
    <motion.div
      style={{ rotate, x, y, zIndex, transformOrigin: "center center", backdropFilter: "blur(12px)" }}
      whileHover={{
        scale: 1.15,
        backdropFilter: "blur(24px)",
        zIndex: 50
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, backdropFilter: { duration: 0.3 } }}
      className={`group absolute w-full max-w-[300px] md:max-w-[380px] h-[340px] md:h-[520px] ${cardColor} rounded-3xl shadow-2xl border ${borderLightClass} hover:${borderClass} p-8 md:p-10 flex flex-col justify-between transition-colors duration-500 overflow-hidden`}
    >
      {/* Decorative Inner Border / Glass Reflection */}
      <div className={`absolute inset-0 border ${borderFaintClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none m-2`}></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${textColor} opacity-60`}>{t.portfolio.projLabel} 0{item}</span>
          <span className={`w-1.5 h-1.5 ${isDark ? 'bg-white/20' : 'bg-black/20'} rounded-sm`}></span>
        </div>

        <h3 className={`text-2xl md:text-3xl font-bold mt-4 mb-4 uppercase tracking-wider ${textColor}`}>
          {item === 1 ? t.portfolio.t1 : item === 2 ? t.portfolio.t2 : t.portfolio.t3}
        </h3>
        <p className={`font-inter ${textMutedColor} text-sm md:text-base leading-relaxed mt-4 opacity-90`}>
          {item === 1 ? t.portfolio.desc1 : item === 2 ? t.portfolio.desc2 : t.portfolio.desc3}
        </p>
      </div>

      <a href={item === 1 ? t.portfolio.link1 : item === 2 ? t.portfolio.link2 : t.portfolio.link3} target="_blank" rel="noreferrer" className={`relative z-10 mt-12 flex justify-between items-center border-t ${borderLightClass} pt-6 opacity-50 hover:opacity-100 transition-opacity duration-500`}>
        <span className={`text-[10px] font-inter tracking-[0.2em] ${textColor} uppercase transition-colors duration-500`}>{t.portfolio.btn}</span>
        <span className={`${textColor} font-light transform group-hover:translate-x-2 transition-all duration-500`}>→</span>
      </a>
    </motion.div>
  );
}

function AnimatedCounter({ to, duration = 2000, delay = 0, format, textWhiteBlack }: { to: number, duration?: number, delay?: number, format: (v: number) => string, textWhiteBlack: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !ref.current) return;
    let startTimestamp: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp + delay;
      if (timestamp < startTimestamp) {
        animationFrame = requestAnimationFrame(step);
        return;
      }

      const progress = Math.max(0, Math.min((timestamp - startTimestamp) / duration, 1));

      // Standard easeOutCubic which doesn't linger as long at the end
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const current = Math.round(easeProgress * to);
      if (ref.current) ref.current.textContent = format(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        if (ref.current) ref.current.textContent = format(to);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, to, duration, delay, format]);
  return <span ref={ref} className={`${textWhiteBlack} font-light text-3xl transition-colors duration-500`}>{format(0)}</span>;
}

function StaggeredBackground({ isDark }: { isDark: boolean }) {
  const bgColor = isDark ? 'bg-white' : 'bg-black';
  const strips = 3;

  // Pre-define classes so Tailwind JIT can scan and generate them
  const translates = [
    'translate-y-[300%]',
    'translate-y-[200%]',
    'translate-y-[100%]',
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {Array.from({ length: strips }).map((_, i) => {
        const delay = (strips - 1 - i) * 0.04;
        const translateClass = translates[i];
        return (
          <div
            key={i}
            className={`absolute left-0 right-0 ${bgColor} transform ${translateClass} group-hover:translate-y-0 transition-transform duration-500`}
            style={{
              top: `${(i / strips) * 100}%`,
              height: `${100 / strips + 0.5}%`,
              transitionDelay: `${delay}s`,
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)'
            }}
          />
        );
      })}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [animationOpacity, setAnimationOpacity] = useState(1);
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileApp, setIsMobileApp] = useState(false);

  useEffect(() => {
    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force scroll to top on mount
    window.scrollTo(0, 0);

    const checkMobile = () => setIsMobileApp(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const borderClass = isDark ? 'border-white/20' : 'border-black/20';
  const borderLightClass = isDark ? 'border-white/10' : 'border-black/10';
  const borderFaintClass = isDark ? 'border-white/5' : 'border-black/5';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
  const textSub = isDark ? 'text-white/60' : 'text-black/60';
  const textGraySoft = isDark ? 'text-gray-300' : 'text-gray-600';
  const hoverNav = isDark ? 'hover:text-black' : 'hover:text-white';
  const textWhiteBlack = isDark ? 'text-white' : 'text-black';
  const strokeColor = isDark ? '1px white' : '1px black';

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navProgressRaw = useTransform(scrollY, [0, 300], [1, 0]);
  const navProgress = useSpring(navProgressRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const headerWidth = useMotionTemplate`calc(var(--nav-min) + (var(--nav-max) - var(--nav-min)) * ${navProgress})`;

  useMotionValueEvent(navProgressRaw, "change", (latest) => {
    // Auto-close sidebar if user scrolls back to the very top
    if (latest > 0.8 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  });

  const toggleSidebar = () => {
    // Only allow toggling sidebar if navbar has shrunk into a hamburger
    if (navProgressRaw.get() < 0.8) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start 80%", "center center"]
  });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const smoothHero = useSpring(heroProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroX = useTransform(smoothHero, [0, 1], ["0vw", "-50vw"]);
  const heroOpacity = useTransform(smoothHero, [0, 0.8], [1, 0]);

  const worksRef = useRef<HTMLElement>(null);
  const { scrollYProgress: worksProgress } = useScroll({
    target: worksRef,
    offset: ["start start", "end end"]
  });

  const contactRef = useRef<HTMLElement>(null);
  const { scrollYProgress: contactProgress } = useScroll({
    target: contactRef,
    offset: ["0 1", "0.5 0.5"] // Start when top of section hits bottom of screen, finish when center of section hits center of screen
  });
  const smoothContact = useSpring(contactProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const contactX = useTransform(smoothContact, [0, 1], ["50vw", "0vw"]);
  const contactOpacity = useTransform(smoothContact, [0, 1], [0, 1]);

  const p1Progress = useTransform(aboutProgress, [0, 0.6], [0, 1]);
  const p2Progress = useTransform(aboutProgress, [0.4, 1], [0, 1]);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Atur seberapa lama scroll-nya (lebih besar = lebih lambat/smooth)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Perlambat kecepatan wheel bawaan
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { duration: 1.5 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${isDark ? 'bg-black text-white' : 'bg-[#f4f4f5] text-gray-900'} font-sans select-none w-full min-h-screen transition-colors duration-500`}
    >
      {/* Splash Screen */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%", transitionEnd: { display: "none" } }}
        transition={{ duration: 1, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center overflow-hidden px-4 md:px-8 max-w-full">
          <div className="overflow-hidden pb-1 mb-1 max-w-full">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-white text-2xl sm:text-4xl md:text-6xl font-bold tracking-[0.1em] md:tracking-[0.3em] uppercase text-center"
            >
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 2.0, ease: [0.76, 0, 0.24, 1] }}
                className="block px-2"
              >
                RAHMAT RAIHAN BAIHAQI
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-full max-w-4xl h-[2px] bg-white/20 origin-left"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
              className="w-full h-full bg-blue-500 origin-right shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </motion.div>

          <div className="overflow-hidden mt-3">
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-white/80 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase"
            >
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 2.0, ease: "easeOut" }}
                className="block pl-1 md:pl-2"
              >
                PORTFOLIO
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#001f3f] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* ===== SCROLL ANIMATION CHARACTER — fixed overlay from Hero to About ===== */}
      <div
        className="fixed inset-0 z-20 pointer-events-none flex items-end justify-center"
        style={{
          opacity: animationOpacity,
          transition: 'opacity 0.15s ease-out',
        }}
      >
        <div className="w-full h-full">
          {!isMobileApp && <ScrollAnimation scrollContainerRef={containerRef} onOpacityChange={setAnimationOpacity} isDark={isDark} />}
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" data-section="hero" ref={heroRef} className="min-h-screen flex flex-col relative p-4 md:p-12 overflow-x-hidden">
        {/* Top Navigation */}
        <motion.header
          layout
          style={{
            width: isSidebarOpen ? "16rem" : headerWidth,
            height: isSidebarOpen ? "auto" : "var(--nav-min)"
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed top-4 md:top-12 left-4 md:left-12 z-50 flex ${isSidebarOpen ? 'flex-col items-start' : 'flex-row items-center'} border ${borderClass} ${isDark ? 'bg-black/50' : 'bg-white/50'} uppercase tracking-[0.25em] text-xs font-semibold opacity-100 backdrop-blur-md overflow-hidden [--nav-max:calc(100vw-2rem)] md:[--nav-max:calc(100vw-6rem)] [--nav-min:3rem] md:[--nav-min:4rem]`}
        >
          <motion.div layout="position" onClick={toggleSidebar} className={`${isSidebarOpen ? `border-b w-full` : `border-r h-full`} ${borderClass} ${textGraySoft} ${hoverNav} p-4 md:p-6 flex items-center justify-center transition-colors cursor-pointer w-[--nav-min] md:w-[--nav-min] shrink-0 relative overflow-hidden group`}>
            <StaggeredBackground isDark={isDark} />
            <Menu size={20} className="relative z-10 transition-colors duration-300" />
          </motion.div>
          <motion.div layout="position" onClick={() => { scrollToSection('works'); setIsSidebarOpen(false); }} className={`${isSidebarOpen ? `border-b w-full flex` : `border-r h-full hidden md:flex`} ${borderClass} ${textGraySoft} ${hoverNav} flex-1 items-center justify-between p-4 md:p-6 transition-colors cursor-pointer group whitespace-nowrap min-w-[120px] relative overflow-hidden`}>
            <StaggeredBackground isDark={isDark} />
            <span className={`relative z-10 transition-colors duration-300`}>{t.nav.works}</span>
            <span className={`relative z-10 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-black' : 'bg-white'} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 shrink-0`}></span>
          </motion.div>
          <motion.div layout="position" onClick={() => { scrollToSection('about'); setIsSidebarOpen(false); }} className={`${isSidebarOpen ? `border-b w-full flex` : `border-r h-full hidden sm:flex`} ${borderClass} ${textGraySoft} ${hoverNav} flex-1 items-center justify-between p-4 md:p-6 transition-colors cursor-pointer group whitespace-nowrap min-w-[120px] relative overflow-hidden`}>
            <StaggeredBackground isDark={isDark} />
            <span className={`relative z-10 transition-colors duration-300`}>{t.nav.about}</span>
            <span className={`relative z-10 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-black' : 'bg-white'} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 shrink-0`}></span>
          </motion.div>
          <motion.div layout="position" onClick={() => { scrollToSection('services'); setIsSidebarOpen(false); }} className={`${isSidebarOpen ? `border-b w-full flex` : `border-r h-full hidden md:flex`} ${borderClass} ${textGraySoft} ${hoverNav} flex-1 items-center justify-between p-4 md:p-6 transition-colors cursor-pointer group whitespace-nowrap min-w-[120px] relative overflow-hidden`}>
            <StaggeredBackground isDark={isDark} />
            <span className={`relative z-10 transition-colors duration-300`}>{t.nav.services}</span>
            <span className={`relative z-10 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-black' : 'bg-white'} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 shrink-0`}></span>
          </motion.div>
          <motion.div layout="position" onClick={() => { scrollToSection('contact'); setIsSidebarOpen(false); }} className={`${isSidebarOpen ? `border-b w-full flex` : `border-r md:border-r-0 lg:border-r h-full hidden md:flex`} ${borderClass} ${textGraySoft} ${hoverNav} flex-1 items-center justify-between p-4 md:p-6 transition-colors cursor-pointer group whitespace-nowrap min-w-[120px] relative overflow-hidden`}>
            <StaggeredBackground isDark={isDark} />
            <span className={`relative z-10 transition-colors duration-300`}>{t.nav.contact}</span>
            <span className={`relative z-10 w-1.5 h-1.5 rounded-full ${isDark ? 'bg-black' : 'bg-white'} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 shrink-0`}></span>
          </motion.div>
          {/* Language Switcher */}
          <motion.div
            layout="position"
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className={`${isSidebarOpen ? `border-b w-full flex` : `border-l h-full hidden lg:flex`} ${borderClass} ${textGraySoft} ${hoverNav} p-4 md:p-6 items-center justify-center transition-colors cursor-pointer w-16 md:w-20 shrink-0 group relative overflow-hidden`}
          >
            <StaggeredBackground isDark={isDark} />
            <span className={`relative z-10 group-hover:scale-110 transition-transform duration-300`}>{lang === 'id' ? 'EN' : 'ID'}</span>
          </motion.div>
          {/* Theme Switcher */}
          <motion.div
            layout="position"
            onClick={() => setIsDark(!isDark)}
            className={`${isSidebarOpen ? `w-full` : `border-l h-full`} ${borderClass} ${textGraySoft} ${hoverNav} p-4 md:p-6 flex items-center justify-center transition-colors cursor-pointer w-16 md:w-20 shrink-0 group relative overflow-hidden`}
          >
            <StaggeredBackground isDark={isDark} />
            <div className="relative z-10 flex">
              {isDark ? <Sun size={18} className="group-hover:scale-110 transition-transform shrink-0" /> : <Moon size={18} className="group-hover:scale-110 transition-transform shrink-0" />}
            </div>
          </motion.div>
        </motion.header>

        <motion.div style={{ x: isMobileApp ? 0 : heroX, opacity: heroOpacity }} className="flex-1 flex flex-col w-full z-10">
          {/* Main Typography Area */}
          <main className="flex-1 w-full flex flex-col justify-center relative min-h-[50vh] mt-32 md:my-0 px-4 md:px-0 md:pl-12">
            <h1 className="sr-only">{t.hero.title1} {t.hero.title2} {t.hero.title3}</h1>
            <div aria-hidden="true" className={`text-[14vw] sm:text-[10vw] md:text-[7vw] font-bold leading-[0.9] tracking-tight uppercase z-30 ${textWhiteBlack} transition-colors duration-500 md:absolute md:top-[25%]`}>
              {t.hero.title1}
            </div>
            <div aria-hidden="true" className="text-[14vw] sm:text-[10vw] md:text-[7vw] font-bold leading-[0.9] tracking-tight uppercase flex items-center z-30 text-transparent transition-all duration-500 mt-2 md:mt-0 md:absolute md:top-[45%]" style={{ WebkitTextStroke: strokeColor }}>
              {t.hero.title2}
              <span className="relative text-[#001f3f] ml-2 md:ml-4" style={{ WebkitTextStroke: "0px" }}>.</span>
            </div>
          </main>

          {/* Footer / Bottom Content Area */}
          <footer className={`w-full flex flex-col md:flex-row justify-start items-start gap-12 md:gap-32 md:px-12 mt-auto pt-12 border-t ${borderClass} relative z-30 transition-colors duration-500`}>
            {/* Left Footer Block */}
            <div className="flex flex-col gap-6 max-w-sm z-20 font-inter">
              <p className={`text-xs md:text-sm leading-relaxed tracking-wide ${textMuted} transition-colors duration-500`}>
                {t.hero.descLeft1} <br />
                {t.hero.descLeft2} <br />
                <span className={`font-bold ${textWhiteBlack} uppercase text-[10px] md:text-xs tracking-[0.5em] mt-1 block transition-colors duration-500`}>{t.hero.descLeftBold}</span>
              </p>
              <button className={`bg-[#001f3f] hover:bg-[#002b59] border border-[#001f3f] text-white font-bold py-4 px-8 md:py-5 md:px-10 uppercase tracking-[0.2em] text-[10px] md:text-xs transition-colors focus:ring-2 focus:ring-[#002b59] focus:outline-none w-fit group`}>
                <span className="group-hover:px-2 transition-all duration-300 group-hover:opacity-100 opacity-90">{t.hero.btn}</span>
              </button>
            </div>

            {/* Right Footer Block */}
            <div className="flex max-w-sm w-full md:w-auto items-start z-20 font-inter">
              <div className="flex items-start gap-4">
                <span className="w-8 h-[1px] bg-[#001f3f] mt-2 block shrink-0"></span>
                <p className={`text-xs md:text-sm leading-relaxed tracking-wide text-left ${textMuted} transition-colors duration-500`}>
                  {t.hero.descRight1}<br />
                  {t.hero.descRight2}<br />
                  {t.hero.descRight3}<br />
                  {t.hero.descRight4}
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} data-section="about" className={`min-h-screen flex flex-col md:flex-row justify-end relative p-4 md:p-12 md:px-24 items-center border-t ${borderFaintClass} transition-colors duration-500`}>
        {/* Right Text Area */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start mt-16 md:mt-0 md:pl-24 z-30 ml-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-[#001f3f] block"></span>
            <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub} transition-colors duration-500`}>{t.about.label}</span>
          </div>

          <h2 className={`text-5xl md:text-7xl font-bold leading-[1] tracking-tight mb-8 ${textWhiteBlack} uppercase transition-colors duration-500`}>
            {t.about.title1} <br />
            <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.about.title2}</span>
          </h2>

          <div className={`font-inter text-sm md:text-base leading-relaxed tracking-wide ${textMuted} max-w-md flex flex-col gap-6 transition-colors duration-500`}>
            <p>
              <ScrollTypingText text={t.about.p1} progress={p1Progress} />
            </p>
            <p className="opacity-80">
              <ScrollTypingText text={t.about.p2} progress={p2Progress} />
            </p>
          </div>

          <div className={`mt-12 flex gap-12 border-t ${borderLightClass} pt-8 w-full max-w-md transition-colors duration-500`}>
            <div className="flex flex-col gap-2">
              <AnimatedCounter to={4} delay={200} duration={1000} format={(v) => (v < 10 ? '0' + v : v) + '+'} textWhiteBlack={textWhiteBlack} />
              <span className={`text-[9px] uppercase tracking-[0.2em] ${textSub}`}>{t.about.exp}</span>
            </div>
            <div className="flex flex-col gap-2">
              <AnimatedCounter to={10} delay={400} duration={1500} format={(v) => v + '+'} textWhiteBlack={textWhiteBlack} />
              <span className={`text-[9px] uppercase tracking-[0.2em] ${textSub}`}>{t.about.proj}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="works" ref={worksRef} className={`h-[250vh] relative border-t ${borderFaintClass} transition-colors duration-500`}>

        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden w-full">

          {/* Section Header */}
          <div className="absolute top-24 md:top-32 flex flex-col items-center text-center z-40 pointer-events-none px-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#001f3f] block hidden md:block"></span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub}`}>{t.portfolio.label}</span>
              <span className="w-12 h-[1px] bg-[#001f3f] block hidden md:block"></span>
            </div>

            <h2 className={`text-4xl md:text-7xl font-bold leading-[1] tracking-tight ${textWhiteBlack} uppercase text-center transition-colors duration-500`}>
              {t.portfolio.title1} <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.portfolio.title2}</span>
            </h2>
          </div>

          {/* Projects Stack Center Point */}
          <div className="relative flex items-center justify-center w-full h-full z-10 mt-32 md:mt-40">
            {[1, 2, 3].map((item, index) => (
              <ProjectCard
                key={item}
                item={item}
                index={index}
                progress={worksProgress}
                t={t}
                isDark={isDark}
                borderLightClass={borderLightClass}
                borderClass={borderClass}
                borderFaintClass={borderFaintClass}
                textWhiteBlack={textWhiteBlack}
                textMuted={textMuted}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`min-h-screen flex flex-col justify-center relative p-4 md:p-12 md:px-24 border-t ${borderFaintClass} py-24 transition-colors duration-500 overflow-hidden`}
      >
        <motion.div
          style={{ x: isMobileApp ? 0 : contactX, opacity: contactOpacity }}
          className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 z-10"
        >

          {/* Left Area - Glass Card */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#001f3f] block"></span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub} transition-colors duration-500`}>{t.contact.label}</span>
            </div>

            <h2 className={`text-5xl md:text-7xl font-bold leading-[1] tracking-tight mb-12 ${textWhiteBlack} uppercase transition-colors duration-500`}>
              {t.contact.title1} <br />
              <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.contact.title2}</span>
            </h2>

            <div className={`relative group ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'} backdrop-blur-md border ${borderLightClass} hover:${borderClass} p-8 md:p-12 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,31,63,0.3)]`}>
              <div className={`absolute inset-0 border ${borderFaintClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none m-2`}></div>

              <div className="relative z-10">
                <p className={`font-inter ${textMuted} text-sm md:text-base leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500`}>
                  {t.contact.desc}
                </p>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className={`block text-[10px] uppercase tracking-[0.2em] font-bold ${isDark ? 'text-white' : 'text-[#001f3f]'} opacity-80 mb-2`}>{t.contact.emailLabel}</span>
                    <a href="mailto:atzgamingvlog01@gmail.com" className={`text-lg md:text-xl font-medium ${textWhiteBlack} hover:text-[#001f3f] transition-colors`}>atzgamingvlog01@gmail.com</a>
                  </div>
                  <div>
                    <span className={`block text-[10px] uppercase tracking-[0.2em] font-bold ${isDark ? 'text-white' : 'text-[#001f3f]'} opacity-80 mb-2`}>{t.contact.phoneLabel}</span>
                    <a href="tel:+62895337643070" className={`text-lg md:text-xl font-medium ${textWhiteBlack} hover:text-[#001f3f] transition-colors`}>0895 3376 43070</a>
                  </div>
                </div>

                <button className={`mt-10 bg-[#001f3f] hover:bg-[#002b59] border border-[#001f3f] text-white font-bold py-4 px-8 uppercase tracking-[0.2em] text-[10px] md:text-xs transition-colors focus:ring-2 focus:ring-[#002b59] focus:outline-none w-fit group`}>
                  <span className="group-hover:px-2 transition-all duration-300 opacity-90 group-hover:opacity-100">{t.contact.btn}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Area - Photo */}
          <div className="w-full md:w-[45%] aspect-square md:aspect-[3/4] relative group border border-[#001f3f]/10 overflow-hidden transition-all duration-500">
            <img src="/2.png" alt="Contact Photo" className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />

            {/* Decorative Corner Borders */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#001f3f] opacity-50 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#001f3f] opacity-50 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#001f3f] opacity-50 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#001f3f] opacity-50 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
          </div>

        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className={`w-full border-t ${borderFaintClass} py-12 px-4 md:px-12 mt-auto transition-colors duration-500`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-8 max-w-full lg:max-w-7xl mx-auto z-10 relative">

          <div className="flex flex-col items-start gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#001f3f] font-bold">{t.footer.connect}</span>
            <a href="mailto:atzgamingvlog01@gmail.com" className={`font-inter text-sm md:text-base ${textGraySoft} hover:${textWhiteBlack} transition-colors duration-300`}>
              atzgamingvlog01@gmail.com
            </a>
          </div>

          <div className={`flex flex-wrap justify-start md:justify-center items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-medium ${textSub}`}>
            <a href="https://www.instagram.com/rahmatraihanb?igsh=MTRkZ2Y0cnplaDlhbg%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className={`hover:${textWhiteBlack} transition-all flex items-center gap-1.5`}>
              <InstagramIcon className="w-3.5 h-3.5" /> Instagram
            </a>
            <a href="https://github.com/RahmatRaihan" target="_blank" rel="noreferrer" className={`hover:${textWhiteBlack} transition-all flex items-center gap-1.5`}>
              <GithubIcon className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href="mailto:atzgamingvlog01@gmail.com" className={`hover:${textWhiteBlack} transition-all flex items-center gap-1.5`}>
              <MailIcon className="w-3.5 h-3.5" /> Email
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#001f3f] font-bold">EST. 2024</span>
            <span className={`text-[9px] uppercase tracking-[0.4em] ${textSub}`}>{t.footer.rights}</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
