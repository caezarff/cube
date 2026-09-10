"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { AsciiCube } from "./ascii-cube";
import { Wordmark } from "./wordmark";
import { DitherField } from "./dither-field";
import { DitherImage } from "./dither-image";
import { SocialLinks } from "./social-links";

const CUBE = 520;

const STEP = {
  cube: 150,
  handLeft: 250,
  handRight: 330,
} as const;

function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const aim = (px: number, py: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--px", px.toFixed(3));
        node.style.setProperty("--py", py.toFixed(3));
      });
    };
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      aim(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
      );
    };
    const leave = () => aim(0, 0);

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return ref;
}

export function Hero() {
  const heroRef = useHeroParallax();

  return (
    <main data-landing>
      <div className="grid h-svh grid-rows-[minmax(0,1fr)_auto]">
        <section
          ref={heroRef}
          className="bg-primary relative overflow-hidden text-white"
        >
          <DitherField className="absolute inset-0 size-full" />

          <div
            data-brand-diagram
            className="flex h-full items-center justify-center"
          >
            <div className="hero-parallax-cube">
              <svg viewBox={`0 0 ${CUBE} ${CUBE}`} className="hero-cube">
                <AsciiCube size={CUBE} revealFrom={STEP.cube} />
              </svg>
            </div>
          </div>

          <div className="hero-hand hero-parallax-hand pointer-events-none absolute top-1/2 -left-6 hidden select-none sm:block">
            <div className="-translate-y-[62%]">
              <DitherImage
                src="/hand-left.png"
                cell={5}
                revealFrom={STEP.handLeft}
                sweep="ltr"
                className="block w-full"
              />
            </div>
          </div>
          <div className="hero-hand hero-parallax-hand pointer-events-none absolute top-1/2 -right-6 hidden select-none sm:block">
            <div className="-translate-y-[42%]">
              <DitherImage
                src="/hand-right.png"
                cell={5}
                revealFrom={STEP.handRight}
                sweep="rtl"
                className="block w-full"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-8 sm:px-10 lg:px-14">
            <Wordmark
              className="focus-visible:ring-white/40"
              markClassName="text-white"
            />
            <SocialLinks
              className="text-white"
              linkClassName="focus-visible:ring-white/40"
            />
          </div>
        </section>

        <section className="flex flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-14 lg:py-14">
          <h1 className="text-4xl font-medium tracking-tighter sm:text-5xl lg:text-6xl">
            Run AI workloads
            <br />
            at any scale.
          </h1>

          <div className="flex flex-col gap-6 lg:max-w-sm">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Serverless GPUs, sub-second cold starts, and instant autoscaling.
              From inference to training no infrastructure to manage.
            </p>
            <div className="flex gap-3">
              <Button render={<Link href="/sign-up" />} className="h-9 px-6">
                Get started
                <ArrowRight className="transition-transform duration-200 ease-out motion-safe:group-hover/button:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/sign-in" />}
                className="h-9 px-6"
              >
                Contact us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
