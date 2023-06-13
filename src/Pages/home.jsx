import React ,{useState}from 'react';
import CalendarCom from './Components/Calender';
import ShowLeaves from './Components/Leaves';

import Navbarcomponent from './Components/Navbar';
function Home() {
  const [turn,seTurn] =useState("leaves")
    return (
         <>
          <Navbarcomponent seTurn={seTurn} />
          {(turn==="leaves")?<ShowLeaves />:<CalendarCom/>}
    
  
         </>
     
    );
  }
  
  export default Home;
