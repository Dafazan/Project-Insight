import React from 'react'

function Basecolored() {
    return (
        <>
            <div className="w-full h-full p-24 absolute">
                <div className=' h-full flex mx-24'>
                    <div className='base1 h-full w-full border-y-2 border-blue-500'></div>
                    <div className='base1 h-full w-full flex flex-col justify-between'>
                        <div className='flex justify-between'>
                            <div className='w-10 h-10 base1 rotate-45 -translate-x-5 -translate-y-5 border-s-2 border-blue-500 '></div>
                            <div className='w-10 h-10 base1 -rotate-45 translate-x-5 -translate-y-5 border-e-2 border-blue-500 '>

                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-10 h-10 base1 -rotate-45 -translate-x-5 translate-y-5 border-s-2 border-blue-500'></div>
                            <div className='w-10 h-10 base1 rotate-45 translate-x-5 translate-y-5 border-e-2 border-blue-500'></div>
                        </div>
                    </div>
                    <div className='base1 h-full w-full border-y-2 border-blue-500'></div>
                </div>

            </div >

            <div className="w-full h-full p-24 absolute">
                <div className='h-full w-full flex flex-col'>
                    <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                    <div className='base1 w-full h-[100%] border-x-2 border-blue-500'></div>
                    <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                </div>
            </div>

            <div className="w-full h-full p-24 absolute">
                <div className=' h-full flex mx-24'>
                    <div className='h-full w-full'></div>
                    <div className='base1 h-full w-full flex flex-col justify-between'>
                        <div className='base1 w-full h-10 -translate-y-7 border-t-2 border-blue-500'></div>
                        <div className='base1 w-full h-10 translate-y-7 border-b-2 border-blue-500'></div>
                    </div>
                    <div className=' h-full w-full'></div>
                </div>

            </div >

            <div className='w-full h-full absolute justify-between flex'>
                <div className=' w-[117px] flex flex-col justify-center'>
                    <div className='base1 w-full h-24 flex flex-col justify-between items-end border-y-2 border-blue-500'>
                        <div className='base1 rotate-45 w-10 h-10 -translate-y-[21px] border-s-2 border-blue-500'></div>
                        <div className='base1 -rotate-45 w-10 h-10 translate-y-[21px] border-s-2 border-blue-500'></div>
                    </div>
                </div>
                <div className=' w-[117px] flex flex-col justify-center'>
                    <div className='base1 w-full h-24 flex flex-col justify-between items-start border-y-2 border-blue-500'>
                        <div className='base1 rotate-45 w-10 h-10 -translate-y-[21px] border-t-2 border-blue-500'></div>
                        <div className='base1 -rotate-45 w-10 h-10 translate-y-[21px] border-b-2 border-blue-500'></div>
                    </div>
                </div>


            </div>

            <div className="w-full h-full p-24 absolute">
                <div className='w-full h-full flex flex-col justify-between '>
                    <div className='flex'>
                        <div className='flex '>
                            <div className='h-14 w-14 rotate-45 translate-x-3 translate-y-3 base1 border-s-2 border-blue-500'></div>
                            <div className='h-14 w-14 base1 -translate-x-4 border-t-2 border-blue-500'></div>
                        </div>
                        <div className='h-full w-full'></div>
                        <div className='flex'>
                            <div className='h-14 w-14 base1 translate-x-4 border-t-2 border-blue-500'></div>
                            <div className='h-14 w-14  base1 -rotate-45 -translate-x-3 translate-y-3 border-e-2 border-blue-500'></div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex '>
                            <div className='h-14 w-14 rotate-45 translate-x-3 -translate-y-3 base1 border-b-2 border-blue-500 '></div>
                            <div className='h-14 w-14 base1 -translate-x-4 border-b-2 border-blue-500 '></div>
                        </div>
                        <div className='h-full w-full'></div>
                        <div className='flex'>
                            <div className='h-14 w-14 base1 translate-x-4 border-b-2 border-blue-500 '></div>
                            <div className='h-14 w-14  base1 -rotate-45 -translate-x-3 -translate-y-3 border-b-2 border-blue-500 '></div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="w-full h-full p-24 absolute">
                <div className='w-full h-full flex justify-center p-24 items-center'>

                    <img className='opacity-40' src="bgicon.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default Basecolored