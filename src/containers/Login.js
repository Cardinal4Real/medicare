import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import bcrypt from 'bcryptjs';
import Menu from '../layout/Menu';
import { MediCareContext } from '../contexts/MediCareContext';
import Alert from '../components/AlertC';
import AlertC from '../components/AlertC';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setErrorMsg]=useState("");
  const { setCustomer } = useContext(MediCareContext);
  const navigate = useNavigate();
  const saltRounds = 10;


  const validInput = useMemo(() => {
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (email.trim().length > 0 && email.match(pattern) && password.trim().length > 0)
  }
    , [email, password]);

  const handleSubmit = useCallback(() => {
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //   if (err) {
    //     console.error('Error hashing password:', err);
    //   } else {
    const login = { "username": email, "password": password };
    

    axios.post("http://localhost:8080/login", login)
      .then(
        result => {
          console.log(result.data)
          setCustomer(result.data)
          navigate("/customershop")
        })
      .catch(
        error => {console.log("failed");
        setErrorMsg("Login unsuccessful");
        setTimeout(() => {
          setErrorMsg('');
        }, 5000); // Set a timeout to clear the error message after 5 seconds
      });

  }, [email, password]);
  return (
    <div>
      <Header show={"signin"}>{<Menu></Menu>}</Header>
      {errorMsg&&<AlertC variant="danger" msg={errorMsg}></AlertC>}
      <div className="form-signin">

        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
        <div>
          <div className='form-group'>
          <label htmlFor="email" className="sr-only">Email address</label>
            <input type='email' className="form-control" placeholder="Email address" required="" autoFocus name='email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
          </div>
          <div className='form-group'>
          <label htmlFor="password" className="sr-only">Password</label>
            <input type='password' className="form-control" placeholder="Password" required="" name='password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
          </div>
          <button className="btn btn-lg btn-primary btn-block" disabled={!validInput} onClick={handleSubmit}>Sign In</button>
        </div>
    
      </div>
    </div>
  )
}
