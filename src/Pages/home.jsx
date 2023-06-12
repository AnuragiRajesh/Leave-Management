import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Navbarcomponent from './Components/Navbar';
function Home() {
    return (
         <>
          <Navbarcomponent />
          <Outlet/>
         </>
     
    );
  }
  
  export default Home;
