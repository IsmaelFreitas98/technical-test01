import './App.css';
import Header from './components/Header';
import SearchMovie from './components/SearchMovie';
import { useState } from 'react';
import MovieDisplayer from './components/MovieDisplayer';

function App() {

  const [movies, setMovies] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const cleanMovies = () => {
    setMovies(null);
  }


  return (
    <div className="App">
      <Header movies={movies} callbackToCleanMovies={cleanMovies}/>

      <section className='content'>
        {movies ?
          <MovieDisplayer movies={movies} searchQuery={searchQuery} totalResults={totalResults} page={page} setPage={setPage}/>
          :
          <SearchMovie callbackToSetMovies={setMovies} callbackToSetResult={setTotalResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery}></SearchMovie>
        }
      </section>
    </div>
  );
}

export default App;
