import React from 'react'

function TitleStatusCard({ status }) {

    return (
        <>
            <button className='h-44 bgblurblue border-2 border-blue-800 p-3 pb-4 hover:scale-105 duration-1000'>
                <a className='w-full h-full' href="">
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <div className='flex w-full h-8'>
                            <div className=' w-8 h-8 border-e-2 border-b-2 border-blue-500'></div>
                            <div className=' w-full h-8 border-t-2 border-e-2 border-blue-500'></div>
                        </div>
                        <div className="flex w-full h-full">
                            <div className=' w-8 h-full border-s-2 border-blue-500'></div>
                            <div className=' w-full h-full border-e-2 border-blue-500'></div>
                        </div>
                        <div className="flex w-full h-full">
                            <div className=' w-full h-full border-b-2 border-s-2 border-blue-500'></div>
                            <div className='flex items-end translate-y-2 mx-1 uppercase text-xs font-semibold'>
                                <p className={status}>Status</p>
                            </div>
                            <div className=' w-full h-full border-b-2 border-e-2 border-blue-500'></div>
                        </div>
                        <div className='text-xl text-blue-300 font-medium uppercase absolute flex items-center justify-center text-center px-5 '>
                            <h1 className='line-clamp-2 '>Title Here More Than 1 lines</h1>
                        </div>
                    </div>
                </a>
            </button>
        </>
    )
}

export default TitleStatusCard