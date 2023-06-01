import { useState } from "react";

function MovieDisplayer(props) {
    const { movies } = props;

    const [moviesToDisplay, setMoviesToDisplay] = useState(movies.slice(0, 8));

    const renderMovies = () => {
        return moviesToDisplay.map(movie => {
            return (
                <>
                    <h4>{movie.title}</h4>
                </>
            )
        })
    }
    return (
        <>
            {renderMovies()}
        </>
    );
}

export default MovieDisplayer;