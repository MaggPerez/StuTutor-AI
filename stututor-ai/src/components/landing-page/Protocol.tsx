"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".stacked-card");

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Last card doesn't scale down

                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: containerRef.current,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                });

                const nextCard = cards[i + 1];

                if (nextCard) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: "blur(20px)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        }
                    });
                }
            });

            // Animations for SVG elements
            gsap.to(".geo-orbit", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "linear",
                transformOrigin: "center"
            });

            gsap.to(".geo-core", {
                rotation: -360,
                duration: 15,
                repeat: -1,
                ease: "linear",
                transformOrigin: "center"
            });

            gsap.fromTo(".laser-line",
                { y: -20, opacity: 0 },
                { y: 120, opacity: 1, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }
            );

            gsap.to(".pulse-wave", {
                strokeDashoffset: 0,
                duration: 3,
                repeat: -1,
                ease: "linear"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative w-full bg-background">

            {/* Card 1 */}
            <div className="stacked-card h-[100dvh] w-full flex items-center justify-center bg-card border-b border-border/20 sticky top-0 z-10 p-6">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6 order-2 md:order-1">
                        <span className="font-mono text-primary text-sm uppercase tracking-widest">01 // The Foundation</span>
                        <h2 className="font-sans font-bold text-4xl md:text-6xl text-foreground">Upload. Sync.</h2>
                        <p className="font-serif italic text-muted-foreground text-xl md:text-2xl mt-4">
                            Bring all your syllabi, deadines, and lecture materials into a single, structured neural space.
                        </p>
                    </div>
                    <div className="h-64 sm:h-96 w-full flex items-center justify-center order-1 md:order-2">
                        {/* Geometric Motif */}
                        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                            <circle cx="120" cy="120" r="110" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-primary/40 geo-orbit" />
                            <rect x="60" y="60" width="120" height="120" stroke="currentColor" strokeWidth="2" className="text-primary geo-core" />
                            <circle cx="120" cy="120" r="20" fill="currentColor" className="text-primary/20" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="stacked-card h-[100dvh] w-full flex items-center justify-center bg-background border-b border-border/20 sticky top-0 z-20 p-6 shadow-2xl">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6 order-2 md:order-1">
                        <span className="font-mono text-primary text-sm uppercase tracking-widest">02 // The Engine</span>
                        <h2 className="font-sans font-bold text-4xl md:text-6xl text-foreground">Analyze. Generate.</h2>
                        <p className="font-serif italic text-muted-foreground text-xl md:text-2xl mt-4">
                            Our AI dissects incoming data—instantly spinning up flashcards, study guides, and targeted quizzes.
                        </p>
                    </div>
                    <div className="h-64 sm:h-96 w-full flex items-center justify-center order-1 md:order-2 relative bg-card/50 rounded-[2rem] border border-border/50 overflow-hidden">
                        {/* Scanning Laser Line */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary to-transparent" />
                        <div className="laser-line w-full h-[2px] bg-primary absolute top-1/4 left-0 shadow-[0_0_10px_2px_rgba(224,194,255,0.8)]" />

                        <div className="grid grid-cols-5 grid-rows-5 gap-2 w-48 h-48 z-10">
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} className="bg-primary/10 rounded-sm border border-primary/20" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="stacked-card h-[100dvh] w-full flex items-center justify-center bg-card sticky top-0 z-30 p-6 shadow-2xl">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6 order-2 md:order-1">
                        <span className="font-mono text-primary text-sm uppercase tracking-widest">03 // The Output</span>
                        <h2 className="font-sans font-bold text-4xl md:text-6xl text-foreground">Adapt. Learn.</h2>
                        <p className="font-serif italic text-muted-foreground text-xl md:text-2xl mt-4">
                            Your personalized learning roadmap continuously evolves, guiding you step-by-step to mastery.
                        </p>
                    </div>
                    <div className="h-64 sm:h-96 w-full flex items-center justify-center order-1 md:order-2">
                        {/* Waveform EKG */}
                        <svg width="100%" height="160" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M 0 80 L 100 80 L 120 20 L 140 140 L 160 80 L 240 80 L 260 40 L 280 120 L 300 80 L 400 80"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary pulse-wave drop-shadow-[0_0_8px_rgba(224,194,255,0.6)]"
                                style={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

        </section>
    );
}
