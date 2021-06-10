import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [isMinimized, setIsMinimized] = useState(true)

  const hideWhenMinimized = { display: isMinimized ? 'none' : '' }
  const showWhenMinimized = { display: isMinimized ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenMinimized}> 
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
        <div style={hideWhenMinimized}>
          <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button>like</button></div>
          <div>{blog.user[0] ? blog.user[0].name: ''}</div>
        </div>
    </div>
  )
}

export default Blog