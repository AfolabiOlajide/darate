import Bottom from '@/components/Bottom'
import CampaignList from '@/components/CampaignList'
import PageHeader from '@/components/PageHeader'
import { DUMMY_DATA } from '@/lib/constants'
import React from 'react'

const Campaigns = () => {
    
    return (
        <div className='cont'>
            <PageHeader title="Campaigns" />
            <div className="campaigns mt-[2rem]">
                <CampaignList campaigns={DUMMY_DATA} />
            </div>
            <Bottom />
        </div>
    )
}

export default Campaigns