'use client'
import React, { useState } from 'react'
import Draggable from 'react-draggable'


function Blueframe() {
    const [buttonText, setButtonText] = useState('Click Me');

    const handleClick = () => {
        // Toggle the button text when the button is clicked
        setButtonText(buttonText === 'Click Me' ? 'Clicked!' : 'Click Me');
    };
    return (

        <div className='relative h-screen w-screen'>
            <Draggable className="h-full">
                <div className="h-full">

                    <div className="w-full h-full p-24 absolute">
                        <div className=' h-full flex mx-24'>
                            <div className='bg-black h-full w-full border-y-2 border-blue-500'></div>
                            <div className='bg-black h-full w-full flex flex-col justify-between'>
                                <div className='flex justify-between'>
                                    <div className='w-10 h-10 bg-black rotate-45 -translate-x-5 -translate-y-5 border-s-2 border-blue-500'></div>
                                    <div className='w-10 h-10 bg-black -rotate-45 translate-x-5 -translate-y-5 border-e-2 border-blue-500'>

                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='w-10 h-10 bg-black -rotate-45 -translate-x-5 translate-y-5 border-s-2 border-blue-500'></div>
                                    <div className='w-10 h-10 bg-black rotate-45 translate-x-5 translate-y-5 border-e-2 border-blue-500'></div>
                                </div>
                            </div>
                            <div className='bg-black h-full w-full border-y-2 border-blue-500'></div>
                        </div>

                    </div >

                    <div className="w-full h-full p-24 absolute">
                        <div className='h-full w-full flex flex-col'>
                            <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                            <div className='bg-black w-full h-[100%] border-x-2 border-blue-500'></div>
                            <div className=' w-full max-h-[40px] min-h-[40px] '></div>
                        </div>
                    </div>

                    <div className="w-full h-full p-24 absolute">
                        <div className=' h-full flex mx-24'>
                            <div className='h-full w-full'></div>
                            <div className='bg-black h-full w-full flex flex-col justify-between'>
                                <div className='bg-black w-full h-10 -translate-y-7 border-t-2 border-blue-500'></div>
                                <div className='bg-black w-full h-10 translate-y-7 border-b-2 border-blue-500'></div>
                            </div>
                            <div className=' h-full w-full'></div>
                        </div>

                    </div >

                    <div className="w-full h-full p-24 absolute z-50">
                        <div className=' w-full h-full flex justify-center items-center'>
                            <button onClick={handleClick} className='bg-white rounded-lg hover:bg-slate-700 text-black hover:text-white p-5'>{buttonText}</button>
                        </div>
                    </div>

                    <div className="w-full h-full p-24">
                        <div className='w-full h-full flex flex-col justify-between '>
                            <div className='flex'>
                                <div className='flex '>
                                    <div className='h-14 w-14 rotate-45 translate-x-3 translate-y-3 bg-black border-s-2 border-blue-500'></div>
                                    <div className='h-14 w-14 bg-black -translate-x-4 border-t-2 border-blue-500'></div>
                                </div>
                                <div className='h-full w-full'></div>
                                <div className='flex'>
                                    <div className='h-14 w-14 bg-black translate-x-4 border-t-2 border-blue-500'></div>
                                    <div className='h-14 w-14  bg-black -rotate-45 -translate-x-3 translate-y-3 border-e-2 border-blue-500'></div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex '>
                                    <div className='h-14 w-14 rotate-45 translate-x-3 -translate-y-3 bg-black border-b-2 border-blue-500'></div>
                                    <div className='h-14 w-14 bg-black -translate-x-4 border-b-2 border-blue-500'></div>
                                </div>
                                <div className='h-full w-full'></div>
                                <div className='flex'>
                                    <div className='h-14 w-14 bg-black translate-x-4 border-b-2 border-blue-500'></div>
                                    <div className='h-14 w-14  bg-black -rotate-45 -translate-x-3 -translate-y-3 border-b-2 border-blue-500'></div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </Draggable>
        </div>


    )
}

export default Blueframe