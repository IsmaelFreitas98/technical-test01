import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SearchMovie from './components/SearchMovie';
import { useState } from 'react';

function App() {

  const [movies, setMovies] = useState(null);


  return (
    <div className="App">
      <Header />

      <section className='content'>
        {movies ?
          <p>Movies{console.log(movies)}</p>
          :
          <SearchMovie callbackToSetMovies={setMovies}></SearchMovie>
        }
      </section>
    </div>
  );
}

export default App;
