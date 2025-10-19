/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => { // we should describe what the test should do.
    cy.visit('http://localhost:5173/');
    cy.get('.main-header img'); // select all imgs that are inside elements that have main header CSS clause.
                                // would be equal to running: cy.get('main-header').find('img')
  })

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('My Cypress Course Tasks'); // select elements h1 those content contains the correct text.
  })
})