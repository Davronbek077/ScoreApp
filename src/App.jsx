import { useState } from 'react'
import './App.css'
import Pages from './pages/pages'
import { Routes, Route } from 'react-router-dom'
import Score from './components/score/score'
import Add from './components/add/add'
import Navbar from './components/navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pages/>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Score />} />
      <Route path="add" element={<Add />} />
      </Routes>
    </>
  )   
}

export default App
