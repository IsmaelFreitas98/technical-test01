/* eslint-disable react-hooks/exhaustive-deps */
import "./Header.css"
import bell from "../images/notification.png";
import profilePic from "../images/profile-pic.png";
import magnifierPicture from "../images/search-icon.png";
import closePicture from "../images/close.png";
import burguerMenu from "../images/burguer-menu.png";
import arrowDown from "../images/arrow-down.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const key = process.env.REACT_APP_API_KEY || "37806dd1300837fa217e0539b5252818";

function Header(props) {

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [titleSuggestions, setTitleSuggestions] = useState(null);

    const [isSmallSearchOpen, setIsSmallSearchOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        if(isSearchFocused && searchQuery !== "") {

            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`)
                .then((response) => {

                    const suggestionsArr = response.data.results
                                            .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .slice(0, 3)
                                            .map(movie => movie.title);

                    suggestionsArr.length === 0 ? setTitleSuggestions(null) : setTitleSuggestions(suggestionsArr);
                })
                .catch((err) => {
                    console.error(err);
                });

        } else if(searchQuery === "") {
            setTitleSuggestions(null);
        }
    }, [searchQuery])


    const handleInputSubmit = async (e) => {
        if(e) {
            e.preventDefault();
        }

        if(isSmallSearchOpen) {
            setIsSmallSearchOpen(false);
        }

        navigate(`/movies?search=${searchQuery}`);
        setSearchQuery("");
    }

    const renderOption = (title) => {
        const indexToStyle = title.toLowerCase().indexOf(searchQuery.toLowerCase());

        return(
            <>
                {title.slice(0, indexToStyle)}
                
                <span className="highlighted">
                    {title.slice(indexToStyle, (indexToStyle + searchQuery.trim().length))}
                </span>

                {title.slice((indexToStyle + searchQuery.trim().length))}
            </>
        )
    }

    return(
        <>

            <header className="header">

                <div onClick={() => navigate("/")} className="long-title-container">
                    <h1 className="concealed-title">CONCEALED</h1>
                    <h1 className="concealed-title red">FILMS</h1>
                </div>
                
                <div onClick={() => navigate("/")} className="short-title-container">
                    <h1 className="concealed-title">C</h1>
                    <h1 className="concealed-title red">F</h1>
                </div>

                <nav className="header-nav" style={{width: props.isResultsPage ? "424px" : "114px", height: props.isResultsPage ? "40px" : "32px"}}>
                    
                    {props.isResultsPage &&

                        <form className="header-search-form" onSubmit={handleInputSubmit}  style={{borderRadius: (isSearchFocused && titleSuggestions) ? "12px 12px 0 0" : "12px"}}>
                            <img src={magnifierPicture} alt="search" onClick={() => searchQuery !== "" && handleInputSubmit()}/>
                            <input onFocus={() => setIsSearchFocused(true)} onBlur={() => {setTimeout(() => {setIsSearchFocused(false)}, 100)}} type="text" placeholder="Search" className="header-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

                            { searchQuery !== "" &&
                                <img src={closePicture} alt="close" style={{height: "16px", width: "16px"}} className="close-search" onClick={() => setSearchQuery("")}/>
                            }

                            { (isSearchFocused && titleSuggestions) &&
                                <div className="suggestion-box">
                                    <ul>
                                        {titleSuggestions.map((title, index) => {
                                            return (
                                                <li key={index} style={{top: index * 40 + "px"}} onClick={() => {setSearchQuery(title)}}>{renderOption(title)}</li>
                                            );
                                        })}
                                    </ul>
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

                
                <nav className="small-menu">
                    { props.isResultsPage &&
                        <img src={magnifierPicture} alt="search" onClick={() => setIsSmallSearchOpen(isSmallSearchOpen ? false : true)}/>
                    }
                    <img src={burguerMenu} alt="menu" />
                </nav>
                
            </header>

            { isSmallSearchOpen &&
                <form className="header-search-form" onSubmit={handleInputSubmit}  style={{borderRadius: (isSearchFocused && titleSuggestions) ? "12px 12px 0 0" : "12px", margin: "40px auto 0 auto"}}>
                    <img src={magnifierPicture} alt="search" onClick={() => searchQuery !== "" && handleInputSubmit()}/>
                    <input onFocus={() => setIsSearchFocused(true)} onBlur={() => {setTimeout(() => {setIsSearchFocused(false)}, 100)}} type="text" placeholder="Search" className="header-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

                    { searchQuery !== "" &&
                        <img src={closePicture} alt="close" style={{height: "16px", width: "16px"}} className="close-search" onClick={() => setSearchQuery("")}/>
                    }

                    { (isSearchFocused && titleSuggestions) &&
                        <div className="suggestion-box">
                            <ul>
                                {titleSuggestions.map((title, index) => {
                                    return (
                                        <li key={index} style={{top: index * 40 + "px"}} onClick={() => {setSearchQuery(title)}}>{renderOption(title)}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    }
                </form>
            }
        </>
    )
}

export default Header;