import CampaignContainer from "@/modules/Campaign/CampaignContainer";
import React from "react";

const SingleCampaign = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div>
            SingleCampaign {id}
            <CampaignContainer />
        </div>
    );
};

export default SingleCampaign;
