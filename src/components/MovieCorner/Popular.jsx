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
    const [isDetail, setIsDetail] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoadingD, setIsLoadingD] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorD, setErrorD] = useState(null);
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

    const handleCloseDetail = () => {
        setIsDetail(false);
    };
    const [castImages, setCastImages] = useState([]);

    const fetchMovieDetails = async (movieId) => {

        setIsLoadingD(true);
        setErrorD(null);
        try {
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
            const response = await axios.get(url);
            const movieDetails = response.data;

            const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
            const creditsResponse = await axios.get(creditsUrl);
            const credits = creditsResponse.data;

            const castImages = [];
            for (const actor of credits.cast) {
                const personUrl = `https://api.themoviedb.org/3/person/${actor.id}?api_key=${apiKey}`;
                const personResponse = await axios.get(personUrl);
                const personDetails = personResponse.data;
                // Check if the person has a profile image
                if (personDetails.profile_path) {
                    castImages.push({
                        name: actor.name,
                        character: actor.character,
                        profileImage: `https://image.tmdb.org/t/p/w45/${personDetails.profile_path}`
                    });
                }
            }
            setCastImages(castImages);

            setMovieDetails({ ...movieDetails, credits });
            setIsDetail(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            {isDetail ? <>
                <div className="w-full p-10 h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef flex justify-center items-center">
                    <button onClick={handleCloseDetail}
                        className="bg-red-500 text-White font-semibold px-1">CLOSE</button>
                    {movieDetails && (
                        <div className="h-full">
                            <h2>{movieDetails.title}</h2>
                            <p>{movieDetails.overview}</p>
                            <p>Release Date: {movieDetails.release_date}</p>
                            <p>Runtime: {movieDetails.runtime} minutes</p>
                            <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                            {/* Render other movie details as needed */}

                            {/* Render credits (cast and crew information) */}
                            {castImages.length > 0 && (
                                <div>
                                    <h3>Cast</h3>
                                    <div className="cast-images">
                                        {castImages.map((cast, index) => (
                                            <div key={index} className="cast-member">
                                                <img src={cast.profileImage} alt={`${cast.name}`} />
                                                <p>{cast.name} as {cast.character}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                </div>
            </> :

                <>

                    {isLoading && <p>Loading movies...</p>}
                    {error && <p>Error fetching movies: {error.message}</p>}
                    {movies.length > 0 && (
                        <div className="p-10 pt-0">
                            <h1 className="md:text-3xl text-xl pb-3 font-medium">Popular Movies</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">                    {movies.map((movie) => (
                                <Moviecard key={movie.id} id={movie.id} img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} title={movie.title} desc={movie.overview} >
                                    <button onClick={() => fetchMovieDetails(movie.id)}
                                        className="bg-blue-500 text-blue-950 font-semibold px-1">DETAILS</button>
                                </Moviecard>
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
            }
        </>
    );
}

export default Popular;
