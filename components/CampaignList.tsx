"use client";
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import Link from "next/link";
import useContract from "@/hooks/useContract";
import { useReadContract } from "thirdweb/react";
import SkelentonLoadingList from "./SkelentonLoadingList";
import { address } from "framer-motion/client";
import SkelentonText from "./SkelentonText";

type CampaignProp = {
    id: string;
    title: string;
    owner: string;
    link: string;
};

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState<CampaignProp[]>([]);
    const { contract } = useContract({
        address: process.env.NEXT_PUBLIC_DARATE_CONTRACT_ADDRESS as string,
    });

    const { data, isPending } = useReadContract({
        contract,
        method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string title, uint256 creationTime)[])",
        params: [],
    });

    useEffect(() => {
        if (!isPending && data) {
            const formattedData = data.map((campaign: any) => ({
                id: campaign.campaignAddress,
                title: campaign.title,
                owner: campaign.owner,
                link: "/campaigns/" + campaign.campaignAddress,
            }));
            setCampaigns(formattedData);
        }
    }, [data, isPending]);

    return (
        <div className="">
            {isPending && <SkelentonLoadingList withImage />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2rem]">
                {!isPending &&
                    campaigns &&
                    campaigns.length > 0 &&
                    campaigns.map((campaign: CampaignProp) => {
                        return (
                            <Link href={campaign.link} key={campaign.id}>
                                <BackgroundGradient className="rounded-[22px] p-[1rem] bg-zinc-900 cursor-pointer">
                                    <CampaignImage address={campaign.id} />
                                    <p className="text-base font-bold sm:text-xl mt-4 mb-2 text-neutral-00">
                                        {campaign.title}
                                    </p>
                                    <CampaignDescription
                                        address={campaign.id}
                                    />
                                    <CampaignCategory address={campaign.id} />
                                </BackgroundGradient>
                            </Link>
                        );
                    })}
            </div>
            {!isPending && data && data?.length === 0 && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-brand text-2xl font-bold">
                        No Campaigns Created, create one now
                    </p>
                </div>
            )}
        </div>
    );
};

export default CampaignList;

export const CampaignImage = ({ address }: { address: string }) => {
    const { contract } = useContract({
        address: address,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function category() view returns (string)",
        params: [],
    });

    const random4 = Math.floor(Math.random() * 4) + 1;
    const random3 = Math.floor(Math.random() * 3) + 1;
    const imgUrl =
        data &&
        `/${data.toLowerCase()}/${
            data.toLowerCase() === "tech" ? random3 : random4
        }.jpg`;
    return (
        <div className="">
            {!isPending && data && (
                <Image
                    src={imgUrl as string}
                    alt="nature"
                    height="400"
                    width="400"
                    className="object-contain rounded-t-3xl"
                />
            )}
            {isPending && (
                <div className="flex flex-1 w-full min-h-[8rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 animate-pulse"></div>
            )}
        </div>
    );
};

export const CampaignDescription = ({ address }: { address: string }) => {
    const { contract } = useContract({
        address: address,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });
    return (
        <div className="">
            {!isPending && data && (
                <p className="text-sm text-neutral-400">{data}</p>
            )}
            {isPending && <SkelentonText height={2} />}
        </div>
    );
};

export const CampaignCategory = ({ address }: { address: string }) => {
    const { contract } = useContract({
        address: address,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function category() view returns (string)",
        params: [],
    });
    return (
        <div className="">
            {!isPending && data && (
                <button
                    className={`rounded-full px-4 py-1 flex items-center space-x-1 mt-4 text-xs ${
                        data.toLowerCase() === "nature"
                            ? "nature"
                            : data.toLowerCase() === "health"
                            ? "health"
                            : data.toLowerCase() === "education"
                            ? "education"
                            : data.toLowerCase() === "tech"
                            ? "tech"
                            : "other"
                    }`}
                >
                    <span>{data.toLowerCase()}</span>
                </button>
            )}
            {isPending && <SkelentonText height={1} />}
        </div>
    );
};
