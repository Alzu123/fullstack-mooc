import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE':
    return action.data
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'VOTE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const addedBlog = await blogService.create(blog)
    dispatch(setNotification({ message: 'fix notifications in errors here', isSuccess: true }, 5))
    dispatch({
      type: 'ADD_BLOG',
      data: addedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
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

    const returnedBlog = await blogService.update(id, changedBlog)
    dispatch(setNotification({ message: 'fix notifications in errors here', isSuccess: true }, 5))
    dispatch({
      type: 'VOTE_BLOG',
      data: returnedBlog
    })
  }
}

export default blogReducer