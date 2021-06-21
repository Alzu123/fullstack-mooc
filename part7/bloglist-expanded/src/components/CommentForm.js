import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleCommentAddition = async event => {
    event.preventDefault()
    const comment = {
      content: event.target.content.value,
    }

    dispatch(createComment(blog, comment))

    event.target.content.value = ''
  }

  return (
    <form onSubmit={handleCommentAddition} id='comment-form'>
      <div>
        <TextField
          id='content'
          name='content'
          label='Comment'
        />
      </div>
      <Button variant='contained'type='submit'>add comment</Button>
    </form>
  )
}

export default CommentForm