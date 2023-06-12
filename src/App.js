import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CalendarCom from './Pages/Components/Calender';
import ShowLeaves from './Pages/Components/Leaves';
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
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} >
            <Route path="" element={<ShowLeaves />} />
            <Route path="calendar" element={<CalendarCom />} />
            {/* <Route path="home/requestleave" element={<RequestLeave />} /> */}
        </Route>
    </Routes>
</Router>

  );
}

export default App;
