import React from 'react'
import SideNavData from '@/components/Layouts/SideNavData'

function MobileLayout({ children, isNotes, isLetters, isArchive, isTasks }) {
    return (
        <div className='p-1 flex justify-center items-center h-screen w-screen'>

            {children}

        </div>
    )
}

export default MobileLayout