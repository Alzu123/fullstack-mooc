import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> renders small info at first', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Minä',
    url: 'kissakala',
    likes: 100,
    user: ''
  }

  const mockLikeIncrementer = jest.fn()

  const component = render(
    <Blog blog={blog} incrementLike={mockLikeIncrementer} />
  )

  const smallInfo = component.container.querySelector('.small-info')
  const allInfo = component.container.querySelector('.all-info')
  const removeButton = component.getByText('remove')

  expect(smallInfo).not.toHaveStyle('display: none')
  expect(allInfo).toHaveStyle('display: none')
  expect(removeButton).toHaveStyle('display: none')
})