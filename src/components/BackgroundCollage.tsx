import { useEffect, useState, useRef } from "react";
import cupcake from "@/assets/collage/cupcake.png";
import timmyTeddy from "@/assets/collage/timmy-teddy.png";
import timmyThumbs from "@/assets/collage/timmy-thumbs.png";
import happyBirthday from "@/assets/collage/happy-birthday.png";
import timmyYellow from "@/assets/collage/timmy-yellow.png";
import timmyCake from "@/assets/collage/timmy-cake.png";
import timmyPig from "@/assets/collage/timmy-pig.png";
import timmyFace from "@/assets/collage/timmy-face.png";
import timmyBag from "@/assets/collage/timmy-bag.png";
import timmyChristmas from "@/assets/collage/timmy-christmas.png";

const collageImages = [
  // Top left corner
  { src: timmyFace, alt: "Timmy face", baseX: 2, baseY: 2, size: "w-36 sm:w-48 md:w-56", rotation: -8, depth: 0.02 },
  { src: timmyTeddy, alt: "Timmy with teddy", baseX: 18, baseY: 5, size: "w-32 sm:w-44 md:w-52", rotation: 6, depth: 0.03 },
  
  // Top right corner
  { src: happyBirthday, alt: "Happy Birthday", baseX: 65, baseY: 3, size: "w-40 sm:w-52 md:w-64", rotation: 3, depth: 0.015 },
  { src: timmyPig, alt: "Timmy and pig", baseX: 82, baseY: 8, size: "w-32 sm:w-44 md:w-52", rotation: 10, depth: 0.025 },
  
  // Left side
  { src: timmyThumbs, alt: "Timmy", baseX: 0, baseY: 30, size: "w-36 sm:w-48 md:w-56", rotation: -4, depth: 0.02 },
  { src: cupcake, alt: "Cupcake", baseX: 5, baseY: 55, size: "w-28 sm:w-36 md:w-44", rotation: 8, depth: 0.035 },
  
  // Right side
  { src: timmyBag, alt: "Timmy with bag", baseX: 80, baseY: 35, size: "w-32 sm:w-44 md:w-52", rotation: 7, depth: 0.025 },
  { src: timmyYellow, alt: "Timmy yellow", baseX: 85, baseY: 60, size: "w-32 sm:w-44 md:w-52", rotation: -5, depth: 0.03 },
  
  // Bottom left
  { src: timmyChristmas, alt: "Timmy christmas", baseX: 0, baseY: 75, size: "w-36 sm:w-48 md:w-56", rotation: 8, depth: 0.02 },
  { src: timmyCake, alt: "Timmy with cake", baseX: 20, baseY: 80, size: "w-40 sm:w-52 md:w-60", rotation: -3, depth: 0.015 },
  
  // Bottom right
  { src: timmyFace, alt: "Timmy face 2", baseX: 75, baseY: 78, size: "w-36 sm:w-48 md:w-56", rotation: 6, depth: 0.025, flip: true },
  { src: timmyPig, alt: "Timmy pig 2", baseX: 55, baseY: 85, size: "w-32 sm:w-40 md:w-48", rotation: -8, depth: 0.03 },
  
  // Fill gaps - additional images
  { src: cupcake, alt: "Cupcake 2", baseX: 38, baseY: 0, size: "w-24 sm:w-32 md:w-40", rotation: -5, depth: 0.04 },
  { src: timmyTeddy, alt: "Timmy teddy 2", baseX: 92, baseY: 45, size: "w-28 sm:w-36 md:w-44", rotation: 12, depth: 0.02, flip: true },
  { src: timmyThumbs, alt: "Timmy 2", baseX: 45, baseY: 88, size: "w-28 sm:w-36 md:w-44", rotation: 4, depth: 0.035, flip: true },
];

export const BackgroundCollage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {collageImages.map((img, index) => {
        const parallaxX = mousePos.x * img.depth * 100;
        const parallaxY = mousePos.y * img.depth * 100;
        
        return (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`absolute ${img.size} object-contain drop-shadow-lg opacity-85 transition-transform duration-700 ease-out`}
            style={{
              left: `${img.baseX}%`,
              top: `${img.baseY}%`,
              transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(${img.rotation}deg)${img.flip ? " scaleX(-1)" : ""}`,
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
};
