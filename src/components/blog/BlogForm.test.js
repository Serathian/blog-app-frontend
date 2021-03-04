import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { getByLabelText, prettyDOM } from '@testing-library/dom'
import BlogFrom from './BlogForm'

test('correct data is passed when new blog is created', () => {
  const blog = {
    likes: 8,
    title: 'Test Blog One',
    author: 'Author One',
    url: 'https://SomeBlogOne.test',
    user: {
      username: 'root',
      name: 'superuser',
      id: '60227dfd2a7e3140e0c023f1',
    },
    id: '6022c31d88bfa20760a2eb22',
  }
  const addBlog = jest.fn()
  const component = render(<BlogFrom addBlog={addBlog} />)
  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  fireEvent.change(title, { target: { value: blog.title } })
  const author = component.container.querySelector('#author')
  fireEvent.change(author, { target: { value: blog.author } })
  const url = component.container.querySelector('#url')
  fireEvent.change(url, { target: { value: blog.url } })

  fireEvent.submit(form)

  expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
})
