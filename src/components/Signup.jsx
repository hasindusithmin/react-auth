import React from 'react';
import { useEffect, useState } from 'react';
import AES from "crypto-js/aes"
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"

export default function Signup() {

    useEffect(() => {

        if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
            document.getElementById('main').style.cssText = 'width:50%;margin:auto;'
        }

    }, [])

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SignUp = async(e) => {
        e.preventDefault()
        document.getElementById('error-panel').innerText = ''
        // Hash the password 
        const hash = AES.encrypt(password,process.env.REACT_APP_AES).toString()
        // Http requets 
        const res = await fetch(`https://data.mongodb-api.com/app/born-yahdr/endpoint/reactdb/users/add?secret=${process.env.REACT_APP_HTTP}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username,email,password:hash})
        })

        if (res.status === 400) {
            const {error} = await res.json()
            document.getElementById('error-panel').innerText = error
        }

        if (res.status === 201) {
            const {insertedId} = await res.json()
            const token = jwt.sign({id:insertedId},process.env.REACT_APP_JWT,{expiresIn:3600})
            // Set cookie 
            Cookies.set('token',token,{expires:1})
            // Reload 
            window.location.reload()
        }
    }


    return (
        <>
            <h1 className="w3-center">Sign Up</h1>
            <form action="" method="post" autoComplete='off' onSubmit={SignUp}>
                <div className="w3-text-red" id='error-panel'></div>
                <input type="text" value={username} onChange={e => { setUsername(e.target.value) }} className='w3-input w3-border' placeholder='username' required/>
                <br />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} className='w3-input w3-border' placeholder='email' required/>
                <br />
                <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className='w3-input w3-border' placeholder='password' required/>
                <br />
                <input type="submit" value="SignUp" className='w3-input w3-border' />
            </form>
        </>
    );
}

