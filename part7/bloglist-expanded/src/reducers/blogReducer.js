import blogService from '../services/blogs'
import commentsService from '../services/comments'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'VOTE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'ADD_COMMENT_TO_BLOG':
    return state.map(blog => blog.id === action.id ? action.data : blog)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch(setNotification({ message: `A new blog '${addedBlog.title}' by ${addedBlog.author} added.`, isSuccess: true }, 5))
      dispatch({
        type: 'ADD_BLOG',
        data: addedBlog
      })
    } catch (error) {
      dispatch(setNotification({ message: 'Failed to add the blog to database.', isSuccess: false }, 5))
    }
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(setNotification({ message: `Removed blog ${blog.title}.`, isSuccess: true }, 5))
      dispatch({
        type: 'REMOVE_BLOG',
        id: blog.id
      })
    } catch (error) {
      dispatch(setNotification({ message: 'Failed to remove the blog.', isSuccess: false }, 5))
    }
  }
}

export const likeBlog = id => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToVote = blogs.find(blog => blog.id === id)
    const changedBlog = {
      ...blogToVote,
      likes: blogToVote.likes + 1
    }

    await blogService.update(id, changedBlog)
    dispatch({
      type: 'VOTE_BLOG',
      data: changedBlog,
    })
  }
}

export const createComment = (blog, comment) => {
  return async dispatch => {
    const addedComment = await commentsService.create(blog.id, comment)
    const modifiedBlog = {
      ...blog,
      comments: [...blog.comments, addedComment]
    }
    dispatch({
      type: 'ADD_COMMENT_TO_BLOG',
      id: blog.id,
      data: modifiedBlog
    })
  }
}

export default blogReducer