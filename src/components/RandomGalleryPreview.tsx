"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import galleryData from "@/data/gallery.json";

export default function RandomGalleryPreview() {
  const [images, setImages] = useState<typeof galleryData>(galleryData.slice(0, 4));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const shuffled = [...galleryData].sort(() => 0.5 - Math.random());
    setImages(shuffled.slice(0, 4));
    setMounted(true);
  }, []);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {images.map((item, index) => (
        <div key={index} className={`relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden bg-[#111] border border-white/5 group ${index % 2 === 0 ? 'md:translate-y-8' : ''}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            quality={95}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          />
        </div>
      ))}
    </div>
  );
}
