"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import React from "react";

const Hero = () => {
    const words = [
        "causes",
        "communities",
        "dreams",
        "lives",
        "organizations",
        "projects",
    ];
    return (
        <section className="h-[50vh] lg:h-[80vh] w-full flex flex-col items-center justify-center antialiased relative ">
            <div className="hero cont flex flex-col gap-[1rem] md:gap-[2rem] items-center justify-center">
                <div className="text-[2rem] md:text-6xl text-center mx-auto font-normal text-neutral-200">
                    Empower <FlipWords words={words} /> <br />
                    with every donation
                </div>
                <p className="text-base md:text-2xl text-neutral-200">
                    The art of giving at your finger tips
                </p>
                <Link href={`/campaigns`}>
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="bg-black text-white flex items-center space-x-2"
                    >
                        <span className="text-base md:text-2xl md:px-2">Donate Now</span>
                    </HoverBorderGradient>
                </Link>
            </div>
            <BackgroundBeams />
        </section>
    );
};

export default Hero;
