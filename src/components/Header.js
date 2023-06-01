import "./Header.css"

function Header(props) {

    const { movies, callbackToCleanMovies, searchQuery, setSearchQuery, handleSearch} = props;

    const handleInputSubmit = async (e) => {
        e.preventDefault();

        handleSearch();
    }

    return(
        <header className="header">
            <h1 className="concealed-title" onClick={callbackToCleanMovies}>CONCEALED <span className="red">FILMS</span></h1>

            <nav>
                {movies && 
                    <form onSubmit={handleInputSubmit}>
                        <input required type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </form>
                }
            </nav>
        </header>
    )
}

export default Header;