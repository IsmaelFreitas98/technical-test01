import defaultCover from "../images/default-movie.jpg";
import star from "../images/star.png";
import arrowBack from "../images/arrow-back.png";
import emptyStar from "../images/empty-star.png";
import { calcDate, calcGenres, calcTimeString, roundAverage } from "../utils/AuxFunc";
import "./DetailsDisplayer.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DetailsDisplayer({movie, credits}) {

    const [isFavorite, setIsFavorite] = useState(false);

    const navigate = useNavigate();

    const getDirector = () => {
        const director = credits.crew.filter(member => member.job === "Director")[0];
        
        return director ? director.name : "Not specified";
    }

    const getWriters = () => {
        const writers = credits.crew.filter(member => member.job === "Writer");

        return writers.length === 0 ? <li>Not specified</li> : writers.map(writer => {
            return (
                <li key={writer.id}>
                    {writer.name}
                </li>
            );
        });
    }

    const getActors = () => {
        if(credits.cast.length > 0) {
            return credits.cast.slice(0, 5).map(actor => <li key={actor.id}>{actor.name}</li>)
        } else {
            return <li>Not Specified</li>;
        }
    }

    return (
        <>
            <section className="details-container">
                <img className="details-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultCover} alt={movie.title}/>

                <div className="details-info-container">
                    <img className="return-arrow" src={arrowBack} alt="back" onClick={()=> navigate(-1)} />
                    
                    <div className="general-info">
                        <h1>{movie.title}</h1>

                        <span className="grey">{calcTimeString(movie)} | {calcDate(movie)} | {calcGenres(movie)}</span>

                        <button className="add-favorites" onClick={() => setIsFavorite(isFavorite ? false : true)}><img src={isFavorite ? star : emptyStar} alt="star" /> <span>Add to favorites</span></button>
                    </div>
                    
                    <div className="rating">
                        <span>{roundAverage(movie)} / 10</span>
                        <img src={star} alt="star" />
                    </div>

                    <div className="specific-container">
                        <h2 className="grey">Plot</h2>
                        <p>{movie.overview}</p>
                    </div>


                    <div className="credits">
                        <div className="specific-container">
                            <h2 className="grey">Director</h2>
                            <span>{getDirector()}</span>
                        </div>
                        
                        <div className="specific-container">
                            <h2 className="grey">Story By</h2>
                            <ul>
                                {getWriters()}
                            </ul>
                        </div>

                        <div className="specific-container">
                            <h2 className="grey">Cast</h2>
                            <ul>
                                {getActors()}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="small-details-container">
                <img src={arrowBack} alt="return" className="retrun-arrow" />

                <div className="small-general-info">
                    <img className="small-details-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultCover} alt={movie.title}/>
                    
                    <div className="small-general-info-text">
                        <div>
                            <h1>{movie.title}</h1>
                            <span className="grey">{calcTimeString(movie)} | {calcDate(movie)} | {calcGenres(movie)}</span>
                        </div>

                        <div className="small-rating">
                            <div className="rating">
                                <span>{roundAverage(movie)} / 10</span>
                                <img src={star} alt="star" />
                            </div>

                            <button className="add-favorites" onClick={() => setIsFavorite(isFavorite ? false : true)}><img src={isFavorite ? star : emptyStar} alt="star" /> <span>Add to favorites</span></button>
                        </div>
                    </div>   
                </div>

                <div className="extra-small-rating">
                        <div className="rating">
                            <span>{roundAverage(movie)} / 10</span>
                            <img src={star} alt="star" />
                        </div>

                        <button className="add-favorites" onClick={() => setIsFavorite(isFavorite ? false : true)}><img src={isFavorite ? star : emptyStar} alt="star" /> <span>Add to favorites</span></button>
                </div>


                <div className="small-text-details">
                    <div className="specific-container">
                        <h2 className="grey">Plot</h2>
                        <p>{movie.overview}</p>
                    </div>


                    <div className="credits">
                        <div className="specific-container">
                            <h2 className="grey">Director</h2>
                            <span>{getDirector()}</span>
                        </div>
                        
                        <div className="specific-container">
                            <h2 className="grey">Story By</h2>
                            <ul>
                                {getWriters()}
                            </ul>
                        </div>

                        <div className="specific-container">
                            <h2 className="grey">Cast</h2>
                            <ul>
                                {getActors()}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );

}

export default DetailsDisplayer;