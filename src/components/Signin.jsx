import React from 'react';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken"
import Cookies from 'js-cookie';

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const SignIn = async (e) => {
        e.preventDefault()
        document.getElementById('error-panel').innerText = ''
        const res = await fetch(`https://data.mongodb-api.com/app/born-yahdr/endpoint/reactdb/users/readbyemail?secret=${process.env.REACT_APP_HTTP}&email=${email}`)
        const data = await res.json()
        if (res.status === 404) document.getElementById('error-panel').innerText = 'User not found'
        else {
            const passwordInDb = CryptoJS.AES.decrypt(data.password,process.env.REACT_APP_AES).toString(CryptoJS.enc.Utf8)
            if (password === passwordInDb) {
                // Jwt sign
                const token = jwt.sign({id:data._id},process.env.REACT_APP_JWT,{expiresIn:3600})
                // Set cookie 
                Cookies.set('token',token,{expires:1})
                // Reload 
                window.location.reload()
            }
            else document.getElementById('error-panel').innerText = 'Incorrect password'
        }   

    }
    return (
        <>
            <h1 className="w3-center">Sign In</h1>
            <form action="" method="post" autoComplete='off' onSubmit={SignIn}>
                <div className="w3-text-red" id='error-panel'></div>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} className='w3-input w3-border' placeholder='email' required />
                <br />
                <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className='w3-input w3-border' placeholder='password' required />
                <br />
                <input type="submit" value="SignIn" className='w3-input w3-border' />
            </form>
        </>
    )
}