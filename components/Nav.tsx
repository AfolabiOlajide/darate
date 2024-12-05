import { client } from '@/lib/constants';
import React from 'react'
import { ConnectButton } from "thirdweb/react";

const Nav = () => {
    return (
        <nav className='cont py-[2rem] flex items-center justify-between'>
            <div className="logo-container">
                <span className='logo'>Darate</span>
            </div>

            <ConnectButton client={client} />
        </nav>
    )
}

export default Nav