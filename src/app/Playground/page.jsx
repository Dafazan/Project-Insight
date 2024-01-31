
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
// function Playground() {
//     const [dataTotal, setDataTotal] = useState([]);
//     useEffect(() => {
//         getDataTotal();
//     }, []);
//     async function getDataTotal() {
//         try {
//             const ordersRef = collection(db, "count");
//             const q = query(ordersRef, orderBy("total"));
//             const querySnapshot = await getDocs(q);
//             let data = [];
//             querySnapshot.forEach((doc) => {
//                 data.push({ ...doc.data(), id: doc.id });
//             });
//             setDataTotal(data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const totalSum = dataTotal.reduce((acc, data) => acc + data.total, 0,);
//     return (
//         <div className='p-10'>
//             {dataTotal.map((data, i) => (
//                 <>
//                     <p key={i}>{data.total}</p>
//                 </>
//             ))}
//             <p>Total Sum: {totalSum}</p>
//         </div>
//     )
//}
async function fetchMovies() {
    const apiKey = "82754a7c6012d4a3b4654bdbbd3dbc41"; // Replace with your actual API key
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response.data.results; // Access the 'results' array of movies
    } catch (error) {
        console.error(error);
    }
}
function Playground() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchedMovies = await fetchMovies();
    //         setMovies(fetchedMovies);
    //     };
    //     fetchData();
    // }, []);
    //   useEffect(() => {
    //     const fetchMovies = async () => {
    //       setIsLoading(true);
    //       setError(null);
    //       try {
    //         const apiKey = "82754a7c6012d4a3b4654bdbbd3dbc41"; // Replace with your actual API key
    //         const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    //         const response = await axios.get(url);
    //         const fetchedMovies = response.data.results;
    //         setMovies(fetchedMovies);
    //       } catch (error) {
    //         setError(error);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };
    //     fetchMovies();
    //   }, []);
    const [movie, setMovie] = useState("");
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
    return (
        <>
            <div className="p-10">
                <h1>Movie Search</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchTerm}
                        onChange={handleChange}
                        className="text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                    />
                    <ButtonDefault text={"SEARCH"} />
                </form>
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
                                            {movie.title}
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
            {/* {isLoading && <p>Loading movies...</p>}
            {error && <p>Error fetching movies: {error.message}</p>}
            {movies.length > 0 && (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <a href="#">{movie.title}</a>
                            <p>{movie.id}</p>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.overview}</p>
                        </li>
                    ))}
                </ul>
            )}
            {movies.length === 0 && !isLoading && !error && <p>No movies found.</p>} */}
        </>
    );
}
export default Playground;
