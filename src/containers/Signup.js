import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import bcrypt from 'bcryptjs';
import Menu from '../layout/Menu';
import { baseUrl } from '../utilities/Constants';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [customer, setCustomer] = useState({});
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();
    const saltRounds = 10; // You can adjust the number of rounds as needed

    const validateInput = useMemo(() => {
        // if( password.trim() !== passwordConfirm.trim()){
        //     console.log("Passwords must match")
        // }
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const passwordsMatch = password.trim() === passwordConfirm.trim();
        setPasswordsMatch(passwordsMatch);
        return username.match(pattern) && passwordsMatch && contactNumber.trim().length > 0 && address.trim().length > 0
    }, [username, password, passwordConfirm, contactNumber, address]);

    const handleSignUp = () => {
        // bcrypt.hash(password, saltRounds, (err, hash) => {
        //     if (err) {
        //       console.error('Error hashing password:', err);
        //     } else {
        const signUpDto = { "username": username, "password": password, "contact": contactNumber, "address": address };

        axios.post(`${baseUrl}/save`, signUpDto)
            .then(result => {
                console.log(result.data)
                if (result.data === "Sign-up successful") {
                    navigate("/login")
                }
            })
            .catch(error => console.log("Signup not successful"));
    }
    //});


    //};


    return (
        <div>
            <Header children={<Menu></Menu>} show="signup"></Header>
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <div className='form-group'>
                    <label for="username" className="sr-only">Username </label>
                    <input type='text' className="form-control" name='username' value={username} placeholder="Username" required="" autofocus="" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label for="password" className="sr-only">Password </label>
                    <input type='password' className="form-control" name='password' value={password} placeholder="Password" required="" autofocus="" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label for="password" className="sr-only">Password Confirm </label>
                    <input type='password' className="form-control" name='pwdCon' value={passwordConfirm} placeholder="Confirm Password" required="" autofocus="" onChange={(e) => setPasswordConfirm(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label for="contact" className="sr-only">Contact Number </label>
                    <input type='text' className="form-control" name='contact' value={contactNumber} placeholder="Contact Number" required="" autofocus="" onChange={(e) => setContactNumber(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label for="address" className="sr-only">Address </label>
                    <input type='text' className="form-control" name='address' value={address} placeholder="Enter Address" required="" autofocus="" onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button disabled={!validateInput} onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    )
}
