'use client';
// import CampaignContainer from "@/modules/Campaign/CampaignContainer";
import React from "react";

import dynamic from 'next/dynamic';

const CampaignContainer = dynamic(() => import('@/modules/Campaign/CampaignContainer'), {
    ssr: false // This ensures the component is not SSR'd
});

const SingleCampaign = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className="cont">
            <CampaignContainer  address={id}/>
        </div>
    );
};

export default SingleCampaign;
