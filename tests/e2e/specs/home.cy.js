/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { defaultUser } from '../generators';

describe('HomeView', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.signin(defaultUser.email, defaultUser.password);
  });

  it('should display the home page and all sections', () => {
    cy.get('[data-cy="home-page"]').should('be.visible');
    cy.get('.bookmarkSection').should('be.visible');
    cy.get('.mostPopularSection').should('be.visible');
  });

  it('should filter repositories by selected programming language', () => {
    const randomLanguage = faker.helpers.arrayElement([
      'JavaScript',
      'Python',
      'Java',
      'C#',
      'C++',
      'Ruby',
      'PHP',
    ]);

    cy.get("[data-cy='autocomplete-input'] input")
      .clear()
      .type(`${randomLanguage}{enter}`);
    cy.get('.suggestionItem').contains(randomLanguage).click();
    cy.get('[data-cy="heading-wrapper"]').contains(
      `Most Popular - ${randomLanguage}`,
    );
  });
});
