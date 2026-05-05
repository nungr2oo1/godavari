import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        // Default: clean, neutral, content-first
        default:
          "border-border bg-background/70 text-muted-foreground backdrop-blur-sm",
        solid:
          "border-transparent bg-foreground/90 text-background",
        primary:
          "border-transparent bg-primary/15 text-primary",
        accent:
          "border-transparent bg-accent/20 text-accent",
        outline: "border-border text-foreground",
        muted: "border-transparent bg-secondary text-secondary-foreground",
        // Brand scales — kept for occasional use, but desaturated
        river:
          "border-transparent bg-river-900/40 text-river-100",
        forest:
          "border-transparent bg-forest-900/40 text-forest-100",
        saffron:
          "border-transparent bg-saffron-900/40 text-saffron-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
