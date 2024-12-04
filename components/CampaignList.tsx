"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import Link from "next/link";

const CampaignList = ({ campaigns }: { campaigns: any[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2rem]">
            {campaigns.map((campaign: any) => {
                const random4 = Math.floor(Math.random() * 4) + 1;
                const random3 = Math.floor(Math.random() * 3) + 1;
                const imgUrl = campaign.category === "nature" ? `/nature/${random4}.jpg` : campaign.category === "health" ? `/health/${random4}.jpg` : campaign.category === "education" ? `/edu/${random4}.jpg` : `/tech/${random3}.jpg`;
                return (
                    <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
                        <BackgroundGradient className="rounded-[22px] p-[1rem] bg-zinc-900 cursor-pointer">
                            <Image
                                src={imgUrl}
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
                            <button className={`rounded-full px-4 py-1 flex items-center space-x-1 mt-4 text-xs ${ campaign.category === "nature" ? "nature" : campaign.category === "health" ? "health" : campaign.category === "education" ? "education" : campaign.category === "tech" ? "tech" : "other" }`}>
                                <span>{campaign.category}</span>
                            </button>
                        </BackgroundGradient>
                    </Link>
                );
            })}
        </div>
    );
};

export default CampaignList;
