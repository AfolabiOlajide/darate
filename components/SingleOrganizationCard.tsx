"use client";
import React from "react";
import useContract from "@/hooks/useContract";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useReadContract } from "thirdweb/react";
import { TextSkelenton } from "./InvoiceContainer";

const SingleOrganizationCard = ({address}: {address :string}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <Link
            href={`/organizations/${address}`}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence>
                {hovered === true && (
                    <motion.span
                        className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block  rounded-3xl"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.2 },
                        }}
                    />
                )}
            </AnimatePresence>
            <Card>
                <CardTitle address={address} />
                <CardDescription address={address} />
            </Card>
        </Link>
    );
};

export default SingleOrganizationCard;

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    address,
}: {
    className?: string;
    address: string;
}) => {
    const { contract } = useContract({
        address: address,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
    });
    return (
        <div
            className={cn(
                "text-zinc-100 font-bold tracking-wide mt-4 text-base md:text-[2rem]",
                className
            )}
        >
            {isPending ? <TextSkelenton /> : data}
        </div>
    );
};
export const CardDescription = ({
    address,
    className,
}: {
    address: string;
    className?: string;
}) => {
    const { contract } = useContract({
        address: address,
    });
    const { data, isPending } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
    });

    return (
        <div
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {isPending ? <TextSkelenton /> : data}
        </div>
    );
};
