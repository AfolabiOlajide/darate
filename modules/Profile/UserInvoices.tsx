"use client";
import DateContainer from "@/components/DateContainer";
import useFetchInvoice from "@/hooks/useFetchInvoice";
import { truncateAddress } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";
import SkelentonText from "@/components/SkelentonText";
import { HiExternalLink } from "react-icons/hi";

const UserInvoices = () => {
    const account = useActiveAccount();
    const { fetchUsersInvoice } = useFetchInvoice();
    const [invoices, setInvoices] = useState<InvoiceTableType[]>([]);
    const [invoiceLoading, setInvoiceLoading] = useState(false);

    useEffect(() => {
        async function fetchInvoice() {
            if (!account) {
                return;
            } else {
                setInvoiceLoading(true);
                const invoices = await fetchUsersInvoice(account?.address);
                setInvoices(invoices as InvoiceTableType[]);
                setInvoiceLoading(false);
            }
        }

        fetchInvoice();
    }, [account]);

    return (
        <div className="">
            <div className="relative overflow-x-auto w-full">
                {account && !invoiceLoading && (
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
                            {invoices.map((invoice, i) => (
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
                                        {truncateAddress(
                                            invoice.donator_address
                                        )}
                                    </td>
                                    {/* created at */}
                                    <td className="whitespace-nowrap">
                                        {DateContainer({
                                            time: invoice.created_at,
                                        })}
                                    </td>
                                    {/* amount */}
                                    <td className="">
                                        {ethers.utils.formatEther(
                                            invoice.amount
                                        )}{" "}
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
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {account && invoiceLoading && <SkelentonText height={10} />}
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

export default UserInvoices;
