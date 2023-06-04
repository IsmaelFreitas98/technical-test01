/* eslint-disable react-hooks/exhaustive-deps */
import "./MovieDisplayer.css"
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function MovieDisplayer(props) {

    const { movies, searchQuery, totalResults, page, setPage } = props;

    const [moviesToDisplay, setMoviesToDisplay] = useState(movies.slice(0, 8));
    const [sortOrder, setSortOrder] = useState("ascending");

    const [resultQuery, setResultQuery] = useState("");

    useEffect(() => {
        return () => {
            setPage(1);
        }
    }, []);

    useEffect(() => {
        setResultQuery(searchQuery);
    }, [movies]);

    useEffect(() => {
        setPage(1);
    }, [sortOrder, movies]);

    useEffect(() => {

        const newMoviesToDisplay = [...movies];

        newMoviesToDisplay.sort((movie, nextMovie) => {
            return sortOrder === "ascending" ? movie.title.localeCompare(nextMovie.title) : nextMovie.title.localeCompare(movie.title);
        })
        
        setMoviesToDisplay(newMoviesToDisplay.slice((0 + (page - 1) * 10),( 10 + (page - 1) * 10)));

    }, [sortOrder, page, movies])

    const renderMovies = () => {
        return moviesToDisplay.map(movie => {
            return (
                <MovieCard key={movie.id} movie={movie} />
            )
        })
    }

    return (
        <>
            <div className="displayer-header">
                <div className="result-description">
                    <h4>Results for '{resultQuery}'</h4>
                    <p>We found {totalResults} {totalResults === 1 ? "result" : "results"} for '{resultQuery}'</p>
                </div>

                <select className="order-selector" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="ascending">Sort By Name: Ascending</option>
                    <option value="descending">Sort By Name: Descending</option>
                </select>
            </div>

            <section className="results-container">
                <div className="cards-container">
                    {renderMovies()}
                </div>

                <div>
                    <Pagination page={page} totalPages={Math.ceil(movies.length / 10)} setPage={setPage}/>
                </div>
            </section>

        </>
    );
}

export default MovieDisplayer;