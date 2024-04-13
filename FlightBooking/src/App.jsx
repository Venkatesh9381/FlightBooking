import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Booking from './Component/Booking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Booking/>
    </>
  )
}

export default App
