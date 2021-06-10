import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [tempMessage, setTempMessage] = useState(null)
  const [tempStatus, setTempStatus] = useState(null)

  const setTemporaryNotification = (message, time, isSuccess) => {
    setTempMessage(message)
    setTempStatus(isSuccess)
    setTimeout(() => {
      setTempMessage(null)
      setTempStatus(null)
    }, time)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setTemporaryNotification('logged in', 5000, true)
    } catch (exception) {
      setTemporaryNotification('wrong username or password', 5000, false)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setTemporaryNotification('logged out', 5000, true)
  }

  const handleBlogAddition = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTemporaryNotification(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`, 5000, true)
      })
      .catch(() => {
        setTemporaryNotification('failed to add the blog to the database', 5000, false)
      })
  }

  const incrementLike = (updatedBlog) => {
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === returnedBlog.id ? returnedBlog : b).sort((a, b) => b.likes - a.likes))
      })
      .catch(() => {
        setTemporaryNotification('failed to add like', 5000, false)
      })
  }

  const removeBlog = (blogToRemove) => {
    blogService
      .remove(blogToRemove)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        setTemporaryNotification(`removed blog ${blogToRemove.title}`, 5000, true)
      })
      .catch(() => {
        setTemporaryNotification('failed to remove blog', 5000, false)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <p>
        {user.name} logged in
        <button type='submit'>logout</button>
      </p>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm createBlog={handleBlogAddition}/>
    </Togglable>
  )

  const messageBanner = () => {
    if (tempMessage === null) {
      return null
    }

    const notificationType = tempStatus ? 'notification' : 'notification warning'

    return (
      <div className={notificationType}>
        {tempMessage}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {messageBanner()}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {messageBanner()}
      {logoutForm()}

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App