import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core'

const User = () => {
  const id = useParams().id

  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant='h3' gutterBottom>
        {user.username}
      </Typography>
      <Typography variant='h4' gutterBottom>
        Added blogs
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {user.blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  {blog.title}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User