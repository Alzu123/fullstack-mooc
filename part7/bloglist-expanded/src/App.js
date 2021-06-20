import React, { useEffect } from 'react'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import User from './components/User'
import UserList from './components/UserList'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <Navigation />
      <Notification />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>

        <Route path='/users'>
          <UserList />
        </Route>

        <Route path='/blogs/:id'>
          <BlogDetails />
        </Route>

        <Route path='/'>
          <BlogList blogs={blogs} user={user} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App