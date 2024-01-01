'use client'
import React from 'react'
import { useState, useEffect } from "react";

function Clock() {
    // const [time, setTime] = useState(new Date());

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setTime(new Date());
    //     }, 1000);

    //     // Cleanup the interval on component unmount
    //     return () => clearInterval(intervalId);
    // }, []); // Empty dependency array ensures the effect runs only once on mount

    // const hours = time.getHours().toString().padStart(2, '0');
    // const minutes = time.getMinutes().toString().padStart(2, '0');
    // const seconds = time.getSeconds().toString().padStart(2, '0');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const formattedTime = time.toLocaleTimeString();
    return (
        <div className='text-xl'><p>{formattedTime}</p></div>
    )
}

export default Clock