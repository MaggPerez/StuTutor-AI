"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Text Reveal
            const animateText = (element: Element | null, delay: number = 0) => {
                if (!element) return;

                // Simple word-split simulation
                const words = element.querySelectorAll(".word");
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power3.out",
                    delay,
                });
            };

            animateText(textRef1.current, 0);
            animateText(textRef2.current, 0.4);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const splitText = (text: string) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em] whitespace-pre">
                {word}
            </span>
        ));
    };

    return (
        <section
            id="philosophy"
            ref={containerRef}
            className="relative w-full py-40 overflow-hidden bg-background-void border-y border-border/20"
        >
            {/* Background Texture */}
            <img
                ref={bgRef}
                src="https://images.unsplash.com/photo-1518420042450-48e02ea5ed2c?q=80&w=2938&auto=format&fit=crop"
                alt="Microscopy texture"
                className="absolute inset-0 w-full h-[120%] object-cover opacity-[0.03] mix-blend-screen -z-10 -top-[10%]"
            />

            <div className="max-w-5xl mx-auto px-6 md:px-16 flex flex-col gap-12 sm:gap-16">
                <div ref={textRef1} className="max-w-xl">
                    <p className="font-sans text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                        {splitText("Most academic platforms focus on: ")}
                        <span className="text-foreground word font-medium">fragmented tools and static studying.</span>
                    </p>
                </div>

                <div ref={textRef2} className="max-w-4xl self-end text-right">
                    <h2 className="text-drama text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.1]">
                        {splitText("We focus on: ")}
                        <br />
                        <span className="text-primary word">continuous synthesis.</span>
                    </h2>
                </div>
            </div>
        </section>
    );
}
