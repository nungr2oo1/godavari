import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <div className="aspect-[4/3] w-full bg-secondary animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-secondary animate-pulse rounded-full" />
        <div className="h-5 w-2/3 bg-secondary animate-pulse rounded-full" />
        <div className="h-3 w-full bg-secondary animate-pulse rounded-full" />
        <div className="h-3 w-5/6 bg-secondary animate-pulse rounded-full" />
      </div>
    </Card>
  );
}
