import searchPicture from "../images/search-page-pic.png"
import "./SearchMovies.css"
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

function SearchMovie(props) {

    const {callbackToSetMovies: setMovies, callbackToSetResult: setResults, searchQuery, setSearchQuery} = props;

    const handleInputSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const newMoviesArr = [];
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`);
            const {data} = response;

            newMoviesArr.push(...data.results);
            
            for(let page = 2; page <= data.total_pages; page++) {
                const {data: newData} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}&page=${page}`);
                newMoviesArr.push(...newData.results);
            }

            setResults(data.total_results);
            setMovies(newMoviesArr);


        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="search-box">
            <img src={searchPicture} alt="search-pic" />

            <h4 className="search-title">Search by movie name:</h4>

            <form onSubmit={handleInputSubmit}>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </form>
        </section>
    );
}

export default SearchMovie;