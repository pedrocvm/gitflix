Cypress.Commands.add('signup', (name, email, password) => {
  cy.get('.toggleFormButton button').click();

  cy.get('#name').type(name);
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#confirm-password').type(password);
  cy.get('[data-cy="submit-button"]').click();
});

Cypress.Commands.add('signin', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('[data-cy="submit-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="user-avatar"]').click();
  cy.get('[data-cy="logout-button"]').click();
});
