import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

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
      <h2>create new</h2>

      <form onSubmit={handleBlogAddition} id='blog-form'>
        <div>
          title:
          <input
            type='text'
            id='title'
            name='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            id='author'
            name='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            id='url'
            name='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm