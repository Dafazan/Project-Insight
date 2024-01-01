'use client'
import React from 'react';
import { useState, useEffect } from "react";
import MobileLayout from "@/components/Layouts/mobile";
import DesktopLayout from "@/components/Layouts/desktop";
import { isMobile } from 'react-device-detect';
import TitleStatusCard from "@/components/cards/TitleStatusCard";
import TitleOnlyCard from "@/components/cards/TitleOnlyCard";
import CardsCanvas from "@/components/Layouts/CardsCanvas";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout';
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import AppName from '@/components/Layouts/AppName';
import SideButton from '@/components/Buttons/SideButton'




function Page() {

    return (
        <>
            <CardsCanvas cols={3}>
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -500,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 },
                        }
                    }}
                    link="/DataCenter/Notes"
                    title='Notes' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -500,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.2
                        }
                    }}
                    link="/DataCenter/Archives"
                    title='Archives' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -500,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.4
                        }
                    }}
                    link="/DataCenter/Tasks"
                    title='Tasks' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -500,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.5
                        }
                    }}
                    link="/DataCenter/Letters"
                    title='Letters' />
                <TitleOnlyCard
                    initial={{
                        opacity: 0,
                        x: -500,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            height: { duration: 0.8 }, delay: 0.6
                        }
                    }}
                    link="/DataCenter/ImageArchives"
                    title='Image Archives' />
            </CardsCanvas>
        </>
    )
}

function DataCenter() {
    const [isLoginSuceed, setIsLoginSuceed] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setIsLoginSuceed(true);

                // ...
            } else {
                push("/LoginPage");
            }
        });
    }, []);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isLoginSuceed ? (
                <>
                    {isClient && (
                        <>
                            {isMobile ? (
                                <MobileInnerLayout isLists={true} >
                                    <Page />
                                </MobileInnerLayout>
                            ) : (
                                <DesktopLayout>

                                    <Page />
                                </DesktopLayout>
                            )}
                        </>
                    )}
                </>
            ) : null}






        </>
    )
}

export default DataCenter