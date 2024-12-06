"use client";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

const UserCampaigns = () => {
    const account = useActiveAccount();

    return (
        <div>
            {!account && (
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-brand text-2xl font-bold">
                        Please connect your wallet
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserCampaigns;
