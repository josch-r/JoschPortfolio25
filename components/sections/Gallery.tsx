"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./gallery.module.css";

interface Image {
  src: string;
  caption: string;
  id: number;
}

interface GalleryProps {
  images: Image[];
}

export default function Gallery({ images }: GalleryProps) {
  const [expandedImage, setExpandedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const leftColumnImages = images.filter((_, i) => i % 2 === 0);
  const rightColumnImages = images.filter((_, i) => i % 2 !== 0);

  const handleImageClick = (image: Image) => {
    setIsLoading(true);
    setExpandedImage(image);
  };

  const handleCloseExpanded = () => {
    setExpandedImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseExpanded();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseExpanded();
    }
  };

  return (
    <section className="md:col-start-3 md:col-span-8 mt-8">
      <div className={styles.gallery}>
        <div className={styles.column}>
          {leftColumnImages.map((img) => (
            <div
              key={img.id}
              className={styles.galleryItem}
              onClick={() => handleImageClick(img)}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.caption}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-md"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={styles.captionOverlay} />
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {rightColumnImages.map((img) => (
            <div
              key={img.id}
              className={styles.galleryItem}
              onClick={() => handleImageClick(img)}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.caption}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={styles.captionOverlay} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            key="lightbox-overlay"
            className={styles.expandedOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Close expanded image"
          >
            <motion.div
              className={styles.expandedImageContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <button
                className={styles.closeButton}
                onClick={handleCloseExpanded}
                aria-label="Close expanded image"
              >
                <X size={24} />
              </button>
              <Image
                src={expandedImage.src || "/placeholder.svg"}
                alt={expandedImage.caption}
                width={1200}
                height={800}
                onLoadingComplete={() => setIsLoading(false)}
                className={styles.expandedImage + (isLoading ? " opacity-0" : "")}
                sizes="90vw"
              />
              <p className={styles.expandedCaption}>{expandedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
