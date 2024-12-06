import PageHeader from '@/components/PageHeader'
import CreateContainer from '@/modules/Create/CreateContainer'
import React from 'react'

const Create = () => {
    return (
        <div className='cont'>
            <PageHeader title="Create" />
            <CreateContainer /> 
        </div>
    )
}

export default Create