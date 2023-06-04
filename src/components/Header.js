/* eslint-disable react-hooks/exhaustive-deps */
import "./Header.css"
import bell from "../images/notification.png";
import profilePic from "../images/profile-pic.png";
import arrowDown from "../images/arrow-down.png";
import { useEffect, useState } from "react";

function Header(props) {

    const { movies, callbackToCleanMovies, searchQuery, setSearchQuery, handleSearch} = props;

    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        setSearchQuery("");
    }, [])

    const handleInputSubmit = async (e) => {
        e.preventDefault();

        handleSearch();
    }

    return(
        <header className="header">

            <div onClick={callbackToCleanMovies} className="title-container">
                <h1 className="concealed-title">CONCEALED</h1>
                <h1 className="concealed-title red">FILMS</h1>
            </div>

            <nav className="header-nav" style={{width: movies ? "424px" : "114px", height: movies ? "40px" : "32px"}}>
                {movies && 
                    <form onSubmit={handleInputSubmit}>
                        <input required onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)} type="text" placeholder="Search" className="header-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        { isSearchFocused &&
                            <div className="suggestion-box">
                                List
                            </div>
                        }
                    </form>
                }

                <img src={bell} alt="bell" />

                <div className="profile-icon-container">
                    <img src={profilePic} alt="profile" className="profile-pic"/>
                    <img src={arrowDown} alt="arrow" className="profile-arrow"/>
                </div>

            </nav>

        </header>
    )
}

export default Header;