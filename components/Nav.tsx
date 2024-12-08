'use client';
import { client } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { ConnectButton } from "thirdweb/react";

const Nav = () => {
    return (
        <nav className="cont py-[2rem] flex items-center justify-between">
            <div className="logo-container">
                <Link href="/">
                    <span className="logo">Darate</span>
                </Link>
            </div>

            <ConnectButton client={client} />
        </nav>
    );
};

export default Nav;
