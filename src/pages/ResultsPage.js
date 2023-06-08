import { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieDisplayer from "../components/MovieDisplayer";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const key = process.env.REACT_APP_API_KEY || "37806dd1300837fa217e0539b5252818";

function ResultsPage() {

    const [movies, setMovies] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    const [params] = useSearchParams();
    const searchQuery = params.get("search");

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const newMoviesArr = [];
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`);
            const {data} = response;

            newMoviesArr.push(...data.results);

            setMovies(newMoviesArr);
            setTotalResults(data.total_results);
            
            for(let page = 2; page <= data.total_pages; page++) {
              const {data: newData} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}&page=${page}`);
              newMoviesArr.push(...newData.results);
            }
            

        } catch (err) {
            console.error(err);
        }
    }


    return(
        <>
            <Header isResultsPage />

            {movies && <MovieDisplayer movies={movies} searchQuery={searchQuery} totalResults={totalResults} page={page} setPage={setPage}/>}
        </>
    );
}

export default ResultsPage;