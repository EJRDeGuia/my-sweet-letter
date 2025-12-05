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
  // Top row
  { src: timmyFace, alt: "Timmy face", className: "absolute top-[2%] left-[5%] w-28 sm:w-40 md:w-48", style: { transform: "rotate(-8deg)", zIndex: 15 } },
  { src: happyBirthday, alt: "Happy Birthday", className: "absolute top-[3%] left-[30%] w-36 sm:w-48 md:w-56", style: { transform: "rotate(3deg)", zIndex: 20 } },
  { src: timmyPig, alt: "Timmy and pig", className: "absolute top-[5%] right-[5%] w-28 sm:w-36 md:w-44", style: { transform: "rotate(10deg)", zIndex: 18 } },
  
  // Upper middle row
  { src: timmyTeddy, alt: "Timmy with teddy", className: "absolute top-[20%] left-[2%] w-32 sm:w-40 md:w-48", style: { transform: "rotate(5deg)", zIndex: 12 } },
  { src: cupcake, alt: "Cupcake", className: "absolute top-[18%] right-[8%] w-24 sm:w-32 md:w-40", style: { transform: "rotate(-6deg)", zIndex: 14 } },
  
  // Middle row - sides only (envelope area in center)
  { src: timmyThumbs, alt: "Timmy", className: "absolute top-[40%] left-[3%] w-28 sm:w-36 md:w-44", style: { transform: "rotate(-4deg)", zIndex: 16 } },
  { src: timmyBag, alt: "Timmy with bag", className: "absolute top-[45%] right-[3%] w-28 sm:w-36 md:w-44", style: { transform: "rotate(7deg)", zIndex: 13 } },
  
  // Lower middle row
  { src: timmyChristmas, alt: "Timmy christmas", className: "absolute bottom-[22%] left-[8%] w-28 sm:w-36 md:w-44", style: { transform: "rotate(8deg)", zIndex: 11 } },
  { src: timmyYellow, alt: "Timmy yellow", className: "absolute bottom-[25%] right-[5%] w-28 sm:w-36 md:w-44", style: { transform: "rotate(-5deg)", zIndex: 17 } },
  
  // Bottom row
  { src: timmyCake, alt: "Timmy with cake", className: "absolute bottom-[2%] left-[15%] w-32 sm:w-44 md:w-52", style: { transform: "rotate(-3deg)", zIndex: 19 } },
  { src: timmyFace, alt: "Timmy face 2", className: "absolute bottom-[5%] right-[15%] w-28 sm:w-36 md:w-44", style: { transform: "rotate(6deg) scaleX(-1)", zIndex: 10 } },
];

export const BackgroundCollage = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {collageImages.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          className={`${img.className} object-contain drop-shadow-lg opacity-90`}
          style={img.style}
          draggable={false}
        />
      ))}
    </div>
  );
};
