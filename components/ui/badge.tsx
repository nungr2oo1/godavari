import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        accent: "border-transparent bg-accent/15 text-accent",
        outline: "text-foreground",
        muted: "border-transparent bg-secondary text-secondary-foreground",
        river: "border-transparent bg-river-100 text-river-800 dark:bg-river-900/40 dark:text-river-200",
        forest: "border-transparent bg-forest-100 text-forest-800 dark:bg-forest-900/40 dark:text-forest-200",
        saffron: "border-transparent bg-saffron-100 text-saffron-800 dark:bg-saffron-900/40 dark:text-saffron-200",
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
