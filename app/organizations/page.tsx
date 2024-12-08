'use client'
import PageHeader from '@/components/PageHeader'
// import OrganizationList from '@/modules/Organization/OrganizationList'
import React from 'react'
import dynamic from 'next/dynamic';

const OrganizationList = dynamic(() => import('@/modules/Organization/OrganizationList'), {
    ssr: false // This ensures the component is not SSR'd
});

const Orgainzations = () => {
    return (
        <div className='cont'>
            <PageHeader title="Organizations" />
            <OrganizationList />
        </div>
    )
}

export default Orgainzations