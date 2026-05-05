import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className
      )}
    >
      <div className={cn("space-y-3 max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
            <span className="h-px w-6 bg-current opacity-40" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-[28px] md:text-4xl lg:text-[44px] font-medium leading-[1.1] text-balance">
          {title}
        </h2>
        {description && (
          <p className="text-[15px] md:text-base text-muted-foreground text-pretty leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors shrink-0"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
