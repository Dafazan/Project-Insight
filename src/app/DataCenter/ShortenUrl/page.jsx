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
    increment,
    limit,
    startAfter
} from "firebase/firestore";
import { db, storage, firebaseAnalytics, auth } from "../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'
import AppName from '@/components/Layouts/AppName'
import SideButton from '@/components/Buttons/SideButton'
import SideLink from '@/components/Buttons/SideLink'
import DesktopLayout from "@/components/Layouts/desktop"

function Page({ visibility, page }) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // Update internal state when the visibility prop changes
        setIsVisible(visibility);
    }, [visibility]);


    const [dataUrl, setDataUrl] = useState([]);
    const [dataUrlResult, setDataUrlResult] = useState([]);
    const [search, setSearch] = useState("");



    const handleSearch = (e) => {
        setSearch(e);
        const searchTerm = e.toLowerCase();
        const results = dataUrl.filter((item) =>
            item.title.toLowerCase().includes(searchTerm)
        );
        setDataUrlResult(results);
    };

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(page)
    }, [page]);
    const itemsPerPage = 15;

    useEffect(() => {
        getDataUrl();
    }, [currentPage]);

    async function getDataUrl() {
        try {
            const ordersRef = collection(db, "url-shortener");
            const q = query(ordersRef, orderBy("title"));
            const querySnapshot = await getDocs(q);

            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });

            setDataUrl(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const websiteHostname = window.location.hostname.substring(4);
    return (
        <>

            {dataUrl.map((data, i) => (
                <>
                    <div className='mb-2'>

                        <div className='md:w-full w-[95%] bgblurbluef border-y-2 border-blue-800 break-words flex justify-between'>
                            <div className='w-[50%]'><p className='line-clamp-1 uppercase text-2xl text-blue-300 px-2'>{data.title}</p>
                                <p className=' text-base px-2 line-clamp-1'>{data.url}</p>
                                <p className=' text-base px-2'>{websiteHostname}/{data.shorten}</p></div>
                            <div className=' px-2 flex justify-center items-center font-medium'>
                                <button onClick={
                                    async () => {
                                        try {
                                            await navigator.clipboard.writeText(websiteHostname + "/" + data.shorten);
                                            alert('Text copied to clipboard!');
                                        } catch (err) {
                                            console.error('Error copying text:', err);
                                            alert('Failed to copy text. Please try again.');
                                        }
                                    }
                                } className=' border-x-2 border-blue-500 px-2 hover:bg-blue-900'>COPY</button>
                                <button onClick={async (e) => {
                                    const confirmed = window.confirm(
                                        "Are you sure you want to delete this item?"
                                    );
                                    if (confirmed) {
                                        try {
                                            // Delete the todo document with the given ID from the "todos" collection in Firestore.
                                            await deleteDoc(
                                                doc(db, "url-shortener", data.id)
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
                                }} className=' border-e-2 text-red-600 hover:text-white border-blue-500 px-2 hover:bg-red-600'>DELETE</button>
                            </div>
                        </div>
                    </div>
                </>
            ))}

        </>
    )
}

function ShortenUrl() {
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

    const [isOption, setIsOption] = useState(false);

    const toggleVisibility = () => {
        setIsOption(isOption => !isOption);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            {isLoginSuceed ? (
                <>
                    {isClient && (
                        <>
                            {isMobile ? (
                                <div className='w-full'>
                                    <MobileInnerLayout isNotes={true} isLists={true} backlink={'#'} entrylink={'/DataCenter/Notes/NoteEntry'}>
                                        <Page visibility={isOption} />
                                    </MobileInnerLayout>
                                </div>
                            ) : (
                                <DesktopLayout
                                    button1={<SideLink link={'/Tools/UrlShortener'} text={'ADD'} />}
                                    button2={<SideButton click={toggleVisibility} text={'EDIT'} />}
                                    button6={<SideButton click={handlePrevPage} text={'PREV'} />}
                                    button12={<SideButton click={handleNextPage} text={'NEXT'} />}
                                >

                                    <Page visibility={isOption} />
                                </DesktopLayout>
                            )}
                        </>
                    )}
                </>
            ) : null}






        </>
    )
}


export default ShortenUrl