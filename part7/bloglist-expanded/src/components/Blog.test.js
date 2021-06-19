import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockIncrementLike

  beforeEach(() => {
    const blog = {
      title: 'Testiblogi',
      author: 'Minä',
      url: 'kissakala',
      likes: 100,
      user: ''
    }

    mockIncrementLike = jest.fn()

    component = render(
      <Blog blog={blog} incrementLike={mockIncrementLike} />
    )
  })

  test('renders only small info at first', () => {
    const smallInfo = component.container.querySelector('.small-info')
    const allInfo = component.container.querySelector('.all-info')

    expect(smallInfo).not.toHaveStyle('display: none')
    expect(allInfo).toHaveStyle('display: none')
  })

  test('all info is shown after clicking view', () => {
    const smallInfo = component.container.querySelector('.small-info')
    const allInfo = component.container.querySelector('.all-info')

    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    expect(smallInfo).toHaveStyle('display: none')
    expect(allInfo).not.toHaveStyle('display: none')
  })

  test('2 like button calls like incrementer twice', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockIncrementLike.mock.calls).toHaveLength(2)
  })

})