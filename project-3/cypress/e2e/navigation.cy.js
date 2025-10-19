/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="header-about-link"]').click();
    cy.location('pathname').should('equal', '/about'); // about page
    cy.go('back'); // simulate clicking back arrow
    cy.location('pathname').should('equal', '/'); // home page
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location('pathname').should('eq', '/'); // home page

  })
})