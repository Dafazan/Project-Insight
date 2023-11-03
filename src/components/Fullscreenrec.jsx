'use client'
import React from 'react'
import { useEffect, useState } from 'react';

function Fullscreenrec() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            // Enter fullscreen mode
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }

        setIsFullscreen(!isFullscreen);
    };


    return (
        <div className={isFullscreen ? 'hidden duration-200' : 'duration-200 w-screen h-screen bgblur flex justify-center items-center z-50'}>

            <div className='w-full h-full flex flex-col justify-center items-center gap-5'>
                <p className='text-3xl'>It Works Better In Fullscreen Mode</p>
                <button className='bg-blue-950 px-5 py-2 hover:scale-110 duration-100 border-2 border-blue-500' onClick={toggleFullscreen}>
                    Enter Fullscreen Mode
                </button>
            </div>


        </div>
    )
}

export default Fullscreenrec