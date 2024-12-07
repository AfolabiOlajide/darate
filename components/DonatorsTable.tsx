"use client";

export type Donator = {
    donator: string;
    amountDonated: BigInt;
}

const DonatorsTable = ({donators}: {donators: Donator[]}) => {
    return (
        <div>
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
                            <td className="text-brand">{donator.donator}</td>
                            <td>{donator.amountDonated.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonatorsTable;
