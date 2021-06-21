import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

import { TextField, Button, Typography } from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleBlogAddition = async event => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    dispatch(createBlog(blog))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <Togglable buttonLabel='create new blog'>
      <Typography>
        Create a new blog
      </Typography>

      <form onSubmit={handleBlogAddition} id='blog-form'>
        <div>
          <TextField
            id='title'
            name='title'
            label='Title'
          />
        </div>
        <div>
          <TextField
            id='author'
            name='author'
            label='Author'
          />
        </div>
        <div>
          <TextField
            id='url'
            name='url'
            label='URL'
          />
        </div>
        <Button variant='contained' type='submit'>create</Button>
      </form>
    </Togglable>
  )
}

export default BlogForm