import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import RequestLeave from './Pages/Components/ReqLeave';
import Register from './Pages/Register'
import Login from './Pages/Login';
import Home from './Pages/home';
import './App.css';
// import LeaveFilter from './Pages/Components/test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/home' element={<Home />} />

        {/* <Route path='/home' element={<Home />} /> */}
       
        
      </Routes>
    </Router>
  );
}

export default App;
