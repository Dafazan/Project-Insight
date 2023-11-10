'use client'
import React from 'react'
import TitleStatusCard from "@/components/cards/TitleStatusCard"
import CardsCanvas from "@/components/Layouts/CardsCanvas"
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    where,
    Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics, auth } from "../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'

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
            const q = query(ordersRef, orderBy("title"));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setDataNotes(data);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <CardsCanvas
                cols={5}
            >
                {dataNotes.map((data, i) => (
                    <>

                        <TitleStatusCard
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
                            link={`/DataCenter/Notes/Note?id=${data.id}`}
                            title={data.title}
                            status={data.status}
                            incre={i}

                        />
                    </>


                ))}
            </CardsCanvas>
        </>
    )
}

function Notes() {
    const [isLoginSuceed, setIsLoginSuceed] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                setIsLoginSuceed(true);

                // ...
            } else {
                push("/LoginPage");
                // User is signed out
                // ...
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
                                <MobileInnerLayout isNotes={true}>
                                    <Page />
                                </MobileInnerLayout>
                            ) : (
                                <Page />
                            )}
                        </>
                    )}
                </>
            ) : null}






        </>
    )
}


export default Notes