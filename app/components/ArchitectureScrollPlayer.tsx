"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ArchitectureScrollPlayerProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ArchitectureScrollPlayer({ scrollContainerRef }: ArchitectureScrollPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const totalFrames = 240;
  
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useEffect(() => {
    const loadImages = async () => {
      const loadImg = (index: number) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const paddedIndex = index.toString().padStart(3, '0');
          img.src = `/assets/zbuilds-sequence/ezgif-frame-${paddedIndex}.jpg`;
          
          img.onload = () => resolve(img);
          img.onerror = () => {
            const cvs = document.createElement("canvas");
            cvs.width = 1920; cvs.height = 1080;
            const ctx = cvs.getContext("2d");
            if (ctx) {
              ctx.fillStyle = "#e8e6e1"; ctx.fillRect(0, 0, 1920, 1080);
              
              ctx.strokeStyle = "rgba(26, 29, 32, 0.05)";
              ctx.lineWidth = 1;
              for(let x=0; x<1920; x+=60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1080); ctx.stroke(); }
              for(let y=0; y<1080; y+=60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1920, y); ctx.stroke(); }
              
              ctx.fillStyle = "#1a1d20"; ctx.font = "bold 80px sans-serif"; ctx.textAlign = "center";
              ctx.fillText(`ZBUILDS FRAME ${paddedIndex}`, 1920/2, 1080/2 - 60);
              
              ctx.fillStyle = "#5a5f68"; ctx.font = "40px sans-serif";
              ctx.fillText(`Waiting: /public/assets/zbuilds-sequence/ezgif-frame-${paddedIndex}.jpg`, 1920/2, 1080/2 + 40);
              
              const progress = index / totalFrames;
              ctx.fillStyle = `rgba(194, 112, 65, ${0.4 + (progress * 0.6)})`;
              ctx.fillRect(1920/2 - 400, 1080/2 + 150, 800 * progress, 15);
              
              const fallbackImg = new Image();
              fallbackImg.onload = () => resolve(fallbackImg);
              fallbackImg.src = cvs.toDataURL();
            } else {
              resolve(img);
            }
          };
        });
      };

      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        promises.push(loadImg(i));
      }
      
      const loaded = await Promise.all(promises);
      setImages(loaded);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const render = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      const img = images[Math.round(frameIndex)];
      if (!img) return;

      const targetRatio = 16 / 9;
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvasWidth / targetRatio;
      
      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        // High density screens (retina) require scaling
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        context.scale(dpr, dpr);
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    };

    render(0);

    const unsubscribe = currentFrameIndex.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    return () => unsubscribe();
  }, [imagesLoaded, images, currentFrameIndex]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#e8e6e1] overflow-hidden relative">
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 flex-col gap-6 text-center px-4 bg-[#e8e6e1]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#c27041]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#c27041] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-[#1a1d20] font-mono text-sm tracking-[0.2em] shadow-sm">INITIALIZING RENDER</p>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: imagesLoaded ? 1 : 0 }}
      />
    </div>
  );
}
