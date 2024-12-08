"use client";
import { CampaignCategory, CampaignDescription, CampaignImage } from "@/components/CampaignList";
import SkelentonLoadingList from "@/components/SkelentonLoadingList";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import useContract from "@/hooks/useContract";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

type CampaignProp = {
    id: string;
    title: string;
    owner: string;
    link: string;
};

const UserCampaigns = () => {
    const account = useActiveAccount();
    const [campaigns, setCampaigns] = useState<CampaignProp[]>([]);
    const { contract } = useContract({
        address: process.env.NEXT_PUBLIC_DARATE_CONTRACT_ADDRESS as string,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string title, uint256 creationTime)[])",
        params: [account?.address as string],
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
        <div>
            {!account && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-brand text-2xl font-bold">
                        Please connect your wallet
                    </p>
                </div>
            )}
            {account && !isPending && data?.length === 0 && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-brand text-2xl font-bold">
                        You have no Campaigns
                    </p>
                </div>
            )}
            {account && isPending && <SkelentonLoadingList withImage />}
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
        </div>
    );
};

export default UserCampaigns;
