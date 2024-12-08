"use client";
import Bottom from "@/components/Bottom";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { desc } from "framer-motion/client";
import React from "react";

const HowItWorks = () => {
    const createContent = [
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
    ];
    const donateContent = [
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
        {
            title: "Title",
            description: "Enter a title for your campaign/organization",
        },
    ];

    return (
        <section className="mt-[2rem] cont">
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">
                    How it works
                </h4>

                <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-300 text-center font-normal dark:text-neutral-300">
                    From creating campaings/organizations in 3 easy steps to
                    donating to campaigns/organizations in 4 easy steps
                </p>
            </div>
            <div className="mt-[3rem] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="create">
                    <BackgroundGradient className="rounded-[22px] p-[1rem] py-[2rem] bg-zinc-900 text-neutral-300 break-all">
                        <h3 className="text-center text-bold text-brand mb-[1.3rem] text-[3rem]">Create</h3>
                        <div className="divide-y-1 divide-neutral-800">
                            {createContent.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-[1.5rem] py-[1.3rem]"
                                >
                                    <div className="number font-bold text-brand text-[3rem]">
                                        {index + 1}
                                    </div>
                                    <div className="content">
                                        <h4 className="text-2xl font-semibold text-brand">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-neutral-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BackgroundGradient>
                </div>
                <div className="donate">
                    <BackgroundGradient className="rounded-[22px] p-[1rem] py-[2rem] bg-zinc-900 text-neutral-300 break-all">
                        <h3 className="text-center text-bold text-brand mb-[1.3rem] text-[3rem]">Donate</h3>
                        <div className=" divide-y-1 divide-neutral-800">
                            {donateContent.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-[1.5rem] py-[1.3rem]"
                                >
                                    <div className="number font-bold text-brand text-[3rem]">
                                        {index + 1}
                                    </div>
                                    <div className="content">
                                        <h4 className="text-2xl font-semibold text-brand">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-neutral-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BackgroundGradient>
                </div>
            </div>
            <Bottom />
        </section>
    );
};

export default HowItWorks;
