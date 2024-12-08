'use client';
import CampaignContainer from "@/modules/Campaign/CampaignContainer";
import React from "react";

const SingleCampaign = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className="cont">
            <CampaignContainer  address={id}/>
        </div>
    );
};

export default SingleCampaign;
