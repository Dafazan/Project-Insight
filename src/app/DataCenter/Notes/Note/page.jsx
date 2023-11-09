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
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../../firebase";
import { useEffect, useState } from "react";
import NoteMobile from '@/components/Layouts/NoteMobile'
import AppName from '@/components/Layouts/AppName'

function Note() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [dataNotes, setDataNotes] = useState([]);

    useEffect(() => {
        getDataNote(id);
    }, [id]);

    async function getDataNote(idd) {
        try {
            const docRef = doc(db, "notes", idd);
            const querySnapshot = await getDoc(docRef);
            let data = [];
            data.push(querySnapshot.data());

            setDataNotes(data);
        } catch (error) {
            alert(error);
        }
    }


    return (
        <>
            {dataNotes.map((data, i) => {

                return (
                    <>

                        <div className='w-full h-full flex flex-col'>
                            <div className='w-full bgblurblue'>
                                <div className='w-full h-2 '>
                                    <div className='w-full flex gap-1 '>
                                        <div className='w-full h-2 border-t-2 border-blue-500'></div>
                                    </div>

                                </div>
                                <div className=' p-3  uppercase'>
                                    <div className='line-clamp-1'>
                                        <p className='text-3xl'>{data.title}</p>
                                    </div>
                                    <div className='line-clamp-1'>
                                        <p className={`${data.status} font-medium`}>{data.status}</p>
                                    </div>

                                </div>
                                <div className='w-full h-2'>
                                    <div className='w-full flex gap-1 rotate-180'>
                                        <div className='w-full h-2 border-t-2 border-blue-500'></div>
                                    </div>
                                    <div className='w-full flex justify-between absolute'>

                                    </div>
                                </div>
                            </div>
                            <div className=' w-full h-[80%] border-b-2 border-blue-500 p-3 overflow-y-scroll'>
                                {data.content}
                            </div>
                            <AppName />
                        </div>

                    </>
                )
            })}
        </>
    )
}

export default Note