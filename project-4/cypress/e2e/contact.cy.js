/// <reference types="Cypress" />

describe('contact form', () => {

  beforeEach(()=>{
    cy.visit('/about') // we outsourced initialization step which will be executed before every test.
  });

  it('should submit the form', {defaultCommandTimeout: 10000} , () => { // define local timeout of test expectations.
    // cy.visit('/about'); // in the config we set the base url.
    
    // cy.get('[data-cy="contact-input-message"]').type('Hello world!');
    
    cy.task('seedDatabase', 'filename.csv') // execute a task outside browser and defined in the config, were we can state params.
    .then(returnValue => 
        // ..use returned value
      ); 

    cy.getById('contact-input-message').type('Hello world!'); // define CUSTOM QUERY.
    
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.eq('Send Message');
    });
    cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type('test@example.com');
    // cy.get('[data-cy="contact-btn-submit"]').click();
    
    cy.submitForm() // we define this CUSTOM COMMAND instead of repeating the above one
    
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.screenshot();
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    // cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...');
    cy.get('@submitBtn').should('have.attr', 'disabled');
  });

  it('should validate the form input', {browser: 'firefox'} ,() => { // we can define locally that a test runs on a specific browser.
    // cy.visit('/about');
    // cy.get('[data-cy="contact-btn-submit"]').click();
    
    cy.submitForm()
    
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
    cy.get('[data-cy="contact-input-message"]').as('msgInput');
    cy.get('@msgInput').focus().blur();
    cy.get('@msgInput')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      })
  });
});
