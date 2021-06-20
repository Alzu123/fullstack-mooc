import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
  const dispatch = useDispatch()

  const blogId = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === blogId)

  const user = useSelector(state => state.user)
  const isFromUser = (user && blog) ? user.id === blog.user.id : false
  const showWhenFromUser = { display: isFromUser ? '' : 'none' }

  if (!blog) {
    return null
  }

  const comments = blog.comments
  console.log(blog)
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
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={handleLikeIncrement} id='like-blog'>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <button onClick={handleRemoveBlog} style={showWhenFromUser} id='remove-blog'>remove</button>

      <h3>comments</h3>
      <ul>
        {comments.map(comment =>
          <li key={comment.id}>
            {comment.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogDetails