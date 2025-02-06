import { cn } from "@/lib/utils"

interface BlockQuoteProps {
  quote: string;
  className?: string;
  author?: string;
}

export default function BlockQuote({ quote, author, className }: BlockQuoteProps) {
  return (
    <figure className={cn("flex flex-col px-8 py-4 rounded-sm border-l-4 border-bg-secondary", className)}>
      <blockquote className="text-quote">&ldquo;{quote}&rdquo;</blockquote>
      <p className="text-body !text-text-tertiary mt-2">{author}</p>
    </figure>
  );
}
