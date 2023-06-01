import { useState } from "react";
import MovieCard from "./MovieCard";

function MovieDisplayer(props) {
    const { movies } = props;

    const [moviesToDisplay, setMoviesToDisplay] = useState(movies.slice(0, 8));

    const renderMovies = () => {
        return moviesToDisplay.map(movie => {
            return (
                <>
                    <MovieCard movie={movie} />
                </>
            )
        })
    }
    return (
        <>
            <div className="displayer-header">
                <div className="result-description">
                    <h4>Results for '{}'</h4>
                </div>
            </div>
            {renderMovies()}
        </>
    );
}

export default MovieDisplayer;