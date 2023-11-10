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

function AppName() {
    const [name, setName] = useState([]);

    useEffect(() => {
        getName();
    }, []);

    const getName = async () => {
        try {
            const docRef = doc(db, "appdata", "appname");
            const querySnapshot = await getDoc(docRef);

            if (querySnapshot.exists()) {
                console.log("Document data:", querySnapshot.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            let data = [];

            // doc.data() is never undefined for query doc snapshots

            data.push(querySnapshot.data());

            setName(data);
        } catch (error) {
            alert(error);
        }
    };


    return (
        <div className='text-blue-500'>
            {name.length > 0 &&
                name.map((data, i) => {
                    return (
                        <>
                            <p>{data.appname}</p>

                        </>
                    );
                })}
        </div>
    )
}

export default AppName