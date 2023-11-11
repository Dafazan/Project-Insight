import React from 'react'
import SideNavData from '@/components/Layouts/SideNavData'
import SideNav from './SideNav'

function MobileInnerLayout({ children, isNotes, isLetters, isArchives, isTasks, isEntry, isLists, backlink, entrylink }) {
    return (
        <>
            <SideNav>
                <div ></div>
                <div ></div>
                <a className={`text-${isNotes ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href="/DataCenter/Notes">Notes</a>
                <a className={`text-${isLetters ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href="/DataCenter/Letters">Letters</a>
                <a className={`text-${isArchives ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href="/DataCenter/Archives">Archives</a>
                <a className={`text-${isTasks ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href="/DataCenter/Tasks">Tasks</a>
                <div ></div>
                <div ></div>
                <a className={`text-${isEntry ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href={entrylink}>Entry</a>
                <a className={`text-${isLists ? ' text-white bg-blue-500 px-3 py-[1px] -translate-y-1' : 'text-blue-500'}`} href={backlink}>Lists</a>
            </SideNav>
            <div className='border-2 border-blue-500 p-3 w-full h-full '>

                {children}
            </div>
        </>
    )
}

export default MobileInnerLayout