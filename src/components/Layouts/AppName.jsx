import React from 'react'
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
} from "firebase/firestore";
import { db, storage, firebaseAnalytics } from "../../firebase";
import { useEffect, useState } from "react";

const AppName = () => {
    const [name, setName] = useState("");
    useEffect(() => {
        getDataAboutName();
    }, []);
    async function getDataAboutName() {
        try {
            const docRef = doc(db, "appdata", "appname");
            const querySnapshot = await getDoc(docRef);
            let data = [];
            data.push(querySnapshot.data());
            setName(data[0].no);
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className='text-blue-500'><p>{name}</p></div>
    )
}

export default AppName