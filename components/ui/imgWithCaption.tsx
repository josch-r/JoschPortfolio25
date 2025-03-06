import Image from "next/image";

interface ImageWithCaptionProps {
  src: string;
  caption: string;
  classprops: string;
}

export default function ImageWithCaption({
  src,
  caption,
  classprops,
}: ImageWithCaptionProps) {
  return (
    <div className={classprops}>
      <Image
        src={src}
        alt={caption}
        width={2048} // Intrinsic width 2048 × 1536
        height={1536} // Intrinsic height (change as needed)
        sizes="100%"
        className="w-full h-auto rounded-md object-contain"
      />
      <p className="text-caption !text-text-tertiary mt-2 col-span-4 col-start-7 ms-2" aria-hidden="true">
        {caption}
      </p>
    </div>
  );
}
