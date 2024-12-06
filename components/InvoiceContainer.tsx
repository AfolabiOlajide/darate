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
        <div className="mt-[2rem]">
            <BackgroundGradient className="rounded-[22px] p-[1rem] py-[2rem] bg-zinc-900 text-neutral-300 cursor-pointer">
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
                    <h2 className="mt-[2rem]">Invoice #: <span className="break-words">{id}</span></h2>
                    <div className="mt-[2rem]">Title: {invoice?.title}</div>
                    <div className="mt-[2rem]">
                        Amount:{" "}
                        {invoice?.amount &&
                            ethers.utils.formatEther(invoice?.amount)}{" "}
                        eth
                    </div>
                    <div className="mt-[2rem]">
                        Receipient: <span className="text-brand break-words">{invoice?.receipient_address}</span>
                    </div>
                    <div className="mt-[2rem]">
                        Donator: <span className="text-brand break-words">{invoice?.donator_address}</span>
                    </div>
                    <div className="mt-[2rem]">
                        Created:{" "}
                        {invoice?.created_at && (
                            <DateContainer time={invoice.created_at} />
                        )}
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    );
};

export default InvoiceContainer;

// /invoice/01a9413e5698af1a45340e98c2150541c0fa9f9baed693e5a61fd938281ea939be
