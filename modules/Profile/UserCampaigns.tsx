"use client";
import SkelentonLoadingList from "@/components/SkelentonLoadingList";
import useContract from "@/hooks/useContract";
import React from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const UserCampaigns = () => {
    const account = useActiveAccount();
    const { contract } = useContract({
        address: process.env.NEXT_PUBLIC_DARATE_CONTRACT_ADDRESS as string,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function getUserCampaigns() view returns ((address campaignAddress, address owner, string title, uint256 creationTime)[])",
        params: [],
    });

    console.log(data)

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
            {
                account && isPending && <SkelentonLoadingList withImage />
            }
        </div>
    );
};

export default UserCampaigns;
