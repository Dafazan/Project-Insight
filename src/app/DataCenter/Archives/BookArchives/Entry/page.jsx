'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    getDoc,
    deleteDoc,
    updateDoc,
    doc,
    Firestore,
    serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../../../../firebase-p";
import { auth } from "../../../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'
import NoteMobile from '@/components/Layouts/NoteMobile'
import AppName from '@/components/Layouts/AppName'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import QuillText from '@/components/QuillText'


function EntryForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState("");
    const [pages, setPages] = useState("");
    const [isSeries, setIsSeries] = useState();
    const [series, setSeries] = useState("-");
    const [cover, setCover] = useState("coverurl");

    const [data, setData] = useState([
        { title: "", author: "", isbn: "", publisher: "", year: "", pages: "", isSeries: "", series: "", cover: "" },
    ]);

    const handleChange = (value) => {
        setContent(value);
    };


    const addData = async (e) => {
        e.preventDefault();

        const docRef = await addDoc(collection(db, "books"), {
            title: title,
            author: author,
            isbn: isbn,
            publisher: publisher,
            year: year,
            pages: pages,
            isSeries: isSeries,
            series: series,
            cover: cover,
            timestamp: serverTimestamp(),
            source: "web"
        });

        const handleUpload = () => {
            setData([
                ...data,
                { title: "", author: "", isbn: "", publisher: "", year: "", pages: "", isSeries: "", series: "", cover: "" }
            ]);
        };

        alert("success");
    };


    return (
        <>
            <div className="flex justify-center items-center w-screen md:p-10 pt-10 p-3 h-screen overflow-y-scroll">

                <form onSubmit={addData} className='md:w-[50%] h-full w-full flex flex-col gap-3'>
                    <p>Book Title</p>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>Book Author</p>
                    <input
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>Book Cover</p>
                    <input
                        onChange={(e) => setCover(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>BOOK TYPE</p>
                    <div className='flex gap-2 w-full mt-2'>
                        <label className='w-full'>
                            <div className=' flex justify-center items-center relative p-1'>
                                <input
                                    type="radio"
                                    value="false"
                                    className='appearance-none border-2 border-blue-500 absolute w-full h-full checked:bg-red-500 checked:border-red-500 p-2 cursor-pointer transition duration-300'
                                    checked={isSeries === false}
                                    onChange={() => setIsSeries(true)}
                                />
                                <p className='z-20'>SERIES</p>
                            </div>
                        </label>
                        <label className='w-full'>
                            <div className=' flex justify-center items-center relative p-1'>
                                <input
                                    type="radio"
                                    value="true"
                                    className='appearance-none border-2 border-blue-500 absolute w-full h-full checked:bg-green-600 checked:border-green-500 p-2 cursor-pointer transition duration-300'
                                    checked={isSeries === true}
                                    onChange={() => setIsSeries(false)}
                                />
                                <p className='z-20'>STANDALONE</p>
                            </div>
                        </label>
                    </div>
                    <p>Book series</p>
                    <input
                        onChange={(e) => setSeries(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>Book ISBN</p>
                    <input
                        onChange={(e) => setIsbn(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>Pages</p>
                    <input
                        onChange={(e) => setPages(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>Book Publisher</p>
                    <input
                        onChange={(e) => setPublisher(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <p>Book Year</p>
                    <input
                        onChange={(e) => setYear(e.target.value)}
                        type="text"
                        className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1'
                    />
                    <ButtonDefault
                        text={'SUBMIT'}
                    />
                </form>

            </div>
        </>
    )
}

function BookEntry() {
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

                                <EntryForm />

                            ) : (
                                <EntryForm />
                            )}
                        </>
                    )}
                </>
            ) : null}
        </>

    )
}

export default BookEntry