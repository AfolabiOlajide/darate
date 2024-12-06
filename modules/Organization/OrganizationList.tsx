"use client";

import SkelentonLoadingList from "@/components/SkelentonLoadingList";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import useContract from "@/hooks/useContract";
import { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";

type OrganizationProp = {
    id: string;
    title: string;
    owner: string;
    link: string;
}

const OrganizationList = () => {
    const [organizations, setOrganizations] = useState<OrganizationProp[]>([]);
    const { contract } = useContract({
        address: process.env.NEXT_PUBLIC_DARATE_CONTRACT_ADDRESS as string,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function getAllOrganizations() view returns ((address organizationAddress, address owner, string name, uint256 creationTime)[])",
        params: [],
    });

    useEffect(() => {
        if(!isPending && data) {
            const formattedData = data.map((organization: any) => ({
                id: organization.organizationAddress,
                title: organization.name,
                owner: organization.owner,
                link: "/organizations/" + organization.organizationAddress

            }))
            setOrganizations(formattedData);
        }
    }, [data, isPending]);

    return (
        <div className="mt-[3rem]">
            {
                isPending && <SkelentonLoadingList withImage />
            }
            {
                data && data?.length > 0 && (<HoverEffect items={organizations} />)
            }
            {
                !isPending && data && data?.length === 0 && <div className="flex items-center justify-center h-[50vh]">
                <p className="text-brand text-2xl font-bold">
                    No Organizations Created
                </p>
            </div>
            }
        </div>
    );
};

export default OrganizationList;
