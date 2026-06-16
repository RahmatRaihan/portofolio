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

const LaravelLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Laravel</title>
    <path d="M24 1.75c0-.966-.784-1.75-1.75-1.75H9.75C8.784 0 8 .784 8 1.75v12.5H1.75C.784 14.25 0 15.034 0 16v6.25C0 23.216.784 24 1.75 24h12.5c.966 0 1.75-.784 1.75-1.75V9.75H22.25c.966 0 1.75-.784 1.75-1.75V1.75zm-14.25.75c0-.414.336-.75.75-.75h10.5c.414 0 .75.336.75.75v5.5c0 .414-.336.75-.75.75H10.5c-.414 0-.75-.336-.75-.75v-5.5zM1.75 15.75h10.5c.414 0 .75.336.75.75v5.5c0 .414-.336.75-.75.75H1.75c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75zm12.5-6v-5.5c0-.414.336-.75.75-.75h5.5c.414 0 .75.336.75.75v5.5c0 .414-.336.75-.75.75h-5.5c-.414 0-.75-.336-.75-.75z" />
  </svg>
);

const ReactLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
    <title>React</title>
    <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
  </svg>
);

const NextLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Next.js</title>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.88 18.918l-7.39-9.396V17.22H9.018V6.78h1.492l7.218 9.178V6.78h1.472v12.138h-1.322z" />
  </svg>
);

const PostgresLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>PostgreSQL</title>
    <path d="M19.12 10.23c-.15-.43-.37-.82-.64-1.18.25-.79.28-1.63.1-2.42-.37-1.6-1.73-2.73-3.37-2.79h-.08c-.28 0-.57.02-.85.07-.63-.58-1.45-.91-2.31-.91h-.1c-1.52.06-2.84.97-3.39 2.37-.88-.17-1.8-.02-2.58.42a4.4 4.4 0 0 0-2 3.65c0 .54.1 1.07.3 1.57.1.25.32.42.59.42h1.61c.42 0 .72-.41.61-.82-.12-.45-.18-.91-.18-1.38 0-1.22.76-2.29 1.9-2.68.22-.07.45-.11.68-.11.58 0 1.13.21 1.55.59l.36.32c-.15.22-.28.46-.38.71-.5 1.19-.41 2.4.24 3.41.31.48.73.86 1.23 1.11-.46.54-1.05.94-1.72 1.17-.29.1-.45.42-.35.71s.42.45.71.35c1.06-.37 1.95-1.12 2.53-2.14.75.24 1.53.23 2.2-.02 1.5-.56 2.3-2.07 2.3-4.11zm-2.08.31c-.1.35-.29.66-.56.9-.27.24-.62.39-.99.43-.72.08-1.41-.24-1.84-.81-.43-.57-.52-1.31-.25-1.96.2-.49.61-.85 1.11-1 .5-.15 1.04-.08 1.48.2.44.28.73.74.8 1.25a2.22 2.22 0 0 1-.75.99z" />
  </svg>
);

const NodeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Node.js</title>
    <path d="M11.996 0a1.2 1.2 0 00-.598.156L1.8 5.707a1.2 1.2 0 00-.602 1.04v11.106a1.2 1.2 0 00.602 1.04l9.598 5.55a1.2 1.2 0 001.196 0l9.598-5.55a1.2 1.2 0 00.602-1.04V6.747a1.2 1.2 0 00-.602-1.04L12.594.156A1.2 1.2 0 0011.996 0zm-1.066 5.867l6.85 3.955-6.85 3.956V5.867zm2.132 0v7.91l6.85-3.955-6.85-3.956zm-7.916 4.571l6.85 3.956-6.85 3.955V10.438z" />
  </svg>
);

const PhpLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>PHP</title>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.176 15.35c-.42.92-1.04 1.4-1.87 1.4h-1.63l.63-2.7h1.4c.56 0 .95-.27 1.18-.82.23-.55.22-1.14-.04-1.77-.25-.63-.67-.95-1.26-.95h-1.4l-.84 3.6h-1.68l1.45-6.2h2.51c1.23 0 2.12.55 2.66 1.65.54 1.1.41 2.2-.41 3.29-.42.92-1.04 1.4-1.87 1.4H17.18zm-7.6 0H7.9l.63-2.7h1.4c.56 0 .95-.27 1.18-.82.23-.55.22-1.14-.04-1.77-.25-.63-.67-.95-1.26-.95H8.4l-.84 3.6H5.88l1.45-6.2h2.51c1.23 0 2.12.55 2.66 1.65.54 1.1.41 2.2-.41 3.29-.42.92-1.04 1.4-1.87 1.4z" />
  </svg>
);

const TypescriptLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>TypeScript</title>
    <path d="M22.38 0H1.62C.73 0 0 .73 0 1.62v20.76C0 23.27.73 24 1.62 24h20.76c.89 0 1.62-.73 1.62-1.62V1.62C24 .73 23.27 0 22.38 0zM12 18.25h-2.38V9.16H6.62V7.12H15v2.04h-3v9.09zm7.76-2.61c0 2.58-1.87 3.86-4.63 3.86-2.26 0-3.82-1.1-4.04-2.82h2.26c.18.72.82 1.15 1.78 1.15.99 0 1.63-.44 1.63-1.17 0-1.74-5.21-.92-5.21-4.63 0-2.22 1.76-3.6 4.29-3.6 2.08 0 3.56.97 3.79 2.59h-2.18c-.18-.63-.7-.98-1.61-.98-.88 0-1.39.4-1.39 1 0 1.63 5.21.82 5.21 4.63z" />
  </svg>
);

const AndroidLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Android</title>
    <path d="M17.5 10c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5zm-11 0c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5zm8.5-4.5l1.3-1.3c.3-.3.3-.8 0-1.1s-.8-.3-1.1 0l-1.5 1.5C12.8 4.2 11.9 4 11 4s-1.8.2-2.7.6L6.8 3.1c-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1L7 5.5C5.2 6.8 4 9 4 11.5h14c0-2.5-1.2-4.7-3-6zm-4.75 3.5c-.4 0-.75-.3-.75-.75s.3-.75.75-.75.75.3.75.75-.3.75-.75.75zm4.5 0c-.4 0-.75-.3-.75-.75s.3-.75.75-.75.75.3.75.75-.3.75-.75.75zm-6.25 4.5h10V18c0 1.1-.9 2-2 2h-6c-1.1 0-2-.9-2-2v-3.5z" />
  </svg>
);

const TailwindLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Tailwind CSS</title>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const FigmaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Figma</title>
    <path d="M12 0c-3.3 0-6 2.7-6 6v3c0 3.3 2.7 6 6 6s6-2.7 6-6V6c0-3.3-2.7-6-6-6zm-3.5 18c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5H12v5H8.5zm0-5c-1.38 0-2.5-1.12-2.5-2.5S7.12 8 8.5 8H12v5H8.5zm0-5C7.12 8 6 6.88 6 5.5S7.12 3 8.5 3H12v5H8.5zm7 5c0 1.38-1.12 2.5-2.5 2.5H12V8h1c1.38 0 2.5 1.12 2.5 2.5zm0-5c0 1.38-1.12 2.5-2.5 2.5H12V3h1c1.38 0 2.5 1.12 2.5 2.5z" />
  </svg>
);

const GitLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <title>Git</title>
    <path d="M23.384 11.41L12.59 1.18c-.375-.375-1.02-.375-1.395 0L8.722 3.65l3.195 3.196c.375-.125.85-.05 1.2.3.375.375.45.925.225 1.375l3.2 3.2c.45-.225 1-.15 1.375.225.5.5.5 1.3 0 1.8-.5.5-1.3.5-1.8 0-.375-.375-.45-.925-.225-1.375l-3.2-3.2c-.225.225-.5.3-.775.3-.275 0-.55-.1-.775-.3-.375-.375-.45-.925-.225-1.375L8.12 7.07c-.45.225-1 .15-1.375-.225-.5-.5-.5-1.3 0-1.8.5-.5 1.3-.5 1.8 0 .375.375.45.925.225 1.375l3.2 3.196-3.19 3.2L1.18 11.41c-.375.375-.375 1.02 0 1.395l10.79 10.79c.375.375 1.02.375 1.395 0l10.79-10.79c.375-.375.375-1.02 0-1.395z" />
  </svg>
);

const AppsScriptLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <title>Google Apps Script</title>
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    <path d="M12 4l-4 16" />
  </svg>
);

const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.987z" />
  </svg>
);

