"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import galleryData from "@/data/gallery.json";

export default function Gallery() {
  const thirdIndex = Math.ceil(galleryData.length / 3);
  const baseRow1 = galleryData.slice(0, thirdIndex);
  const baseRow2 = galleryData.slice(thirdIndex, thirdIndex * 2);
  const baseRow3 = galleryData.slice(thirdIndex * 2);

  const row1 = [...baseRow1, ...baseRow1, ...baseRow1, ...baseRow1];
  const row2 = [...baseRow2, ...baseRow2, ...baseRow2, ...baseRow2];
  const row3 = [...baseRow3, ...baseRow3, ...baseRow3, ...baseRow3];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [emblaRef1] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false })
  ]);

  const [emblaRef2] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.5, direction: 'backward', stopOnInteraction: false })
  ]);

  const [emblaRef3] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 1.2, stopOnInteraction: false })
  ]);

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-10 overflow-hidden flex flex-col justify-center pt-32 md:pt-40">
      <div className="relative z-20 max-w-4xl px-6 md:px-24 mb-16 pointer-events-none">
        <p className="text-zinc-500 font-bold tracking-widest text-xs mb-3 uppercase">
          4Fun Clan / GALLERY
        </p>
        <h1 className="text-white font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter mb-4 md:mb-6 leading-none uppercase">
          GALLERY<span className="text-primary">.</span>
        </h1>
        <p className="text-zinc-400 font-medium text-base md:text-xl leading-relaxed max-w-lg border-l-2 border-primary pl-4 pointer-events-auto">
          All our best moments in one place. Just good times, laughs, and chilling with the family.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-10 w-full cursor-grab active:cursor-grabbing">
        <div className="overflow-hidden" ref={emblaRef1}>
          <div className="flex touch-pan-y">
            {row1.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item.image)}
                className="relative flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] mx-3 md:mx-4 rounded-xl overflow-hidden bg-[#111] border border-white/5 group cursor-pointer hover:border-white/20 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 45vw, (max-width: 1024px) 35vw, 25vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-black text-xl uppercase tracking-tighter drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef2}>
          <div className="flex touch-pan-y">
            {row2.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item.image)}
                className="relative flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] mx-3 md:mx-4 rounded-xl overflow-hidden bg-[#111] border border-white/5 group cursor-pointer hover:border-white/20 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-black text-xl uppercase tracking-tighter drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef3}>
          <div className="flex touch-pan-y">
            {row3.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(item.image)}
                className="relative flex-none w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[4/3] mx-3 md:mx-4 rounded-xl overflow-hidden bg-[#111] border border-white/5 group cursor-pointer hover:border-white/20 transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-black text-xl uppercase tracking-tighter drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[90vw] md:max-w-6xl h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt="Selected Moment"
                fill
                unoptimized
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
