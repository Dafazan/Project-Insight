'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import ButtonLinkDefault from '@/components/Buttons/ButtonLinkDefault';
import CardsCanvas from '@/components/Layouts/CardsCanvas'
import TitleOnlyCard from '@/components/cards/TitleOnlyCard'


function Page() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return (


        <div className='w-full h-full flex justify-center items-center'>
            <div className='text-9xl font-medium flex'>
                <div className='flex items-center justify-center w-[180px] h-[180px] '>{hours}</div>
                <p className='flex items-center justify-center h-[180px] -translate-y-3'>:</p>
                <div className='flex items-center justify-center w-[180px] h-[180px] '>{minutes}</div>
                <p className='flex items-center justify-center h-[180px] -translate-y-3'>:</p>
                <div className='flex items-center justify-center w-[180px] h-[180px] '>{seconds}</div>
            </div>
        </div>

    )
}
function Clock() {
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <>
                    {isMobile ? (
                        <MobileLayout>
                            <div className='rotate-90'>

                                <Page />
                            </div>
                        </MobileLayout>
                    ) : (
                        <DesktopLayout>
                            <Page />
                        </DesktopLayout>
                    )}
                </>
            )}
        </>
    )
}

export default Clock