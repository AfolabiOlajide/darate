"use client";

import Bottom from "@/components/Bottom";
import BrandButton from "@/components/BrandButton";
import DonatorsTable, { Donator } from "@/components/DonatorsTable";
import FormField from "@/components/FormField";
import InvoiceTable from "@/components/InvoiceTable";
import SkelentonText from "@/components/SkelentonText";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import useContract from "@/hooks/useContract";
import useCreateInvoice from "@/hooks/useCreateInvoice";
import useFetchInvoice from "@/hooks/useFetchInvoice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { toast } from "sonner";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { motion } from "framer-motion";
import { ethers } from "ethers";

type TabTypes = "Donators" | "Invoices";

const CampaignContainer = ({ address }: { address: string }) => {
    const account = useActiveAccount();
    const random4 = Math.floor(Math.random() * 4) + 1;
    const random3 = Math.floor(Math.random() * 3) + 1;
    const [amount, setAmount] = useState("0.1");
    const tabList: TabTypes[] = ["Donators", "Invoices"];
    const [active, setActive] = useState<TabTypes>(tabList[0]);
    const { createInvoice } = useCreateInvoice({
        recieverIdentity: address,
        payerIdentity: account?.address as string,
        amountToBePaid: amount,
    });
    const moveTab = (idx: number) => {
        setActive(tabList[idx]);
    };
    const { contract } = useContract({
        address: address,
    });

    const { data: title, isPending: titlePending } = useReadContract({
        contract,
        method: "function title() view returns (string)",
        params: [],
    });

    const { data: description, isPending: descriptionPending } =
        useReadContract({
            contract,
            method: "function description() view returns (string)",
            params: [],
        });

    const { data: category, isPending: categoryPending } = useReadContract({
        contract,
        method: "function category() view returns (string)",
        params: [],
    });

    const { data: donators, isPending: donatorsPending } = useReadContract({
        contract,
        method: "function getDonators() view returns ((address donator, uint256 amountDonated)[])",
        params: [],
    });

    const { data: owner, isPending: ownerPending } = useReadContract({
        contract,
        method: "function owner() view returns (address)",
        params: [],
    });

    const { data: targetAmount, isPending: targetAmountPending } =
        useReadContract({
            contract,
            method: "function targetAmount() view returns (uint256)",
            params: [],
        });

    const handleGenerateInvoice = async () => {
        if (!account) {
            toast.warning("Please connect your wallet");
            return;
        }
        if (Number.isNaN(Number(amount)) || amount === "0" || amount === "") {
            toast.error("Amount to donate must be a valid value");
            console.log("generating invoice. Amount: ", amount);
            return;
        }
        await createInvoice();
    };

    const handleSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    // get invoices
    const { fetchUsersInvoice } = useFetchInvoice();
    const [invoices, setInvoices] = useState<InvoiceTableType[]>([]);
    const [invoiceLoading, setInvoiceLoading] = useState(false);

    const refreshInvoices = async () => {
        setInvoiceLoading(true);
        const invoices = await fetchUsersInvoice(address);
        setInvoices(invoices as InvoiceTableType[]);
        setInvoiceLoading(false);
    };

    useEffect(() => {
        async function fetchInvoice() {
            setInvoiceLoading(true);
            const invoices = await fetchUsersInvoice(address);
            setInvoices(invoices as InvoiceTableType[]);
            setInvoiceLoading(false);
        }

        fetchInvoice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return (
        <div className="mt-[2rem]">
            {/* title */}
            <h2 className="name font-bold text-[1.5rem] md:text-[3rem]">
                {!titlePending && title}{" "}
                {titlePending && <SkelentonText height={3} />}
            </h2>
            {/* main content */}
            <div className="main-content mt-[2rem] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="side-1">
                    {categoryPending ? (
                        <div className="flex flex-1 w-full min-h-[400px] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 animate-pulse"></div>
                    ) : (
                        <Image
                            src={`/${category?.toLowerCase()}/${
                                category?.toLowerCase() === "tech"
                                    ? random3
                                    : random4
                            }.jpg`}
                            height="400"
                            width="400"
                            alt="campaign image"
                            className="w-full aspect-square object-cover"
                        />
                    )}
                    <p className="mt-[2rem]">
                        {!descriptionPending && description}{" "}
                        {descriptionPending && <SkelentonText height={7} />}
                    </p>
                </div>
                <div className="side-2">
                    <BackgroundGradient className="rounded-[22px] p-[1rem] bg-zinc-900 cursor-pointer">
                        <div className="text-neutral-400 capitalize font-bold">
                            Amount Received
                        </div>
                        <h3 className="font-bold text-[2rem] text-brand mt-3">
                            0.2 ETH
                        </h3>
                        <div className="text-neutral-500 text-sm">
                            of { !targetAmountPending && targetAmount && ethers.utils.formatEther(targetAmount?.toString())} ETH
                        </div>
                        {/* create Invoice */}
                        <div className="mt-[3rem]">
                            <FormField
                                labelName="Amount to donate"
                                placeholder="1 ETH"
                                inputType="text"
                                value={amount}
                                handleChange={(e) => handleSetAmount(e)}
                            />
                        </div>
                        <div className="button mt-4">
                            <BrandButton
                                btnType="submit"
                                title={`Generate Invoice`}
                                styles="bg-brand text-black !w-full"
                                onClick={handleGenerateInvoice}
                            />
                        </div>
                    </BackgroundGradient>
                </div>
            </div>
            {/* bottom content */}
            <div className="bottom-content">
                <div className="mt-[3rem] flex justify-between items-center">
                    {/* tabs */}
                    <div className="tab ">
                        {tabList.map((tab, idx) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    moveTab(idx);
                                }}
                                className={"relative px-4 py-2 rounded-full"}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {active === tab && (
                                    <motion.div
                                        layoutId="clickedbutton"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.3,
                                            duration: 0.6,
                                        }}
                                        className={
                                            "absolute inset-0 bg-zinc-800 rounded-full "
                                        }
                                    />
                                )}

                                <span className="relative block text-white">
                                    {tab}
                                </span>
                            </button>
                        ))}
                    </div>
                    {/* refresh invoice button */}
                    <div className="">
                        <MdOutlineRefresh
                            className="text-2xl text-neutral-500 cursor-pointer"
                            onClick={refreshInvoices}
                        />
                    </div>
                </div>
                <div className="tab-content mt-6">
                    {/* donators */}
                    {active === "Donators" &&
                        !donatorsPending &&
                        donators &&
                        donators.length > 0 && (
                            <DonatorsTable
                                donators={donators as unknown as Donator[]}
                            />
                        )}
                    {active === "Donators" &&
                        !donatorsPending &&
                        donators?.length === 0 && (
                            <div className="flex items-center justify-center h-[20vh]">
                                <p className="text-brand text-2xl font-bold">
                                    No donation has been made, be the first
                                </p>
                            </div>
                        )}
                    {/* invoices */}
                    {active === "Invoices" &&
                        !ownerPending &&
                        !invoiceLoading &&
                        account?.address &&
                        owner === account?.address &&
                        invoices.length > 0 && (
                            <InvoiceTable
                                invoices={invoices as InvoiceTableType[]}
                                owner={account.address}
                            />
                        )}
                    {active === "Invoices" &&
                        !invoiceLoading &&
                        invoices.length === 0 && (
                            <div className="flex items-center justify-center h-[20vh]">
                                <p className="text-brand text-2xl font-bold">
                                    No invoice has been created
                                </p>
                            </div>
                        )}
                    {active === "Invoices" && invoiceLoading && (
                        <SkelentonText height={10} />
                    )}
                    {active === "Invoices" &&
                        !ownerPending &&
                        !invoiceLoading &&
                        account?.address &&
                        owner !== account?.address &&
                        invoices.length > 0 && (
                            <div className="flex items-center justify-center h-[20vh]">
                                <p className="text-brand text-2xl font-bold">
                                    You are not the owner of this campaign,
                                    or you don&apos;t have any invoice for this
                                    campaign.
                                </p>
                            </div>
                        )}
                </div>
            </div>
            <Bottom />
            <Bottom />
            <Bottom />
        </div>
    );
};

export default CampaignContainer;
