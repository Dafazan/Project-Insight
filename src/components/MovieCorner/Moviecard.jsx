'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { db } from "../../firebase-p";
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
    setDoc,
    Firestore,
    serverTimestamp,
} from "firebase/firestore";

function Moviecard({ title, desc, img, id }) {

    const [cardState, setCardState] = useState(0);
    const [rating, setRating] = useState(0);

    const [ratingprev, setRatingprev] = useState(rating);
    const [isAdding, setIsAdding] = useState(false);
    const buttonClose = () => {
        setCardState(0)
    };
    const buttonIsAdding = () => {
        setCardState(1);
    };
    const buttonIsRating = () => {
        setCardState(2);
    };
    const addToMovies = async (e) => {
        const confirmed = window.confirm("Save?");
        if (confirmed) {
            try {
                const movieRef = doc(db, "movies", `${id}`);
                await setDoc(movieRef, {
                    title: title,
                    movieLink: `https://api.themoviedb.org/3/movie/${id}`,
                    //movie: `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_TMDB_API_KEY}`,
                    timestamp: serverTimestamp(),
                    source: "web",
                });
                const watchlistRef = doc(db, "moviewatchlist", `${id}`);
                await deleteDoc(watchlistRef);

                alert("Success");
                console.log("Successfully saved");
            } catch (error) {
                console.error("An error occurred", error);
            }
        }
    };
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const movieRef = doc(db, "movierating", `${id}`);
                const docSnapshot = await getDoc(movieRef);
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    // Extract the "rating" field from the document data
                    const ratingValue = data.rating;
                    // Set the rating value in state
                    setRating(ratingValue);
                } else {
                    // If the document doesn't exist, set rating to null or a default value
                    setRating(null); // or setRating(DEFAULT_VALUE);
                }
            } catch (error) {
                console.error("Error fetching rating:", error);
                // Handle error, set rating to a default value or null
                setRating(null); // or setRating(DEFAULT_VALUE);
            }
        };

        fetchRate();
    }, [id]); // Add id as a dependency to the useEffect hook

    const handleRating = async () => {
        setRating(0.5);
        await addRating();
    };
    const handleRating1 = async () => {
        setRating(1);
        await addRating();
    };
    const handleRating2 = async () => {
        setRating(1.5);
        await addRating();
    };
    const handleRating3 = async () => {
        setRating(2);
        await addRating();
    };
    const handleRating4 = async () => {
        setRating(2.5);
        await addRating();
    };
    const handleRating5 = async () => {
        setRating(3);
        await addRating();
    };
    const handleRating6 = async () => {
        setRating(3.5);
        await addRating();
    };
    const handleRating7 = async () => {
        setRating(4);
        await addRating();
    };
    const handleRating8 = async () => {
        setRating(4.5);
        await addRating();
    };
    const handleRating9 = async () => {
        setRating(5);
        await addRating();
    };
    const addRating = async (e) => {

        try {
            const movieRef = doc(db, "movierating", `${id}`);
            await setDoc(movieRef, {
                rating: rating,
                title: title,
                movieLink: `https://api.themoviedb.org/3/movie/${id}`,
                timestamp: serverTimestamp(),
                source: "web",
            });
            const watchlistRef = doc(db, "moviewatchlist", `${id}`);
            await deleteDoc(watchlistRef);

            alert("Success");
            console.log("Successfully saved");
        } catch (error) {
            console.error("An error occurred", error);
        }

    };
    const addToWatchlist = async (e) => {
        const confirmed = window.confirm("Save?");
        if (confirmed) {
            try {
                const movieRef = doc(db, "moviewatchlist", `${id}`);
                await setDoc(movieRef, {
                    title: title,
                    movieLink: `https://api.themoviedb.org/3/movie/${id}`,
                    timestamp: serverTimestamp(),
                    source: "web",
                });

                alert("Success");
                console.log("Successfully saved");
            } catch (error) {
                console.error("An error occurred", error);
            }
        }
    };
    const addToFavorite = async (e) => {
        const confirmed = window.confirm("Save?");
        if (confirmed) {
            try {
                const movieRef = doc(db, "moviefav", `${id}`);
                await setDoc(movieRef, {
                    title: title,
                    movieLink: `https://api.themoviedb.org/3/movie/${id}`,
                    timestamp: serverTimestamp(),
                    source: "web",
                });

                alert("Success");
                console.log("Successfully saved");
            } catch (error) {
                console.error("An error occurred", error);
            }
        }
    };

    const [watchlistExists, setWatchlistExists] = useState(null);

    useEffect(() => {
        const fetchWatchlistExists = async () => {
            try {
                const movieRef = doc(db, "moviewatchlist", `${id}`);
                const docSnapshot = await getDoc(movieRef);
                const exists = docSnapshot.exists();
                setWatchlistExists(exists);
            } catch (error) {
                console.error("Error checking document existence:", error);
                setWatchlistExists(false); // Set to false if error occurs
            }
        };

        fetchWatchlistExists();
    }, []);
    const [watchExists, setWatchExists] = useState(null);

    useEffect(() => {
        const fetchWatchExists = async () => {
            try {
                const movieRef = doc(db, "movies", `${id}`);
                const docSnapshot = await getDoc(movieRef);
                const exists = docSnapshot.exists();
                setWatchExists(exists);
            } catch (error) {
                console.error("Error checking document existence:", error);
                setWatchExists(false); // Set to false if error occurs
            }
        };

        fetchWatchExists();
    }, []);


    return (
        <div className="flex relative">
            <div className="bgblur w-full h-40"></div>
            {cardState === 0 ?
                <>
                    <div className=" flex flex-col h-40 w-full justify-between absolute">
                        <div className=" h-3 flex justify-between">
                            <div className=" w-3 h-3 border-t border-s border-blue-500"></div>
                            <div className=""></div>
                            <div className=" w-3 h-3 border-t border-e border-blue-500"></div>
                        </div>
                        <div className="px-3 flex flex-auto gap-2 h-full w-full">
                            <div style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${img})`,
                            }} className=" h-full w-36 border bg-cover bg-center border-blue-500">
                                {img ? (
                                    <></>
                                ) : (
                                    <div className=' text-xs font-bold text-red-600 w-full h-full text-center flex items-center justify-center'>NO POSTER AVAILABLE</div>
                                )}
                            </div>
                            <div className=" h-full w-full px-2 flex flex-col justify-between">
                                <div>  <p className="text-green-600 font-medium uppercase max-h-12 line-clamp-2">{title}</p>
                                    <p className="text-blue-500 line-clamp-4 text-xs">{desc}</p></div>
                                <div className="flex gap-2 text-xs">
                                    <button onClick={buttonIsAdding} className="bg-blue-500 text-blue-950 font-semibold px-1">ADD</button>
                                    <button className="bg-blue-500 text-blue-950 font-semibold px-1">DETAILS</button>
                                    <button onClick={buttonIsRating} className="bg-blue-500 text-blue-950 font-semibold px-1">RATE</button>
                                </div>
                            </div>
                        </div>
                        <div className=" h-3 flex justify-between">
                            <div className=" w-3 h-3 border-b border-s border-blue-500"></div>
                            <div className=""></div>
                            <div className=" w-3 h-3 border-b border-e border-blue-500"></div>
                        </div>
                    </div>
                </> : cardState === 1 ?
                    <>
                        <div className=" flex flex-col h-40 w-full justify-between absolute">
                            <div className=" h-3 flex justify-between">
                                <div className=" w-3 h-3 border-t border-s border-blue-500"></div>
                                <div className=""></div>
                                <div className=" w-3 h-3 border-t border-e border-blue-500"></div>
                            </div>
                            <div className="px-3 flex flex-col gap-2 h-full w-full">
                                <div className='w-full text-center'>
                                    <button className='bg-red-600 px-1 font-medium' onClick={buttonClose}>CLOSE</button>
                                </div>
                                {watchExists === null ? (
                                    <div className='w-full text-red-600 border-y border-blue-500 text-center'>LOADING...</div>
                                ) : watchExists ? (
                                    <>
                                        <button className='w-full text-green-600 border-y border-blue-500 text-center'>YOU&rsquo;VE WATCHED THIS</button>
                                        <button onClick={addToFavorite} className='w-full hover:bg-blue-500 hover:text-blue-950 border-y border-blue-500 text-center'>ADD TO FAVORITE</button>
                                    </>
                                ) : (
                                    <>

                                        <button onClick={addToMovies} className='w-full hover:bg-blue-500 hover:text-blue-950 border-y border-blue-500 text-center'>ADD TO WATCHED</button>
                                        {watchlistExists === null ? (
                                            <div className='w-full text-red-600 border-y border-blue-500 text-center'>LOADING...</div>
                                        ) : watchlistExists ? (

                                            <button className='w-full text-green-600 border-y border-blue-500 text-center'>ADDED TO WATCHLIST</button>
                                        ) : (
                                            <button onClick={addToWatchlist} className='w-full hover:bg-blue-500 hover:text-blue-950 border-y border-blue-500 text-center'>ADD TO WATCHLIST</button>
                                        )}
                                    </>
                                )}
                                <button className='w-full hover:bg-blue-500 hover:text-blue-950 border-y border-blue-500 text-center'>ADD TO LIST</button>






                            </div>
                            <div className=" h-3 flex justify-between">
                                <div className=" w-3 h-3 border-b border-s border-blue-500"></div>
                                <div className=""></div>
                                <div className=" w-3 h-3 border-b border-e border-blue-500"></div>
                            </div>
                        </div>
                    </> : cardState === 2 ?
                        <>
                            <div className=" flex flex-col h-40 w-full justify-between absolute">
                                <div className=" h-3 flex justify-between">
                                    <div className=" w-3 h-3 border-t border-s border-blue-500"></div>
                                    <div className=""></div>
                                    <div className=" w-3 h-3 border-t border-e border-blue-500"></div>
                                </div>
                                <div className="px-3 flex flex-col gap-2 h-full w-full">
                                    <div className='w-full text-center'>
                                        <button className='bg-red-600 px-1 font-medium' onClick={buttonClose}>CLOSE</button>
                                    </div>
                                    {watchExists === null ? (
                                        <div className='w-full text-red-600 border-y border-blue-500 text-center'>LOADING...</div>
                                    ) : watchExists ? (
                                        <>
                                            <p className='w-full text-center'>YOUR RATING</p>
                                            <div className="flex gap-2">
                                                <div className='w-full h-5 flex gap-[2px]'>
                                                    <button onClick={handleRating} className={`w-full h-full ${rating === 0.5 || rating >= 0.5 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                    <button onClick={handleRating1} className={`w-full h-full ${rating === 1 || rating >= 1 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                </div>
                                                <div className='w-full h-5 flex gap-[2px]'>
                                                    <button onClick={handleRating2} className={`w-full h-full ${rating === 1.5 || rating >= 1.5 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                    <button onClick={handleRating3} className={`w-full h-full ${rating === 2 || rating >= 2 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                </div>
                                                <div className='w-full h-5 flex gap-[2px]'>
                                                    <button onClick={handleRating4} className={`w-full h-full ${rating === 2.5 || rating >= 2.5 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                    <button onClick={handleRating5} className={`w-full h-full ${rating === 3 || rating >= 3 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                </div>
                                                <div className='w-full h-5 flex gap-[2px]'>
                                                    <button onClick={handleRating6} className={`w-full h-full ${rating === 3.5 || rating >= 3.5 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                    <button onClick={handleRating7} className={`w-full h-full ${rating === 4 || rating >= 4 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                </div>
                                                <div className='w-full h-5 flex gap-[2px]'>
                                                    <button onClick={handleRating8} className={`w-full h-full ${rating === 4.5 || rating >= 4.5 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                    <button onClick={handleRating9} className={`w-full h-full ${rating === 5 || rating >= 5 ? 'bg-blue-500' : ' border border-blue-500'}`}></button>
                                                </div>

                                            </div>
                                            <div className="flex gap-2">
                                                <div className='w-full text-center '>1</div>
                                                <div className='w-full text-center '>2</div>
                                                <div className='w-full text-center '>3</div>
                                                <div className='w-full text-center '>4</div>
                                                <div className='w-full text-center '>5</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className='w-full text-center text-red-600'>WATCH THIS MOVIE TO GIVE IT A RATE</p>
                                            <button onClick={addToMovies} className='w-full hover:bg-blue-500 hover:text-blue-950 border-y border-blue-500 text-center'>I&rsquo;VE WATCHED THIS MOVIE</button>
                                            {watchlistExists === null ? (
                                                <div className='w-full text-red-600 border-y border-blue-500 text-center'>LOADING...</div>
                                            ) : watchlistExists ? (
                                                <>
                                                    <button className='w-full text-green-600 border-y border-blue-500 text-center'>ADDED TO WATCHLIST</button>
                                                </>
                                            ) : (
                                                <>

                                                    <button onClick={addToWatchlist} className='w-full hover:bg-blue-500 hover:text-blue-950 border-y border-blue-500 text-center'>ADD TO WATCHLIST</button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className=" h-3 flex justify-between">
                                    <div className=" w-3 h-3 border-b border-s border-blue-500"></div>
                                    <div className=""></div>
                                    <div className=" w-3 h-3 border-b border-e border-blue-500"></div>
                                </div>
                            </div>
                        </> : null}

        </div>
    )
}

export default Moviecard