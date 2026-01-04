import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ImageShowcaseProps {
  images: {
    src: string;
    alt: string;
    title?: string;
  }[];
  className?: string;
}

const ImageShowcase = ({ images, className = '' }: ImageShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className={`relative py-32 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => {
            const startOffset = index * 0.1;
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [100 + index * 50, -100 - index * 30]
            );
            const rotate = useTransform(
              scrollYProgress,
              [0, 1],
              [5 - index * 2, -5 + index * 2]
            );
            const scale = useTransform(
              scrollYProgress,
              [0.2 + startOffset, 0.5 + startOffset],
              [0.8, 1]
            );

            return (
              <motion.div
                key={index}
                style={{ y, rotate, scale }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {image.title && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="font-display text-2xl font-bold text-foreground"
                      >
                        {image.title}
                      </motion.h3>
                    </div>
                  )}

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 border-2 border-primary/50 rounded-2xl" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageShowcase;
