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
    const [booktype, setBooktype] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState("");
    const [pages, setPages] = useState("");

    const [series, setSeries] = useState("-");
    const [cover, setCover] = useState("coverurl");

    const [data, setData] = useState([
        { title: "", booktype: "", author: "", isbn: "", publisher: "", year: "", pages: "", series: "", cover: "" },
    ]);

    const handleChange = (value) => {
        setContent(value);
    };


    const addData = async (e) => {
        e.preventDefault();

        const docRef = await addDoc(collection(db, "books"), {
            title: title,
            booktype: booktype,
            author: author,
            isbn: isbn,
            publisher: publisher,
            year: year,
            pages: pages,
            series: series,
            cover: cover,
            timestamp: serverTimestamp(),
            source: "web"
        });

        const handleUpload = () => {
            setData([
                ...data,
                { title: "", booktype: "", author: "", isbn: "", publisher: "", year: "", pages: "", series: "", cover: "" }
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
                    <p>Book Type</p>
                    <input
                        onChange={(e) => setBooktype(e.target.value)}
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