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
                        <h1>{data.title}</h1>
                    </>
                )
            })}
        </>
    )
}

export default Note