import React from 'react'
import SideNavData from '@/components/Layouts/SideNavData'
import SideNav from './SideNav'

function MobileInnerLayout({ children, isNotes, isLetters, isArchive, isTasks }) {
    return (
        <>
            <SideNav>


                <div ></div>
                <div ></div>
                <div ></div>
                <a className={`text-${isNotes ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href="">Notes</a>

                <a className='text-blue-500' href="">Letters</a>

                <a className='text-blue-500' href="">Archives</a>

                <a className='text-blue-500' href="">Tasks</a>
            </SideNav>
            <div className='border-2 border-blue-500 p-3 w-full h-full '>

                {children}
            </div>
        </>
    )
}

export default MobileInnerLayout