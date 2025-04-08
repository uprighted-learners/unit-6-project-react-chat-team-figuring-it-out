import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Rooms from './components/RoomsFolder/Rooms'
import Auth from './components/Auth'
//add messages

function App() {
  const [token, setToken] = useState("")

  //Update state token variable, and store it in localStorage
  const updateToken = (passedToken, uid) => {
    localStorage.setItem("token", passedToken)
    localStorage.setItem("uid", uid)
    setToken(passedToken);
  };
  //logout handler
    const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("uid")
      setToken("")
    }
  
    useEffect(() => {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken)
      }
    }, [])

  return (
    <>
      {token && <button style={{ position: "absolute", top: 0, left: 0 }} onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route path="/"
          element={
            !token ?
              <Auth updateToken={updateToken} />
              : (<Navigate to="/rooms" />)
          }
        />

        <Route path="/rooms"
          element={token ? <Rooms /> : <Navigate to="/" />} />


      </Routes>
    </>
  
  )
}

export default App
