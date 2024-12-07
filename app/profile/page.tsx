"use client";
import PageHeader from "@/components/PageHeader";
import React, { useState } from "react";
import { motion } from "framer-motion";
import UserCampaigns from "@/modules/Profile/UserCampaigns";
import UserOrganization from "@/modules/Profile/UserOrganization";
import UserInvoices from "@/modules/Profile/UserInvoices";
import Bottom from "@/components/Bottom";

type TabTypes = "Campaigns" | "Organization" | "Invoices";

const Profile = () => {
    const tabList: TabTypes[] = ["Campaigns", "Organization", "Invoices"];
    const [active, setActive] = useState<TabTypes>(tabList[0]);

    const moveTab = (idx: number) => {
        setActive(tabList[idx]);
    };

    return (
        <div className="cont">
            <PageHeader title="Profile" />
            <div className="tab mt-[3rem]">
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
                                className={"absolute inset-0 bg-zinc-800 rounded-full "}
                            />
                        )}

                        <span className="relative block text-white">
                            {tab}
                        </span>
                    </button>
                ))}
            </div>
            <div className="content mt-[2rem]">
                {active === "Campaigns" && <UserCampaigns />}
                {active === "Organization" && <UserOrganization />}
                {active === "Invoices" && <UserInvoices />}
            </div>
            <Bottom />
            <Bottom />
            <Bottom />
        </div>
    );
};

export default Profile;