import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, setQwery } from './redux/slices/UtilsSlice';

function App() {

  const location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    let path = location.pathname.split('/')[1];
    dispatch(setQwery(undefined))

    dispatch(fetchData({
      category: path === '' ? 'general' : path,

    }))



  }, [location, dispatch])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/business' element={<Home />} />
        <Route path='/sports' element={<Home />} />
        <Route path='/science' element={<Home />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>

    </>
  );
}

export default App;
