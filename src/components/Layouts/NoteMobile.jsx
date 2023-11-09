import React from 'react'

function NoteMobile({ children }) {
    return (


        <>


            <div className='w-full flex flex-col'>
                <div className=' absolute me-5 bgblurblue'>
                    <div className='w-full h-2 '>
                        <div className='w-full flex gap-1 '>
                            <div className='w-full h-2 border-t-2 border-blue-500'></div>
                        </div>

                    </div>
                    <div className=' p-3 py-5 '>
                        <div className='line-clamp-1'>
                            <p className='text-3xl'>NOTE#as akdasda sasdasd asdasdas</p>
                        </div>
                        <div className='line-clamp-1'>
                            <p>PRIVATE</p>
                        </div>

                    </div>
                    <div className='w-full h-2'>
                        <div className='w-full flex gap-1 rotate-180'>
                            <div className='w-full h-2 border-t-2 border-blue-500'></div>
                        </div>
                        <div className='w-full flex justify-between absolute'>

                        </div>
                    </div>
                </div>
                <div className=' w-full h-[50%] border-b-2 border-blue-500 p-3 overflow-y-scroll mt-28'>

                </div>
            </div>
            {children}
        </>

    )
}

export default NoteMobile