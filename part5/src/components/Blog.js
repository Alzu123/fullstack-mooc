import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLike, removeBlog, user }) => {
  const [isMinimized, setIsMinimized] = useState(true)

  const hideWhenMinimized = { display: isMinimized ? 'none' : '' }
  const showWhenMinimized = { display: isMinimized ? '' : 'none' }

  const showWhenFromUser = { display: blog.user[0] ? blog.user[0].username === user.username ? '' : 'none' : 'none' }

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

  const handleLikeIncrement = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    incrementLike(updatedBlog)
  }

  const handleRemoveBlog = () => {
    const isRemovalConfirmed = window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)
    if (isRemovalConfirmed) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenMinimized}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={hideWhenMinimized}>
        <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikeIncrement}>like</button></div>
        <div>{blog.user[0] ? blog.user[0].name: ''}</div>
        <div style={showWhenFromUser}><button onClick={handleRemoveBlog}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog