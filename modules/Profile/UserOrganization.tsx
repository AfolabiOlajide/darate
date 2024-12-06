"use client";
import SingleOrganization from "@/app/organizations/[id]/page";
import SingleOrganizationCard from "@/components/SingleOrganizationCard";
import SkelentonLoadingList from "@/components/SkelentonLoadingList";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import useContract from "@/hooks/useContract";
import React from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const UserOrganization = () => {
    const account = useActiveAccount();
    const { contract } = useContract({
        address: process.env.NEXT_PUBLIC_DARATE_CONTRACT_ADDRESS as string
    })
    const { data, isPending } = useReadContract({
        contract,
        method: "function userOrganization(address) view returns (address)",
        params: [account?.address as string],
    });

    return (
        <div>
            {!account && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-brand text-2xl font-bold">
                        Please connect your wallet
                    </p>
                </div>
            )}
            {account && data === "0x0000000000000000000000000000000000000000" && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-brand text-2xl font-bold">
                        You have no organization
                    </p>
                </div>
            )}
            {
                account && isPending && <SkelentonLoadingList length={1} />
            }
            {
                data && data !== "0x0000000000000000000000000000000000000000" && data.length > 0 && (<SingleOrganizationCard address={data} />)
            }
        </div>
    );
};

export default UserOrganization;
