import React from 'react'
import Blog from './Blog'

import { TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core'

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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user}/>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList