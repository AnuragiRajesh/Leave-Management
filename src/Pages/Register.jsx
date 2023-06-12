import React, { useState } from 'react';
import validator from 'validator';
import { registerApi } from '../Services/LeaveService';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword]= useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError]= useState('')
  const [invalidLoginCredentials,setInvalidLoginCredentials]= useState('')
  const navigate = useNavigate();
  const handleEmailChange = (e) => {  
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReEnterPasswordChange = (e) =>{
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('')

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
    if (password!==confirmPassword) {
      console.log("juju")
      setConfirmPasswordError('Password did not match');
      isValid = false;
    }

    // Proceed with Register if form is valid
    if (isValid) {
      // Add your Register logic here
registerApi({
  email:email,
  password,password
}).then((response) => {
        console.log(response.data);
        localStorage.setItem("Access Token", response.data.access_token)
        localStorage.setItem("Refresh Token", response.data.refresh_token)
        navigate('/login');
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
      console.log('Email:', email);
      console.log('Password:', password);
      // Reset the form
      setEmail('');
      setPassword('');
      setConfirmPassword("")
    }
  };

  return (
    <div className="App">
      <form   onSubmit={handleSubmit}>
      <p style={{color:"red"}}>{invalidLoginCredentials}</p>
      <h2>Leave Management</h2>
       
       <div className='container-form-fields' > <div style={{ width:"100%"}}>
        <input type="email" className='form-fields' value={email} onChange={handleEmailChange} placeholder='   Email' />
          {emailError && <p style={{color:"red",marginLeft:"2rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}>{emailError}</p>}
        
        </div>  
        <div style={{ width:"100%"}}>

          <input className='form-fields' type="password" value={password} onChange={handlePasswordChange} placeholder='Password' />
          {passwordError && <p style={{ color:"red",marginLeft:"2rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}>{passwordError}</p>}</div>
          <div style={{ width:"100%"}}>

          <input className='form-fields' type="password" value={confirmPassword} onChange={handleReEnterPasswordChange} placeholder='Re Enter Password' />
          {confirmPasswordError && <p style={{ color:"red",marginLeft:"2rem", marginTop:"2px" ,display:"flex", textAlign:"left"}}> {confirmPasswordError}</p>}</div>
        </div>
         <div style={{paddingLeft:"2rem", paddingTop:'15px' , textAlign:"left"}}><a href='/'>Already have an account?</a></div>
        <button className='Submit-btn' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;