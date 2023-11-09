import React from 'react'

function ButtonDefault({ text, action }) {
    return (
        <div className='py-3 w-full h-full'>
            <button
                onClick={action}
                className='w-60 h-full hover:scale-105 duration-1000'>
                <div className='  w-full h-10 relative'>
                    <div className='  w-full h-10 flex flex-col absolute'>
                        <div className='flex w-full h-full'>
                            <div className=' w-5 h-5 border-s-2 border-blue-500 bg-blue-500 rotate-45 translate-x-1 translate-y-1'></div>
                            <div className=' w-full h-5'></div>
                        </div>
                        <div className='flex w-full h-full'>
                            <div className=' w-full h-5'></div>
                            <div className=' w-5 h-5 border-e-2 border-blue-500 bg-blue-500 rotate-45 -translate-x-1 -translate-y-1'></div>
                        </div>
                    </div>
                    <div className='w-full h-10 absolute flex'>
                        <div className=' w-[15px] h-full'></div>
                        <div className=' w-full border-y-2 border-blue-500 bg-blue-500 h-full'></div>
                        <div className=' w-[15px] h-full'></div>
                    </div>
                    <div className='w-full h-10 absolute flex'>
                        <div className='w-full h-full flex flex-col'>
                            <div className='h-[25px] '></div>
                            <div className='h-full  border-s-2 border-b-2 border-blue-500 bg-blue-500'></div>
                        </div>

                        <div className='w-full h-full flex flex-col rotate-180'>
                            <div className='h-[25px]'></div>
                            <div className='h-full border-s-2 border-b-2 border-blue-500 bg-blue-500'></div>
                        </div>

                    </div>
                    <div className='w-full h-10 absolute flex justify-center items-center'>
                        <p>{text}</p>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ButtonDefault