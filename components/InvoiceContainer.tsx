"use client";
import useFetchInvoice from "@/hooks/useFetchInvoice";
import React, { useEffect } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import DateContainer from "./DateContainer";
import { ethers } from "ethers";
import BrandButton from "./BrandButton";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import Bottom from "./Bottom";
import { toast } from "sonner";
import usePayInvoice from "@/hooks/usePayInvoice";
import useContract from "@/hooks/useContract";
import { MdOutlineRefresh } from "react-icons/md";
import { HiExternalLink } from "react-icons/hi";
import Link from "next/link";
import { getTxHashLink } from "@/lib/utils";

const InvoiceContainer = ({ id }: { id: string }) => {
    const activeAccount = useActiveAccount();
    const { fetchInvoiceById } = useFetchInvoice();
    const [invoice, setInvoice] = React.useState<InvoiceDetailType | null>(
        null
    );
    // console.log("invoice", invoice);
    const { contract } = useContract({
        address: invoice?.contractAddress as string,
    });

    const { payInvoice } = usePayInvoice({
        invoiceId: invoice?.id as string,
        payerIdentity: activeAccount?.address as string,
        contractAddress: invoice?.contractAddress as string,
    });

    const handlePayInvoice = async () => {
        if (!activeAccount) {
            toast.warning("Please connect your wallet");
            return;
        }
        await payInvoice();
    };

    const refreshInvoice = async () => {
        const invoice = await fetchInvoiceById(id);
        setInvoice(invoice as InvoiceDetailType);
    };

    const { data: invoiceIds, isPending: invoiceIdsIsPending } =
        useReadContract({
            contract,
            method: "function getInvoiceIds() view returns ((string invoiceId, string paymentTxHash)[])",
            params: [],
        });

    useEffect(() => {
        async function handleFetchInvoiceById() {
            const invoice = await fetchInvoiceById(id);
            setInvoice(invoice as InvoiceDetailType);
        }
        handleFetchInvoiceById();
    }, [id]);

    // console.log("invoice Ids", invoiceIds);

    return (
        <div className="mt-[3rem]">
            <BackgroundGradient className="rounded-[22px] p-[1rem] py-[2rem] bg-zinc-900 text-neutral-300 break-all">
                <div className="">
                    <div className="status flex items-center gap-4">
                        <div className="">
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
                        <div className="refresh">
                            <MdOutlineRefresh
                                className="text-2xl text-neutral-500 cursor-pointer"
                                onClick={refreshInvoice}
                            />
                        </div>
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
                    {/* payment hash */}
                    {invoiceIds &&
                        invoiceIds.length > 0 &&
                        invoiceIds.map((item, index) => {
                            console.log(item.paymentTxHash);
                            if (item.invoiceId !== invoice?.id) return;
                            if (item.paymentTxHash === "") return;
                            return (
                                <div
                                    key={index}
                                    className="mt-[2rem] flex items-start gap-4"
                                >
                                    <span className="whitespace-nowrap">
                                        Payment Hash:
                                    </span>
                                    <a href={getTxHashLink(item.paymentTxHash)} target="_blank" rel="noreferrer" className="">
                                        <span className="text-brand break-words flex flex-col md:flex-row gap-3 items-start md:items-center">
                                            {item.paymentTxHash}
                                            <HiExternalLink className="text-brand ml-3" />
                                        </span>
                                    </a>
                                </div>
                            );
                        })}
                    {/* payment button */}
                    <div className="buttton flex justify-end items-end mt-[2rem]">
                        {activeAccount?.address === invoice?.donator_address &&
                            !invoice?.status && (
                                <BrandButton
                                    btnType="submit"
                                    title={`Pay Invoice`}
                                    styles="bg-brand text-black"
                                    onClick={handlePayInvoice}
                                />
                            )}
                    </div>
                </div>
            </BackgroundGradient>
            <Bottom />
            <Bottom />
            <Bottom />
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
