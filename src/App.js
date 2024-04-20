import './App.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipePage from './components/recipePage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='recipe' element={<RecipePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
