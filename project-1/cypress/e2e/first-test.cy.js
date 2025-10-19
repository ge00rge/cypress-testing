describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/'); // ensure we can visit the page
    cy.get('li').should('have.length', 6); // ensure we find all 6 list items on the page
  })
})