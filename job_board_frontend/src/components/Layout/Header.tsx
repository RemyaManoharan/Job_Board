import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="w-full bg-blue-200 p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Job Sphere</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/jobs" className="px-4 py-2 rounded hover:text-blue-600 transition-colors duration-200">Find Jobs</Link>
        <Link to="/signup" className="px-4 py-2 rounded hover:text-blue-600 transition-colors duration-200">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 rounded hover:text-blue-600 transition-colors duration-200">Log In</Link>
      </div>
    </div>
  )
}

export default Header
