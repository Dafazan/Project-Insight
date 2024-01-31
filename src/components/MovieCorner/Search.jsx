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
    return (
        <>
            <div className="p-10">
                <div className="flex gap-5">
                    <div className="w-full">
                        <h1>Movie Search</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search for movies..."
                                value={searchTerm}
                                onChange={handleChange}
                                className="text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                            />
                            <ButtonDefault text={"SEARCH MOVIE"} />
                        </form>
                    </div>
                    <div className="w-full">
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
                    </div>
                </div>
                {isLoading && <p>Loading results...</p>}
                {error && <p>Error: {error.message}</p>}
                {searchResults.length > 0 && (
                    <div className="grid grid-cols-4 gap-5">
                        {searchResults.map((movie) => (
                            <div key={movie.id}>
                                <div className="flex gap-2 p-4 h-full items-center justify-center bgblurbluef border-2 border-blue-500">
                                    <div className="w-20 bg-blue-900">
                                        <img
                                            className="w-20"
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </div>
                                    <div className="w-52">
                                        <a
                                            href={`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_TMDB_API_KEY}`}
                                            className="text-xl text-lime-500 line-clamp-1"
                                        >
                                            {isMovie ? movie.title : movie.name}

                                        </a>
                                        <p className="line-clamp-3 text-blue-500">
                                            {movie.overview}
                                        </p>
                                        <button
                                            onClick={async (e) => {
                                                const confirmed = window.confirm("Save?");
                                                if (confirmed) {
                                                    try {
                                                        // Delete the todo document with the given ID from the "todos" collection in Firestore.
                                                        await addDoc(collection(db, "movies"), {
                                                            movie: `https://api.themoviedb.org/3/movie/${movie.id}`,
                                                            //movie: `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_TMDB_API_KEY}`,
                                                            timestamp: serverTimestamp(),
                                                            source: "web",
                                                        });
                                                        alert("success");
                                                        console.log(" successfully saved");
                                                    } catch (error) {
                                                        console.error("An error occured", error);
                                                    }
                                                }
                                            }}
                                            className="bg-blue-500 rounded-md p-5"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Search