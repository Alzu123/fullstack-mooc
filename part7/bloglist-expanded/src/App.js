import React, { useEffect } from 'react'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
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

import { Container, Typography } from '@material-ui/core/'

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
      <Container>
        <Typography variant="h3" gutterBottom>
          Log in to application
        </Typography>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
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
            <Typography variant="h5" gutterBottom>
              Blogs
            </Typography>
            <BlogForm />
            <BlogList blogs={blogs} user={user} />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App