'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Image from 'next/image';
import { RevealText } from '@/components/animations/RevealText';

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR PHOTOS HERE
// Drop image files into /public/images/gallery/ then add entries below.
// Each entry: { src, alt, span } where span controls grid size:
//   'tall'  → 2 rows tall   (portrait)
//   'wide'  → 2 cols wide   (landscape)
//   'normal'→ 1×1           (square)
// ─────────────────────────────────────────────────────────────────────────────
const PHOTOS: { src: string; alt: string; span?: 'tall' | 'wide' | 'normal' }[] = [
  // ← Drop your photos into /public/images/gallery/ and add them here, e.g.:
  // { src: '/images/gallery/photo-1.jpg', alt: 'Caption here', span: 'tall'   },
  // { src: '/images/gallery/photo-2.jpg', alt: 'Caption here', span: 'normal' },
  // { src: '/images/gallery/photo-3.jpg', alt: 'Caption here', span: 'wide'   },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: typeof PHOTOS;
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent(p => (p - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent(p => (p + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <motion.div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16"
        onClick={e => e.stopPropagation()}
        style={{ aspectRatio: '16/10' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={photos[current].src}
              alt={photos[current].alt}
              fill
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xs tracking-wider">
        {current + 1} / {photos.length}
      </p>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Grid span classes
  const spanClass = (span?: string) => {
    if (span === 'tall')  return 'row-span-2';
    if (span === 'wide')  return 'col-span-2';
    return '';
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-main">
        {/* Header */}
        <div className="mb-16">
          <RevealText delay={0}>
            <p className="tag-mono mb-3">Creator</p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="section-title mb-4">Through my lens</h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="section-subtitle">
              Beyond the code — moments I&apos;ve captured and created.
            </p>
          </RevealText>
        </div>

        {/* Grid */}
        {PHOTOS.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 auto-rows-[280px] gap-3"
          >
            {PHOTOS.map((photo, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setLightboxIndex(i)}
                className={`relative rounded-2xl overflow-hidden bg-neutral-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${spanClass(photo.span)}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-dashed border-neutral-200 p-16 text-center"
          >
            <Camera className="w-10 h-10 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-400 font-medium mb-1">Gallery coming soon</p>
            <p className="text-neutral-300 text-sm">
              Drop photos into <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">/public/images/gallery/</code> and add them to the PHOTOS array in Gallery.tsx
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={PHOTOS}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
