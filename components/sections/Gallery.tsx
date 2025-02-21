import Image from "next/image";
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
  // Split images into two arrays for left and right columns
  const leftColumnImages = images.filter((_, i) => i % 2 === 0);
  const rightColumnImages = images.filter((_, i) => i % 2 !== 0);

  return (
    <section className="col-start-3 col-span-8 mt-8">
      <div className={styles.gallery}>
        <div className={styles.column}>
          {leftColumnImages.map((img) => (
            <div key={img.id} className={styles.galleryItem}>
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.caption}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-md"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={styles.captionOverlay} />
              <p className={styles.imageCaption}>{img.caption}</p>
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {rightColumnImages.map((img) => (
            <div key={img.id} className={styles.galleryItem}>
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.caption}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className={styles.captionOverlay} />
              <p className={styles.imageCaption}>{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
