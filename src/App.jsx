import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"

function App() {


  const [oldUser, setOldUser] = useState(true)
  const [auth, setAuth] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const transfer = () => {
    setOldUser(!oldUser)
  }

  const logout = ()=>{
    Cookies.remove('token')
    window.location.reload()
  }

  useEffect(() => {
    if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
      document.getElementById('main').style.cssText = 'width:50%;margin:auto;'
    }
    const token = Cookies.get('token')
    if (token !== undefined) {
      jwt.verify(token, process.env.REACT_APP_JWT, async (err, decoded) => {
        if (err) {
          alert(err.message)
        }
        else {
          const { id } = decoded;
          const res = await fetch(`https://data.mongodb-api.com/app/born-yahdr/endpoint/reactdb/users/read?secret=${process.env.REACT_APP_HTTP}&id=${id}`)
          if (res.status === 404) {
            alert("user not found")
          }
          else {
            const { username, email } = await res.json()
            setUsername(username)
            setEmail(email)
            setAuth(true)
          }
        }
      })
    }


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
          <button onClick={logout}>logout</button>
        </div>
      }
    </div>
  );
}

export default App;
