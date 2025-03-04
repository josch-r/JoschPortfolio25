"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import styles from "./gallery.module.css"

interface Image {
  src: string
  caption: string
  id: number
}

interface GalleryProps {
  images: Image[]
}

export default function Gallery({ images }: GalleryProps) {
  const [expandedImage, setExpandedImage] = useState<Image | null>(null)

  // Split images into two arrays for left and right columns
  const leftColumnImages = images.filter((_, i) => i % 2 === 0)
  const rightColumnImages = images.filter((_, i) => i % 2 !== 0)

  const handleImageClick = (image: Image) => {
    setExpandedImage(image)
  }

  const handleCloseExpanded = () => {
    setExpandedImage(null)
  }

  // Close expanded image when clicking outside of it
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseExpanded()
    }
  }

  // Handle escape key press to close expanded image
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseExpanded()
    }
  }

  return (
    <section className="lg:col-start-3 lg:col-span-8 mt-8">
      <div className={styles.gallery}>
        <div className={styles.column}>
          {leftColumnImages.map((img) => (
            <div key={img.id} className={styles.galleryItem} onClick={() => handleImageClick(img)}>
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
            <div key={img.id} className={styles.galleryItem} onClick={() => handleImageClick(img)}>
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.caption}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={styles.captionOverlay} />
              {/* <p className={styles.imageCaption}>{img.caption}</p> */}
            </div>
          ))}
        </div>
      </div>

      {/* Expanded image overlay */}
      {expandedImage && (
        <div
          className={styles.expandedOverlay}
          onClick={handleOverlayClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Close expanded image"
        >
          <div className={styles.expandedImageContainer}>
            <button className={styles.closeButton} onClick={handleCloseExpanded} aria-label="Close expanded image">
              <X size={24} />
            </button>
            <Image
              src={expandedImage.src || "/placeholder.svg"}
              alt={expandedImage.caption}
              width={1200}
              height={800}
              className={styles.expandedImage}
              sizes="90vw"
            />
            <p className={styles.expandedCaption}>{expandedImage.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}

