"use client";
import { truncateAddress } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import DateContainer from "./DateContainer";
import { ethers } from "ethers";
import { useActiveAccount } from "thirdweb/react";
import { HiExternalLink } from "react-icons/hi";

const InvoiceTable = ({
    invoices,
    owner,
}: {
    invoices: InvoiceTableType[];
    owner: string;
}) => {
    const account = useActiveAccount();
    return (
        <div className="w-full overflow-x-auto">
            <table>
                <thead className="">
                    <tr>
                        <th>Invoice ID</th>
                        <th>Receipient Address</th>
                        <th>Donator Address</th>
                        <th>Created At</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, i) => {
                        if (
                            invoice.donator_address !== account?.address ||
                            owner.length < 0 || owner === undefined || owner === null
                        )
                            return;

                        return (
                            <tr key={i}>
                                {/* invoice id */}
                                <td className="text-brand">
                                    <Link href={`/invoice/${invoice.id}`}>
                                        <div className="flex items-center gap-3">
                                            <span>
                                                {invoice.id.slice(0, 8)}...
                                            </span>
                                            <HiExternalLink className="text-brand ml-3" />
                                        </div>
                                    </Link>
                                </td>
                                {/* receipient address */}
                                <td className="text-brand">
                                    {truncateAddress(
                                        invoice.receipient_address
                                    )}
                                </td>
                                {/* donator address */}
                                <td className="text-brand">
                                    {truncateAddress(invoice.donator_address)}
                                </td>
                                {/* created at */}
                                <td className="whitespace-nowrap">
                                    {DateContainer({
                                        time: invoice.created_at,
                                    })}
                                </td>
                                {/* amount */}
                                <td className="">
                                    {ethers.utils.formatEther(invoice.amount)}{" "}
                                    ETH
                                </td>
                                {/* status */}
                                <td className="whitespace-nowrap">
                                    {invoice.status ? (
                                        <span className="bg-green-800 text-white p-2 rounded-md text-sm">
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="bg-red-500 text-white p-2 rounded-md text-sm">
                                            Not Paid
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
