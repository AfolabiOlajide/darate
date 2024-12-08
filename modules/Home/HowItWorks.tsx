"use client";
import Bottom from "@/components/Bottom";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import React from "react";

const HowItWorks = () => {
    const createContent = [
        {
            title: "Navigate",
            description: "Navigate to the create page.",
        },
        {
            title: "Choose",
            description: "CHoose either a campaign or an organization and fill in the details.",
        },
        {
            title: "Create",
            description: "Click the create button to create your campaign/organization.",
        },
    ];
    const donateContent = [
        {
            title: "Navigate",
            description: "Navigate to the campaign/organization page.",
        },
        {
            title: "Choose",
            description: "Choose from the list whichever resonates with your values.",
        },
        {
            title: "Generate",
            description: "Generate an invoice which you can pay immediately or later.",
        },
        {
            title: "Pay",
            description: "Pay the invoice to complete the donation process.",
        },
    ];

    return (
        <section className="mt-[2rem] cont">
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">
                    How it works
                </h4>

                <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-300 text-center font-normal dark:text-neutral-300">
                    Create a campaign in 3 easy steps, donate in 4 easy steps.
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
