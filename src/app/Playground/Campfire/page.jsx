'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect';
import { motion, useAnimation } from 'framer-motion';
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import ButtonLinkDefault from '@/components/Buttons/ButtonLinkDefault';
import CardsCanvas from '@/components/Layouts/CardsCanvas'
import TitleOnlyCard from '@/components/cards/TitleOnlyCard'


function Page() {
    const controls = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();
    const controls5 = useAnimation();

    useEffect(() => {
        const animation = async () => {
            while (true) {
                // Move the div up
                await controls.start({ y: -40 });
                // Move the div down
                await controls.start({ y: 0 });
            }
        };

        animation();
    }, [controls]);
    useEffect(() => {
        const animation2 = async () => {
            while (true) {
                // Move the div up
                await controls2.start({ y: -35 });
                // Move the div down
                await controls2.start({ y: 0 });
            }
        };

        animation2();
    }, [controls2]);
    useEffect(() => {
        const animation3 = async () => {
            while (true) {
                // Move the div up
                await controls3.start({ y: -20 });
                // Move the div down
                await controls3.start({ y: 0 });
            }
        };

        animation3();
    }, [controls3]);
    useEffect(() => {
        const animation3 = async () => {
            while (true) {
                // Move the div up
                await controls3.start({ y: -20 });
                // Move the div down
                await controls3.start({ y: 0 });
            }
        };

        animation3();
    }, [controls3]);
    useEffect(() => {
        const animation4 = async () => {
            while (true) {
                // Move the div up
                await controls4.start({ y: -28 });
                // Move the div down
                await controls4.start({ y: 0 });
            }
        };

        animation4();
    }, [controls4]);
    useEffect(() => {
        const animation5 = async () => {
            while (true) {
                // Move the div up
                await controls5.start({ y: -38 });
                // Move the div down
                await controls5.start({ y: 0 });
            }
        };

        animation5();
    }, [controls5]);

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='relative'>
                <div className='flex absolute z-50'>
                    <div className='bg-orange-950 w-[20px] h-[100px] rounded-full rotate-[25deg]'></div>
                    <div className='bg-orange-950 w-[20px] h-[100px] rounded-full rotate-[5deg]'></div>
                    <div className='bg-orange-950 w-[20px] h-[100px] rounded-full -rotate-[5deg]'></div>
                    <div className='bg-orange-950 w-[20px] h-[100px] rounded-full -rotate-[25deg]'></div>
                </div>
                <div className='flex absolute z-50'>
                    <div className='bg-orange-800 w-[20px] h-[100px] rounded-full rotate-45'></div>
                    <div className='bg-orange-900 w-[20px] h-[100px] rounded-full rotate-12'></div>
                    <div className='bg-orange-800 w-[20px] h-[100px] rounded-full -rotate-12'></div>
                    <div className='bg-orange-900 w-[20px] h-[100px] rounded-full -rotate-45'></div>
                </div>
                <div className='flex absolute'>
                    <motion.div animate={controls} className='bg-yellow-500 w-[20px] h-[70px] rounded-full '></motion.div>
                    <motion.div animate={controls2} className='bg-yellow-500 w-[20px] h-[75px] rounded-full '></motion.div>
                    <motion.div animate={controls5} className='bg-yellow-500 w-[20px] h-[60px] rounded-full '></motion.div>
                    <motion.div animate={controls3} className='bg-yellow-500 w-[20px] h-[70px] rounded-full '></motion.div>

                </div>
                <div className='flex'>
                    <motion.div animate={controls2} className='bg-orange-600 w-[20px] h-[70px] rounded-full '></motion.div>
                    <motion.div animate={controls3} className='bg-orange-600 w-[20px] h-[60px] rounded-full '></motion.div>
                    <motion.div animate={controls4} className='bg-orange-600 w-[20px] h-[60px] rounded-full '></motion.div>
                    <motion.div animate={controls} className='bg-orange-600 w-[20px] h-[70px] rounded-full '></motion.div>

                </div>
            </div>
        </div>
    )
}
function Campfire() {
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
                            <Page />
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

export default Campfire