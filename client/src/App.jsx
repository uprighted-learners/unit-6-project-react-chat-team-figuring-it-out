import { useState } from 'react'
import './App.css'
import Rooms from './components/RoomsFolder/Rooms'
//! Double check Auth here
//import Auth from './components/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Rooms/>
    </>
  )
}

export default App
