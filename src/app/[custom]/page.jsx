'use client'
import React, { useState, useEffect } from 'react';
import {
    collection,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from 'framer-motion';

function Custom({ params }) {
    const [fetchedDocumentData, setFetchedDocumentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const docRef = doc(db, "url-shortener", params.custom); // Reference the specific document
                const docSnap = await getDoc(docRef);
                setFetchedDocumentData(docSnap.data());

            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }

        };

        fetchData();

    }, [params]);

    const { push } = useRouter();



    return (
        <>

            {isLoading ? (
                <div className='w-screen h-screen flex flex-col items-center justify-between'>
                    <div className='h-[70%] w-full flex flex-col justify-center items-center'>
                        <p className='text-2xl text-green-500 font-medium pb-5'>GETTING YOUR URL</p>
                        <motion.div
                            animate={{ rotate: 360 }} // rotate 360 degrees
                            transition={{ duration: 1, delay: 1, repeat: Infinity }} // repeat the animation infinitely
                            style={{ width: 100, height: 100, }} // set your desired styles
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,12a1,1,0,0,0,1,1h6a1,1,0,0,0,0-2H9A1,1,0,0,0,8,12Zm2,3H7A3,3,0,0,1,7,9h3a1,1,0,0,0,0-2H7A5,5,0,0,0,7,17h3a1,1,0,0,0,0-2Zm7-8H14a1,1,0,0,0,0,2h3a3,3,0,0,1,0,6H14a1,1,0,0,0,0,2h3A5,5,0,0,0,17,7Z" fill='#22c55e' /></svg>
                        </motion.div>
                    </div>
                    <br />
                    <div className='p-14 md:w-[400px]'>
                        <p className='mx-1'>Powered by:</p>
                        <img src="bgicon.png" alt="" />
                    </div>
                </div>
            ) : (
                <>
                    {fetchedDocumentData ? (
                        push(fetchedDocumentData.url)

                    ) : (
                        <div className='w-screen h-screen flex items-center justify-center '>
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 400 }}
                                transition={{ duration: 0.2 }}
                                className=' md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblurred flex flex-col'>
                                <div className='w-full h-2 border-t-2 border-red-600 flex justify-between'>
                                    <div className='bg-red-600 w-4 h-2'></div>
                                    <div className='bg-red-600 w-4 h-2'></div>
                                </div>
                                <div className='w-full h-full flex flex-col gap-5 items-center justify-center px-5'>
                                    <p className='md:text-4xl text-3xl font-semibold blink-once text-red-600'>INVALID URL</p>
                                    <p className='md:text-2xl text-xl font-base text-red-500 text-center'>URL NOT FOUND</p>
                                    <p className='md:text-2xl text-xl font-base text-green-500 text-center'>The URL has either been deleted or there seems to be a misspelling in the entered URL.</p>
                                    <div className='flex flex-col gap-1'>

                                    </div>

                                </div>
                                <div className='w-full h-2 border-t-2 border-red-600 flex justify-between rotate-180'>
                                    <div className='bg-red-600 w-4 h-2'></div>
                                    <div className='bg-red-600 w-4 h-2'></div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Custom;
