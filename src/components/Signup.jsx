import React from 'react';
import { useEffect, useState } from 'react';


export default function Signup() {

    useEffect(() => {

        if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
            document.getElementById('main').style.cssText = 'width:50%;margin:auto;'
        }

    }, [])

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SignUp = e => {
        e.preventDefault()
        console.log({username,email,password});
    }


    return (
        <>
            <h1 className="w3-center">Sign Up</h1>
            <form action="" method="post" autoComplete='off' onSubmit={SignUp}>
                <input type="text" value={username} onChange={e => { setUsername(e.target.value) }} className='w3-input w3-border' placeholder='username' required/>
                <br />
                <input type="text" value={email} onChange={e => { setEmail(e.target.value) }} className='w3-input w3-border' placeholder='email' required/>
                <br />
                <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className='w3-input w3-border' placeholder='password' required/>
                <br />
                <input type="submit" value="SignUp" className='w3-input w3-border' />
            </form>
        </>
    );
}

