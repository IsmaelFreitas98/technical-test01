export const roundAverage = (movieDetails) => {
    return Math.floor(movieDetails.vote_average * 10) / 10;
}

export const calcTimeString = (movieDetails) => {
    const hours = Math.floor(movieDetails.runtime / 60);
    const min = movieDetails.runtime - hours * 60;

    return hours > 0 ? `${hours}h${min}min` : min === 0 ? "Unavailable" : `${min}min`;
}

export const calcGenres = (movieDetails) => {
    if(movieDetails.genres) {
        const genres = movieDetails.genres.map(genreObj => {
            return genreObj.name;
        })
        return genres.join(", ");
    } else {
        return "Unspecified Genre";
    }
}

export const calcDate = (movieDetails) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if(!movieDetails.release_date) {
        return "Release Date Not Available";
    }

    const day = movieDetails.release_date.split("-")[2];
    const month = months[parseInt(movieDetails.release_date.split("-")[1]) - 1];
    const year = movieDetails.release_date.split("-")[0];

    return `${day} ${month} ${year}`;

}