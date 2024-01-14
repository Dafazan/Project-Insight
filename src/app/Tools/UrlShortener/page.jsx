'use client'
import React from 'react'
import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
    doc,
    Firestore,
    serverTimestamp, getFirestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics, auth } from "../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'
import DesktopLayout from "@/components/Layouts/desktop"
import NoteMobile from '@/components/Layouts/NoteMobile'
import AppName from '@/components/Layouts/AppName'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import QuillText from '@/components/QuillText'


function Page() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [shorten, setShorten] = useState("");

    async function addData(e) {
        e.preventDefault();
        if (!validateUrl(url)) {
            // Display an error message to the user
            alert("Please enter a valid URL.");
            return;
        }

        try {
            const collectionRef = collection(db, "url-shortener");
            const docRef = doc(collectionRef, shorten);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Handle existing document
                alert("Data already exist, try other url");
            } else {
                const newDocRef = await setDoc(docRef, {
                    title: title,
                    shorten: shorten,
                    url: url,
                    click: 0,
                    timestamp: serverTimestamp(),
                    source: "web",
                });
                alert("Data sent to Firestore successfully!");
            }
        } catch (error) {
            console.error("Error sending data:", error);
            // Handle error
        }
    }

    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    function validateUrl(url) {
        return urlRegex.test(url);
    }
    return (
        <>
            <div className='flex justify-center items-center my-5'>
                <p>URL SHORTENER</p>
            </div>
            <form onSubmit={addData} className='flex flex-col gap-5'>
                <input className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Input your url" required />
                <div className='flex justify-center '>
                    <p className='text-2xl my-auto text-green-500'>dtc.my.id/</p>
                    <input className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" value={shorten} onChange={(e) => setShorten(e.target.value)} placeholder="Choose-Shorten-Url" required />
                </div>
                <ButtonDefault
                    text={'SHORTEN URL'}
                />
            </form>
        </>
    );
}


function UrlShortener() {
    const [isLoginSuceed, setIsLoginSuceed] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setIsLoginSuceed(true);
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
                                <MobileInnerLayout isNotes={false} isEntry={true} backlink={'/Tools'}>
                                    <Page />
                                </MobileInnerLayout>
                            ) : (

                                <DesktopLayout >
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

export default UrlShortener