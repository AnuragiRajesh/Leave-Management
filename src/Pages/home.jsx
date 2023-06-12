import React from 'react';
import {
  BrowserRouter as 
 
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
