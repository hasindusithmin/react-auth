import React from 'react';
import { useState } from 'react';

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const SignIn = e => {
        e.preventDefault()
    }
    return (
        <>
            <h1 className="w3-center">Sign In</h1>
            <form action="" method="post" autoComplete='off' onSubmit={SignIn}>
                <input type="text" value={email} onChange={e => { setEmail(e.target.value) }} className='w3-input w3-border' placeholder='email' />
                <br />
                <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className='w3-input w3-border' placeholder='password' />
                <br />
                <input type="submit" value="SignIn" className='w3-input w3-border' />
            </form>
        </>
    )
}