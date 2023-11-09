import React from 'react'

function MobileLayout({ children }) {
    return (
        <div className='p-1 flex justify-center items-center h-screen w-screen'>
            <div className='border-2 border-blue-500 p-4 w-full h-full '>

                {children}
            </div>

        </div>
    )
}

export default MobileLayout