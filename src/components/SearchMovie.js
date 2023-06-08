import searchPicture from "../images/search-page-pic.png";
import magnifierPicture from "../images/search-icon.png";
import "./SearchMovie.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchMovie(props) {

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleInputSubmit = (e) => {
        e.preventDefault();

        navigate(`/movies?search=${searchQuery}`);
    }

    return (
        <section className="search-box">
            <div className="search-pic-container">
                <img src={searchPicture} alt="search-pic" />
            </div>

            <div className="search-form">
                <h4 className="search-title">Search by movie name:</h4>

                <div className="search-input">
                    <img src={magnifierPicture} alt="search" />
                    <form onSubmit={handleInputSubmit}>
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SearchMovie;