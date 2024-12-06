"use client";

import SkelentonText from "@/components/SkelentonText";
import useContract from "@/hooks/useContract";
import { useReadContract } from "thirdweb/react";

const SingleOrganizationContainer = ({ address }: { address: string }) => {
    const { contract } = useContract({
        address: address,
    });

    const { data: name, isPending: nameIsPending } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
    });

    const { data: description, isPending: descriptionIsPending } =
        useReadContract({
            contract,
            method: "function description() view returns (string)",
            params: [],
        });

    const { data: donators, isPending: donatorsIsPending } = useReadContract({
        contract,
        method: "function getDonators() view returns ((address donator, uint256 amountDonated)[])",
        params: [],
    });

    return (
        <div className="mt-[2rem]">
            <h2 className="font-bold text-[3rem]">
                {!nameIsPending && name}{" "}
                {nameIsPending && <SkelentonText height={3} />}
            </h2>
            <p className="mt-[2rem]">
                {!descriptionIsPending && description}{" "}
                {descriptionIsPending && <SkelentonText height={7} />}
            </p>
        </div>
    );
};

export default SingleOrganizationContainer;
