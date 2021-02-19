const userOne = {
  name: 'Jake Reddy',
  username: 'Jreddy',
  password: 'password',
}
const userTwo = {
  name: 'Cannot Delete',
  username: 'NoDelete',
  password: 'password',
}
const blogs = [
  {
    title: 'This is blog one',
    author: 'Blog One',
    url: 'BlogOne.com',
  },
  {
    title: 'This is blog two',
    author: 'Blog two',
    url: 'Blogtwo.com',
    likes: 7,
  },
  {
    title: 'This is blog three',
    author: 'Blog Three',
    url: 'BlogThree.com',
    likes: 3,
  },
  {
    title: 'This is blog four',
    author: 'Blog Four',
    url: 'BlogFour.com',
    likes: 9,
  },
  {
    title: 'This is blog Five',
    author: 'Blog five',
    url: 'Blogfive.com',
    likes: 7,
  },
]

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDatabase()
    cy.createUser(userOne)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.get('#loginForm').contains('username')
    cy.get('#loginForm').contains('password')
  })
  describe('Login', function () {
    it('succeeds with correct credentials and shows notification', function () {
      cy.get('#username').type(userOne.username)
      cy.get('#password').type(userOne.password)
      cy.get('#login-button').click()

      cy.contains('Welcome Jake Reddy')
      cy.get('.success').contains('successfully logged in!')
    })
    it('fails with wrong credentials and shows notification', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong credentials')
      cy.get('html').should('not.contain', 'Jake Reddy successfully logged in!')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(userOne.username, userOne.password)
      blogs.forEach((blog) => {
        cy.createBlog(blog)
      })
      cy.visit('http://localhost:3000')
    })
    it('A blog can be created', function () {
      //cy.contains('new blog').click()
      cy.get('#title').type('This is from cypress')
      cy.get('#author').type('Cypress testing')
      cy.get('#url').type('testing.com')
      cy.contains('Save').click()
      cy.contains('This is from cypress')
    })
    it('A blog can be liked', function () {
      cy.get('.blog').contains(blogs[1].title).parent().parent().as('blogDiv')
      cy.get('@blogDiv').contains('View').click()
      cy.get('@blogDiv').contains('button', 'Like').click()
      cy.get('@blogDiv').contains(`Likes: ${blogs[1].likes + 1}`)
    })
    it('..blogs are arranged by likes', function () {
      let previousBlogLikes
      const pattern = /[0-9]+/g

      cy.get('.blog').each(($el, index) => {
        cy.wrap($el).contains('View').click()
      })

      cy.get('ul').each(($el, index) => {
        cy.wrap($el)
          .contains('li', 'Likes')
          .should(($likes) => {
            let currentLikes = parseInt($likes.text().match(pattern))
            if (previousBlogLikes) {
              expect(previousBlogLikes).to.be.gte(currentLikes)
              previousBlogLikes = currentLikes
            } else {
              previousBlogLikes = currentLikes
            }
          })
      })
    })
    describe('delete a blog', function () {
      it('succeeds if the user owns it', function () {
        cy.get('.blog').contains(blogs[1].title).parent().parent().as('blogDiv')
        cy.get('@blogDiv').contains('View').click()
        cy.get('@blogDiv').contains('Delete').click()
        cy.on('window:confirm', (str) => {
          expect(str).to.equal(`Remove ${blogs[1].title}?`)
        })
        cy.on('window:confirm', () => true)
        cy.contains(`${blogs[1].title} Deleted!`)
        cy.get('html').should('not.contain', blogs[1].author)
      })
      it('fails if the user doesnt owns it', function () {
        cy.contains('logout').click()
        cy.createUser(userTwo)
        cy.login(userTwo.username, userTwo.password)
        cy.visit('http://localhost:3000')
        cy.contains(blogs[0].title).parent().parent().as('blogDiv')
        cy.get('@blogDiv').contains('View').click()
        cy.get('@blogDiv').get('Delete').should('not.exist')
      })
    })
  })
})
