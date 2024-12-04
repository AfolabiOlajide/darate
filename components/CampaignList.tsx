"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import Link from "next/link";

const CampaignList = ({ campaigns }: { campaigns: any[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2rem]">
            {campaigns.map((campaign: any) => {
                return (
                    <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
                        <BackgroundGradient className="rounded-[22px] p-[1rem] bg-zinc-900 cursor-pointer">
                            <Image
                                src={`/nature/1.jpg`}
                                alt="nature"
                                height="400"
                                width="400"
                                className="object-contain rounded-t-3xl"
                            />
                            <p className="text-base font-bold sm:text-xl mt-4 mb-2 text-neutral-00">
                                {campaign.title}
                            </p>

                            <p className="text-sm text-neutral-400">
                                {campaign.description}
                            </p>
                            <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 mt-4 text-xs font-bold bg-zinc-800">
                                <span>Buy now </span>
                                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                    $100
                                </span>
                            </button>
                        </BackgroundGradient>
                    </Link>
                );
            })}
        </div>
    );
};

export default CampaignList;
