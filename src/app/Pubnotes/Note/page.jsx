'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import DesktopLayout from '@/components/Layouts/desktop'
import MobileLayout from '@/components/Layouts/mobile'
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
import { db, storage, firebaseAnalytics, auth } from "../../../firebase";
import { useEffect, useState } from "react";
import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { isMobile } from 'react-device-detect'
import NoteMobile from '@/components/Layouts/NoteMobile'
import AppName from '@/components/Layouts/AppName'
import parser from "html-react-parser";
import "react-quill/dist/quill.snow.css";

function Page() {
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
            {
                dataNotes.map((data, i) => {

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
                                <div className=' w-full h-[80%] border-b-2 border-blue-500 p-3 overflow-y-scroll  '>
                                    <div className='ql-editor'>
                                        {parser(
                                            data.content
                                        )}
                                    </div>

                                </div>
                                <div className='flex justify-between uppercase'>
                                    <AppName />
                                    <div className=' bg-red-500 px-2 font-semibold'>
                                        <a href="/Pubnotes">Dismiss</a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }

        </>

    )
}

function Note() {
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

                            <MobileInnerLayout isNotes={true} entrylink={'/DataCenter/Notes/NoteEntry'} backlink={'/Pubnotes'} >
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

export default Note