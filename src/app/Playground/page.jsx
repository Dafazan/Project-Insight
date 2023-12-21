'use client'
import React from 'react'
import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    orderBy,
    query,

} from "firebase/firestore";
import { db, } from "../../firebase";

function Playground() {
    const [dataTotal, setDataTotal] = useState([]);

    useEffect(() => {
        getDataTotal();
    }, []);
    async function getDataTotal() {
        try {
            const ordersRef = collection(db, "count");
            const q = query(ordersRef, orderBy("total"));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setDataTotal(data);

        } catch (error) {
            console.log(error);
        }
    }
    const totalSum = dataTotal.reduce((acc, data) => acc + data.total, 0,);

    return (
        <div className='p-10'>
            {dataTotal.map((data, i) => (
                <>
                    <p key={i}>{data.total}</p>
                </>
            ))}
            <p>Total Sum: {totalSum}</p>
        </div>
    )
}

export default Playground