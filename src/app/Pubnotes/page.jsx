'use client'
import React from 'react'
import TitleStatusCard from "@/components/cards/TitleStatusCard"
import CardsCanvas from "@/components/Layouts/CardsCanvas"
import DesktopLayout from '@/components/Layouts/desktop'
import MobileLayout from '@/components/Layouts/mobile'
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    deleteDoc,
    query,
    where,
    Firestore,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics, auth } from "../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { isMobile } from 'react-device-detect'
import AppName from '@/components/Layouts/AppName'

function Page() {
    const [dataNotes, setDataNotes] = useState([]);
    const [dataNotesResult, setDataNotesResult] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e);
        const searchTerm = e.toLowerCase();
        const results = dataNotes.filter((item) =>
            item.title.toLowerCase().includes(searchTerm)
        );
        setDataNotesResult(results);
    };

    useEffect(() => {
        getDataNotes();
    }, []);
    async function getDataNotes() {
        try {
            const ordersRef = collection(db, "notes");
            const q = query(ordersRef,
                where("status", "==", "public"),
                orderBy("title")
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No documents found with status 'public'");
                return;
            }

            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setDataNotes(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(isVisible => !isVisible);
    };

    return (
        <>

            <CardsCanvas
                cols={5}
                morestyle={'h-full'}
            >
                {dataNotes.map((data, i) => (
                    <>


                        <TitleStatusCard

                            isButtonVisible={isVisible}
                            key={data.id}
                            initial={{ opacity: 0, height: 30, scale: 0, }}
                            animate={{
                                opacity: 1,
                                height: 160,
                                scale: 1,
                                transition: {
                                    height: { duration: 0.1 }, delay: i * 0.2
                                }
                            }}
                            link={`/Pubnotes/Note?id=${data.id}`}
                            title={data.title}
                            //status={data.status}
                            status={`DTCN${i + 2 * i * i + 360}`}
                            incre={i}

                        >

                        </TitleStatusCard>


                    </>


                ))}
            </CardsCanvas>
        </>
    )
}

function Pubnotes() {
    const [isLoginSuceed, setIsLoginSuceed] = useState(false);
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
                            <MobileInnerLayout isNotes={true} isLists={true} backlink={'#'} entrylink={'/DataCenter/Notes/NoteEntry'}>
                                <Page />
                            </MobileInnerLayout>
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


export default Pubnotes