import { useState } from "react";
import searchPicture from "../images/search-page-pic.png"
import "./SearchMovies.css"
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

function SearchMovie(props) {

    const {callbackToSetMovies: setMovies} = props;

    const [searchQuery, setSearchQuery] = useState("");

    const handleInputSubmit = (e) => {
        e.preventDefault();

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`)
            .then((response) => {
                console.log(response);
                setMovies(response.data.results);
                setSearchQuery("");
            }).catch((err) => {
                console.log(err);
            });
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