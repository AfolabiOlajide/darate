"use client";
import useFetchInvoice from "@/hooks/useFetchInvoice";
import React, { useEffect } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import DateContainer from "./DateContainer";
import { ethers } from "ethers";

const InvoiceContainer = ({ id }: { id: string }) => {
    const { fetchInvoiceById } = useFetchInvoice();
    const [invoice, setInvoice] = React.useState<InvoiceDetailType | null>(
        null
    );

    useEffect(() => {
        async function handleFetchInvoiceById() {
            const invoice = await fetchInvoiceById(id);
            setInvoice(invoice as InvoiceDetailType);
        }
        handleFetchInvoiceById();
    }, [id]);

    return (
        <div className="mt-[3rem]">
            <BackgroundGradient className="rounded-[22px] p-[1rem] py-[2rem] bg-zinc-900 text-neutral-300 break-all">
                <div className="">
                    <div className="status">
                        {invoice?.status ? (
                            <span className="bg-green-800 text-white p-2 rounded-md text-sm">
                                Paid
                            </span>
                        ) : (
                            <span className="bg-red-500 text-white p-2 rounded-md text-sm">
                                Not Paid
                            </span>
                        )}
                    </div>
                    <h2 className="mt-[2rem] flex items-start gap-4">
                        <span className="whitespace-nowrap">Invoice #:</span>{" "}
                        <span className="break-words">{id}</span>
                    </h2>
                    <div className="mt-[2rem] flex items-start gap-4">
                        <span className="whitespace-nowrap">Title:</span>{" "}
                        {invoice?.title ? (
                            <span>{invoice?.title}</span>
                        ) : (
                            <TextSkelenton />
                        )}
                    </div>
                    <div className="mt-[2rem] flex items-start gap-4">
                        <span className="whitespace-nowrap">Amount:</span>
                        {invoice?.amount ? (
                            <span>
                                {ethers.utils.formatEther(invoice?.amount)} eth
                            </span>
                        ) : (
                            <TextSkelenton />
                        )}
                    </div>
                    <div className="mt-[2rem] flex items-start gap-4">
                        <span className="whitespace-nowrap">Receipient:</span>{" "}
                        <span className="text-brand break-words">
                            {invoice?.receipient_address || <TextSkelenton />}
                        </span>
                    </div>
                    <div className="mt-[2rem] flex items-start gap-4">
                        <span className="whitespace-nowrap">Donator:</span>{" "}
                        <span className="text-brand break-words">
                            {invoice?.donator_address || <TextSkelenton />}
                        </span>
                    </div>
                    <div className="mt-[2rem] flex items-start gap-4">
                        <span className="whitespace-nowrap">Created:</span>{" "}
                        {invoice?.created_at ? (
                            <DateContainer time={invoice.created_at} />
                        ) : (
                            <TextSkelenton />
                        )}
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    );
};

export default InvoiceContainer;

export const TextSkelenton = () => {
    return (
        <div className="w-[10rem] h-[1rem] bg-zinc-800 animate-pulse ml-3 rounded-md"></div>
    );
};

// /invoice/01a9413e5698af1a45340e98c2150541c0fa9f9baed693e5a61fd938281ea939be
