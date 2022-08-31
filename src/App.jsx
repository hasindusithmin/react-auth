import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Cookies from 'js-cookie'
import jwt from "jsonwebtoken"
import Post from './components/Post';
import Comment from './components/Comment';

function App() {


  const [oldUser, setOldUser] = useState(true)
  const [auth, setAuth] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [posts, setPosts] = useState(null)
  const [comments, setComments] = useState(null)

  const transfer = () => {
    setOldUser(!oldUser)
  }

  const logout = () => {
    Cookies.remove('token')
    window.location.reload()
  }

  const w3_open = () => {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").className = 'w3-sidebar w3-bar-block w3-border-right'
  }

  const w3_close = () => {
    document.getElementById("mySidebar").className = 'w3-sidebar w3-bar-block w3-border-right w3-hide'
  }

  const post = () => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then(res => res.json())
      .then(data => {
        setComments(null)
        setPosts(data)
      })
  }

  const comment = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then(res => res.json())
      .then(data => {
        setPosts(null)
        setComments(data)
      })
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
            post()
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
          <div className="w3-bar w3-border w3-light-grey w3-margin-top w3-hide-small">
            <button className="w3-bar-item w3-button w3-text-teal">Home</button>
            <button className="w3-bar-item w3-button">Link 1</button>
            <button className="w3-bar-item w3-button">Link 2</button>
            <button className="w3-bar-item w3-button w3-right" onClick={logout}>Logout</button>
            <button className="w3-bar-item w3-button w3-right">{email}</button>
          </div>
          <div className="w3-sidebar w3-bar-block w3-border-right w3-hide" id="mySidebar">
            <button onClick={w3_close} className="w3-bar-item w3-large w3-text-red w3-bold">Close &times;</button>
            <button className="w3-bar-item w3-button w3-text-teal">Home</button>
            <button className="w3-bar-item w3-button">Link 2</button>
            <button className="w3-bar-item w3-button">Link 3</button>
          </div>
          <div className="w3-light-grey w3-margin-top w3-hide-large">
            <button className="w3-button  w3-xlarge" onClick={w3_open}>☰</button>
            <button className="w3-button  w3-xlarge w3-right" onClick={logout}>Logout</button>
            <button className="w3-button  w3-xlarge w3-right">{username}</button>
          </div>
          {
            posts
            &&
            <ul className='w3-ul w3-card-4 w3-margin-top'>
              {posts.map(post => <Post post={post} comment={comment} />)}
            </ul>
          }
          {
            comments
            &&
            <>
              <ul className='w3-ul w3-card-4 w3-margin-top'>
                {comments.map(comment => <Comment comment={comment} />)}
              </ul>
              {!posts && <button className="w3-button w3-block" onClick={post}>&larr; Back</button>}
            </>
          }
        </div>
      }
      <br />
    </div>
  );
}

export default App;
