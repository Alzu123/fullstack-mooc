import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

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
        <input
          type='text'
          id='content'
          name='content'
        />
        <button type='submit'>add comment</button>
      </div>
    </form>
  )
}

export default CommentForm