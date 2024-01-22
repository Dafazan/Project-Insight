'use client'

import MobileInnerLayout from '@/components/Layouts/MobileInnerLayout'
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from 'react-device-detect'
import DesktopLayout from "@/components/Layouts/desktop"
import SideLink from '@/components/Buttons/SideLink'
import SideButton from '@/components/Buttons/SideButton'
import AppName from '@/components/Layouts/AppName'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import { motion } from 'framer-motion';
import { db, storage, firebaseAnalytics, auth } from "../../../firebase";

import React, { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import html2canvas from 'html2canvas';

async function downloadElementAsPNG(elementId, fileName) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with id ${elementId} not found.`);
        return;
    }

    try {
        // Use html2canvas to create a canvas image from the element
        const canvas = await html2canvas(element, {
            foreignObjectRendering: true,
        });

        // Convert the canvas to a data URL representing a PNG image
        const dataURL = canvas.toDataURL('image/png');

        // Create a link element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = fileName;

        // Append the link to the document and trigger a click to start the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up by removing the link from the document
        document.body.removeChild(downloadLink);
    } catch (error) {
        console.error('Error generating PNG:', error);
    }
}

function QrGenerator() {
    const [isLoginSuceed, setIsLoginSuceed] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setIsLoginSuceed(true);
            } else {
                push("/LoginPage");
            }
        });
    }, []);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const { Canvas } = useQRCode();
    const logoDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAidEVYdEZpbGUARTpcM0RcM0Qgb2JqZWN0c1xkIGxvZ28uYmxlbmQaoFPqAAAAGHRFWHREYXRlADIwMjIvMDgvMjcgMTc6MDM6MTjmdtonAAAAEHRFWHRUaW1lADAwOjAwOjA0OjE4A2Y4cAAAAAl0RVh0RnJhbWUAMTE4oFT28AAAABF0RVh0Q2FtZXJhAENhbWVyYS4wMDKL1wjFAAAAC3RFWHRTY2VuZQBTY2VuZeUhXZYAAAATdEVYdFJlbmRlclRpbWUAMDA6MDguMTfi/NJMAAAETUlEQVR4Xu2cy27TQBSGE8cVogqFoFJAbGGBBA/AijehSBSJBRILNojLAomy4wnYsOj7IJXbgl0XVAXKJSmNWiUx/zEzlTFJmDSZ8bH7f9KRZ8bjxD6fj6ekJTVCCCGEkCPDYDA40+v17iVJcsoMkSKAiNOIh4gtBHwkJ80uEpKMiE9iQUCFiJQFM4WEYJiIfr+fbiHkM4UEYpQIGwKFBEBEINGPkPTNNOsgK8KGGacQX4gIxMiKyIfACvHApCJsCBQyQw4rwoaZH0RI3WwriYjA5g7ibr1eP2/GZDMRURTJcV/wGhfRbpthL0RmWylEhCzWuLHfIYmrIkNEHEaGBa9lWn6pVIWICGymrog8rJAJwd07t7+//wDNt7OqiKKoRIV0Op2lZrO5JW0fElghE2J+CvKaqFBUclEvMxSiDApRBoUog0KUQSHKoBBlUIgyKEQZFOJOqw5M2xsUMgb5DMt8jvUtSZJnGPr1Z48/KGQIWRGI591u90ocx09RID0zxRsUkiFXEasiotFoPGo2m5tmincoBAyrCPQfZ0Vg/BIkzZsuGUe73ZY/hv5pPoZ3Dgva20j4s52dnfS3jFkwfhWxhjlfsZXfSJL/MakQC9qpCDTPmZc6YG9v7yr2v0L0ZC5eX6rnhNlNxuEqxIL22IrAlAMRFvT5d1mu/E+IBe2RIqQiMOUvEdnjsaUQV0YJsaC9jVgdVRHYN1SEDTNGIa7khVjQnujRJMcOC7OPQlwxQn6kmQNInvNiLUjSx4WZQyGudDqds5I0JOy7iJi2IvJh5lKIK0jUEirkCbYXzNAB4xZr1zDHUMg0TFMR+TDHBhFSuY9OrAjEa3SXoyhqYEzG/0xQTmWE2MW6rCIspRdiKyKO49eQUFoRltIKsYt12SsiT+mEZCsC3cqIsJRGiBVRtYrIo15IVRZrV9QKsRVRlcXaFXVCqrpYu6JGSLYi0D1yIiyFCznqFZGnMCGsiOEEF2JFsCKGE0wIH01ueBeysbFxHP+OeMlHkxvehbRarQVIWKEIN7wLwSNqgAqpxH/qD0HwRZ2Mh0KUQSHKoBBlUIgyKEQZFKIMClEGhSiDQpRBIcqgEGVQiDIoRBkUogwKUQaFKINClEEhyqAQZVCIMrwL2d3dlfco/Rd/JUkyX4kvwYzjuIvrWJd2FEW1ANc0M+Rc5ZxNex1S9tOOR7wLWVxcbOOirvX7/duDweCDvUjNYrLniHN+g3O/if51RNdM8UbQrOAOm0PcQNzHxV02Y2loQATYG0VEoP0CsYbop4MBKOQ21SYmLwLn8aLRaAQVYSn0uYELL1SMJhGWQoVYkIigYjSKUAkSM9fr9VawiL5HOwUJ++fbeQ4b8loW9NfxXstoNszbk1EgSXNI3i0kbSZiKGJGIGlTiaEITyCJE4mhiEAgqWPFUERBIMn/LP4WiigQJN1WzEdsPyAoQgMQcUzkmC4hhJAQ1Gq/AYV1rHiukTEJAAAAAElFTkSuQmCC'; // Replace with the actual base64-encoded image

    const handleDownloadClick = () => {
        downloadElementAsPNG('canvasContainer', 'qr_' + textQr + '.png');
    };

    const [qrcolor, setQrcolor] = useState('#010599');  // Six-character hex string
    const [qrcolorOut, setQrcolorOut] = useState('#ffffff');

    const [isEmpty, setIsEmpty] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [text, setText] = useState("Empty");
    const [textQr, setTextQr] = useState(text);
    const handleGenerate = () => {
        if (text.trim() === '') {
            setIsEmpty(true);
        } else {
            setTextQr(text);
            setIsEmpty(false);
            setIsGenerated(true);

        }
    }

    // const handleColor1 = () => {
    //     setQrcolor('#FFFFFF');  // Six-character hex string
    //     setQrcolorOut('#010599');
    // }

    // const handleColor2 = () => {
    //     setQrcolorOut('#FFFFFF');  // Six-character hex string
    //     setQrcolor('#010599');
    // }
    return (
        <>
            {isLoginSuceed ? (
                <>
                    {isClient && (
                        <>
                            <div className='flex relative w-screen h-screen overflow-hidden '>
                                <div className="absolute">

                                    <div id='canvasContainer' className='w-[500px] h-[500px] flex top-0 relative rounded-lg'>
                                        <Canvas
                                            text={textQr}
                                            options={{
                                                errorCorrectionLevel: 'M',
                                                margin: 3,
                                                scale: 4,
                                                width: 500,
                                                color: {
                                                    dark: '#010599FF',
                                                    light: '#FFFFFF',
                                                },
                                            }}
                                        />
                                        <div className='w-[500px] h-[500px] flex items-center justify-center absolute rounded-lg'>
                                            <div className='bg-[#010599FF] p-[2px] rounded-lg w-14 h-14 border-2 border-white'>
                                                <img src={logoDataURL} alt='' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute w-screen h-screen body">

                                </div>
                                <div>

                                    {isMobile ? (
                                        <MobileInnerLayout isNotes={false} isEntry={true} backlink={'/Tools'}>
                                            <div className='bg-red-900 w-full h-full flex flex-col justify-between'>
                                                <div>a</div>
                                                <button className='bg-red-900' onClick={handleDownloadClick}>Download</button>
                                            </div>
                                        </MobileInnerLayout>
                                    ) : (

                                        <DesktopLayout
                                            button1={<SideLink link={'/Tools'} text={'ESC'} />}

                                        >


                                            <div className='flex justify-center items-center my-5 w-full md:text-3xl text-2xl'>
                                                <p>QR CODE GENERATOR</p>
                                            </div>
                                            <div className='flex gap-10'>
                                                <div className='w-[75%] flex flex-col justify-start items-start text-start'>

                                                    <input className='text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1' type="text" placeholder="Input Text" onChange={(e) => setText(e.target.value)} onFocus={() => setIsGenerated(false)} required />
                                                    <div>

                                                        <ButtonDefault action={handleGenerate} text={'GENERATE'} />
                                                    </div>
                                                    <div>
                                                        {isGenerated ? <><p className='text-green-500'>QR GENERATED !</p></> : null}
                                                        {isEmpty ? <><p className='text-red-600'>TEXT SHOULD BE NOT EMPTY</p></> : null}
                                                        <br />
                                                        <br />
                                                        <p>Generated QR Details:</p>
                                                        <p>&rsquo;&rsquo;{textQr}&rsquo;&rsquo;</p>
                                                        <br />
                                                        {/* <p>CONFIGURE COLOR</p> */}
                                                        {/* <button onClick={handleColor2}>STYLE 2</button>
                                                        <button onClick={handleColor1}>STYLE 1</button> */}
                                                    </div>

                                                </div>
                                                <div className=''>

                                                    <div className='w-[300px] flex flex-col text-center items-center justify-center border-2 border-blue-500 p-2 pt-6'>
                                                        <Canvas
                                                            text={textQr}
                                                            options={{
                                                                errorCorrectionLevel: 'M',
                                                                margin: 3,
                                                                scale: 4,
                                                                width: 200,
                                                                color: {
                                                                    dark: "#010599FF",
                                                                    light: "#ffffff",
                                                                },
                                                            }}
                                                        />
                                                        <ButtonDefault action={handleDownloadClick} text={'DOWNLOAD QR'} />
                                                    </div>
                                                </div>
                                            </div>




                                        </DesktopLayout>
                                    )}
                                </div>


                            </div>
                        </>
                    )}
                </>
            ) : null}


        </>
    );
}

export default QrGenerator;


// import React from 'react'
// import { useQRCode } from 'next-qrcode';
// import html2canvas from 'html2canvas';

// async function downloadElementAsPNG(elementId, fileName) {
//     const element = document.getElementById(elementId);

//     if (!element) {
//         console.error(`Element with id ${elementId} not found.`);
//         return;
//     }

//     try {
//         // Use html2canvas to create a canvas image from the element
//         const canvas = await html2canvas(element, {
//             foreignObjectRendering: true, // Enable rendering of external images
//         });

//         // Convert the canvas to a data URL representing a PNG image
//         const dataURL = canvas.toDataURL('image/png');

//         // Create a link element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = dataURL;
//         downloadLink.download = fileName;

//         // Append the link to the document and trigger a click to start the download
//         document.body.appendChild(downloadLink);
//         downloadLink.click();

//         // Clean up by removing the link from the document
//         document.body.removeChild(downloadLink);
//     } catch (error) {
//         console.error('Error generating PNG:', error);
//     }
// }

// // async function downloadElementAsPNG(elementId, fileName) {
// //     const element = document.getElementById(elementId);

// //     if (!element) {
// //         console.error(`Element with id ${elementId} not found.`);
// //         return;
// //     }

// //     try {
// //         // Use html2canvas to create a canvas image from the element
// //         const canvas = await html2canvas(element);

// //         // Convert the canvas to a data URL representing a PNG image
// //         const dataURL = canvas.toDataURL('image/png');

// //         // Create a link element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = dataURL;
// //         downloadLink.download = fileName;

// //         // Append the link to the document and trigger a click to start the download
// //         document.body.appendChild(downloadLink);
// //         downloadLink.click();

// //         // Clean up by removing the link from the document
// //         document.body.removeChild(downloadLink);
// //     } catch (error) {
// //         console.error('Error generating PNG:', error);
// //     }
// // }



// const handleDownloadClick = () => {
//     downloadElementAsPNG('canvasContainer', 'output.png');
// };

// function QrGenerator() {
//     const { Canvas } = useQRCode();
//     // const url = 'https://dtc.my.id';
//     // const text = 'Scan me for a surprise!';
//     const logo = ('https://firebasestorage.googleapis.com/v0/b/project-insight-fd427.appspot.com/o/logo%20v4%20bw.png?alt=media&token=79db9d24-1a2a-4c31-960f-addfa491d9d1'); // Path to your logo image


//     return (
//         <>
//             <div id='canvasContainer' className='w-[500px] h-[500px] flex relative rounded-lg'>

//                 <Canvas


//                     text={'AOAWOAOWOAWODAWDAKWFJHJSFH'}
//                     options={{
//                         errorCorrectionLevel: 'M',
//                         margin: 3,
//                         scale: 4,
//                         width: 500,
//                         color: {
//                             dark: '#010599FF',
//                             light: '#FFFFFF',
//                         },
//                     }}
//                 />
//                 <div className='w-[500px] h-[500px] flex items-center justify-center absolute rounded-lg'>
//                     <div className='bg-[#010599FF] p-[2px] rounded-lg w-14 h-1w-14 border-2 border-white'>

//                         <img src="https://firebasestorage.googleapis.com/v0/b/project-insight-fd427.appspot.com/o/icon.png?alt=media&token=20de7095-748c-4689-b622-871766598ba5" alt="" />
//                     </div>
//                 </div>
//             </div>
//             <button onClick={handleDownloadClick}>Download</button>
//         </>
//     )
// }

// export default QrGenerator