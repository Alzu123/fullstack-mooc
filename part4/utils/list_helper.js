const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const blogIndex = likes.indexOf(Math.max(...likes))
  const blogToReturn = blogIndex === -1
    ? null
    : {
      title: blogs[blogIndex].title,
      author: blogs[blogIndex].author,
      likes: blogs[blogIndex].likes
    }
  return blogToReturn
}

const mostBlogs = (blogs) => {
  const mostBloggedAuthor = _.chain(blogs).groupBy('author').map((objects, key) => ({
    'author': key,
    'blogs': objects.length
  })).maxBy('blogs').value()

  if (!mostBloggedAuthor) {
    return null
  }

  return mostBloggedAuthor
}

const mostLikes = (blogs) => {
  const mostLikedAuthor = _.chain(blogs).groupBy('author').map((objects, key) => ({
    'author': key,
    'likes': _.sumBy(objects, 'likes')
  })).maxBy('likes').value()

  if (!mostLikedAuthor) {
    return null
  }

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}