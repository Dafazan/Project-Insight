
import React from 'react'
import BasecoloredSecond from '@/components/BasecoloredSecond'

function DesktopPortfolio({ children }) {
    return (
        <>
            <div className='relative h-screen w-screen'>
                <div className="h-full">
                    <BasecoloredSecond />

                    <div className='w-full h-full flex py-[60px] px-36 absolute '>
                        <div className="w-full h-full overflow-y-scroll">
                            {/* Content */}

                            {children}


                        </div>
                    </div>


                    <div className='w-full h-full absolute flex items-center pointer-events-none'>
                        <div className='w-full h-[420px] flex justify-between'>
                            <div className='w-[96px] h-full flex flex-col justify-between pointer-events-auto'>

                            </div>
                            <div className='w-full '></div>

                            <div className='w-[96px] h-full flex flex-col justify-between pointer-events-auto'>

                            </div>
                        </div>
                    </div>

                    <div className=' w-full h-16 flex items-center justify-center text-xs absolute z-40'>
                        <div className='w-full h-[2px] bg-blue-500'>

                        </div>
                        <div className=' h-full w-full text-blue-400 flex justify-between items-center gap-2 uppercase'>
                            <div className='w-[2px] h-[15px] bg-blue-500'></div>
                            <a className='hover:text-yellow-300' href="">Dafazan</a>
                            <div className='w-[1px] h-[15px] bg-blue-500'></div>
                            <a className='hover:text-yellow-300' href="">Portfolio</a>
                            <div className='w-[1px] h-[15px] bg-blue-500'></div>
                            <a className='hover:text-yellow-300' href="">GitHub</a>
                            <div className='w-[1px] h-[15px] bg-blue-500'></div>
                            <a className='hover:text-yellow-300' href="">Social</a>
                            <div className='w-[1px] h-[15px] bg-blue-500'></div>
                            <a className='hover:text-yellow-300' href="">Contact</a>
                            <div className='w-[1px] h-[15px] bg-blue-500'></div>
                            <a className='hover:text-yellow-300' href="">Playground</a>
                            <div className='w-[2px] h-[15px] bg-blue-500'></div>
                        </div>
                        <div className='w-full h-[2px] bg-blue-500'></div>

                    </div>

                </div>

            </div>
        </>
    )

}

export default DesktopPortfolio