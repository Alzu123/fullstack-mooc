const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '60ae6d4d74a10231a410c5c4',
    title: 'Pekka Töpöhännän valheet',
    author: 'Monni',
    url: 'http://www.kissakala.fi',
    likes: 1,
    __v: 0
  },
  {
    _id: '603s6d4d74a10121a410c5c4',
    title: 'Pekka Töpöhännän valheet DEBUNKED: Pekka Strikes Back',
    author: 'Pekka Töpöhäntä',
    url: 'http://www.monniontyhma.fi',
    likes: 153354,
    __v: 0
  },
  {
    _id: '60ae6d4d74a10231a4abcdef',
    title: 'Kala on hyvää',
    author: 'kalalover99',
    url: 'http://www.kalatonparhait.fi',
    likes: 0,
    __v: 0
  }
]
const defaultBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(153360)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  const expectedBlogOfListSizeOne = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  }
  test('of list size one returns the only blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(expectedBlogOfListSizeOne)
  })

  const expectedBlogOfLargeList = {
    title: 'Pekka Töpöhännän valheet DEBUNKED: Pekka Strikes Back',
    author: 'Pekka Töpöhäntä',
    likes: 153354,
  }
  test('of a bigger list is calculated right', () => {
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(expectedBlogOfLargeList)
  })
})

describe('most published author', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })

  const expectedMostPublishedAuthorOfListOfSizeOne = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  }
  test('of list size one returns the only blog author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expectedMostPublishedAuthorOfListOfSizeOne)
  })

  const expectedMostPublishedAuthorOfLargeList = {
    author: 'Robert C. Martin',
    blogs: 3
  }
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(defaultBlogs)
    expect(result).toEqual(expectedMostPublishedAuthorOfLargeList)
  })
})

describe('most liked author', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })

  const expectedMostPublishedAuthorOfListOfSizeOne = {
    author: 'Edsger W. Dijkstra',
    likes: 5
  }
  test('of list size one returns the only blog author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expectedMostPublishedAuthorOfListOfSizeOne)
  })

  const expectedMostPublishedAuthorOfLargeList = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(defaultBlogs)
    expect(result).toEqual(expectedMostPublishedAuthorOfLargeList)
  })
})