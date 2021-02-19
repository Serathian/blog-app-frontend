// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })
})

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', 'http://localhost:3001/api/users/', user)
})

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
  })
})

Cypress.Commands.add('logout', () => {
  window.localStorage.setItem('loggedBlogappUser', null)
})
