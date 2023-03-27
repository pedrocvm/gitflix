import { faker } from '@faker-js/faker';
import { defaultUser } from '../generators';

describe('MyProfileView', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.signin(defaultUser.email, defaultUser.password);
    cy.wait(2000);
    cy.get('[data-cy="user-avatar"]').click();
    cy.get('a')
      .contains(/my account/i)
      .click();
    cy.wait(1000);
  });

  it('should display the My Profile form', () => {
    cy.get('[data-cy="heading-wrapper"]').contains('My Profile');
    cy.get('[data-cy="form-control"]').should('be.visible');
  });

  it('should update the user display name', () => {
    const newDisplayName = `${faker.name.firstName()} ${faker.name.lastName()}`;

    cy.get('#name').clear().type(newDisplayName);
    cy.get('[data-cy="submit-button"]').click();

    cy.get('.toast-success')
      .contains(/User updated successfully/i)
      .should('be.visible');

    cy.get('[data-cy="greetings-message"]').contains(newDisplayName);
  });

  it('should not update password if old password is incorrect', () => {
    const newPassword = 'newpassword123';
    cy.get('#oldPassword').type('wrongpassword');
    cy.get('#newPassword').type(newPassword);
    cy.get('#confirm-password').type(newPassword);
    cy.get('[data-cy="submit-button"]').click();

    cy.get('.toast-error').should('be.visible');
  });
});
