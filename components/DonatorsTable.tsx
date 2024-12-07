"use client";

import { truncateAddress } from "@/lib/utils";

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
                            <td className="text-brand">{truncateAddress(donator.donator)}</td>
                            <td>{donator.amountDonated.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonatorsTable;
