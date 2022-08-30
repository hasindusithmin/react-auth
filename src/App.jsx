import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  
  
  const [oldUser, setOldUser] = useState(true)

  const transfer = () => {
    setOldUser(!oldUser)
  }

  useEffect(() => {

    if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
      document.getElementById('main').style.cssText = 'width:50%;margin:auto;'
    }

  }, [])


  return (
    <div className='w3-row w3-container' id='main'>
      <div className="w3-row">
        {oldUser ? <Signin /> : <Signup />}
      </div>
      <div className='w3-row'>
        {oldUser ? <p className='w3-center w3-text-blue' onClick={transfer}>Create account</p>:<p className='w3-center w3-text-blue' onClick={transfer}>Do you have account login</p>}
      </div>
    </div>
  );
}

export default App;
