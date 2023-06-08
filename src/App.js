import './App.css';
import Header from './components/Header';
import SearchMovie from './components/SearchMovie';
import { useEffect, useState } from 'react';
import MovieDisplayer from './components/MovieDisplayer';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';



function App() {

  return (
    <div className="App" style={{minHeight: "1396px"}}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<ResultsPage />} />
        </Routes>
    </div>
  );
}

export default App;
