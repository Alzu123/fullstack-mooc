describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Käyttäjä',
      username: 'testuser',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const user2 = {
      name: 'Testi Käyttäjä2',
      username: 'testuser2',
      password: 'sekret2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.get('#username-field')
    cy.get('#password-field')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-field').type('testuser')
      cy.get('#password-field').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Testi Käyttäjä logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username-field').type('testuser')
      cy.get('#password-field').type(':D')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Testi Käyttäjä logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'sekret' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('awesome title')
      cy.get('#author').type('boring author')
      cy.get('#url').type('cyan url')
      cy.get('#blog-form').submit()

      cy.get('.notification')
        .should('contain', 'a new blog \'awesome title\' by boring author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.small-info')
        .should('contain', 'awesome title')
        .and('contain', 'boring author')
    })

    describe('When a blog is already added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'awesome title', author: 'boring author', url: 'cyan url' })
      })

      it('a blog can be liked', function() {
        cy.get('.small-info').as('blogSmall')
        cy.get('@blogSmall').find('#view-blog').click()
        cy.get('@blogSmall').should('contain', 'awesome title')

        cy.get('.all-info').as('blogAll')
        cy.get('@blogAll').find('#like-blog').click()
        cy.get('@blogAll')
          .should('contain', 'likes 1')
          .and('contain', 'awesome title')
      })

      it('a blog can be deleted by the user who created it', function() {
        cy.get('#view-blog').click()
        cy.get('#remove-blog').click()

        cy.should('not.contain', 'awesome title')

        cy.get('.notification')
          .should('contain', 'removed blog awesome title')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('a blog cannot be deleted by other users', function() {
        cy.get('#logout-button').click()
        cy.login({ username: 'testuser2', password: 'sekret2' })

        cy.get('#view-blog').click()
        cy.get('#remove-blog').should('have.css', 'display', 'none')
      })
    })

    describe('When multiple blogs are added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first title', author: 'first author', url: 'first url' })
        cy.createBlog({ title: 'second title', author: 'second author', url: 'second url' })
        cy.createBlog({ title: 'third title', author: 'third author', url: 'third url' })
        cy.createBlog({ title: 'fourth title', author: 'fourth author', url: 'fourth url' })
      })

      it('blogs are sorted by decending likes', function() {
        cy.likeBlogByTitle('third title')

        let expectedOrder = ['third', 'first', 'second', 'fourth']
        cy.isBlogOrderCorrect(expectedOrder).should('equal', true)

        cy.likeBlogByTitle('second title')
        cy.likeBlogByTitle('third title')

        expectedOrder = ['third', 'second', 'first', 'fourth']
        cy.isBlogOrderCorrect(expectedOrder).should('equal', true)

        cy.likeBlogByTitle('fourth title')
        cy.likeBlogByTitle('fourth title')
        cy.likeBlogByTitle('fourth title')

        expectedOrder = ['fourth', 'third', 'second', 'first']
        cy.isBlogOrderCorrect(expectedOrder).should('equal', true)
      })
    })
  })
})