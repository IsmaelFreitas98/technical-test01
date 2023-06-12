import './App.css';
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
