"use client";
import React from "react";

const PageHeader = ({ title }: { title: string }) => {
    return (
        <div className="h-[10vh] md:h-[20vh] w-full rounded-md bg-gradient-to-r from-[#133E87] via-[#1EC49E] to-[#FF9C73] flex items-center justify-center bg-[length:200%_200%] animate-gradient-move">
            <div className="text-white font-bold pointer-events-none text-4xl text-center md:text-5xl lg:text-7xl">
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default PageHeader;
