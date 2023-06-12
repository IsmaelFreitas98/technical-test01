/* eslint-disable react-hooks/exhaustive-deps */
import "./MovieDisplayer.css"
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import arrowDown from "../images/arrow-down.png";

function MovieDisplayer(props) {

    const { movies, searchQuery, page, setPage, totalResults } = props;

    const [moviesToDisplay, setMoviesToDisplay] = useState(null);
    const [sortOrder, setSortOrder] = useState("ascending");
    const [isSortSelectorOpen, setIsSortSelectorOpen] = useState(false);
    
    useEffect(() => {
        return () => {
            setPage(1);
        }
    }, []);

    useEffect(() => {
        setPage(1);
    }, [sortOrder, movies]);

    useEffect(() => {

        if(movies) {
            const newMoviesToDisplay = [...movies];

            newMoviesToDisplay.sort((movie, nextMovie) => {
                return sortOrder === "ascending" ? movie.title.localeCompare(nextMovie.title) : nextMovie.title.localeCompare(movie.title);
            })

            setMoviesToDisplay(newMoviesToDisplay.slice((0 + (page - 1) * 10),( 10 + (page - 1) * 10)));
        }

    }, [sortOrder, page, movies])

    const renderMovies = () => {

        return moviesToDisplay.map(movie => {
            return (
                <MovieCard key={movie.id} movie={movie} />
            )
        })
    }

    const handleOptionsChange = () => {
        setIsSortSelectorOpen(isSortSelectorOpen ? false : true);
    }

    return (
        <>
            <div className="displayer-header">
                <div className="result-description">
                    <h4>Results for '{searchQuery}'</h4>
                    <p>We found {totalResults} {totalResults === 1 ? "result" : "results"} for '{searchQuery}'</p>
                </div>

                <button className="order-selector" style={{backgroundColor: isSortSelectorOpen ? "#131C23" : "#09131A"}} onClick={handleOptionsChange} onBlur={() => setIsSortSelectorOpen(false)}>
                    <span>Sort By Name:</span>
                    <span>{sortOrder === "ascending" ? "Ascending" : "Descending"}</span>

                    <img src={arrowDown} alt="arrow" className={isSortSelectorOpen ? "arrow-up" : "arrow-down"}/>

                    { isSortSelectorOpen &&
                        <div className="sort-options">
                            <div onClick={() => {setSortOrder("ascending"); setIsSortSelectorOpen(false)}}>
                                <span>Ascending</span>
                            </div>
                            <div onClick={() => {setSortOrder("descending"); setIsSortSelectorOpen(false)}}>
                                <span>Descending</span>
                            </div>
                        </div>
                    }
                </button>
            </div>

            <section className="results-container">
                <div className="cards-container">
                    {moviesToDisplay && renderMovies()}
                </div>

                <div className="pagination">
                    <Pagination page={page} totalPages={Math.ceil(totalResults / 10)} setPage={setPage}/>
                </div>
            </section>

        </>
    );
}

export default MovieDisplayer;