'use client'
import React from 'react'
import TitleStatusCard from "@/components/cards/TitleStatusCard"
import TitleOnlyCard from "@/components/cards/TitleOnlyCard"
import CardsCanvas from "@/components/Layouts/CardsCanvas"
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    where,
    Firestore,
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../../firebase";
import { useEffect, useState } from "react";

function Notes() {
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
    return (
        <CardsCanvas
            cols={5}
        >
            {dataNotes.map((data, i) => (
                <>

                    <TitleStatusCard
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

                    />
                </>


            ))}
        </CardsCanvas>
    )
}


export default Notes