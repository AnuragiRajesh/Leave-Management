import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import '../App.css'
// import { useCookies } from 'react-cookie';
import { loginApi } from '../Services/LeaveService';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidLoginCredentials,setInvalidLoginCredentials]= useState('')
  // const [cookies, setCookie] = useCookies(['cookie-name']);
  // const [cookieValue, setCookieValue] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // const handleSetCookie = () => {
   
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validate email
    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    // Proceed with login if form is valid
    if (isValid) {
      // Add your login logic here
      //   console.log(jsonData);



      
    loginApi({
        email:email,
        password,password
      }).then((response) => {
        console.log(response.data);
        
        localStorage.setItem('Access_Token', response.data.access_token)
        localStorage.setItem("Refresh Token", response.data.refresh_token)
        navigate('/home');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setInvalidLoginCredentials(error.response.data.error_description)
        setTimeout(() => {
        setInvalidLoginCredentials('')
        }, 3000);
        console.log(error.response.data.error_description,"koko");
      });
    }
  };

  return (
    <div className="App">
      <form   onSubmit={handleSubmit}>
        <p style={{color:"red"}}>{invalidLoginCredentials}</p>
      <h2 style={{marginBottom:"20px"}}>Leave Management</h2>
       
       <div className='container-form-fields' > <div style={{ width:"100%"}}>
        <input type="email" className='form-fields' value={email} onChange={handleEmailChange} placeholder='   Email' />
          {emailError && <p style={{color:"red",marginLeft:"3rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}>{emailError}</p>}
        
        </div>  
        <div style={{ width:"100%"}}>

          <input className='form-fields' type="password" value={password} onChange={handlePasswordChange} placeholder='Password' />
          {passwordError && <p style={{ color:"red",marginLeft:"3rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}>{passwordError}</p>}</div>
        </div>
         <div style={{paddingLeft:"3rem", paddingTop:'2px' , textAlign:"left"}}><a href='/register'>Don't have an account?</a></div>
        <button className='Submit-btn' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
