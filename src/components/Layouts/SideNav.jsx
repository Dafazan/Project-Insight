import React from 'react'

function SideNav({ children }) {
    return (
        <div className='h-screen w-6 pt-5'>


            <div className=' flex items-center justify-center text-xs rotate-90 z-40'>
                <div className='w-full h-[2px] bg-blue-500'>

                </div>
                <div className=' h-full w-full uppercase text-blue-400 flex justify-between items-center gap-5'>
                    <a className='text-white bg-blue-500 px-3 py-[1px] -translate-y-1' href="/DataCenter">Data</a>

                    <a className='text-blue-500' href="/AccessCenter">Access</a>


                    {children}

                </div>
                <div className='w-full h-[2px] bg-blue-500'></div>

            </div>
        </div>
    )
}

export default SideNav