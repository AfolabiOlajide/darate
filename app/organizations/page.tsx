'use client'
import PageHeader from '@/components/PageHeader'
import OrganizationList from '@/modules/Organization/OrganizationList'
import React from 'react'

const Orgainzations = () => {
    return (
        <div className='cont'>
            <PageHeader title="Organizations" />
            <OrganizationList />
        </div>
    )
}

export default Orgainzations