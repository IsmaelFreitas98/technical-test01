import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailsDisplayer from "../components/DetailsDisplayer";

const key = process.env.REACT_APP_API_KEY;

function MoviePage() {

    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`)
                .then((response) => {
                    setMovie(response.data);

                    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}`);
                })
                .then(({data}) => {
                    setCredits(data);
                })
                .catch((err) => {
                    console.error(err);
                });
    }, [movieId]);

    return (
        <>
            <Header isResultsPage/>

            {movie && credits && <DetailsDisplayer movie={movie} credits={credits}/>}

        </>
    );
}

export default MoviePage;