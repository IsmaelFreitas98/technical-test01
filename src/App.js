import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SearchMovie from './components/SearchMovie';
import { useState } from 'react';
import MovieDisplayer from './components/MovieDisplayer';

function App() {

  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const cleanMovies = () => {
    setMovies(null);
  }


  return (
    <div className="App">
      <Header movies={movies} callbackToCleanMovies={cleanMovies}/>

      <section className='content'>
        {movies ?
          <MovieDisplayer movies={movies} searchQuery={searchQuery}/>
          :
          <SearchMovie callbackToSetMovies={setMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery}></SearchMovie>
        }
      </section>
    </div>
  );
}

export default App;
