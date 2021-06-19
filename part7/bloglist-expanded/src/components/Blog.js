import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [isMinimized, setIsMinimized] = useState(true)

  const dispatch = useDispatch()

  const hideWhenMinimized = { display: isMinimized ? 'none' : '' }
  const showWhenMinimized = { display: isMinimized ? '' : 'none' }

  let showWhenFromUser
  if (!user || !blog.user[0]) {
    showWhenFromUser = { display: 'none' }
  } else {
    showWhenFromUser = { display: blog.user[0].username === user.username ? '' : 'none' }
  }

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
    dispatch(likeBlog(blog.id))
  }

  const handleRemoveBlog = () => {
    const isRemovalConfirmed = window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)
    if (isRemovalConfirmed) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      <div style={showWhenMinimized} className='small-info'>
        {blog.title} {blog.author} <button onClick={toggleVisibility} id='view-blog'>view</button>
      </div>

      <div style={hideWhenMinimized} className='all-info'>
        <div>{blog.title} {blog.author} <button onClick={toggleVisibility} id='hide-blog'>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikeIncrement} id='like-blog'>like</button></div>
        <div>{blog.user[0] ? blog.user[0].name: ''}</div>
        <button onClick={handleRemoveBlog} style={showWhenFromUser} id='remove-blog'>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog