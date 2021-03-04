import { Link } from 'react-router-dom'
import React from 'react'
const Menu = ({ handleLogout }) => {
  const padding = {
    padding: 5,
  }
  return (
    <div>
      <Link style={padding} to='/indexpage'>
        Index
      </Link>
      <Link style={padding} to='/blogs'>
        Blogs
      </Link>
      <Link style={padding} to='/users'>
        Users
      </Link>
    </div>
  )
}

export default Menu
