import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
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
      dispatch(setNotification({ message: 'logged in', isSuccess: true }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong username or password', isSuccess: false }, 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
    dispatch(setNotification({ message: 'logged out', isSuccess: true }, 5))
  }

  const incrementLike = (updatedBlog) => {
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
        //setBlogs(blogs.map(b => b.id === returnedBlog.id ? returnedBlog : b).sort((a, b) => b.likes - a.likes))
      })
      .catch(() => {
        dispatch(setNotification({ message: 'failed to add like', isSuccess: false }, 5))
      })
  }

  const removeBlog = (blogToRemove) => {
    blogService
      .remove(blogToRemove)
      .then(() => {
        //setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        dispatch(setNotification({ message: `removed blog ${blogToRemove.title}`, isSuccess: true }, 5))
      })
      .catch(() => {
        dispatch(setNotification({ message: 'failed to remove blog', isSuccess: false }, 5))
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
          id="username-field"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password-field"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <p>
        {user.name} logged in
        <button type='submit' id='logout-button'>logout</button>
      </p>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog'>
      <BlogForm/>
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {logoutForm()}

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App