const skills = [
  { name: 'Laravel', Icon: LaravelLogo, color: 'hover:text-[#FF2E21] hover:border-[#FF2E21]/30 hover:shadow-[0_0_20px_rgba(255,46,33,0.15)]' },
  { name: 'ReactJS', Icon: ReactLogo, color: 'hover:text-[#61DAFB] hover:border-[#61DAFB]/30 hover:shadow-[0_0_20px_rgba(97,218,251,0.15)]' },
  { name: 'NextJS', Icon: NextLogo, color: 'hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]' },
  { name: 'PostgreSQL', Icon: PostgresLogo, color: 'hover:text-[#336791] hover:border-[#336791]/30 hover:shadow-[0_0_20px_rgba(51,103,145,0.15)]' },
  { name: 'NodeJS', Icon: NodeLogo, color: 'hover:text-[#339933] hover:border-[#339933]/30 hover:shadow-[0_0_20px_rgba(51,153,51,0.15)]' },
  { name: 'PHP', Icon: PhpLogo, color: 'hover:text-[#777BB4] hover:border-[#777BB4]/30 hover:shadow-[0_0_20px_rgba(119,123,180,0.15)]' },
  { name: 'TypeScript', Icon: TypescriptLogo, color: 'hover:text-[#3178C6] hover:border-[#3178C6]/30 hover:shadow-[0_0_20px_rgba(49,120,198,0.15)]' },
  { name: 'Android', Icon: AndroidLogo, color: 'hover:text-[#3DDC84] hover:border-[#3DDC84]/30 hover:shadow-[0_0_20px_rgba(61,220,132,0.15)]' },
  { name: 'Tailwind CSS', Icon: TailwindLogo, color: 'hover:text-[#38BDF8] hover:border-[#38BDF8]/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]' },
  { name: 'Figma', Icon: FigmaLogo, color: 'hover:text-[#F24E1E] hover:border-[#F24E1E]/30 hover:shadow-[0_0_20px_rgba(242,78,30,0.15)]' },
  { name: 'Git', Icon: GitLogo, color: 'hover:text-[#F05032] hover:border-[#F05032]/30 hover:shadow-[0_0_20px_rgba(240,80,50,0.15)]' },
  { name: 'Apps Script', Icon: AppsScriptLogo, color: 'hover:text-[#F4B400] hover:border-[#F4B400]/30 hover:shadow-[0_0_20px_rgba(244,180,0,0.15)]' },
];

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
      btn: 'Kunjungi Situs',
      btnNoLink: 'Proyek Privat / Internal',
      projects: [
        {
          title: 'Go-SPO RS Rubini',
          desc: 'Aplikasi sistem untuk merekap Standar Prosedur Operasional (SPO) di RS Rubini Kabupaten Mempawah.',
          link: 'https://go-spo-rs-rubini.vercel.app/'
        },
        {
          title: 'Portal Bidang BKPSDM',
          desc: 'Sistem Informasi bidang Diklat, Pengembangan Pegawai, dan Disiplin di BKPSDM Kabupaten Mempawah.',
          link: 'https://sibidangc.vercel.app/'
        },
        {
          title: 'Rekap SPL PT BAI',
          desc: 'Aplikasi berbasis web untuk merekap Surat Perintah Lembur (SPL) Operator di PT. Borneo Alumina Indonesia.',
          link: 'https://sploperator.vercel.app/'
        },
        {
          title: 'Aplikasi POS Rs Rubini',
          desc: 'Aplikasi Kasir untuk Kantin RS Rubini Mempawah.',
          link: ''
        },
        {
          title: 'Inventory System',
          desc: 'Sistem inventory management dengan barcode scanner dan reporting data barang.',
          link: ''
        }
      ]
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
    skills: {
      label: 'Keahlian',
      title1: 'Teknologi &',
      title2: 'Tools'
    },
    testimonials: {
      label: 'Kata Mereka',
      title1: 'Kata',
      title2: 'Mereka',
      items: [
        {
          name: 'Rita Novita',
          role: 'Kasubbid di Rs Rubini',
          quote: 'Aplikasi yang dibuat sangat membantu dalam monitoring bisnis kami. Desain clean dan user-friendly. Terima kasih!'
        },
        {
          name: 'Desti Muthiah',
          role: 'Karyawan PT BAI',
          quote: 'Sangat terbantu dengan adanya sistem yang dibuat'
        },
        {
          name: 'Tuti Alawiyah',
          role: 'Pegawai IAIN',
          quote: 'Pembuatan Aplikasinya Cukup Cepat, Design yang sangat bagus dan memudahkan Pekerjaan saya'
        }
      ]
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
      btn: 'Visit Site',
      btnNoLink: 'Private / Internal Project',
      projects: [
        {
          title: 'Go-SPO RS Rubini',
          desc: 'A system application for recording Standard Operating Procedures (SPO) at RS Rubini, Mempawah Regency.',
          link: 'https://go-spo-rs-rubini.vercel.app/'
        },
        {
          title: 'Portal Bidang BKPSDM',
          desc: 'Information System for Training, Employee Development, and Discipline at BKPSDM Mempawah Regency.',
          link: 'https://sibidangc.vercel.app/'
        },
        {
          title: 'Rekap SPL PT BAI',
          desc: 'A web-based application to record Overtime Orders (SPL) for Operators at PT. Borneo Alumina Indonesia.',
          link: 'https://sploperator.vercel.app/'
        },
        {
          title: 'Aplikasi POS Rs Rubini',
          desc: 'Cashier application for the canteen of RS Rubini Mempawah.',
          link: ''
        },
        {
          title: 'Inventory System',
          desc: 'Inventory management system with barcode scanner and data reporting.',
          link: ''
        }
      ]
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
    skills: {
      label: 'Skills',
      title1: 'Tech &',
      title2: 'Tools'
    },
    testimonials: {
      label: 'Testimonials',
      title1: 'What',
      title2: 'They Say',
      items: [
        {
          name: 'Rita Novita',
          role: 'Deputy Head at Rs Rubini',
          quote: 'The application developed is extremely helpful in monitoring our business. Clean and user-friendly design. Thank you!'
        },
        {
          name: 'Desti Muthiah',
          role: 'Employee at PT BAI',
          quote: 'Extremely helped by the system that was created'
        },
        {
          name: 'Tuti Alawiyah',
          role: 'Officer at IAIN',
          quote: 'The application development was quite fast, with a very good design that eases my work'
        }
      ]
    },
    footer: {
      connect: 'Connect',
      rights: 'All Rights Reserved'
    }
  }
};

