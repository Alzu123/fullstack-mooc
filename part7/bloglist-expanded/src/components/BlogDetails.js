import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Typography, List, ListItem, ListItemText, TableContainer, Table, TableRow, TableCell } from '@material-ui/core'

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
      <Typography variant='h3' gutterBottom>
        {blog.title} by {blog.author}
      </Typography>
      <List>
        <ListItem>
          <ListItemText>
            <a href={blog.url}>{blog.url}</a>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Likes: {blog.likes}
            <button onClick={handleLikeIncrement} id='like-blog'>like</button>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <div>Added by {blog.user.name}</div>
            <button onClick={handleRemoveBlog} style={showWhenFromUser} id='remove-blog'>remove</button>
          </ListItemText>
        </ListItem>
      </List>

      <Typography variant='h4' gutterBottom>
        Comments
      </Typography>
      <CommentForm blog={blog}/>
      <TableContainer>
        <Table>
          {comments.map(comment =>
            <TableRow key={comment.id}>
              <TableCell>
                {comment.content}
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogDetails