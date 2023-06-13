import React from 'react';
// import { logoutApi } from '../../Services/LeaveService';
import { useNavigate } from 'react-router-dom';
// import getLeaveApi from ""
const Navbarcomponent = ( {seTurn}) => {
    const navigate = useNavigate();
    const logout = ()=>{
        const result =  window.confirm("Are you sure you want to log out?")
        if (result) {
                      localStorage.clear()
                      navigate('/')
                    //       logoutApi().then((response) => {
                    //         const data = response.data
                    //         console.log(data)
                    // //         localStorage.clear()
                    // //   navigate('/')
                            
                    //       })
                    //       .catch((error) => {
                    //         alert(
                    //           error.response.data.message
                    //         )
                    //         console.log(error.response.data.message,"koko");
                    //       })
                       
                      }
    }
  return (
  <nav  style={{backgroundColor:"green"}} className="navbar navbar-expand-lg  navbarScroll ">
  <div className="container ">
     {/* <h2 > <img src="https://flurn.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.1212dc54.png&w=96&q=75" alt="" /></h2> */}
     <h1>FLURN</h1>
      {/* <button className="navbar-toggler menu" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <img class="collapse navbar-collapse" src={require('../../menu-icon-19350.png')} alt="menuIcon" />
      </button> */}
      <button className="navbar-toggler menu" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
                
                <img style={{height:"40px"}} src={require('../../menu-icon-19350.png')} alt="menuIcon"/>
                
            </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <h5>
                <button
                  onClick={() => {
                    seTurn("leaves");
                  }}
                  style={{ fontWeight: "bolder",backgroundColor:"green", border:"none" }}
                >
                  My-Leaves
                </button>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <button
                  onClick={() => {
                    seTurn("calendar");
                  }}
                  style={{ fontWeight: "bolder",backgroundColor:"green", border:"none" }}
                >
                  Calendar
                </button>
              </h5>
            </li>
            <li className="nav-item">
              <h5>
                <button onClick={logout} style={{ fontWeight: "bolder",backgroundColor:"green", border:"none" }}>
                  Logout
                </button>
              </h5>
            </li>
          </ul>
          
      </div>
  </div>
</nav>
  );
};
///////////seTurn("leaves")
export default Navbarcomponent;