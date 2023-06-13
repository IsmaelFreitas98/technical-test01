/* eslint-disable react-hooks/exhaustive-deps */
import "./MovieCard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import star from "../images/star.png";
import defaultCover from "../images/default-movie.jpg"
import { useNavigate } from "react-router-dom";
import { calcDate, calcGenres, calcTimeString, roundAverage } from "../utils/AuxFunc";

const key = process.env.REACT_APP_API_KEY;

function MovieCard(props) {
    const {movie} = props;

    const [movieDetails, setMovieDetails] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${key}`)
            .then((response) => {
                setMovieDetails(response.data);
            }).catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="movie-card">
        
            {movieDetails &&
                <>
                    <div className="movie-poster" onClick={() => navigate(`/movies/${movie.id}`)} style={{backgroundImage: movie.poster_path ? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` : `url(${defaultCover})`}}>
                    </div>

                    
                    <div className="movie-info">

                        <div className="movie-info-text">
                            <h4>{movie.title}</h4>
                            <p>{calcTimeString(movieDetails)} | {calcGenres(movieDetails)} | {calcDate(movieDetails)}</p>
                        </div>

                        <div className="rating">
                            <span>{roundAverage(movieDetails)} / 10</span>
                            <img src={star} alt="star" />
                        </div>
                    </div>
                </>
            }


        </div>
    );
}

export default MovieCard;