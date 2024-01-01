import React from 'react'
import Basecolored from '@/components/Basecolored'
import BasecoloredSecond from '@/components/BasecoloredSecond'
import Topnav from '@/components/Topnav'
import Fullscreenrec from '@/components/Fullscreenrec'

function DesktopLayout({ children,
    button1,
    button2,
    button3,
    button4,
    button5,
    button6,
    button7,
    button8,
    button9,
    button10,
    button11,
    button12 }) {
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
                                <div className='h-32 ps-1 flex flex-col justify-between text-xs'>
                                    <div className='flex'>
                                        {button1}

                                        <div className=' w-full border-t border-yellow-300'></div>
                                    </div>
                                    <div className='flex'>
                                        {button2}
                                        <div className=' w-full border-t border-yellow-300'></div>
                                    </div>
                                    <div className='flex'>
                                        {button3}
                                        <div className=' w-full border-t border-yellow-300'></div>
                                    </div>
                                </div>
                                <div className='h-32 ps-1 flex flex-col justify-between text-xs'>
                                    <div className='flex'>
                                        {button4}
                                        <div className=' w-full border-t border-yellow-300'></div>
                                    </div>
                                    <div className='flex'>
                                        {button5}
                                        <div className=' w-full border-t border-yellow-300'></div>
                                    </div>
                                    <div className='flex'>
                                        {button6}
                                        <div className=' w-full border-t border-yellow-300'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full '></div>

                            <div className='w-[96px] h-full flex flex-col justify-between pointer-events-auto'>
                                <div className='h-36 pe-1 flex flex-col justify-between text-xs'>
                                    <div className='flex'>
                                        <div className=' w-full border-t border-yellow-300'></div>
                                        {button7}
                                    </div>
                                    <div className='flex'>
                                        <div className=' w-full border-t border-yellow-300'></div>
                                        {button8}
                                    </div>
                                    <div className='flex'>
                                        <div className=' w-full border-t border-yellow-300'></div>
                                        {button9}
                                    </div>
                                </div>
                                <div className='h-32 pe-1 flex flex-col justify-between text-xs'>
                                    <div className='flex'>
                                        <div className=' w-full border-t border-yellow-300'></div>
                                        {button10}
                                    </div>
                                    <div className='flex'>
                                        <div className=' w-full border-t border-yellow-300'></div>
                                        {button11}
                                    </div>
                                    <div className='flex'>
                                        <div className=' w-full border-t border-yellow-300'></div>
                                        {button12}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Topnav />



                    {/* <Fullscreenrec /> */}


                </div>

            </div>

        </>
    )
}

export default DesktopLayout