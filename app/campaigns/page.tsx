'use client'
import Bottom from '@/components/Bottom'
// import CampaignList from '@/components/CampaignList'
import PageHeader from '@/components/PageHeader'
import React from 'react'
import dynamic from 'next/dynamic';

const CampaignList = dynamic(() => import('@/components/CampaignList'), {
    ssr: false // This ensures the component is not SSR'd
});

const Campaigns = () => {
    
    return (
        <div className='cont'>
            <PageHeader title="Campaigns" />
            <div className="campaigns mt-[3rem]">
                <CampaignList />
            </div>
            <Bottom />
        </div>
    )
}

export default Campaigns