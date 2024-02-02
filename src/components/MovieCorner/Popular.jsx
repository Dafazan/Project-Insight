"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
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
    Firestore,
    serverTimestamp,
} from "firebase/firestore";
import Moviecard from '@/components/MovieCorner/Moviecard'
function Popular() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
                const response = await axios.get(url);
                const fetchedMovies = response.data.results;
                setMovies(fetchedMovies);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <>
            {isLoading && <p>Loading movies...</p>}
            {error && <p>Error fetching movies: {error.message}</p>}
            {movies.length > 0 && (
                <div className="p-10 pt-0">
                    <h1 className="md:text-3xl text-xl pb-3 font-medium">Popular Movies</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ">                    {movies.map((movie) => (
                        <Moviecard key={movie.id} img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} title={movie.title} desc={movie.overview} />
                        // <div key={movie.id}>
                        //     <div className="flex gap-2 p-4 h-full items-center justify-center bgblurbluef border-2 border-blue-500">
                        //         <div className="w-20 bg-blue-900">
                        //             <img
                        //                 className="w-20"
                        //                 src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        //                 alt={movie.title}
                        //             />
                        //         </div>
                        //         <div className="w-52">
                        //             <a
                        //                 href={`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_TMDB_API_KEY}`}
                        //                 className="text-xl text-lime-500 line-clamp-1"
                        //             >
                        //                 {movie.title}

                        //             </a>
                        //             <p className="line-clamp-3 text-blue-500">
                        //                 {movie.overview}
                        //             </p>
                        //             {/* <button
                        //                 onClick={async (e) => {
                        //                     const confirmed = window.confirm("Save?");
                        //                     if (confirmed) {
                        //                         try {
                        //                             // Delete the todo document with the given ID from the "todos" collection in Firestore.
                        //                             await addDoc(collection(db, "movies"), {
                        //                                 movie: `https://api.themoviedb.org/3/movie/${movie.id}`,
                        //                                 //movie: `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_TMDB_API_KEY}`,
                        //                                 timestamp: serverTimestamp(),
                        //                                 source: "web",
                        //                             });
                        //                             alert("success");
                        //                             console.log(" successfully saved");
                        //                         } catch (error) {
                        //                             console.error("An error occured", error);
                        //                         }
                        //                     }
                        //                 }}
                        //                 className="bg-blue-500 rounded-md p-5"
                        //             >
                        //                 Save
                        //             </button> */}
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
                    </div>
                </div>
            )}
            {movies.length === 0 && !isLoading && !error && <p>No movies found.</p>}
        </>
    );
}

export default Popular;
