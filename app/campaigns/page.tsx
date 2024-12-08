'use client'
import Bottom from '@/components/Bottom'
import CampaignList from '@/components/CampaignList'
import PageHeader from '@/components/PageHeader'
import React from 'react'

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