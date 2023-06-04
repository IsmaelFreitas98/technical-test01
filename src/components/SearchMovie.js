import searchPicture from "../images/search-page-pic.png";
import magnifierPicture from "../images/search-icon.png";
import "./SearchMovie.css";

function SearchMovie(props) {

    const { searchQuery, setSearchQuery, handleSearch} = props;

    const handleInputSubmit = async (e) => {
        e.preventDefault();
    
        handleSearch();
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
                        <input required type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SearchMovie;