type Language = 'id' | 'en';

function ProjectCard({ item, index, totalCards, progress, t, isDark, borderLightClass, borderClass, borderFaintClass, textWhiteBlack, textMuted }: any) {
  // Use a spring to make the scroll tracking buttery smooth
  const smoothProgress = useSpring(progress as MotionValue<number>, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Center index of the stack to calculate offsets
  const midIndex = (totalCards - 1) / 2;

  // Stacking logic: Card 0 is top (highest z-index), last card is bottom (lowest z-index).
  const zIndex = (totalCards * 10) - index * 10;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spread positions fanned out
  const targetRotation = isMobile ? (index - midIndex) * 3 : (index - midIndex) * 5;
  const targetXVal = isMobile ? 0 : (index - midIndex) * 340;
  const targetYVal = isMobile ? (index - midIndex) * 130 : 0;

  // Scroll mapping
  const rotate = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, targetRotation]);
  const x = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, targetXVal]);
  const y = useTransform(smoothProgress, [0, 0.2, 1], [0, 0, targetYVal]);

  const cardColor = `${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`;
  const textColor = textWhiteBlack;
  const textMutedColor = textMuted;

  const hasLink = !!item.link;

  const buttonContent = (
    <>
      <span className={`text-[10px] font-inter tracking-[0.2em] ${textColor} uppercase transition-colors duration-500`}>
        {hasLink ? t.portfolio.btn : t.portfolio.btnNoLink}
      </span>
      {hasLink && <span className={`${textColor} font-light transform group-hover:translate-x-2 transition-all duration-500`}>→</span>}
    </>
  );

  return (
    <motion.div
      style={{ rotate, x, y, zIndex, transformOrigin: "center center", backdropFilter: "blur(12px)" }}
      whileHover={{
        scale: 1.15,
        backdropFilter: "blur(24px)",
        zIndex: (totalCards * 10) + 10
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, backdropFilter: { duration: 0.3 } }}
      className={`group absolute w-full max-w-[300px] md:max-w-[380px] h-[340px] md:h-[520px] ${cardColor} rounded-3xl shadow-2xl border ${borderLightClass} hover:${borderClass} p-8 md:p-10 flex flex-col justify-between transition-colors duration-500 overflow-hidden`}
    >
      {/* Decorative Inner Border / Glass Reflection */}
      <div className={`absolute inset-0 border ${borderFaintClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none m-2`}></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${textColor} opacity-60`}>{t.portfolio.projLabel} 0{index + 1}</span>
          <span className={`w-1.5 h-1.5 ${isDark ? 'bg-white/20' : 'bg-black/20'} rounded-sm`}></span>
        </div>

        <h3 className={`text-2xl md:text-3xl font-bold mt-4 mb-4 uppercase tracking-wider ${textColor}`}>
          {item.title}
        </h3>
        <p className={`font-inter ${textMutedColor} text-sm md:text-base leading-relaxed mt-4 opacity-90`}>
          {item.desc}
        </p>
      </div>

      {hasLink ? (
        <a href={item.link} target="_blank" rel="noreferrer" className={`relative z-10 mt-12 flex justify-between items-center border-t ${borderLightClass} pt-6 opacity-50 hover:opacity-100 transition-opacity duration-500`}>
          {buttonContent}
        </a>
      ) : (
        <div className={`relative z-10 mt-12 flex justify-between items-center border-t ${borderLightClass} pt-6 opacity-30 cursor-not-allowed`}>
          {buttonContent}
        </div>
      )}
    </motion.div>
  );
}

function TestimonialCard({ item, index, totalCards, progress, t, isDark, borderLightClass, borderClass, borderFaintClass, textWhiteBlack, textMuted, strokeColor }: any) {
  const smoothProgress = useSpring(progress as MotionValue<number>, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const midIndex = (totalCards - 1) / 2;
  const zIndex = (totalCards * 10) - index * 10;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const targetRotation = isMobile ? (index - midIndex) * 3 : (index - midIndex) * 5;
  const targetXVal = isMobile ? "0vw" : `${(index - midIndex) * 27}vw`;
  const targetYVal = isMobile ? `${(index - midIndex) * 120}px` : "0px";

  // Scroll mapping: starts at left (-60vw on desktop, -100vw on mobile), moves to center, then fans out.
  const startX = isMobile ? "-100vw" : "-60vw";
  const x = useTransform(smoothProgress, [0, 0.4, 1], [startX, "0vw", targetXVal]);
  const y = useTransform(smoothProgress, [0, 0.4, 1], ["0px", "0px", targetYVal]);
  const rotate = useTransform(smoothProgress, [0, 0.4, 1], [-15, 0, targetRotation]);

  const cardColor = `${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`;
  const textColor = textWhiteBlack;
  const textMutedColor = textMuted;

  return (
    <motion.div
      style={{ rotate, x, y, zIndex, transformOrigin: "center center", backdropFilter: "blur(12px)" }}
      whileHover={{
        scale: 1.15,
        backdropFilter: "blur(24px)",
        zIndex: (totalCards * 10) + 10
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, backdropFilter: { duration: 0.3 } }}
      className={`group absolute w-full max-w-[300px] md:max-w-[330px] h-[340px] md:h-[420px] ${cardColor} rounded-3xl shadow-2xl border ${borderLightClass} hover:${borderClass} p-8 md:p-10 flex flex-col justify-between transition-colors duration-500 overflow-hidden`}
    >
      <div className={`absolute inset-0 border ${borderFaintClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none m-2`}></div>

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${textColor} opacity-60`}>TESTIMONIAL 0{index + 1}</span>
            <QuoteIcon className={`w-6 h-6 ${textColor} opacity-10 group-hover:opacity-35 transition-opacity duration-500`} />
          </div>

          <p className={`font-inter ${textColor} text-sm md:text-base italic leading-relaxed opacity-95 group-hover:opacity-100 transition-opacity duration-500`}>
            "{item.quote}"
          </p>
        </div>

        <div className={`mt-6 border-t ${borderLightClass} pt-4`}>
          <h4 className={`text-base md:text-lg font-bold uppercase tracking-wider ${textColor}`}>
            {item.name}
          </h4>
          <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${textMutedColor} opacity-75 mt-1 block`}>
            {item.role}
          </span>
        </div>
      </div>
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

  const testimonialsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: testimonialsProgress } = useScroll({
    target: testimonialsRef,
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
      <section id="hero" data-section="hero" ref={heroRef} className="min-h-[85vh] md:min-h-screen flex flex-col relative p-4 pb-12 md:p-12 overflow-x-hidden">
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
          <main className="flex-1 w-full flex flex-col justify-center relative min-h-[30vh] md:min-h-[50vh] mt-20 md:mt-0 md:my-0 px-4 md:px-0 md:pl-12">
            <h1 className="sr-only">{t.hero.title1} {t.hero.title2} {t.hero.title3}</h1>
            <div aria-hidden="true" className={`text-[22vw] sm:text-[16vw] md:text-[7vw] font-bold leading-[0.85] tracking-tight uppercase z-30 ${textWhiteBlack} transition-colors duration-500 self-start md:self-auto md:absolute md:top-[20%]`}>
              {t.hero.title1}
            </div>
            <div aria-hidden="true" className="text-[22vw] sm:text-[16vw] md:text-[7vw] font-bold leading-[0.85] tracking-tight uppercase flex items-center justify-end md:justify-start z-30 text-transparent transition-all duration-500 mt-2 md:mt-0 self-end text-right md:text-left md:self-auto md:absolute md:top-[38%]" style={{ WebkitTextStroke: strokeColor }}>
              {t.hero.title2}
            </div>
            <div aria-hidden="true" className={`text-[22vw] sm:text-[16vw] md:text-[7vw] font-bold leading-[0.85] tracking-tight uppercase z-30 ${textWhiteBlack} transition-colors duration-500 mt-2 md:mt-0 self-start md:self-auto md:absolute md:top-[56%]`}>
              {t.hero.title3}
              <span className="relative text-[#001f3f] ml-2 md:ml-4" style={{ WebkitTextStroke: "0px" }}>.</span>
            </div>
          </main>

          {/* Footer / Bottom Content Area */}
          <footer className={`w-full flex flex-col gap-6 md:px-12 mt-auto pt-6 md:pt-12 border-t ${borderClass} relative z-30 transition-colors duration-500`}>
            {/* Grid for descriptions: 2 columns on mobile, flex row on desktop */}
            <div className="w-full grid grid-cols-2 gap-4 md:flex md:flex-row md:justify-start md:items-start md:gap-32">
              {/* Left Footer Block */}
              <div className="flex flex-col gap-4 md:gap-6 max-w-sm z-20 font-inter">
                <p className={`text-[11px] md:text-sm leading-relaxed tracking-wide ${textMuted} transition-colors duration-500`}>
                  {t.hero.descLeft1} <br />
                  {t.hero.descLeft2} <br />
                  <span className={`font-bold ${textWhiteBlack} uppercase text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] mt-1 block transition-colors duration-500`}>{t.hero.descLeftBold}</span>
                </p>
                {/* Desktop Button */}
                <button onClick={() => scrollToSection('works')} className={`hidden md:block bg-[#001f3f] hover:bg-[#002b59] border border-[#001f3f] text-white font-bold py-4 px-8 md:py-5 md:px-10 uppercase tracking-[0.2em] text-[10px] md:text-xs transition-colors focus:ring-2 focus:ring-[#002b59] focus:outline-none w-fit group`}>
                  <span className="group-hover:px-2 transition-all duration-300 group-hover:opacity-100 opacity-90">{t.hero.btn}</span>
                </button>
              </div>

              {/* Right Footer Block */}
              <div className="flex max-w-sm w-full md:w-auto items-start z-20 font-inter">
                <div className="flex items-start gap-2 md:gap-4">
                  <span className="w-4 md:w-8 h-[1px] bg-[#001f3f] mt-2 block shrink-0"></span>
                  <p className={`text-[11px] md:text-sm leading-relaxed tracking-wide text-left ${textMuted} transition-colors duration-500`}>
                    {t.hero.descRight1}<br />
                    {t.hero.descRight2}<br />
                    {t.hero.descRight3}<br />
                    {t.hero.descRight4}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Button (rendered full width below descriptions grid on mobile only) */}
            <div className="block md:hidden w-full z-20 font-inter mt-2">
              <button onClick={() => scrollToSection('works')} className={`w-full bg-[#001f3f] hover:bg-[#002b59] border border-[#001f3f] text-white font-bold py-4 px-8 uppercase tracking-[0.2em] text-[10px] transition-colors focus:ring-2 focus:ring-[#002b59] focus:outline-none text-center block`}>
                {t.hero.btn}
              </button>
            </div>
          </footer>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} data-section="about" className={`min-h-fit md:min-h-screen flex flex-col md:flex-row justify-end relative p-4 py-16 md:p-12 md:px-24 items-center border-t ${borderFaintClass} transition-colors duration-500`}>
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
      <div id="works">
        {/* Desktop Projects Layout */}
        <section ref={worksRef} className={`hidden md:block h-[250vh] relative border-t ${borderFaintClass} transition-colors duration-500`}>

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
              {t.portfolio.projects.map((project: any, index: number) => (
                <ProjectCard
                  key={index}
                  item={project}
                  index={index}
                  totalCards={t.portfolio.projects.length}
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

        {/* Mobile Projects Layout */}
        <section className={`block md:hidden py-16 border-t ${borderFaintClass} relative z-30 transition-colors duration-500`}>
          {/* Section Header */}
          <div className="flex flex-col items-center text-center px-4 mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub}`}>{t.portfolio.label}</span>
            </div>
            <h2 className={`text-3xl font-bold leading-[1] tracking-tight ${textWhiteBlack} uppercase text-center transition-colors duration-500`}>
              {t.portfolio.title1} <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.portfolio.title2}</span>
            </h2>
          </div>

          {/* Horizontal Swiper */}
          <div className="w-full overflow-x-auto flex gap-6 px-6 py-6 snap-x snap-mandatory scroll-smooth no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {t.portfolio.projects.map((project: any, index: number) => {
              const hasLink = !!project.link;
              const cardColor = `${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`;
              return (
                <div
                  key={index}
                  className={`snap-center shrink-0 w-[290px] min-h-[380px] ${cardColor} rounded-3xl border ${borderLightClass} p-6 flex flex-col justify-between backdrop-blur-md shadow-lg`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${textWhiteBlack} opacity-60`}>{t.portfolio.projLabel} 0{index + 1}</span>
                      <span className={`w-1.5 h-1.5 ${isDark ? 'bg-white/20' : 'bg-black/20'} rounded-sm`}></span>
                    </div>

                    <h3 className={`text-xl font-bold mt-2 mb-3 uppercase tracking-wider ${textWhiteBlack}`}>
                      {project.title}
                    </h3>
                    <p className={`font-inter ${textMuted} text-xs leading-relaxed mt-2 opacity-90`}>
                      {project.desc}
                    </p>
                  </div>

                  {hasLink ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className={`mt-8 flex justify-between items-center border-t ${borderLightClass} pt-4 opacity-70`}>
                      <span className={`text-[9px] font-inter tracking-[0.2em] ${textWhiteBlack} uppercase`}>{t.portfolio.btn}</span>
                      <span className={`${textWhiteBlack} font-light`}>→</span>
                    </a>
                  ) : (
                    <div className={`mt-8 flex justify-between items-center border-t ${borderLightClass} pt-4 opacity-30 cursor-not-allowed`}>
                      <span className={`text-[9px] font-inter tracking-[0.2em] ${textWhiteBlack} uppercase`}>{t.portfolio.btnNoLink}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Skills Section */}
      <section className={`py-24 relative z-30 overflow-hidden border-t ${borderFaintClass} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#001f3f] block"></span>
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub}`}>{t.skills.label}</span>
              <span className="w-12 h-[1px] bg-[#001f3f] block"></span>
            </div>
            <h2 className={`text-4xl md:text-6xl font-bold leading-[1] tracking-tight ${textWhiteBlack} uppercase transition-colors duration-500`}>
              {t.skills.title1} <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.skills.title2}</span>
            </h2>
          </div>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden py-4 marquee-container">
          {/* Subtle gradient overlays on left and right for fade effect */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r ${isDark ? 'from-black to-transparent' : 'from-[#f4f4f5] to-transparent'} z-10 pointer-events-none`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l ${isDark ? 'from-black to-transparent' : 'from-[#f4f4f5] to-transparent'} z-10 pointer-events-none`} />

          {/* Scrolling track */}
          <div className="flex w-max animate-marquee">
            {/* Set 1 */}
            <div className="flex items-center gap-6 md:gap-8 px-3 md:px-4">
              {skills.map((skill, index) => {
                const Icon = skill.Icon;
                return (
                  <div
                    key={`skill-1-${index}`}
                    className={`group flex items-center gap-4 py-4 px-6 md:py-5 md:px-8 rounded-2xl border ${borderLightClass} ${isDark ? 'bg-white/[0.01]' : 'bg-black/[0.01]'} backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${skill.color}`}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110 text-inherit" />
                    <span className={`font-sans font-bold text-sm md:text-base tracking-wider uppercase transition-colors duration-500 ${isDark ? 'text-white/80' : 'text-black/80'} group-hover:text-inherit`}>
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Set 2 (Identical for seamless looping) */}
            <div className="flex items-center gap-6 md:gap-8 px-3 md:px-4">
              {skills.map((skill, index) => {
                const Icon = skill.Icon;
                return (
                  <div
                    key={`skill-2-${index}`}
                    className={`group flex items-center gap-4 py-4 px-6 md:py-5 md:px-8 rounded-2xl border ${borderLightClass} ${isDark ? 'bg-white/[0.01]' : 'bg-black/[0.01]'} backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${skill.color}`}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110 text-inherit" />
                    <span className={`font-sans font-bold text-sm md:text-base tracking-wider uppercase transition-colors duration-500 ${isDark ? 'text-white/80' : 'text-black/80'} group-hover:text-inherit`}>
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div id="testimonials">
        {/* Desktop Testimonials Layout */}
        <section ref={testimonialsRef} className={`hidden md:block h-[220vh] relative border-t ${borderFaintClass} transition-colors duration-500`}>
          {/* Sticky Viewport */}
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden w-full">
            {/* Section Header */}
            <div className="absolute top-24 md:top-32 flex flex-col items-center text-center z-40 pointer-events-none px-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#001f3f] block hidden md:block"></span>
                <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub}`}>{t.testimonials.label}</span>
                <span className="w-12 h-[1px] bg-[#001f3f] block hidden md:block"></span>
              </div>

              <h2 className={`text-4xl md:text-7xl font-bold leading-[1] tracking-tight ${textWhiteBlack} uppercase text-center transition-colors duration-500`}>
                {t.testimonials.title1} <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.testimonials.title2}</span>
              </h2>
            </div>

            {/* Testimonials Stack Center Point */}
            <div className="relative flex items-center justify-center w-full h-full z-10 mt-24">
              {t.testimonials.items.map((item: any, index: number) => (
                <TestimonialCard
                  key={index}
                  item={item}
                  index={index}
                  totalCards={t.testimonials.items.length}
                  progress={testimonialsProgress}
                  t={t}
                  isDark={isDark}
                  borderLightClass={borderLightClass}
                  borderClass={borderClass}
                  borderFaintClass={borderFaintClass}
                  textWhiteBlack={textWhiteBlack}
                  textMuted={textMuted}
                  strokeColor={strokeColor}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Testimonials Layout */}
        <section className={`block md:hidden py-16 border-t ${borderFaintClass} relative z-30 transition-colors duration-500`}>
          {/* Section Header */}
          <div className="flex flex-col items-center text-center px-4 mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${textSub}`}>{t.testimonials.label}</span>
            </div>
            <h2 className={`text-3xl font-bold leading-[1] tracking-tight ${textWhiteBlack} uppercase text-center transition-colors duration-500`}>
              {t.testimonials.title1} <span className="text-transparent transition-all duration-500" style={{ WebkitTextStroke: strokeColor }}>{t.testimonials.title2}</span>
            </h2>
          </div>

          {/* Horizontal Swiper */}
          <div className="w-full overflow-x-auto flex gap-6 px-6 py-6 snap-x snap-mandatory scroll-smooth no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {t.testimonials.items.map((item: any, index: number) => {
              const cardColor = `${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`;
              return (
                <div
                  key={index}
                  className={`snap-center shrink-0 w-[290px] min-h-[360px] ${cardColor} rounded-3xl border ${borderLightClass} p-6 flex flex-col justify-between backdrop-blur-md shadow-lg`}
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${textWhiteBlack} opacity-60`}>TESTIMONIAL 0{index + 1}</span>
                        <QuoteIcon className={`w-5 h-5 ${textWhiteBlack} opacity-20`} />
                      </div>

                      <p className={`font-inter ${textWhiteBlack} text-xs italic leading-relaxed opacity-95`}>
                        "{item.quote}"
                      </p>
                    </div>

                    <div className={`mt-6 border-t ${borderLightClass} pt-4`}>
                      <h4 className={`text-sm font-bold uppercase tracking-wider ${textWhiteBlack}`}>
                        {item.name}
                      </h4>
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${textMuted} opacity-75 mt-1 block`}>
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`min-h-screen flex flex-col justify-center relative z-30 p-4 md:p-12 md:px-24 border-t ${borderFaintClass} py-24 transition-colors duration-500 overflow-hidden`}
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
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#001f3f] font-bold">EST. 2022</span>
            <span className={`text-[9px] uppercase tracking-[0.4em] ${textSub}`}>{t.footer.rights}</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
