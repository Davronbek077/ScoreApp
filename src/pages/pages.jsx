import React from 'react'
import { Link } from 'react-router-dom'
import "./pages.css"

const Pages = () => {
  return (
    <div className='pages-wrap'>
      <div className="pages">
      <Link to={"/"}>Asosiy</Link>
      <Link to={"./add"}>Qo'shish</Link>
      </div>
    </div>
  )
}

export default Pages
