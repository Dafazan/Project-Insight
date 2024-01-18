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
import SideLink from '@/components/Buttons/SideLink'
import SideButton from '@/components/Buttons/SideButton'
import AppName from '@/components/Layouts/AppName'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import { motion } from 'framer-motion';


function Page() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [shorten, setShorten] = useState("");

    const [isInvalidUrl, setIsInvalidUrl] = useState(false);
    const [isUsedUrl, setIsUsedUrl] = useState(false);
    const [isSucceed, setIsSucceed] = useState(false);
    const websiteHostname = window.location.hostname.substring(4);;
    async function addData(e) {
        e.preventDefault();
        if (!validateUrl(url)) {
            setIsInvalidUrl(true);
            //alert("Please enter a valid URL.");
            return;
        }

        try {
            const collectionRef = collection(db, "url-shortener");
            const docRef = doc(collectionRef, shorten);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setIsUsedUrl(true);
                //alert("Data already exist, try other url");
            } else {
                const newDocRef = await setDoc(docRef, {
                    title: title,
                    shorten: shorten,
                    url: url,
                    click: 0,
                    timestamp: serverTimestamp(),
                    source: "web",
                });
                setIsSucceed(true);
                //alert("Data sent to Firestore successfully!");
            }
        } catch (error) {
            console.error("Error sending data:", error);
            // Handle error
        }
    }

    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const [textToCopy, setTextToCopy] = useState(''); // State to store the text to be copied

    // ... other component logic

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(websiteHostname + "/" + shorten);
            alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Error copying text:', err);
            alert('Failed to copy text. Please try again.');
        }
    };

    const handleClear = () => {
        setTitle("");
        setShorten("");
        setUrl("");
    }
    const handleMakeMore = () => {
        setIsSucceed(false);
        setTitle("");
        setShorten("");
        setUrl("");
    };

    const handleUsedUrl = () => {
        setIsUsedUrl(false);
    }
    const handleInvalidUrl = () => {
        setIsInvalidUrl(false);
    }

    function Succeed() {
        return (
            <>
                <div className='absolute w-full h-full bgblur'></div>
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 400 }}
                    transition={{ duration: 0.2 }}
                    className='absolute md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblurgreen flex flex-col'>
                    <div className='w-full h-2 border-t-2 border-green-600 flex justify-between'>
                        <div className='bg-green-600 w-4 h-2'></div>
                        <div className='bg-green-600 w-4 h-2'></div>
                    </div>
                    <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
                        <p className='md:text-5xl text-4xl font-semibold text-green-500 '>SUCCESS</p>
                        <p className='mt-4'>YOUR CUSTOM URL IS READY TO USE</p>
                        <div className='flex flex-col gap-1'>

                            <ButtonDefault
                                className='md:scale-100 scale-90'
                                text={'COPY TO CLIPBOARD'}
                                action={handleCopy}
                            />
                            <ButtonDefault
                                className='md:scale-100 scale-90'
                                text={'ADD OTHER CUSTOM URL'}
                                action={handleMakeMore}
                            />

                        </div>
                    </div>
                    <div className='w-full h-2 border-t-2 border-green-600 flex justify-between rotate-180'>
                        <div className='bg-green-600 w-4 h-2'></div>
                        <div className='bg-green-600 w-4 h-2'></div>
                    </div>
                </motion.div>
            </>
        )
    }

    function UsedUrl() {
        return (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 400 }}
                transition={{ duration: 0.2 }}
                className='absolute md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblurred flex flex-col'>
                <div className='w-full h-2 border-t-2 border-red-600 flex justify-between'>
                    <div className='bg-red-600 w-4 h-2'></div>
                    <div className='bg-red-600 w-4 h-2'></div>
                </div>
                <div className='w-full h-full flex flex-col gap-5 items-center justify-center px-5'>
                    <p className='md:text-4xl text-3xl font-semibold blink-once text-red-600'>URL USED</p>
                    <p className='md:text-2xl text-xl font-base text-green-500 text-center'>YOUR PREFERED CUSTOM URL HAS ALREADY BEEN USED, TRY ANOTHER URL</p>
                    <div className='flex flex-col gap-1'>

                        <ButtonDefault
                            className='md:scale-100 scale-90'
                            text={'TRY OTHER CUSTOM URL'}
                            action={handleUsedUrl}
                        />
                    </div>

                </div>
                <div className='w-full h-2 border-t-2 border-red-600 flex justify-between rotate-180'>
                    <div className='bg-red-600 w-4 h-2'></div>
                    <div className='bg-red-600 w-4 h-2'></div>
                </div>
            </motion.div>
        )
    }
    function InvalidUrl() {
        return (

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 400 }}
                transition={{ duration: 0.2 }}
                className='absolute md:w-3/6 w-[95%] md:h-5/6 h-[70%] bgblurred flex flex-col'>
                <div className='w-full h-2 border-t-2 border-red-600 flex justify-between'>
                    <div className='bg-red-600 w-4 h-2'></div>
                    <div className='bg-red-600 w-4 h-2'></div>
                </div>
                <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
                    <p className='md:text-4xl text-center text-3xl font-semibold blink-once text-red-600'>INVALID URL</p>
                    <p className='md:text-2xl text-center text-xl font-base text-green-500 '>VALID URL EXAMPLE: <span className='font-semibold'>&#34;https://www.website.com&#34;</span></p>
                    <div className='flex flex-col gap-1'>

                        <ButtonDefault
                            className='md:scale-100 scale-90'
                            text={'TRY OTHER URL'}
                            action={handleInvalidUrl}
                        />
                    </div>

                </div>
                <div className='w-full h-2 border-t-2 border-red-600 flex justify-between rotate-180'>
                    <div className='bg-red-600 w-4 h-2'></div>
                    <div className='bg-red-600 w-4 h-2'></div>
                </div>
            </motion.div>
        );
    }

    function validateUrl(url) {
        return urlRegex.test(url);
    }

    return (
        <>
            <div className='flex w-full h-full justify-center items-center'>
                <div className="w-full">
                    <div className='flex justify-center items-center my-5 w-full md:text-3xl text-2xl'>
                        <p>URL SHORTENER</p>
                    </div>
                    <form onSubmit={addData} className='flex flex-col gap-5 w-full'>
                        <input className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                        <input onKeyDown={(event) => (event.keyCode === 32 ? event.preventDefault() : null)} className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Input your url, ex. https://www.yourwebsite/page.domain" required />
                        <div className='flex-col flex md:flex-row justify-center '>
                            <p className='text-2xl my-auto text-green-500'>{websiteHostname}/</p>
                            <input onKeyDown={(event) => (event.keyCode === 32 ? event.preventDefault() : null)} className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" value={shorten} onChange={(e) => setShorten(e.target.value)} placeholder="Choose-Shorten-Url" required />
                        </div>
                        <ButtonDefault
                            text={'SHORTEN URL'}
                        />
                    </form>

                </div>
                {
                    isSucceed ? <>

                        <Succeed />
                    </> : null
                }
                {
                    isUsedUrl ? <>
                        <UsedUrl />
                    </> : null
                }
                {
                    isInvalidUrl ? <>
                        <InvalidUrl />
                    </> : null
                }
            </div>
        </>
    );
}


function UrlShortener() {

    const handleRefresh = () => {
        window.location.reload();
    }
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

                                <DesktopLayout
                                    button1={<SideLink link={'/Tools'} text={'ESC'} />}
                                    button2={<SideButton click={handleRefresh} text={'RLD'} />}
                                >
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