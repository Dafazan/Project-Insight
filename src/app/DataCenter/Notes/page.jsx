'use client'
import React from 'react'
import TitleStatusCard from "@/components/cards/TitleStatusCard"
import CardsCanvas from "@/components/Layouts/CardsCanvas"
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
import { db, storage, firebaseAnalytics, auth } from "../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
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
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(isVisible => !isVisible);
    };

    return (
        <>

            <button onClick={toggleVisibility} >
                option
            </button>
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
                            link={`/DataCenter/Notes/Note?id=${data.id}`}
                            title={data.title}
                            status={data.status}
                            incre={i}

                        >
                            <button
                                onClick={async (e) => {
                                    const confirmed = window.confirm(
                                        "Are you sure you want to delete this item?"
                                    );
                                    if (confirmed) {
                                        try {
                                            // Delete the todo document with the given ID from the "todos" collection in Firestore.
                                            await deleteDoc(
                                                doc(db, "notes", data.id)
                                            );
                                            alert("delete success");
                                            location.reload();
                                            console.log("Deleted successfully");
                                        } catch (error) {
                                            console.error(
                                                "An error occured",
                                                error
                                            );
                                        }
                                    }
                                }}

                                className='bg-red-600 px-2'>DEL</button>
                            <button
                                onClick={async (e) => {
                                    const confirmed = window.confirm(
                                        "Change the visibility?"
                                    );
                                    const docRef = doc(db, 'notes', data.id);
                                    if (confirmed) {
                                        try {

                                            await updateDoc(docRef, {
                                                status: 'private',
                                            });
                                            alert("update success");
                                            location.reload();
                                            console.log("updated successfully");
                                        } catch (error) {
                                            console.error(
                                                "An error occured",
                                                error
                                            );
                                        }
                                    }
                                }}
                                className='border-2 border-b-0 border-blue-500 px-2 text-red-600'>PRI</button>
                            <button
                                onClick={async (e) => {
                                    const confirmed = window.confirm(
                                        "Change the visibility?"
                                    );
                                    const docRef = doc(db, 'notes', data.id);
                                    if (confirmed) {
                                        try {

                                            await updateDoc(docRef, {
                                                status: 'public',
                                            });
                                            alert("update success");
                                            location.reload();
                                            console.log("updated successfully");
                                        } catch (error) {
                                            console.error(
                                                "An error occured",
                                                error
                                            );
                                        }
                                    }
                                }}
                                className='border-2 border-b-0 border-blue-500 px-2 text-green-500'>PUB</button>
                        </TitleStatusCard>


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
                                <MobileInnerLayout isNotes={true} isLists={true} backlink={'#'} entrylink={'/DataCenter/Notes/NoteEntry'}>
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