import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"
import supabase from './supabaseClient';

function App() {


  const [oldUser, setOldUser] = useState(true)
  const [auth, setAuth] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const transfer = () => {
    setOldUser(!oldUser)
  }

  const fetch = async (decoded) => {
    const { data } = await supabase.from('users').select().match({ id: decoded['id'] }).single()
    const { email, username } = data;
    setEmail(email)
    setUsername(username)
  }

  useEffect(() => {
    if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
      document.getElementById('main').style.cssText = 'width:50%;margin:auto;'
    }
    const token = Cookies.get('token')
    jwt.verify(token, 'shhhh', (err, decoded) => {
      if (!err) {
        fetch(decoded)
        setAuth(true)
      }
    })

  }, [])

  return (
    <div className='w3-row w3-container' id='main'>
      {
        !auth
        &&
        (
          <>
            <div className="w3-row">
              {oldUser ? <Signin /> : <Signup />}
            </div>
            <div className='w3-row'>
              {oldUser ? <p className='w3-center w3-text-blue' onClick={transfer}>Create account</p> : <p className='w3-center w3-text-blue' onClick={transfer}>Do you have account login</p>}
            </div>
          </>
        )
      }
      {
        auth
        &&
        <div id='w3-row'>
          <div>{username}</div>
          <div>{email}</div>
        </div>
      }
    </div>
  );
}

export default App;
