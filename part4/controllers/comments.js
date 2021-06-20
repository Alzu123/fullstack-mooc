const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blogId = request.params.id

  const comment = new Comment({
    content: body.content,
    blog: blogId
  })

  const targetBlog = await Blog.findById(blogId)

  if (comment.content) {
    const savedComment = await comment.save()
    targetBlog.comments = targetBlog.comments.concat(savedComment._id)
    await targetBlog.save()

    response.status(201).json(savedComment.toJSON())
  } else {
    response.status(400).error('cannot add comments without content')
  }
})

module.exports = commentsRouter