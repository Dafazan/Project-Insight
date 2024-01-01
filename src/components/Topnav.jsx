import React from 'react'

function Topnav() {
    return (
        <>
            <div className=' w-full h-16 flex items-center justify-center text-xs absolute z-40'>
                <div className='w-full h-[2px] bg-blue-500'>

                </div>
                <div className=' h-full w-full text-blue-400 flex justify-between items-center gap-2 uppercase'>
                    <div className='w-[2px] h-[15px] bg-blue-500'></div>
                    <a className='hover:text-yellow-300' href="/DataCenter">Data</a>
                    <div className='w-[1px] h-[15px] bg-blue-500'></div>
                    <a className='hover:text-yellow-300' href="">Access</a>
                    <div className='w-[1px] h-[15px] bg-blue-500'></div>
                    <a className='hover:text-yellow-300' href="">Tools</a>
                    <div className='w-[1px] h-[15px] bg-blue-500'></div>
                    <a className='hover:text-yellow-300' href="/">Dashboard</a>
                    <div className='w-[1px] h-[15px] bg-blue-500'></div>
                    <a className='hover:text-yellow-300' href="/Info">Information</a>
                    <div className='w-[1px] h-[15px] bg-blue-500'></div>
                    <a className='hover:text-yellow-300' href="/DataCenter/Notes">Notes</a>
                    <div className='w-[2px] h-[15px] bg-blue-500'></div>
                </div>
                <div className='w-full h-[2px] bg-blue-500'></div>

            </div>
        </>
    )
}

export default Topnav