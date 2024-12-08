"use client";

import { truncateAddress } from "@/lib/utils";
import { ethers } from "ethers";


export type Donator = {
    donator: string;
    amountDonated: BigInt;
}

const DonatorsTable = ({donators}: {donators: Donator[]}) => {
    return (
        <div className="mt-[3rem] w-full overflow-x-auto">
            <table>
                <thead className="">
                    <tr>
                        <th>Donator</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {donators.map((donator, index) => (
                        <tr key={index}>
                            <td className="text-brand text-center">{truncateAddress(donator.donator)}</td>
                            <td className="text-center">{ethers.utils.formatEther(donator.amountDonated.toString())} ETH</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonatorsTable;
