import React from 'react'
import Blog from './Blog'

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Blog Title
              </TableCell>
              <TableCell>
                Blog Author
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} user={user}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList