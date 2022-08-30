
import { useEffect,useState } from 'react';


export default function Signup() {

  const [username,setUsername] = useState(null)
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)

  useEffect(()=>{
    
    if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
      document.getElementById('main').style.cssText = 'width:50%;margin:auto;'
    }

  },[])

  const createUser = e => {
    e.preventDefault()
    alert("submitted")
  }


  return (
    <div className='w3-row w3-container' id='main'>
      <h1 className="w3-center">Sign Up</h1>
      <form action="" method="post" autoComplete='off' onSubmit={createUser}>
        <input type="text" value={username} onChange={e=>{setUsername(e.target.value)}} className='w3-input w3-border' placeholder='username'/>
        <br />
        <input type="text" value={email} onChange={e=>{setEmail(e.target.value)}} className='w3-input w3-border' placeholder='email'/>
        <br />
        <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}} className='w3-input w3-border' placeholder='password'/>
        <br />
        <input type="submit" value="Signup" className='w3-input w3-border'/>
      </form>
    </div>
  );
}

