
'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import MobileLayout from "@/components/Layouts/mobile"
import DesktopLayout from "@/components/Layouts/desktop"
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import ButtonLinkDefault from '@/components/Buttons/ButtonLinkDefault';
import CardsCanvas from '@/components/Layouts/CardsCanvas'
import TitleOnlyCard from '@/components/cards/TitleOnlyCard'

function Page() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEngine, setSelectedEngine] = useState('google');



    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            // Define search engine URLs
            const searchEngines = {
                google: 'https://www.google.com/search?q=',
                bing: 'https://www.bing.com/search?q=',
                yahoo: 'https://search.yahoo.com/search?p=',
                duckduckgo: 'https://duckduckgo.com/?q=',
            };

            // Use router to navigate to the selected search engine
            const selectedUrl = searchEngines[selectedEngine];
            router.push(`${selectedUrl}${encodeURIComponent(searchQuery)}`);
        }

    };
    return (
        <>
            <div className='py-10'>

                <form onSubmit={handleSubmit}>
                    <div className='flex gap-2'>
                        <motion.select
                            initial={{
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    height: { duration: 0.8 }
                                }
                            }}
                            className="text-blue-300  border-2 border-blue-500 focus:outline-none focus:border-opacity-100 blurwindow px-3 rounded-s-xl"
                            value={selectedEngine}
                            onChange={(e) => setSelectedEngine(e.target.value)}
                        >
                            <option
                                className='bg-blue-500 text-black'
                                value="google">Google</option>
                            <option
                                className='bg-blue-500 text-black'
                                value="bing">Bing</option>
                            <option
                                className='bg-blue-500 text-black'
                                value="yahoo">Yahoo</option>
                            <option
                                className='bg-blue-500 text-black'
                                value="duckduckgo">DuckDuckGo</option>
                        </motion.select>
                        <motion.input
                            initial={{
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    height: { duration: 0.8 }, delay: 0.2
                                }
                            }}
                            className="text-blue-300  border-2 border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 blurwindow px-3  py-1"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <motion.button
                            initial={{
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    height: { duration: 0.8 }, delay: 0.3
                                }
                            }}
                            type="submit" className='blurwindow px-3 border-2 border-blue-500 rounded-e-xl hover:bg-blue-500 font-medium duration-100'>SEARCH</motion.button>

                    </div>
                </form>
            </div>
            <CardsCanvas cols={4}>
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 },
                        }
                    }}
                    link="/"
                    title='HQ' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.2
                        }
                    }}
                    link="https://github.com/"
                    title='GitHub' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.4
                        }
                    }}
                    link="https://vercel.com/dashboard"
                    title='Vercel' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.8
                        }
                    }}
                    link="https://console.firebase.google.com/u/0/"
                    title='Firebase' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 1
                        }
                    }}
                    link="https://mail.google.com/mail/u/0/"
                    title='G-Mail' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 1
                        }
                    }}
                    link="https://chat.openai.com/"
                    title='GPT' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 1.2
                        }
                    }}
                    link="https://drive.google.com/drive/my-drive"
                    title='G-Drive' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -800,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 1.4
                        }
                    }}
                    link="https://www.youtube.com/"
                    title='YouTube' />
            </CardsCanvas>
            <div className='w-full flex justify-center'>
                <button>
                    <svg width="104" height="19" viewBox="0 0 104 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.41421 0C0.523309 0 0.077143 1.07714 0.707108 1.70711L17.7071 18.7071C17.8946 18.8946 18.149 19 18.4142 19H85.5858C85.851 19 86.1054 18.8946 86.2929 18.7071L103.293 1.70711C103.923 1.07714 103.477 0 102.586 0H1.41421Z" fill="#1E40AF" />
                    </svg>

                </button>
            </div>
        </>
    )
}

function Startup() {
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

export default Startup
