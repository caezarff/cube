import Link from "next/link";
import { cn } from "cn";
import { CubeMark } from "./cube-mark";

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "focus-visible:ring-ring/50 inline-flex w-fit items-center gap-2.5 rounded-sm transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:outline-none",
        className,
      )}
    >
      <CubeMark className={cn("text-primary size-5", markClassName)} />
      <span className="text-base font-semibold tracking-tight">Cube</span>
    </Link>
  );
}
