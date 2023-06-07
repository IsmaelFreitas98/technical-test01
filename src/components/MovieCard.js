/* eslint-disable react-hooks/exhaustive-deps */
import "./MovieCard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import star from "../images/star.png";
import defaultCover from "../images/default-movie.jpg"

const key = process.env.REACT_APP_API_KEY;

function MovieCard(props) {
    const {movie} = props;

    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${key}`)
            .then((response) => {
                setMovieDetails(response.data);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    const roundAverage = () => {
        return Math.floor(movieDetails.vote_average * 10) / 10;
    }

    const calcTimeString = () => {
        const hours = Math.floor(movieDetails.runtime / 60);
        const min = movieDetails.runtime - hours * 60;

        return hours > 0 ? `${hours}h${min}` : `${min}min`;
    }

    const calcGenres = () => {
        const genres = movieDetails.genres.map(genreObj => {
            return genreObj.name;
        })
        return genres.join(", ");
    }

    const calcDate = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        if(!movieDetails.release_date) {
            return "Release Date Not Available";
        }

        const day = movieDetails.release_date.split("-")[2];
        const month = months[parseInt(movieDetails.release_date.split("-")[1]) - 1];
        const year = movieDetails.release_date.split("-")[0];

        return `${day} ${month} ${year}`;

    }

    return (
        <div className="movie-card">
        
            {movieDetails &&
                <>
                    <div className="movie-poster" style={{backgroundImage: movie.poster_path ? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` : `url(${defaultCover})`}}>
                    </div>

                    
                    <div className="movie-info">

                        <div className="movie-info-text">
                            <h4>{movie.title}</h4>
                            <p>{calcTimeString()} | {calcGenres() || "Unspecified Genre"} | {calcDate()}</p>
                        </div>

                        <div className="rating">
                            <span>{roundAverage()} / 10</span>
                            <img src={star} alt="star" />
                        </div>
                    </div>
                </>
            }


        </div>
    );
}

export default MovieCard;