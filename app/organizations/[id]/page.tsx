'use client'
// import SingleOrganizationContainer from '@/modules/Organization/SingleOrganizationContainer'
import React from 'react'

import dynamic from 'next/dynamic';

const SingleOrganizationContainer = dynamic(() => import('@/modules/Organization/SingleOrganizationContainer'), {
    ssr: false // This ensures the component is not SSR'd
});

const SingleOrganization = ({params: {id}}: {params: {id: string}}) => {
    return (
        <div className='cont'>
            <SingleOrganizationContainer address={id} />
        </div>
    )
}

export default SingleOrganization