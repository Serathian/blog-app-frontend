import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { getByLabelText, prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
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

  const component = render(<Blog blog={blog} />)
  //component.debug()

  expect(component.container).toHaveTextContent('Test Blog One')

  const element = component.getByText('Test Blog One')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('https://SomeBlogOne.test')

  //console.log(prettyDOM(h3))
})

test('render blog with url and likes hidden', () => {
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
  const component = render(<Blog blog={blog} />)

  const basicInfoElement = component.container.querySelector('.blogBasicInfo')
  expect(basicInfoElement).toBeVisible()
  const moreInfoElement = component.container.querySelector('.blogMoreInfo')
  expect(moreInfoElement).not.toBeVisible()
})

test('render url and likes when click view', () => {
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
  const component = render(<Blog blog={blog} />)

  const moreInfoElement = component.container.querySelector('.blogMoreInfo')
  expect(moreInfoElement).not.toBeVisible()
  const button = component.getByText('View')
  fireEvent.click(button)
  expect(moreInfoElement).toBeVisible()
})

test('clicking the like button twice', () => {
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

  const likesMock = jest.fn()
  const component = render(<Blog blog={blog} handleLikes={likesMock} />)
  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(likesMock).toHaveBeenCalledTimes(2)
})
