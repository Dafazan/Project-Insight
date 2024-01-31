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
import { db, storage } from "../../../../firebase-p";
import { auth } from "../../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'
import AppName from '@/components/Layouts/AppName'
import SideButton from '@/components/Buttons/SideButton'
import SideLink from '@/components/Buttons/SideLink'
import DesktopLayout from "@/components/Layouts/desktop"

function BookArchives() {
    const [dataBooks, setDataBooks] = useState([]);
    useEffect(() => {
        getDataBooks();
    }, []);

    async function getDataBooks() {
        try {
            const ordersRef = collection(db, "books");
            const q = query(ordersRef, orderBy("title"));
            const querySnapshot = await getDocs(q);

            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });

            setDataBooks(data);
            console.log('Fetched data:', data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (
        <>
            <div className='h-screen w-screen overflow-y-scroll'>
                <p>Record Found: {dataBooks.length} Entry</p>
                {dataBooks.length === 0 ? (
                    <p>No books found</p>
                ) : (
                    dataBooks.map((data, i) => (
                        <div key={i} className='pb-5 flex w-[50%] justify-between'>
                            <div>
                                <p>{data.title}</p>
                                <p>ISBN: {data.isbn}</p>
                                <p>Author: {data.author}</p>
                                <p>Published By: {data.publisher}, {data.year}</p>
                                <p>Pages: {data.pages}</p>
                                <p>type: {data.booktype}</p>
                                <p>ID: {data.id}</p>

                            </div>
                            <div><button
                                onClick={async (e) => {
                                    const docRef = doc(db, 'books', data.id);

                                    try {
                                        await updateDoc(docRef, { booktype: 'fiction' }); // Update document with new field
                                        alert("Update successful");
                                        console.log("Document updated successfully");
                                    } catch (error) {
                                        console.error("An error occurred:", error);
                                    }
                                }}
                                className='border-2 border-b-0 border-blue-500 px-2 text-green-500'>FICTION</button></div>
                            <div><button
                                onClick={async (e) => {
                                    const docRef = doc(db, 'books', data.id);

                                    try {
                                        await updateDoc(docRef, { booktype: 'nonfiction' }); // Update document with new field
                                        alert("Update successful");
                                        console.log("Document updated successfully");
                                    } catch (error) {
                                        console.error("An error occurred:", error);
                                    }
                                }}
                                className='border-2 border-b-0 border-blue-500 px-2 text-green-500'>NONFIC</button></div>
                        </div>
                    ))
                )}
            </div>

        </>
    )
}

export default BookArchives