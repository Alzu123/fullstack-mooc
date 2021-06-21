import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TableCell, TableRow } from '@material-ui/core'

const Blog = ({ blog }) => {

  return (
    <TableRow key={blog.id}>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog