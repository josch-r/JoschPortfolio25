import { cn } from "@/lib/utils";

interface BlockQuoteProps {
  quote: string;
  className?: string;
  direct?: boolean;
  author?: string;
}

export default function BlockQuote({
  quote,
  author,
  className,
  direct = true,
}: BlockQuoteProps) {
  return (
    <figure
      className={cn(
        "flex flex-col px-8 py-4 border-l-4 border-bg-secondary",
        className
      )}
    >
      <blockquote className="text-quote">
        {direct ? `&ldquo;${quote}&rdquo;` : `${quote}`}
      </blockquote>
      <p className="text-body !text-text-tertiary mt-2">{author}</p>
    </figure>
  );
}
