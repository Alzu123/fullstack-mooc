import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('is called with correct blog field values', () => {
    const newBlog = {
      title: 'aaaa',
      author: 'bbbb',
      url: 'cccc'
    }

    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: newBlog.title }
    })
    fireEvent.change(author, {
      target: { value: newBlog.author }
    })
    fireEvent.change(url, {
      target: { value: newBlog.url }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('aaaa')
    expect(createBlog.mock.calls[0][0].author).toBe('bbbb')
    expect(createBlog.mock.calls[0][0].url).toBe('cccc')
  })

})