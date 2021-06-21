import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { AppBar, Toolbar, Button, Typography, Box } from '@material-ui/core'

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>

        <Typography>
          {user.name} -
        </Typography>
        <Button color="inherit" onClick={() => dispatch(logout())}>
          logout
        </Button>

      </Toolbar>
    </AppBar>
  )
}

export default Navigation