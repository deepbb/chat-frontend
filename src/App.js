import { useEffect } from 'react';
import axios from "axios"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './Context/AuthContext';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
  return (
    <>
    <AuthContextProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </>
  );
}

export default App;
