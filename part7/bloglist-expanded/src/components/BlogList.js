import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      <BlogForm />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )
}

export default BlogList