import React from 'react'
import Clock from '@/components/Clock'
import Calendar from '@/components/Calendar'

function BasecoloredSecond() {
    return (
        <>
            <div className="w-full h-full px-24 pb-10 pt-14 absolute">
                <div className=' h-full flex mx-24'>
                    <div className='base2 h-full w-full border-y-2 border-blue-500'></div>
                    <div className='base2 h-full w-full flex flex-col  justify-between'>
                        <div className='flex justify-between'>
                            {/* <div className='w-10 h-10 base2 rotate-45 -translate-x-5 -translate-y-5 border-s-2 border-blue-500 '></div> */}
                            {/* <div className='w-10 h-10 base2 -rotate-45 translate-x-5 -translate-y-5 border-e-2 border-blue-500 '>

                            </div> */}
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-10 h-10 base2 -rotate-45 -translate-x-5 translate-y-5 border-s-2 border-blue-500'></div>
                            <div className='w-10 h-10 base2 rotate-45 translate-x-5 translate-y-5 border-e-2 border-blue-500'></div>
                        </div>
                    </div>
                    <div className='base2 h-full w-full border-y-2 border-blue-500'></div>
                </div>

            </div >

            <div className="w-full h-full px-24 pb-10 pt-14 absolute ">
                <div className='h-full w-full flex flex-col'>
                    <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                    <div className='base2 w-full h-[100%] border-x-2 border-blue-500'></div>
                    <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                </div>
            </div>

            <div className="w-full h-full px-24 pb-10 pt-14 absolute ">
                <div className=' h-full flex mx-24'>
                    <div className='h-full w-full'></div>
                    <div className='base2 h-full w-full flex flex-col justify-between'>
                        <div className='base2 border-t-2 border-blue-500 w-full h-10 '></div>
                        <div className='base2 w-full h-10 translate-y-7 border-b-2 border-blue-500'></div>
                    </div>
                    <div className=' h-full w-full'></div>
                </div>

            </div >

            <div className='w-full h-full absolute justify-between flex '>
                <div className=' w-[117px] flex flex-col justify-center'>
                    <div className='base2 w-full h-24 flex flex-col justify-between items-end border-y-2 border-blue-500'>
                        <div className='base2 rotate-45 w-10 h-10 -translate-y-[21px] border-s-2 border-blue-500 '></div>
                        <div className='base2 -rotate-45 w-10 h-10 translate-y-[21px] border-s-2 border-blue-500'></div>
                    </div>
                </div>
                <div className=' w-[117px] flex flex-col justify-center'>
                    <div className='base2 w-full h-24 flex flex-col justify-between items-start border-y-2 border-blue-500'>
                        <div className='base2 rotate-45 w-10 h-10 -translate-y-[21px] border-t-2 border-blue-500'></div>
                        <div className='base2 -rotate-45 w-10 h-10 translate-y-[21px] border-b-2 border-blue-500'></div>
                    </div>
                </div>


            </div>

            <div className="w-full h-full px-24 pb-10 pt-14 absolute">
                <div className='w-full h-full flex flex-col justify-between '>
                    <div className='flex'>
                        <div className='flex '>
                            <div className='h-14 w-14 rotate-45 translate-x-3 translate-y-3 base2 border-s-2 border-blue-500'></div>
                            <div className='h-14 w-14 base2 -translate-x-4 border-t-2 border-blue-500'></div>
                        </div>
                        <div className='h-full w-full'></div>
                        <div className='flex'>
                            <div className='h-14 w-14 base2 translate-x-4 border-t-2 border-blue-500'></div>
                            <div className='h-14 w-14  base2 -rotate-45 -translate-x-3 translate-y-3 border-e-2 border-blue-500'></div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex '>
                            <div className='h-14 w-14 rotate-45 translate-x-3 -translate-y-3 base2 border-b-2 border-blue-500 '></div>
                            <div className='h-14 w-14 base2 -translate-x-4 border-b-2 border-blue-500 '></div>
                        </div>
                        <div className='h-full w-full'></div>
                        <div className='flex'>
                            <div className='h-14 w-14 base2 translate-x-4 border-b-2 border-blue-500 '></div>
                            <div className='h-14 w-14  base2 -rotate-45 -translate-x-3 -translate-y-3 border-b-2 border-blue-500 '></div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="w-full h-full px-24 pb-10 pt-14 absolute">
                <div className='w-full h-full flex justify-center px-24 pb-10 pt-14 items-center'>

                    <img className='opacity-40' src="bgicon.png" alt="" />
                </div>
            </div>
            <div className="w-full h-full px-24 pb-10 pt-14 absolute">
                <div className='w-full h-full flex justify-center px-24 pb-10 pt-14 items-end '>

                    <div className=' w-60 h-10 translate-y-16 flex justify-center items-center gap-6 '>
                        <Clock />
                        <Calendar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BasecoloredSecond