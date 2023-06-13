import defaultCover from "../images/default-movie.jpg";
import star from "../images/star.png";
import arrowBack from "../images/arrow-back.png";
import { calcDate, calcGenres, calcTimeString, roundAverage } from "../utils/AuxFunc";
import "./DetailsDisplayer.css";
import { useNavigate } from "react-router-dom";

function DetailsDisplayer({movie, credits}) {

    const navigate = useNavigate();

    console.log(credits);

    const getDirector = () => {
        return credits.crew.filter(member => member.job === "Director")[0].name;
    }

    const getWriters = () => {
        const writers = credits.crew.filter(member => member.job === "Writer");

        return writers.map(writer => {
            return (
                <li key={writer.id}>
                    {writer.name}
                </li>
            );
        });
    }

    const getActors = () => {
        return credits.cast.slice(0, 5).map(actor => <li key={actor.id}>{actor.name}</li>)
    }

    return (
        <section className="details-container">
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultCover} alt={movie.title}/>

            <div>
                <img src={arrowBack} alt="back" onClick={()=> navigate(-1)} />
                <h1>{movie.title}</h1>

                <span>{calcTimeString(movie)} | {calcDate(movie)} | {calcGenres(movie)}</span>

                <div className="rating">
                    <span>{roundAverage(movie)} / 10</span>
                    <img src={star} alt="star" />
                </div>

                <h2>Plot</h2>
                <p>{movie.overview}</p>

                <div className="credits">
                    <div>
                        <h2>Director</h2>
                        <span>{getDirector()}</span>
                    </div>
                    
                    <div>
                        <h2>Story By</h2>
                        <ul>
                            {getWriters()}
                        </ul>
                    </div>

                    <div>
                    <h2>Cast</h2>
                        <ul>
                            {getActors()}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default DetailsDisplayer;