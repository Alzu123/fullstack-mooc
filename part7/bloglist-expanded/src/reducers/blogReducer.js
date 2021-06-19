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
    console.log(addedBlog)
    dispatch(setNotification({ message: 'lol', isSuccess: true }, 5))
    dispatch({
      type: 'ADD_BLOG',
      data: addedBlog
    })
  }
}

export const removeBlog = blog => {
  console.log('reducer remove')
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
  }
}

export default blogReducer