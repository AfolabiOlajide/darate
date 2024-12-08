'use client';
import PageHeader from '@/components/PageHeader'
// import CreateContainer from '@/modules/Create/CreateContainer'
import React from 'react'
import dynamic from 'next/dynamic';

const CreateContainer = dynamic(() => import('@/modules/Create/CreateContainer'), {
    ssr: false // This ensures the component is not SSR'd
});

const Create = () => {
    return (
        <div className='cont'>
            <PageHeader title="Create" />
            <CreateContainer /> 
        </div>
    )
}

export default Create