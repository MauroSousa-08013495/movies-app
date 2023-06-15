import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";

function Upcoming() {
    const [upComingMovies, setUpComingMovies] = useState([]);
    const IMG_API = "https://image.tmdb.org/t/p/w1280";

    const setVoteClass = (vote) => {
        if(vote >= 8) {
            return "text-green-400";
        } else if(vote >= 6) {
            return "text-yellow-500";
        } else {
            return "text-red-500";
        }
    }

    useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODI4OTU4M2Y0ZGRhMzQ1ZDM1OWFmNDYxYmE3MjdiZiIsInN1YiI6IjY0NzRiMjA4YmUyZDQ5MDBhN2Q2ZWIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8j1VTDGhefE_3weG06581Wj23iiUDLLxYw0idy0fGHw'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => setUpComingMovies(response.results))
        .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Navbar />
        <p className="font-bold text-4xl ml-8 mb-4">Upcoming Movies</p>
        <div className="flex flex-wrap justify-center bg-teal-800 mb-2">
        {upComingMovies.map((movie) => (
            <div className="w-[300px] rounded-md overflow-hidden relative shadow-2xl ml-9 mb-4 mt-4 group" key={movie.id}>
                <img className="w-full object-cover" src={IMG_API + movie.poster_path} alt={movie.title} />
                <div className=" flex flex-row justify-between">
                    <p className="font-bold text-lg mt-2 mb-2 ml-2">
                        {movie.title}
                    </p>
                    <p className={`text-center font-bold bg-teal-900 rounded-lg h-6 w-12 mr-2 mt-3 ${setVoteClass(movie.vote_average)}`}>
                        {movie.vote_average}
                    </p>
                </div>
                <div className="px-2 pb-2 bg-white absolute bottom-0 right-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out delay-150">
                    <h2 className="font-bold text-lg">Overview: </h2>
                    <p className="text-gray-700 text-base">
                        {movie.overview}
                    </p>
                </div>
            </div>
        ))}
        </div>
    </>
    );
}

export default Upcoming;