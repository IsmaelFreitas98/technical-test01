/* eslint-disable react-hooks/exhaustive-deps */
import "./MovieDisplayer.css"
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function MovieDisplayer(props) {
    const { movies, searchQuery, totalResults } = props;

    const [moviesToDisplay, setMoviesToDisplay] = useState(movies.slice(0, 8));
    const [sortOrder, setSortOrder] = useState("ascending");

    useEffect(() => {

        const newMoviesToDisplay = [...movies];

        console.log(newMoviesToDisplay);
        newMoviesToDisplay.sort((movie, nextMovie) => {
            return sortOrder === "ascending" ? movie.title.localeCompare(nextMovie.title) : nextMovie.title.localeCompare(movie.title);
        })
        
        setMoviesToDisplay(newMoviesToDisplay.slice(0, 8));

    }, [sortOrder])

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
                    <h4>Results for '{searchQuery}'</h4>
                    <p>We found {totalResults} {totalResults === 1 ? "result" : "results"} for '{searchQuery}'</p>
                </div>

                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="ascending">Sort By Name: Ascending</option>
                    <option value="descending">Sort By Name: Descending</option>
                </select>
            </div>

            <div className="movie-card-container">
                {renderMovies()}
            </div>
        </>
    );
}

export default MovieDisplayer;