
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
    return (
        <>
            <div className='w-full h-full'>
                <p>Page Under Constructions</p>
                <br />
                <p>Added Features:</p>
                <p>Authentication</p>
                <p>Notes with privacy options</p>
                <p>Clock</p>
                <p>URL Shortener</p>
                <p>Startup Page</p>
                <p></p>
                <p></p>
                <p></p>
                <br />

                <br />
                <p>Made With</p>
                <p>Next.Js</p>
                <p>Tailwind</p>
                <p>Firebase</p>
                <br />
                <br />
                <p>2023 Copyright Dafazan</p>
            </div>
        </>
    )
}
function Info() {
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

export default Info