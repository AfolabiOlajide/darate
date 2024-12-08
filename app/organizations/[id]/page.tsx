'use client'
import SingleOrganizationContainer from '@/modules/Organization/SingleOrganizationContainer'
import React from 'react'

const SingleOrganization = ({params: {id}}: {params: {id: string}}) => {
    return (
        <div className='cont'>
            <SingleOrganizationContainer address={id} />
        </div>
    )
}

export default SingleOrganization