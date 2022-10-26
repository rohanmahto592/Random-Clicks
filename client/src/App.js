import logo from './logo.svg';
import './App.css';
import{Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Login from './component/login/Login';
import Home from './component/home/Home';
import {BubblyContainer as Container} from 'react-bubbly-transitions'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Notifications } from 'react-push-notification';
function App() {
  const navigate=useNavigate()
  useEffect(()=>{
   
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    if(!userInfo)
    {
      navigate('/login')
    }
    else
    { 
    navigate('/')
    }
    
  },[])
  return (
    <>
    <Notifications/>
    
      <Container/>  
      
     <Routes>
     <Route path="/login" element={<Login/>}/>

     <Route path="/*"element={<Home/>}/>
     {/* <Route path="/login" element={<Login/>}></Route> */}
     </Routes>
     </>
    
    
    
  );
}

export default App;
