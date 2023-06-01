import searchPicture from "../images/search-page-pic.png"
import "./SearchMovies.css"

function SearchMovie(props) {

    const { searchQuery, setSearchQuery, handleSearch} = props;

    const handleInputSubmit = async (e) => {
        e.preventDefault();
    
        handleSearch();
    }

    return (
        <section className="search-box">
            <img src={searchPicture} alt="search-pic" />

            <h4 className="search-title">Search by movie name:</h4>

            <form onSubmit={handleInputSubmit}>
                <input required type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </form>
        </section>
    );
}

export default SearchMovie;