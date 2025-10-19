/// <reference types="Cypress" />

describe('contact form', ()=> {
    it('should submit the form', ()=>{
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('Hello World!');
        cy.get('[data-cy="contact-input-name"]').type('Jorge Sanch');

        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
        
        cy.get('[data-cy="contact-btn-submit"]').then((el)=> {  // gives you more access to the different properties the DOM element might have
            expect(el.attr('disabled')).to.be.undefined;        // 'should' does not exist in the el element. To use assertions we can use expect()
            expect(el.text()).to.eq('Send Message')
        });                                                     
        // queries can be chained like this:
        // cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled');
        // cy.get('[data-cy="contact-btn-submit"]')
        //    .contains('Send Message')
        //    .and('not.have.attr', 'disabled');

        cy.screenshot();
        cy.get('[data-cy="contact-input-email"]').type('jorge@example.com{enter}');  // simulate the user presses enter in keyboard instead of clicking submit btn

         // not recommended: we can create constant to store result of getting a button:
         // const btn = cy.get('[data-cy="contact-btn-submit"]');
         cy.screenshot();
         cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
         // cy.get('@submitBtn').click();
         cy.get('@submitBtn').contains('Sending...');
         cy.get('@submitBtn').should('have.attr', 'disabled'); // check if disabled attribute is set to the button after submitting form.
    });
    it('should validate the form input', ()=>{
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]').then(el=> { // with this step we make sure the button is never changing.
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...');
        });
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message'); // not a good check

        cy.get('[data-cy="contact-input-message"]').as('msgInput')
        cy.get('@msgInput').blur(); // check if a specific element has gained focus.
        cy.get('@msgInput') 
            .parent()
            // .then(el => { // this test fails in headless mode because of the expect(el.attr('class'))
            //    expect(el.attr('class')).to.contains('invalid'); // check if paragraph that wraps input filed contains the word invalid.
            .should('have.attr', 'class').and('match', /invalid/); // match allows to use a regex 
                                                      // this will not cause the test to

        cy.get('[data-cy="contact-input-name"]').focus().blur();
        cy.get('[data-cy="contact-input-name"]')
            .parent()
        //     .then(el => {
        //         expect(el.attr('class')).to.contains('invalid');
        // });
        .should('have.attr', 'class').and('match', /invalid/);

        cy.get('[data-cy="contact-input-email"]').focus().blur();
        cy.get('[data-cy="contact-input-email"]')
            .parent()
        //     .then(el => {
        //         expect(el.attr('class')).to.contains('invalid');
        // });
        //.should('have.attr', 'class').and('match', /invalid/);
        .should((el)=> { //alternative syntax to chaining shoulds.
            expect(el.attr('class')).not.to.be.undefined;
            expect(el.attr('class')).contains('invalid');
        })
    });
})