describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Alucard Mallo',
      username: 'alucard',
      password: 'test123',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Log in to application');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('alucard');
      cy.get('#password').type('test123');
      cy.get('#login-button').click();

      cy.contains('blogs');

      cy.contains('Alucard Mallo logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('alucard');
      cy.get('#password').type('test123');
      cy.get('#login-button').click();

      cy.contains('Wrong credentials');
    });
  });
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'alucard', password: 'test123' });
    });
    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('testing title function!');
      cy.get('#author').type('alucard');
      cy.get('#url').type('www.example.com');
      cy.get('#create-blog').click();

      cy.contains('testing title function! alucard');
    });
    describe('blog exists', function () {
      //fix this
      it('blog can be liked', function () {
        cy.contains('view').click();
        cy.contains('like').click();
      });
    });
  });
});
