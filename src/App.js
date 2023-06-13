import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import MoviePage from './pages/MoviePage';
import PageNotFound from './pages/PageNotFound';



function App() {

  return (
    <div className="App" style={{minHeight: "1396px"}}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<ResultsPage />} />
          <Route path='/movies/:movieId' element={<MoviePage />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
