const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('jeejee', 10)
    const user = new User({ username: 'test user', name: 'test', passwordHash })

    await user.save()
  })

  describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blog identifier field is called id', async () => {
      const response = await api.get('/api/blogs')
      const firstBlog = response.body[0]

      expect(firstBlog.id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
      const users = await helper.usersInDb()
      const validToken = jwt.sign(users[0], process.env.SECRET)
      const newBlog = {
        title: 'testing cool db',
        author: 'NL',
        url: 'http://www.fullstackopen.com',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contentsAtEnd = blogsAtEnd.map(blog => blog.title)
      expect(contentsAtEnd).toContain('testing cool db')
    })

    test('a blog with no likes is initialised to 0', async () => {
      const users = await helper.usersInDb()
      const validToken = jwt.sign(users[0], process.env.SECRET)
      const newBlog = {
        title: 'testing cool db',
        author: 'NL',
        url: 'http://www.fullstackopen.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
      expect(addedBlog.likes).toBe(0)
    })

    test('a blog without title cannot be added', async () => {
      const users = await helper.usersInDb()
      const validToken = jwt.sign(users[0], process.env.SECRET)
      const newBlog = {
        author: 'NL',
        url: 'http://www.fullstackopen.com',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog cannot be added without a token', async () => {
      const newBlog = {
        title: 'testing cool db',
        author: 'NL',
        url: 'http://www.fullstackopen.com',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog without url cannot be added', async () => {
      const users = await helper.usersInDb()
      const validToken = jwt.sign(users[0], process.env.SECRET)
      const newBlog = {
        title: 'testing cool db',
        author: 'NL',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${validToken}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog can be deleted', async () => {
      const users = await helper.usersInDb()
      const validToken = jwt.sign(users[0], process.env.SECRET)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${validToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )

      const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
      expect(titlesAtEnd).not.toContain(blogToDelete.title)
    })

    test('an edited blog has new info', async () => {
      const newBlog = {
        title: 'testing cool db',
        author: 'NL',
        url: 'http://www.fullstackopen.com',
        likes: 12345
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToEdit = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

      const titlesAtEnd = blogsAtEnd.map(blog => blog.title)
      expect(titlesAtEnd).toContain(newBlog.title)

      const originalId = blogToEdit.id
      expect(blogsAtEnd[0].id).toBe(originalId)
    })

  })

  test('creating a new user succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kalakala',
      name: 'Fish',
      password: 'kalanmakuinen_kana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creating a user with duplicate username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test user',
      name: 'Fish',
      password: 'kalanmakuinen_kana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user without username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Fish',
      password: 'kalanmakuinen_kana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user with too short username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aa',
      name: 'Fish',
      password: 'kalanmakuinen_kana'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`\`username\` (\`${newUser.username}\`) is shorter than the minimum`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user with too short password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mahtava tyyppi',
      name: 'Test k??ytt??j??',
      password: 'ka'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short (min 3 characters)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user without a password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mahtava tyyppi',
      name: 'Test k??ytt??j??',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})