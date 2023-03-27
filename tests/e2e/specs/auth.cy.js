/// <reference types="cypress" />
import { user } from '../generators';

describe('AuthView', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the Sign In form', () => {
    cy.get('[data-cy="heading-wrapper"]').contains('Sign In');
    cy.get('form').should('be.visible');
  });

  it('should toggle between Sign In and Sign Up forms', () => {
    cy.get('.toggleFormButton button').click();
    cy.get('[data-cy="heading-wrapper"]').contains('Sign Up');

    cy.get('.toggleFormButton button').click();
    cy.get('[data-cy="heading-wrapper"]').contains('Sign In');
  });

  it('should display an error if passwords do not match on Sign Up', () => {
    cy.get('.toggleFormButton button').click();
    cy.get('#name').type(user.name);
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.get('#confirm-password').type('wrongPassword');
    cy.get('button[type="submit"]').click();

    cy.get('.toast-error').should('be.visible');
  });

  it('should not allow the user to log in if they do not exist', () => {
    cy.signin('user@example.com', 'userpassword');

    cy.get('.toast-error')
      .contains('Firebase: Error (auth/user-not-found).')
      .should('be.visible');
  });

  it('should allow the user to sign up', () => {
    cy.signup(user.name, user.email, user.password);

    cy.get('[data-cy="home-page"]').should('be.visible');
    cy.get('.toast-success')
      .contains(/login successful/i)
      .should('be.visible');
  });
});
