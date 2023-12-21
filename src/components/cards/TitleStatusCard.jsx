'use client'
import React from 'react'
import { motion } from 'framer-motion';

function TitleStatusCard({ deletion, isButtonVisible, link, status, title, incre, click, children, ...props }) {


    return (
        <>
            <motion.div {...props} className='h-44 bgblurblue border-2 border-blue-800 p-3 pb-4 hover:scale-105 duration-1000'>
                {isButtonVisible && <motion.div
                    initial={{ height: 0, }}
                    animate={{
                        height: 20,

                        transition: {
                            height: { duration: 0.1 }, delay: incre * 0.2
                        }
                    }}
                    className=' h-5 flex '>
                    <div className='w-[30px]'></div>
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{
                            opacity: 1,

                            transition: {
                                opacity: { duration: 0.1 }, delay: incre * 0.2
                            }
                        }}
                        className="flex w-full justify-between">
                        {children}


                    </motion.div>
                </motion.div>}
                <a className='w-full h-full' href={link}
                    onClick={click}>
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
                                <motion.p
                                    initial={{ opacity: 0, }}
                                    animate={{
                                        opacity: 1,
                                        transition: { delay: 0.8 }
                                    }}
                                    className={status}>{status}</motion.p>
                            </div>
                            <div className=' w-full h-full border-b-2 border-e-2 border-blue-500'></div>
                        </div>
                        <div className='text-xl text-blue-300 font-medium uppercase absolute flex items-center justify-center text-center px-5 '>
                            <h1 className='line-clamp-2 '>{title}</h1>
                        </div>
                    </div>
                </a>

            </motion.div>
        </>
    )
}

export default TitleStatusCard