/* eslint-disable react-hooks/exhaustive-deps */
import "./MovieDisplayer.css"
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function MovieDisplayer(props) {
    const { movies, searchQuery, totalResults, page, setPage } = props;

    const [moviesToDisplay, setMoviesToDisplay] = useState(movies.slice(0, 8));
    const [sortOrder, setSortOrder] = useState("ascending");

    useEffect(() => {
        return () => {
            setPage(1);
        }
    }, [])

    useEffect(() => {
        setPage(1);
    }, [sortOrder])

    useEffect(() => {

        const newMoviesToDisplay = [...movies];

        newMoviesToDisplay.sort((movie, nextMovie) => {
            return sortOrder === "ascending" ? movie.title.localeCompare(nextMovie.title) : nextMovie.title.localeCompare(movie.title);
        })
        
        setMoviesToDisplay(newMoviesToDisplay.slice((0 + (page - 1) * 8),( 8 + (page - 1) * 8)));

    }, [sortOrder, page, movies])

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

            <Pagination page={page} totalPages={Math.ceil(movies.length / 8)} setPage={setPage}/>
        </>
    );
}

export default MovieDisplayer;