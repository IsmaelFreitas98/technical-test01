import "./Header.css"
import bell from "../images/notification.png";
import profilePic from "../images/profile-pic.png";
import arrowDown from "../images/arrow-down.png";

function Header(props) {

    const { movies, callbackToCleanMovies, searchQuery, setSearchQuery, handleSearch} = props;

    const handleInputSubmit = async (e) => {
        e.preventDefault();

        handleSearch();
    }

    return(
        <header className="header">
            <h1 className="concealed-title" onClick={callbackToCleanMovies}>CONCEALED <span className="red">FILMS</span></h1>

            <nav className="header-nav" style={{width: movies ? "424px" : "114px", height: movies ? "40px" : "32px"}}>
                {movies && 
                    <form onSubmit={handleInputSubmit}>
                        <input required type="text" className="header-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </form>
                }

                <img src={bell} alt="bell" />
                <div className="profile-icon-container">
                    <img src={profilePic} alt="profile" />
                    <img src={arrowDown} alt="arrow" />
                </div>

            </nav>
        </header>
    )
}

export default Header;