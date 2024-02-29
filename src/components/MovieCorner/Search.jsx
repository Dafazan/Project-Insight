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
function Search() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMovie, setIsMovie] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([{ movie: "", timestamp: "" }]);
    const handleSave = (value) => {
        setContent(value);
    };
    const addData = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(db, "movies"), {
            movie: movie,
            timestamp: serverTimestamp(),
            source: "web",
        });
        const handleUpload = () => {
            setData([...data, { movie: "", timestamp: "" }]);
        };
        alert("success");
    };
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {


            setIsMovie(true);
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
            const response = await axios.get(url);
            setSearchResults(response.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmitTv = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {

            setIsMovie(false);
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
            const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchTerm}`;
            const response = await axios.get(url);
            setSearchResults(response.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const [isDetail, setIsDetail] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoadingD, setIsLoadingD] = useState(false);
    const [errorD, setErrorD] = useState(null);

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
            setIsLoadingD(false);
        }
    };

    return (
        <>
            {isLoadingD ? <><div className="w-full p-10 h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef flex justify-center items-center">
                {isLoadingD && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div></> : null}
            {isDetail ? <>
                <div className="w-full p-10 h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef flex justify-center items-center">
                    <button onClick={handleCloseDetail}
                        className="bg-red-500 text-White font-semibold px-1">CLOSE</button>
                    {isDetail ? <>
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
                    </> : null}



                </div>
            </> :
                null}
            <div className="p-10">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full">

                        <div className="flex w-full h-full items-center gap-3">

                            <form className="w-full" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search Title..."
                                    value={searchTerm}
                                    onChange={handleChange}
                                    className="text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                                />
                            </form>
                            <div>

                                <ButtonDefault action={handleSubmit} text={"SEARCH MOVIE"} />
                            </div>
                            <div>
                                <ButtonDefault action={handleSubmitTv} text={"SEARCH SERIES"} />
                            </div>
                        </div>
                        <div className="flex w-3/6">
                        </div>
                    </div>
                    {/* <div className="w-full">
                        <h1>Series Search</h1>
                        <form onSubmit={handleSubmitTv}>
                            <input
                                type="text"
                                placeholder="Search for tv series..."
                                value={searchTerm}
                                onChange={handleChange}
                                className="text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                            />
                            <ButtonDefault text={"SEARCH SERIES"} />
                        </form>
                    </div> */}
                </div>
                {isLoading && <p>Loading results...</p>}
                {error && <p>Error: {error.message}</p>}
                {searchResults.length > 0 && (
                    <>
                        <h1 className="md:text-3xl text-xl pb-3 font-medium">Search results for <span className="text-lime-600">&quot;{searchTerm}&quot;</span> in {isMovie ? 'movies' : 'tv series'} :</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {searchResults.map((movie) => (
                                <Moviecard key={movie.id} id={movie.id} img={movie.poster_path} title={isMovie ? movie.title : movie.name} desc={movie.overview} >
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
                                //                 {isMovie ? movie.title : movie.name}

                                //             </a>
                                //             <p className="line-clamp-3 text-blue-500">
                                //                 {movie.overview}
                                //             </p>
                                //             <button
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
                                //             </button>
                                //         </div>
                                //     </div>
                                // </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Search