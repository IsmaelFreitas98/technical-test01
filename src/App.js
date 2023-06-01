import './App.css';
import Header from './components/Header';
import SearchMovie from './components/SearchMovie';
import { useState } from 'react';
import MovieDisplayer from './components/MovieDisplayer';
import axios from 'axios';

const key = process.env.REACT_APP_API_KEY || "37806dd1300837fa217e0539b5252818";

function App() {

  const [movies, setMovies] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const cleanMovies = () => {
    setSearchQuery("");
    setMovies(null);
  }

  const handleSearch = async () => {
    try {
      const newMoviesArr = [];
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}`);
      const {data} = response;

      newMoviesArr.push(...data.results);
      
      for(let page = 2; page <= data.total_pages; page++) {
          const {data: newData} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}&page=${page}`);
          newMoviesArr.push(...newData.results);
      }

      console.log("got results");

      setTotalResults(data.total_results);
      setMovies(newMoviesArr);


  } catch (err) {
      console.error(err);
  }
  }


  return (
    <div className="App">
      <Header movies={movies} callbackToCleanMovies={cleanMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}/>

      <section className='content'>
        {movies ?
          <MovieDisplayer movies={movies} searchQuery={searchQuery} totalResults={totalResults} page={page} setPage={setPage}/>
          :
          <SearchMovie callbackToSetMovies={setMovies} callbackToSetResult={setTotalResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        }
      </section>
    </div>
  );
}

export default App;
